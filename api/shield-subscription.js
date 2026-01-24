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

        // Get subscription details
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${recordId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        const subscription = response.data.subscription;

        return res.status(200).json({
            subscription_id: subscription.subscription_id,
            subscription_number: subscription.subscription_number,
            amount: subscription.amount,
            status: subscription.status,
            next_billing_at: subscription.next_billing_at,
            current_term_ends_at: subscription.current_term_ends_at,
            cf_shipping_status: subscription.cf_shipping_status,
            cf_tracking_number: subscription.cf_tracking_number,
            cf_shipping_date: subscription.cf_shipping_date,
            cf_device_type: subscription.cf_device_type,
            hostedpage_url: subscription.hostedpage_url,
            card: subscription.card,
            customer_id: subscription.customer_id
        });

    } catch (error) {
        console.error('Error fetching subscription:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch subscription'
        });
    }
};
