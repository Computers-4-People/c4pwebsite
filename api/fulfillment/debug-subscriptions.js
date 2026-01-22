const { getZohoBillingAccessToken, getCustomFieldValue } = require('./zoho-billing');
const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        console.log('=== DEBUG: Fetching subscriptions ===');

        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 10  // Just get 10 for debugging
            }
        });

        const subscriptions = response.data.subscriptions || [];

        console.log(`Found ${subscriptions.length} subscriptions`);

        // Debug each subscription's custom fields
        const debugData = subscriptions.map(sub => {
            const customFields = {};
            if (sub.custom_fields && Array.isArray(sub.custom_fields)) {
                sub.custom_fields.forEach(cf => {
                    customFields[cf.label || cf.customfield_id] = cf.value;
                });
            }

            console.log('Subscription:', sub.subscription_id);
            console.log('Custom fields:', JSON.stringify(customFields, null, 2));

            return {
                subscription_id: sub.subscription_id,
                subscription_number: sub.subscription_number,
                name: sub.name,
                status: sub.status,
                custom_fields: customFields,
                raw_custom_fields: sub.custom_fields
            };
        });

        return res.status(200).json({
            success: true,
            count: subscriptions.length,
            subscriptions: debugData,
            full_response: response.data
        });
    } catch (error) {
        console.error('Debug error:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data
        });
    }
};
