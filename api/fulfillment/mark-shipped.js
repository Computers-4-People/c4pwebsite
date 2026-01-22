const { updateInvoiceFields, updateSubscriptionFields } = require('./zoho-billing');
const axios = require('axios');
const { getZohoBillingAccessToken } = require('./zoho-billing');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { invoice_id, tracking_number, sim_card } = req.body;

        if (!invoice_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing invoice_id (subscription_id)'
            });
        }

        // invoice_id is actually customer_id now (since invoices don't have subscription_id)
        // We need to find the subscription for this customer
        const customerId = invoice_id;
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Get all subscriptions for this customer
        const subsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 200
            }
        });

        const subscriptions = subsResponse.data.subscriptions || [];
        const subscription = subscriptions.find(sub => sub.customer_id === customerId);

        if (!subscription) {
            throw new Error(`No subscription found for customer_id ${customerId}`);
        }

        const subscriptionId = subscription.subscription_id;

        // Fetch full subscription details to get custom_fields array
        const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        const fullSubscription = subDetailResponse.data.subscription;

        // Update subscription with shipping info
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const customFields = fullSubscription.custom_fields.map(field => {
            // Match by api_name (cf_*) which is more reliable than label
            if (field.api_name === 'cf_shipping_status') {
                return { ...field, value: 'Shipped' };
            }
            if (field.api_name === 'cf_shipping_date') {
                return { ...field, value: currentDate };
            }
            if (field.api_name === 'cf_tracking_number' && tracking_number) {
                return { ...field, value: tracking_number };
            }
            if (field.api_name === 'cf_sim_card_number' && sim_card) {
                return { ...field, value: sim_card };
            }
            return field;
        });

        await updateSubscriptionFields(subscriptionId, customFields);

        return res.status(200).json({
            success: true,
            message: 'Order marked as shipped'
        });
    } catch (error) {
        console.error('Error marking order as shipped:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to mark order as shipped'
        });
    }
};
