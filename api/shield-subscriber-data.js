const { getZohoBillingAccessToken, clearBillingTokenCache } = require('./fulfillment/zoho-billing');
const axios = require('axios');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { recordId } = req.query;

    if (!recordId) {
        return res.status(400).json({ success: false, error: 'Record ID is required' });
    }

    const orgId = process.env.ZOHO_ORG_ID;

    // Try up to 2 times (retry once on 401)
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            const accessToken = await getZohoBillingAccessToken();

            // Get subscription details
            const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${recordId}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });

            const subscription = response.data.subscription;

            return res.status(200).json({
                customer_name: subscription.customer_name,
                email: subscription.email,
                customer_email: subscription.customer?.email,
                customer_id: subscription.customer_id
            });

        } catch (error) {
            const status = error.response?.status;
            const code = error.response?.data?.code;

            // On 401 or code 57 (unauthorized), clear cache and retry once
            if ((status === 401 || code === 57) && attempt === 0) {
                console.warn('Got 401/unauthorized in shield-subscriber-data, clearing cache and retrying...');
                clearBillingTokenCache();
                continue;
            }

            console.error('Error fetching subscriber data:', error.response?.data || error.message);
            return res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch subscriber data'
            });
        }
    }
};
