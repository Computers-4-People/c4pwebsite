const axios = require('axios');
const { getZohoBillingAccessToken, updateSubscriptionFields } = require('./zoho-billing');

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
        const { subscription_id, subscription_ids, value } = req.body || {};
        const ids = Array.isArray(subscription_ids) ? subscription_ids : (subscription_id ? [subscription_id] : []);

        if (ids.length === 0) {
            return res.status(400).json({ success: false, error: 'Missing subscription_id(s)' });
        }

        if (!value || !['Yes', 'No'].includes(value)) {
            return res.status(400).json({ success: false, error: 'Value must be "Yes" or "No"' });
        }

        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        const updateSingle = async (subId) => {
            const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subId}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });

            const fullSubscription = subDetailResponse.data.subscription;
            const customFields = (fullSubscription.custom_fields || []).map((field) => {
                if (field.api_name === 'cf_active_on_tmobile') {
                    return { ...field, value };
                }
                return field;
            });

            const fieldNames = customFields.map((field) => field.api_name);
            if (!fieldNames.includes('cf_active_on_tmobile')) {
                customFields.push({
                    label: 'Active on Tmobile',
                    value
                });
            }

            await updateSubscriptionFields(subId, customFields);
        };

        await Promise.all(ids.map((subId) => updateSingle(subId)));

        return res.status(200).json({
            success: true,
            updated: ids.length
        });
    } catch (error) {
        console.error('Error updating T-Mobile status:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to update T-Mobile status'
        });
    }
};
