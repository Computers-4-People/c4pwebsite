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
            cf_shipping_status: subscription.custom_field_hash?.cf_shipping_status,
            cf_tracking_number: subscription.custom_field_hash?.cf_tracking_number,
            cf_shipping_date: subscription.custom_field_hash?.cf_shipping_date,
            cf_device_type: subscription.custom_field_hash?.cf_device_type,
            hostedpage_url: subscription.hostedpage_url,
            card: subscription.card,
            customer_id: subscription.customer_id,
            customer_name: subscription.customer?.display_name,
            cf_street: subscription.custom_field_hash?.cf_street,
            cf_street_2: subscription.custom_field_hash?.cf_street_2,
            cf_city: subscription.custom_field_hash?.cf_city,
            cf_state: subscription.custom_field_hash?.cf_state,
            cf_zip_code: subscription.custom_field_hash?.cf_zip_code,
            cf_country: subscription.custom_field_hash?.cf_country,
            cf_sim_card_quantity: subscription.custom_field_hash?.cf_sim_card_quantity
        });

    } catch (error) {
        console.error('Error fetching subscription:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch subscription'
        });
    }
};
