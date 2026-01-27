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

    const { email, findAll } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }

    try {
        const accessToken = await getZohoBillingAccessToken();
        const orgId = process.env.ZOHO_ORG_ID;

        console.log('Searching for Shield subscription with email:', email);

        const normalizedEmail = email.trim().toLowerCase();
        const shouldFindAll = String(findAll).toLowerCase() === 'true';

        // Step 1: Find customer by email
        let customerId = null;
        let customerPage = 1;
        let customerHasMore = true;

        console.log('Step 1: Searching for customer with email:', email);

        while (customerHasMore && !customerId) {
            const customerResponse = await axios.get(`https://www.zohoapis.com/billing/v1/customers`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId
                },
                params: {
                    per_page: 200,
                    page: customerPage
                }
            });

            const customers = customerResponse.data.customers || [];
            const matchingCustomer = customers.find(cust => {
                const custEmail = cust.email || '';
                return custEmail.toLowerCase() === normalizedEmail;
            });

            if (matchingCustomer) {
                customerId = matchingCustomer.customer_id;
                console.log('Found customer:', customerId);
                break;
            }

            const custPageContext = customerResponse.data.page_context || {};
            customerHasMore = Boolean(custPageContext.has_more_page);
            customerPage += 1;
        }

        if (!customerId) {
            console.log('No customer found for email:', email);
            return res.status(404).json({ success: false, error: 'No subscription found' });
        }

        // Step 2: Get subscriptions for this customer
        console.log('Step 2: Fetching subscriptions for customer:', customerId);

        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                customer_id: customerId,
                per_page: 200
            }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        console.log(`Found ${subscriptions.length} subscriptions for customer ${customerId}`);

        if (subscriptions.length === 0) {
            console.log('No subscription found for email:', email);
            return res.status(404).json({ success: false, error: 'No subscription found' });
        }

        console.log('Returning subscription:', subscriptions[0].subscription_id);

        return res.status(200).json({
            success: true,
            data: subscriptions
        });

    } catch (error) {
        console.error('Error fetching Shield subscriber:', error.response?.data || error.message);
        console.error('Full error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch subscriber'
        });
    }
};
