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
                per_page: 3
            }
        });

        const subscriptions = subsResponse.data.subscriptions || [];

        return res.status(200).json({
            success: true,
            invoices_count: invoices.length,
            subscriptions_count: subscriptions.length,
            invoice_list_data: invoices.map(inv => ({
                invoice_id: inv.invoice_id,
                invoice_number: inv.number,
                customer_name: inv.customer_name,
                email: inv.email,
                has_customer_object: !!inv.customer,
                has_billing_address: !!inv.billing_address,
                has_shipping_address: !!inv.shipping_address,
                billing_address: inv.billing_address,
                shipping_address: inv.shipping_address,
                customer: inv.customer,
                all_keys: Object.keys(inv)
            })),
            subscription_list_data: subscriptions.map(sub => ({
                subscription_id: sub.subscription_id,
                name: sub.name,
                customer_name: sub.customer_name,
                email: sub.email,
                has_customer_object: !!sub.customer,
                has_shipping_address: !!(sub.customer?.shipping_address || sub.shipping_address),
                all_keys: Object.keys(sub)
            }))
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
