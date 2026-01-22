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

// Get pending orders (subscriptions with cf_shipping_status=New Manual Order)
async function getPendingOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Get all subscriptions (no filter_by parameter for subscriptions endpoint)
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

        // Filter for orders with cf_shipping_status=New Manual Order
        return subscriptions.filter(subscription => {
            const shippingStatus = getCustomFieldValue(subscription, 'cf_shipping_status');
            return shippingStatus === 'New Manual Order';
        });
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
        // Get all subscriptions (no filter_by parameter for subscriptions endpoint)
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
        return subscriptions.filter(subscription => {
            const shippingStatus = getCustomFieldValue(subscription, 'cf_shipping_status');
            return shippingStatus === 'Shipped';
        });
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
    const shippingStatus = getCustomFieldValue(subscription, 'cf_shipping_status');

    return {
        subscription_id: subscription.subscription_id,
        subscription_number: subscription.subscription_number || subscription.name,
        customer_name: subscription.customer?.display_name || subscription.customer_name || '',
        email: subscription.customer?.email || '',
        phone: subscription.customer?.phone || '',
        shipping_address: {
            address: subscription.shipping_address?.street || '',
            address2: subscription.shipping_address?.street2 || '',
            city: subscription.shipping_address?.city || '',
            state: subscription.shipping_address?.state || '',
            zip: subscription.shipping_address?.zip || '',
            country: subscription.shipping_address?.country || 'USA'
        },
        device_type: getCustomFieldValue(subscription, 'cf_device_type') || subscription.plan?.name || '',
        status: shippingStatus === 'Shipped' ? 'shipped' : (getCustomFieldValue(subscription, 'cf_sim_card_number') ? 'ready_to_ship' : 'pending_sim'),
        assigned_sim: getCustomFieldValue(subscription, 'cf_sim_card_number'),
        tracking_number: getCustomFieldValue(subscription, 'cf_tracking_number'),
        line_status: getCustomFieldValue(subscription, 'cf_line_status'),
        device_status: getCustomFieldValue(subscription, 'cf_device_status'),
        ordered_by: getCustomFieldValue(subscription, 'cf_ordered_by'),
        active_on_tmobile: getCustomFieldValue(subscription, 'cf_active_on_tmobile'),
        tmobile_line_number: getCustomFieldValue(subscription, 'cf_tmobile_line_number'),
        device_sn: getCustomFieldValue(subscription, 'cf_device_sn'),
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
