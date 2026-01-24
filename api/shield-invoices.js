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

    const { recordId } = req.query;

    if (!recordId) {
        return res.status(400).json({ success: false, error: 'Record ID is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Get subscription to find customer_id
        const subscriptionResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${recordId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        const customerId = subscriptionResponse.data.subscription.customer_id;

        // Get invoices for this customer
        const invoicesResponse = await axios.get(`https://www.zohoapis.com/billing/v1/invoices`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                customer_id: customerId,
                per_page: 100
            }
        });

        const invoices = invoicesResponse.data.invoices || [];

        // Format invoices
        const formattedInvoices = invoices.map(invoice => ({
            invoice_id: invoice.invoice_id,
            invoice_number: invoice.invoice_number,
            invoice_date: invoice.invoice_date,
            total: invoice.total,
            status: invoice.status,
            due_date: invoice.due_date
        }));

        return res.status(200).json({
            success: true,
            invoices: formattedInvoices
        });

    } catch (error) {
        console.error('Error fetching invoices:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch invoices'
        });
    }
};
