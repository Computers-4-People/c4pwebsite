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
        // Fetch subscriptions (1 API call)
        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        // Filter subscriptions with status "New Manual Order"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            const status = (subscription.cf_shipping_status || '').trim().toLowerCase();
            return status === 'new manual order';
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "New Manual Order"`);

        // Return subscriptions with custom field addresses
        return filteredSubscriptions.map(sub => ({
            ...sub,
            _source: 'subscription'
        }));
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
        // Fetch subscriptions (1 API call)
        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        // Filter subscriptions with status "Shipped"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            return subscription.cf_shipping_status === 'Shipped';
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "Shipped"`);

        // Return subscriptions with custom field addresses
        return filteredSubscriptions.map(sub => ({
            ...sub,
            _source: 'subscription'
        }));
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

// Format order (subscription with custom field address) for queue display
function formatOrderForQueue(record) {
    const shippingStatus = record.cf_shipping_status || '';

    // Use subscription custom fields for address
    const shippingAddress = {
        address: record.cf_street || '',
        address2: record.cf_street_2 || '',
        city: record.cf_city || '',
        state: record.cf_state || '',
        zip: record.cf_zip_code || '',
        country: record.cf_country || 'USA'
    };

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
        sim_card_quantity: record.cf_sim_card_quantity || '',
        device_quantity: record.cf_device_quantity || '',
        created_date: record.created_time,
        updated_date: record.updated_time,
        shipped_date: record.cf_shipping_date || null
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
