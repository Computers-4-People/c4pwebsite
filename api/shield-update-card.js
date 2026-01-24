const { getZohoBillingAccessToken } = require('./fulfillment/zoho-billing');
const axios = require('axios');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { customerId, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    // Validate all required fields
    if (!customerId || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
        return res.status(400).json({ error: 'All card fields are required' });
    }

    // Validate card number (basic Luhn check could be added here)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,16}$/.test(cleanCardNumber)) {
        return res.status(400).json({ error: 'Invalid card number' });
    }

    // Validate expiry month
    const monthNum = parseInt(expiryMonth);
    if (monthNum < 1 || monthNum > 12) {
        return res.status(400).json({ error: 'Invalid expiry month' });
    }

    // Validate expiry year
    const yearNum = parseInt(expiryYear);
    const currentYear = new Date().getFullYear();
    if (yearNum < currentYear || yearNum > currentYear + 20) {
        return res.status(400).json({ error: 'Invalid expiry year' });
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
        return res.status(400).json({ error: 'Invalid CVV' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Update card in Zoho Billing via HTTPS
        const response = await axios.post(
            `https://www.zohoapis.com/billing/v1/customers/${customerId}/cards`,
            {
                card_number: cleanCardNumber,
                expiry_month: expiryMonth,
                expiry_year: expiryYear,
                cvv_number: cvv
            },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Don't log sensitive data, only success status
        console.log('Payment method updated successfully');

        return res.status(200).json({
            success: true,
            message: 'Payment method updated successfully',
            card: {
                last4: response.data.card?.last_four_digits || response.data.card?.last4,
                brand: response.data.card?.card_type
            }
        });

    } catch (error) {
        // Log full error details for debugging
        console.error('Payment update failed:', error.response?.status);
        console.error('Error details:', error.response?.data);
        console.error('Full error:', error.message);

        return res.status(500).json({
            error: error.response?.data?.message || 'Failed to update payment method. Please check your card details and try again.',
            details: error.response?.data
        });
    }
};

