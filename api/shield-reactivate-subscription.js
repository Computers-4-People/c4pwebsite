const { getZohoBillingAccessToken } = require('./fulfillment/zoho-billing');
const axios = require('axios');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { subscriptionId } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ error: 'Subscription ID is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Reactivate subscription
        const response = await axios.post(
            `https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}/reactivate`,
            {},
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Subscription reactivated:', subscriptionId);

        return res.status(200).json({
            success: true,
            message: 'Subscription has been reactivated successfully',
            data: response.data
        });

    } catch (error) {
        console.error('Error reactivating subscription:', error.response?.data || error.message);
        return res.status(500).json({
            error: error.response?.data?.message || error.message || 'Failed to reactivate subscription'
        });
    }
};
