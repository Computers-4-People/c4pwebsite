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

        console.log('Target subscription cf_device_type:', targetSub?.cf_device_type);
        console.log('Target invoice cf_device_type:', targetInvoice?.cf_device_type);

        // Get sample of invoices with different device types
        const invoicesByDeviceType = {};
        invoices.slice(0, 20).forEach(inv => {
            const deviceType = inv.cf_device_type || 'Blank';
            if (!invoicesByDeviceType[deviceType]) {
                invoicesByDeviceType[deviceType] = [];
            }
            if (invoicesByDeviceType[deviceType].length < 2) {
                invoicesByDeviceType[deviceType].push({
                    invoice_number: inv.invoice_number,
                    customer_name: inv.customer_name,
                    cf_device_type: inv.cf_device_type
                });
            }
        });

        return res.status(200).json({
            total_api_calls: 2,
            subscriptions_count: subscriptions.length,
            invoices_count: invoices.length,
            target_subscription_found: !!targetSub,
            target_subscription_number: targetSub?.subscription_number || 'Not found',
            target_subscription_cf_device_type: targetSub?.cf_device_type || 'Not set',
            target_invoice_found: !!targetInvoice,
            target_invoice_number: targetInvoice?.invoice_number || 'N/A',
            target_invoice_cf_device_type: targetInvoice?.cf_device_type || 'Not set',
            invoices_by_device_type: invoicesByDeviceType,
            sample_subscriptions_with_device_type: subscriptions.slice(0, 5).map(sub => ({
                subscription_number: sub.subscription_number,
                customer_name: sub.customer_name,
                plan_name: sub.plan_name,
                cf_device_type: sub.cf_device_type || 'Blank'
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
