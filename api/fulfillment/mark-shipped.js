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

        // invoice_id is actually subscription_id now (frontend sends subscription_id)
        const subscriptionId = invoice_id;
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Get current subscription to preserve other custom fields
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        const subscription = response.data.subscription;

        // Update subscription with shipping info
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const customFields = subscription.custom_fields.map(field => {
            if (field.label === 'Shipping Status') {
                return { ...field, value: 'Shipped' };
            }
            if (field.label === 'Shipping Date') {
                return { ...field, value: currentDate };
            }
            if (field.label === 'Tracking Number' && tracking_number) {
                return { ...field, value: tracking_number };
            }
            if (field.label === 'SIM Card Number' && sim_card) {
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
