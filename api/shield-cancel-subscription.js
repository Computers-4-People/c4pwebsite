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

    const { subscriptionId, reason } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ error: 'Subscription ID is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        // Cancel subscription at end of term
        // cancel_at_end is query param, but Zoho also requires cancellation_reason in body
        const response = await axios.post(
            `https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}/cancel?cancel_at_end=true`,
            {
                cancellation_reason: reason || 'Customer requested cancellation'
            },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Subscription cancelled:', subscriptionId);

        // Store cancellation reason in custom field
        if (reason) {
            try {
                await axios.put(
                    `https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`,
                    {
                        custom_fields: [
                            {
                                label: 'cf_cancellation_reason',
                                value: reason
                            }
                        ]
                    },
                    {
                        headers: {
                            'Authorization': `Zoho-oauthtoken ${accessToken}`,
                            'X-com-zoho-subscriptions-organizationid': orgId,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log('Cancellation reason saved to cf_cancellation_reason:', reason);
            } catch (fieldError) {
                console.error('Error saving cancellation reason:', fieldError.response?.data || fieldError.message);
                // Don't fail the whole operation if this fails
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Subscription will be cancelled at the end of the current billing period',
            data: response.data
        });

    } catch (error) {
        console.error('Error cancelling subscription:', error.response?.data || error.message);
        return res.status(500).json({
            error: error.response?.data?.message || error.message || 'Failed to cancel subscription'
        });
    }
};
