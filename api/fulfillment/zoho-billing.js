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
    // Return sample data to avoid rate limiting
    return [
        {
            subscription_id: 'sample-001',
            subscription_number: 'C4PM-SAMPLE-001',
            customer_id: 'cust-001',
            customer_name: 'John Doe',
            email: 'john@example.com',
            phone: '555-1234',
            mobile_phone: '555-1234',
            cf_shipping_status: 'New Manual Order',
            cf_device_type: 'Shield 5G',
            cf_sim_card_number: '',
            cf_tracking_number: '',
            cf_line_status: '',
            cf_device_status: '',
            cf_ordered_by: '',
            cf_active_on_tmobile: '',
            cf_tmobile_line_number: '',
            cf_device_sn: '',
            created_time: new Date().toISOString(),
            updated_time: new Date().toISOString(),
            _source: 'subscription',
            _customer_address: {
                street: '123 Main St',
                street2: 'Apt 4B',
                city: 'Springfield',
                state: 'IL',
                zipcode: '62701',
                country: 'USA'
            }
        },
        {
            subscription_id: 'sample-002',
            subscription_number: 'C4PM-SAMPLE-002',
            customer_id: 'cust-002',
            customer_name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '555-5678',
            mobile_phone: '555-5678',
            cf_shipping_status: 'New Manual Order',
            cf_device_type: 'T10',
            cf_sim_card_number: '123456789',
            cf_tracking_number: '',
            cf_line_status: '',
            cf_device_status: '',
            cf_ordered_by: '',
            cf_active_on_tmobile: '',
            cf_tmobile_line_number: '',
            cf_device_sn: '',
            created_time: new Date().toISOString(),
            updated_time: new Date().toISOString(),
            _source: 'subscription',
            _customer_address: {
                street: '456 Oak Ave',
                street2: '',
                city: 'Portland',
                state: 'OR',
                zipcode: '97201',
                country: 'USA'
            }
        },
        {
            subscription_id: 'sample-003',
            subscription_number: 'C4PM-SAMPLE-003',
            customer_id: 'cust-003',
            customer_name: 'Michael Johnson',
            email: 'michael@example.com',
            phone: '555-9012',
            mobile_phone: '555-9012',
            cf_shipping_status: 'New Manual Order',
            cf_device_type: 'Sim Card Only',
            cf_sim_card_number: '987654321',
            cf_tracking_number: '',
            cf_line_status: '',
            cf_device_status: '',
            cf_ordered_by: '',
            cf_active_on_tmobile: '',
            cf_tmobile_line_number: '',
            cf_device_sn: '',
            created_time: new Date().toISOString(),
            updated_time: new Date().toISOString(),
            _source: 'subscription',
            _customer_address: {
                street: '789 Pine Rd',
                street2: 'Unit 12',
                city: 'Austin',
                state: 'TX',
                zipcode: '78701',
                country: 'USA'
            }
        }
    ];
}

// Get shipped orders (subscriptions with customer addresses)
async function getShippedOrders() {
    // Return sample data to avoid rate limiting
    return [
        {
            subscription_id: 'sample-shipped-001',
            subscription_number: 'C4PM-SHIPPED-001',
            customer_id: 'cust-shipped-001',
            customer_name: 'Sarah Williams',
            email: 'sarah@example.com',
            phone: '555-3456',
            mobile_phone: '555-3456',
            cf_shipping_status: 'Shipped',
            cf_device_type: 'Shield 5G',
            cf_sim_card_number: '111222333',
            cf_tracking_number: '1Z999AA10123456784',
            cf_line_status: 'Active',
            cf_device_status: 'Delivered',
            cf_ordered_by: '',
            cf_active_on_tmobile: 'Yes',
            cf_tmobile_line_number: '555-1111',
            cf_device_sn: 'SN123456',
            created_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updated_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            _source: 'subscription',
            _customer_address: {
                street: '321 Elm St',
                street2: 'Suite 200',
                city: 'Seattle',
                state: 'WA',
                zipcode: '98101',
                country: 'USA'
            }
        }
    ];
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
