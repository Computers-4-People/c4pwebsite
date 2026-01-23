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

        console.log('=== DEBUG: Testing INVOICES vs SUBSCRIPTIONS endpoint ===');

        // Test invoices list endpoint
        const invoicesResponse = await axios.get(`https://www.zohoapis.com/billing/v1/invoices`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 3  // Just get 3 for debugging
            }
        });

        const invoices = invoicesResponse.data.invoices || [];
        console.log(`Found ${invoices.length} invoices from LIST endpoint`);
        console.log('First invoice from LIST:', JSON.stringify(invoices[0], null, 2));

        // Test subscriptions list endpoint
        const subsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 100  // Increase to find C4PM-01857
            }
        });

        const subscriptions = subsResponse.data.subscriptions || [];

        // Find subscription C4PM-01857 (has 5G addon according to user)
        const targetSub = subscriptions.find(s => s.subscription_number === 'C4PM-01857');

        let subscriptionDetail = null;
        if (targetSub) {
            const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${targetSub.subscription_id}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });
            subscriptionDetail = subDetailResponse.data.subscription;
            console.log('Subscription C4PM-01857 DETAIL fields:', Object.keys(subscriptionDetail));
            console.log('Subscription C4PM-01857 addons:', subscriptionDetail.addons);
            console.log('Subscription C4PM-01857 line_items:', subscriptionDetail.line_items);
        } else {
            // Fallback to first subscription if C4PM-01857 not in first 3
            if (subscriptions.length > 0) {
                const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subscriptions[0].subscription_id}`, {
                    headers: {
                        'Authorization': `Zoho-oauthtoken ${accessToken}`,
                        'X-com-zoho-subscriptions-organizationid': orgId
                    }
                });
                subscriptionDetail = subDetailResponse.data.subscription;
            }
        }

        const { getCustomFieldValue } = require('./zoho-billing');

        return res.status(200).json({
            subscription_detail_fields: subscriptionDetail ? Object.keys(subscriptionDetail) : [],
            subscription_detail_addons: subscriptionDetail?.addons || null,
            subscription_detail_line_items: subscriptionDetail?.line_items || null,
            subscription_number: subscriptionDetail?.subscription_number || 'Not found',
            success: true,
            invoices_count: invoices.length,
            subscriptions_count: subscriptions.length,
            invoice_list_data: invoices.map(inv => {
                const customFieldsDebug = {};
                if (inv.custom_fields && Array.isArray(inv.custom_fields)) {
                    inv.custom_fields.forEach(cf => {
                        customFieldsDebug[cf.label || cf.api_name] = cf.value;
                    });
                }

                return {
                    invoice_id: inv.invoice_id,
                    invoice_number: inv.number,
                    customer_name: inv.customer_name,
                    email: inv.email,
                    has_shipping_address: !!inv.shipping_address,
                    shipping_address: inv.shipping_address,
                    shipping_status_via_function: getCustomFieldValue(inv, 'Shipping Status'),
                    shipping_status_direct: inv.cf_shipping_status,
                    custom_fields_parsed: customFieldsDebug,
                    raw_custom_fields: inv.custom_fields,
                    all_keys: Object.keys(inv)
                };
            }),
            subscription_list_data: subscriptions.map(sub => {
                const customFieldsDebug = {};
                if (sub.custom_fields && Array.isArray(sub.custom_fields)) {
                    sub.custom_fields.forEach(cf => {
                        customFieldsDebug[cf.label || cf.api_name] = cf.value;
                    });
                }

                return {
                    subscription_id: sub.subscription_id,
                    name: sub.name,
                    customer_name: sub.customer_name,
                    email: sub.email,
                    shipping_status_via_function: getCustomFieldValue(sub, 'Shipping Status'),
                    shipping_status_direct: sub.cf_shipping_status,
                    custom_fields_parsed: customFieldsDebug,
                    all_keys: Object.keys(sub)
                };
            })
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
