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

        // Call 2: Fetch invoices
        const invoicesResponse = await axios.get(`https://www.zohoapis.com/billing/v1/invoices`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subsResponse.data.subscriptions || [];
        const invoices = invoicesResponse.data.invoices || [];

        console.log(`Fetched ${subscriptions.length} subscriptions, ${invoices.length} invoices`);

        // Find subscription C4PM-01857 and its matching invoice
        const targetSub = subscriptions.find(s => s.subscription_number === 'C4PM-01857');
        const targetInvoice = targetSub ? invoices.find(inv => inv.customer_id === targetSub.customer_id) : null;

        // Call 3: Fetch invoice detail to see line_items (where device addon is)
        let invoiceDetail = null;
        if (targetInvoice) {
            const invDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/invoices/${targetInvoice.invoice_id}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                }
            });
            invoiceDetail = invDetailResponse.data.invoice;
            console.log('Invoice detail line_items:', JSON.stringify(invoiceDetail.line_items, null, 2));
        }

        return res.status(200).json({
            total_api_calls: 3,
            subscriptions_count: subscriptions.length,
            invoices_count: invoices.length,
            target_subscription_found: !!targetSub,
            target_subscription_number: targetSub?.subscription_number || 'Not found',
            target_subscription_customer_id: targetSub?.customer_id || 'N/A',
            target_invoice_found: !!targetInvoice,
            target_invoice_id: targetInvoice?.invoice_id || 'N/A',
            target_invoice_number: targetInvoice?.invoice_number || 'N/A',
            invoice_detail_line_items: invoiceDetail?.line_items || null,
            invoice_has_subscription_id: invoiceDetail ? ('subscription_id' in invoiceDetail) : false,
            invoice_subscription_id: invoiceDetail?.subscription_id || null,
            sample_invoice_fields: targetInvoice ? Object.keys(targetInvoice) : [],
            sample_subscriptions: subscriptions.slice(0, 3).map(sub => ({
                subscription_number: sub.subscription_number,
                subscription_id: sub.subscription_id,
                customer_id: sub.customer_id,
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
