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

// Get pending orders (subscriptions with cf_shipping_status=New Manual Order)
async function getPendingOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Get all subscriptions (list endpoint returns minimal but sufficient data)
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 200
            }
        });

        const subscriptions = response.data.subscriptions || [];

        // Filter for orders with Shipping Status=New Manual Order
        const filtered = subscriptions.filter(subscription => {
            const shippingStatus = getCustomFieldValue(subscription, 'Shipping Status');
            return shippingStatus === 'New Manual Order';
        });

        // Return list data directly to avoid Vercel timeout (15 second limit)
        // Full details can be fetched on-demand if needed via getOrderDetails()
        console.log(`Found ${filtered.length} pending orders`);
        return filtered;
    } catch (error) {
        console.error('Error fetching pending orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get shipped orders
async function getShippedOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Get all subscriptions (list endpoint returns minimal but sufficient data)
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 200
            }
        });

        const subscriptions = response.data.subscriptions || [];

        // Filter for orders that have been shipped
        const filtered = subscriptions.filter(subscription => {
            const shippingStatus = getCustomFieldValue(subscription, 'Shipping Status');
            return shippingStatus === 'Shipped';
        });

        // Return list data directly to avoid Vercel timeout (15 second limit)
        console.log(`Found ${filtered.length} shipped orders`);
        return filtered;
    } catch (error) {
        console.error('Error fetching shipped orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get order details by subscription ID
async function getOrderDetails(subscriptionId) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        return response.data.subscription;
    } catch (error) {
        console.error('Error fetching order details:', error.response?.data || error.message);
        throw error;
    }
}

// Update subscription custom fields
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

// Keep old name for backwards compatibility
const updateInvoiceFields = updateSubscriptionFields;

// Format subscription for queue display
function formatOrderForQueue(subscription) {
    const shippingStatus = getCustomFieldValue(subscription, 'Shipping Status');

    // List endpoint DOES include full customer object with shipping_address!
    // Access via subscription.customer.shipping_address
    const shippingAddr = subscription.customer?.shipping_address || {};

    return {
        // Frontend expects invoice_id and invoice_number (legacy naming from when we used invoices)
        invoice_id: subscription.subscription_id,
        invoice_number: subscription.subscription_number || subscription.name,
        subscription_id: subscription.subscription_id,
        subscription_number: subscription.subscription_number || subscription.name,
        customer_name: subscription.customer?.display_name || subscription.customer_name || '',
        email: subscription.customer?.email || subscription.email || '',
        phone: subscription.customer?.phone || subscription.phone || '',
        shipping_address: {
            address: shippingAddr.street || '',
            address2: shippingAddr.street2 || '',
            city: shippingAddr.city || '',
            state: shippingAddr.state || '',
            zip: shippingAddr.zip || '',
            country: shippingAddr.country || 'USA'
        },
        device_type: getCustomFieldValue(subscription, 'Device Type') || subscription.plan_name || subscription.plan?.name || '',
        status: shippingStatus === 'Shipped' ? 'shipped' : (getCustomFieldValue(subscription, 'SIM Card Number') ? 'ready_to_ship' : 'pending_sim'),
        assigned_sim: getCustomFieldValue(subscription, 'SIM Card Number'),
        tracking_number: getCustomFieldValue(subscription, 'Tracking Number'),
        line_status: getCustomFieldValue(subscription, 'Line Status'),
        device_status: getCustomFieldValue(subscription, 'Device Status'),
        ordered_by: getCustomFieldValue(subscription, 'Ordered By'),
        active_on_tmobile: getCustomFieldValue(subscription, 'Active On TMobile'),
        tmobile_line_number: getCustomFieldValue(subscription, 'TMobile Line Number'),
        device_sn: getCustomFieldValue(subscription, 'Device SN'),
        created_date: subscription.created_time,
        updated_date: subscription.updated_time,
        shipped_date: shippingStatus === 'Shipped' ? subscription.updated_time : null
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
