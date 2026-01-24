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

        // Create hosted page for updating payment method
        const response = await axios.post(
            `https://www.zohoapis.com/billing/v1/hostedpages/updatecard`,
            {
                subscription_id: subscriptionId,
                redirect_url: 'https://www.computers4people.org/shield-portal'
            },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Hosted page created for payment update');

        return res.status(200).json({
            success: true,
            url: response.data.hostedpage.url
        });

    } catch (error) {
        console.error('Error creating hosted page:', error.response?.data || error.message);
        return res.status(500).json({
            error: error.response?.data?.message || 'Failed to create payment update page'
        });
    }
};
