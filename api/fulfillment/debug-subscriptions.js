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

        console.log('=== DEBUG: Testing addon structure with 3 API calls ===');

        // Call 1: Fetch subscriptions
        const subsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        // Call 2: Fetch addons
        const addonsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/addons`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subsResponse.data.subscriptions || [];
        const addons = addonsResponse.data.addons || [];

        console.log(`Fetched ${subscriptions.length} subscriptions, ${addons.length} addons`);

        // Find subscription C4PM-01857 (has 5G addon according to user)
        const targetSub = subscriptions.find(s => s.subscription_number === 'C4PM-01857');

        // Call 3: Fetch detail for one subscription to see addon structure
        let subscriptionDetail = null;
        if (targetSub) {
            const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${targetSub.subscription_id}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });
            subscriptionDetail = subDetailResponse.data.subscription;
            console.log('Subscription C4PM-01857 addons:', JSON.stringify(subscriptionDetail.addons, null, 2));
        }

        return res.status(200).json({
            total_api_calls: 3,
            subscriptions_count: subscriptions.length,
            addons_count: addons.length,
            target_subscription_found: !!targetSub,
            target_subscription_number: targetSub?.subscription_number || 'Not found',
            target_subscription_name: targetSub?.name || 'N/A',
            target_subscription_plan_name: targetSub?.plan_name || 'N/A',
            subscription_detail_addons: subscriptionDetail?.addons || null,
            subscription_detail_plan: subscriptionDetail?.plan || null,
            all_addons_list: addons.map(addon => ({
                addon_code: addon.addon_code,
                name: addon.name,
                type: addon.type,
                status: addon.status
            })),
            sample_subscriptions: subscriptions.slice(0, 3).map(sub => ({
                subscription_number: sub.subscription_number,
                name: sub.name,
                plan_name: sub.plan_name,
                customer_name: sub.customer_name
            })),
            success: true
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
