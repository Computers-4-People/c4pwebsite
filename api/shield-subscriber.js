const { getZohoBillingAccessToken } = require('./fulfillment/zoho-billing');
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

    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        console.log('Searching for Shield subscription with email:', email);

        const normalizedEmail = email.trim().toLowerCase();
        let page = 1;
        let hasMore = true;
        let subscriptions = [];

        // Paginate through subscriptions until a matching email is found
        while (hasMore) {
            const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: {
                    per_page: 200,
                    page
                }
            });

            const pageSubscriptions = response.data.subscriptions || [];
            const pageMatches = pageSubscriptions.filter(sub => {
                const subEmail = sub.email || sub.customer?.email || '';
                return subEmail.toLowerCase() === normalizedEmail;
            });

            if (pageMatches.length > 0) {
                subscriptions = pageMatches;
                break;
            }

            const pageContext = response.data.page_context || {};
            hasMore = Boolean(pageContext.has_more_page);
            page += 1;
        }

        console.log(`Found ${subscriptions.length} subscriptions matching email ${email}`);

        if (subscriptions.length === 0) {
            console.log('No subscription found for email:', email);
            return res.status(404).json({ success: false, error: 'No subscription found' });
        }

        console.log('Returning subscription:', subscriptions[0].subscription_id);

        return res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (error) {
        console.error('Error fetching Shield subscriber:', error.response?.data || error.message);
        console.error('Full error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch subscriber'
        });
    }
};
