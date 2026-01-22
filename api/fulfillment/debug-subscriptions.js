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
                per_page: 5  // Just get 5 for debugging
            }
        });

        const subscriptions = response.data.subscriptions || [];

        console.log(`Found ${subscriptions.length} subscriptions from LIST endpoint`);

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
            console.log('Full subscription data fetched');
        }

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
            console.log('Address:', JSON.stringify(sub.shipping_address, null, 2));
            console.log('Customer:', JSON.stringify(sub.customer, null, 2));
            console.log('Plan:', JSON.stringify(sub.plan, null, 2));

            return {
                subscription_id: sub.subscription_id,
                subscription_number: sub.subscription_number,
                name: sub.name,
                status: sub.status,
                plan: sub.plan,
                customer: sub.customer,
                shipping_address: sub.shipping_address,
                custom_fields: customFields,
                raw_custom_fields: sub.custom_fields,
                all_keys: Object.keys(sub)
            };
        });

        return res.status(200).json({
            success: true,
            count: subscriptions.length,
            subscriptions: debugData,
            full_subscription_example: fullSubscription ? {
                subscription_id: fullSubscription.subscription_id,
                subscription_number: fullSubscription.subscription_number,
                name: fullSubscription.name,
                created_time: fullSubscription.created_time,
                plan: fullSubscription.plan,
                customer: fullSubscription.customer,
                shipping_address_at_root: fullSubscription.shipping_address,
                customer_shipping_address: fullSubscription.customer?.shipping_address,
                custom_fields: fullSubscription.custom_fields
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
