const axios = require('axios');

let cachedAccessToken = null;
let tokenExpiration = null;

// Get Zoho Billing access token
async function getZohoBillingAccessToken() {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        return cachedAccessToken;
    }

    try {
        // Use ZOHO_BILLING_* credentials (separate from portal credentials)
        const refreshToken = process.env.ZOHO_BILLING_REFRESH_TOKEN;
        const clientId = process.env.ZOHO_BILLING_CLIENT_ID;
        const clientSecret = process.env.ZOHO_BILLING_CLIENT_SECRET;

        if (!refreshToken || !clientId || !clientSecret) {
            throw new Error('Missing ZOHO_BILLING_* credentials in environment variables');
        }

        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
            },
        });

        cachedAccessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000;
        return cachedAccessToken;
    } catch (error) {
        console.error('Error obtaining Zoho Billing access token:', error.response?.data || error.message);
        throw new Error('Failed to get Zoho Billing access token');
    }
}

// Get custom field value from invoice
function getCustomFieldValue(invoice, fieldLabel) {
    const field = invoice.custom_fields?.find(cf => cf.label === fieldLabel);
    return field?.value || '';
}

// Helper function to add delay (rate limiting)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch subscriptions in batches to avoid rate limiting
// Zoho API limit: 30 requests per minute threshold
// We use 3 per batch with 7 second delay = ~25 requests per minute (safe margin)
async function fetchSubscriptionDetailsInBatches(subscriptions, batchSize = 3, delayMs = 7000) {
    const results = [];

    console.log(`Fetching details for ${subscriptions.length} subscriptions in batches of ${batchSize}...`);

    for (let i = 0; i < subscriptions.length; i += batchSize) {
        const batch = subscriptions.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(subscriptions.length / batchSize)}...`);

        const batchPromises = batch.map(sub =>
            getOrderDetails(sub.subscription_id).catch(err => {
                console.error(`Failed to fetch details for ${sub.subscription_id}:`, err.message);
                return sub; // Return minimal data if fetch fails
            })
        );

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Add delay between batches to avoid rate limiting (30 req/min threshold)
        if (i + batchSize < subscriptions.length) {
            await delay(delayMs);
        }
    }

    console.log(`Completed fetching ${results.length} subscription details`);
    return results;
}

// Get pending orders (both invoices and subscriptions with cf_shipping_status=New Manual Order)
async function getPendingOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Fetch subscriptions with live and cancelled statuses
        const [liveResponse, cancelledResponse] = await Promise.all([
            axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: { per_page: 200, status: 'live' }
            }),
            axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: { per_page: 200, status: 'cancelled' }
            })
        ]);

        const subscriptions = [
            ...(liveResponse.data.subscriptions || []),
            ...(cancelledResponse.data.subscriptions || [])
        ];

        console.log(`Fetched ${liveResponse.data.subscriptions?.length || 0} live + ${cancelledResponse.data.subscriptions?.length || 0} cancelled = ${subscriptions.length} total subscriptions`);

        // Debug: Show all unique cf_shipping_status values
        const shippingStatuses = new Set();
        subscriptions.forEach(sub => {
            if (sub.cf_shipping_status) {
                shippingStatuses.add(sub.cf_shipping_status);
            }
        });
        console.log('Unique shipping status values found:', Array.from(shippingStatuses));

        // Filter subscriptions with status "New Manual Order"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            return subscription.cf_shipping_status === 'New Manual Order';
        });

        // Fetch ALL customers in ONE API call
        const customersResponse = await axios.get(`https://www.zohoapis.com/billing/v1/customers`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const customers = customersResponse.data.customers || [];
        const pageInfo = customersResponse.data.page_context || {};
        console.log(`Customers API returned: ${customers.length} customers, has_more_page: ${pageInfo.has_more_page}, total: ${customersResponse.data.total || 'unknown'}`);

        // Create customer map by customer_id
        const customersByCustomerId = new Map();
        let customersWithAddress = 0;
        customers.forEach(customer => {
            customersByCustomerId.set(customer.customer_id, customer);
            if (customer.shipping_address) {
                customersWithAddress++;
            }
        });

        console.log(`Fetched ${customers.length} customers (${customersWithAddress} have shipping addresses)`);

        // Debug: Check if we're getting customer data for filtered subscriptions
        const matchedCustomers = filteredSubscriptions.filter(sub =>
            customersByCustomerId.has(sub.customer_id)
        ).length;
        console.log(`Matched ${matchedCustomers} out of ${filteredSubscriptions.length} subscriptions to customers`);

        // Debug: Sample unmatched subscriptions
        const unmatchedSubs = filteredSubscriptions.filter(sub =>
            !customersByCustomerId.has(sub.customer_id)
        );
        if (unmatchedSubs.length > 0) {
            console.log(`Sample unmatched subscription customer_ids:`, unmatchedSubs.slice(0, 3).map(s => s.customer_id));
        }

        // Debug: Check subscription statuses in filtered list
        const statusCounts = {};
        subscriptions.forEach(sub => {
            statusCounts[sub.status] = (statusCounts[sub.status] || 0) + 1;
        });
        console.log('Subscription status counts:', statusCounts);

        // Debug: Count how many filtered subscriptions have customers with addresses
        let subsWithAddress = 0;
        filteredSubscriptions.forEach(sub => {
            const customer = customersByCustomerId.get(sub.customer_id);
            if (customer?.shipping_address) {
                subsWithAddress++;
            }
        });
        console.log(`${subsWithAddress} out of ${filteredSubscriptions.length} filtered subscriptions have customer addresses`);

        // Debug: Log first 3 subscription-to-customer mappings with actual address data
        console.log('Sample subscription-to-customer mappings (first 3):');
        filteredSubscriptions.slice(0, 3).forEach((sub, idx) => {
            const customer = customersByCustomerId.get(sub.customer_id);
            console.log(`  ${idx + 1}. Sub ${sub.subscription_number} (customer_id: ${sub.customer_id})`);
            console.log(`     Customer found: ${!!customer}, Has address: ${!!customer?.shipping_address}`);
            if (customer?.shipping_address) {
                const addr = customer.shipping_address;
                console.log(`     Address: ${addr.street || 'N/A'}, ${addr.street2 || 'N/A'}, ${addr.city || 'N/A'}, ${addr.state || 'N/A'} ${addr.zipcode || addr.zip || 'N/A'}`);
            }
        });

        // Merge subscription data with customer addresses
        const mergedOrders = filteredSubscriptions.map(sub => {
            const customer = customersByCustomerId.get(sub.customer_id);
            return {
                ...sub,
                _source: 'subscription',
                _customer_address: customer?.shipping_address || null
            };
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "New Manual Order"`);
        return mergedOrders;
    } catch (error) {
        console.error('Error fetching pending orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get shipped orders (subscriptions with customer addresses)
async function getShippedOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Fetch subscriptions with live and cancelled statuses
        const [liveResponse, cancelledResponse] = await Promise.all([
            axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: { per_page: 200, status: 'live' }
            }),
            axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: { per_page: 200, status: 'cancelled' }
            })
        ]);

        const subscriptions = [
            ...(liveResponse.data.subscriptions || []),
            ...(cancelledResponse.data.subscriptions || [])
        ];

        // Filter subscriptions with status "Shipped"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            return subscription.cf_shipping_status === 'Shipped';
        });

        // Fetch ALL customers in ONE API call
        const customersResponse = await axios.get(`https://www.zohoapis.com/billing/v1/customers`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const customers = customersResponse.data.customers || [];

        // Create customer map by customer_id
        const customersByCustomerId = new Map();
        customers.forEach(customer => {
            customersByCustomerId.set(customer.customer_id, customer);
        });

        // Merge subscription data with customer addresses
        const mergedOrders = filteredSubscriptions.map(sub => {
            const customer = customersByCustomerId.get(sub.customer_id);
            return {
                ...sub,
                _source: 'subscription',
                _customer_address: customer?.shipping_address || null
            };
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "Shipped"`);
        return mergedOrders;
    } catch (error) {
        console.error('Error fetching shipped orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get order details by invoice ID
async function getOrderDetails(invoiceId) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/invoices/${invoiceId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        return response.data.invoice;
    } catch (error) {
        console.error('Error fetching invoice details:', error.response?.data || error.message);
        throw error;
    }
}

// Update invoice custom fields
async function updateInvoiceFields(invoiceId, customFields) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.put(
            `https://www.zohoapis.com/billing/v1/invoices/${invoiceId}`,
            { custom_fields: customFields },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.invoice;
    } catch (error) {
        console.error('Error updating invoice:', error.response?.data || error.message);
        throw error;
    }
}

// Keep old subscription functions for backwards compatibility if needed
async function updateSubscriptionFields(subscriptionId, customFields) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.put(
            `https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`,
            { custom_fields: customFields },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.subscription;
    } catch (error) {
        console.error('Error updating subscription:', error.response?.data || error.message);
        throw error;
    }
}

// Format order (subscription with invoice address) for queue display
function formatOrderForQueue(record) {
    const shippingStatus = record.cf_shipping_status || '';

    // Use customer address if available (from _customer_address), otherwise fall back to custom fields
    let shippingAddress;
    if (record._customer_address) {
        shippingAddress = {
            address: record._customer_address.street || '',
            address2: record._customer_address.street2 || '',
            city: record._customer_address.city || '',
            state: record._customer_address.state || '',
            zip: record._customer_address.zipcode || record._customer_address.zip || '',
            country: record._customer_address.country || 'USA'
        };
    } else {
        // Fall back to custom fields if no invoice address
        shippingAddress = {
            address: record.cf_street || '',
            address2: '',
            city: record.cf_city || '',
            state: record.cf_state || '',
            zip: record.cf_zip_code || '',
            country: 'USA'
        };
    }

    // Device type: use cf_device_type if set and not "Blank", otherwise "Sim Card Only"
    let deviceType = 'Sim Card Only';
    if (record.cf_device_type && record.cf_device_type !== 'Blank' && record.cf_device_type !== '') {
        deviceType = record.cf_device_type;
    }

    return {
        // Frontend expects invoice_id - use customer_id for mark-shipped lookup
        invoice_id: record.customer_id,
        invoice_number: record.subscription_number || record.name || '',
        // Show actual subscription ID and number
        subscription_id: record.subscription_id,
        subscription_number: record.subscription_number || record.name || '',
        customer_name: record.customer_name || '',
        email: record.email || '',
        phone: record.phone || record.mobile_phone || '',
        shipping_address: shippingAddress,
        // Device type from addon
        device_type: deviceType,
        status: shippingStatus === 'Shipped' ? 'shipped' : (record.cf_sim_card_number ? 'ready_to_ship' : 'pending_sim'),
        assigned_sim: record.cf_sim_card_number || '',
        tracking_number: record.cf_tracking_number || '',
        line_status: record.cf_line_status || '',
        device_status: record.cf_device_status || '',
        ordered_by: record.cf_ordered_by || '',
        active_on_tmobile: record.cf_active_on_tmobile || '',
        tmobile_line_number: record.cf_tmobile_line_number || '',
        device_sn: record.cf_device_sn || '',
        created_date: record.created_time,
        updated_date: record.updated_time,
        shipped_date: shippingStatus === 'Shipped' ? record.updated_time : null
    };
}

module.exports = {
    getZohoBillingAccessToken,
    getPendingOrders,
    getShippedOrders,
    getOrderDetails,
    updateInvoiceFields,  // Backwards compatibility (points to updateSubscriptionFields)
    updateSubscriptionFields,
    formatOrderForQueue,
    getCustomFieldValue
};
