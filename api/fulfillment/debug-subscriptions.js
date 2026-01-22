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

        console.log('=== DEBUG: Testing LIST vs INDIVIDUAL endpoint ===');

        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 3  // Just get 3 for debugging
            }
        });

        const subscriptions = response.data.subscriptions || [];

        console.log(`Found ${subscriptions.length} subscriptions from LIST endpoint`);
        console.log('First subscription from LIST:', JSON.stringify(subscriptions[0], null, 2));

        // Now fetch full details for first subscription to compare
        let fullSubscription = null;
        if (subscriptions.length > 0) {
            const firstSubId = subscriptions[0].subscription_id;
            console.log(`Fetching full details for ${firstSubId}...`);
            const fullResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${firstSubId}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });
            fullSubscription = fullResponse.data.subscription;
            console.log('Full subscription from INDIVIDUAL endpoint:', JSON.stringify(fullSubscription, null, 2));
        }

        return res.status(200).json({
            success: true,
            count: subscriptions.length,
            list_endpoint_data: subscriptions.map(sub => ({
                subscription_id: sub.subscription_id,
                name: sub.name,
                customer_name: sub.customer_name,
                email: sub.email,
                has_customer_object: !!sub.customer,
                customer: sub.customer,
                has_shipping_address: !!(sub.customer?.shipping_address || sub.shipping_address),
                all_keys: Object.keys(sub)
            })),
            individual_endpoint_data: fullSubscription ? {
                subscription_id: fullSubscription.subscription_id,
                name: fullSubscription.name,
                has_customer_object: !!fullSubscription.customer,
                customer: fullSubscription.customer,
                has_shipping_address: !!(fullSubscription.customer?.shipping_address || fullSubscription.shipping_address),
                all_keys: Object.keys(fullSubscription)
            } : null
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
