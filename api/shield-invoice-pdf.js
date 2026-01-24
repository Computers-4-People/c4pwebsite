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

    const { invoiceId } = req.query;

    if (!invoiceId) {
        return res.status(400).json({ success: false, error: 'Invoice ID is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Get invoice PDF
        const response = await axios.get(
            `https://www.zohoapis.com/billing/v1/invoices/${invoiceId}`,
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Accept': 'application/pdf'
                },
                params: {
                    accept: 'pdf'
                },
                responseType: 'arraybuffer'
            }
        );

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoiceId}.pdf"`);
        return res.status(200).send(Buffer.from(response.data));

    } catch (error) {
        console.error('Error fetching invoice PDF:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch invoice PDF'
        });
    }
};
