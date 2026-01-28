const axios = require('axios');

// In-memory cache with timestamp (works per serverless instance)
let cachedAccessToken = null;
let tokenExpiration = null;
let tokenRefreshPromise = null;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function refreshBillingAccessToken() {
    // Use ZOHO_BILLING_* credentials (separate from portal credentials)
    const refreshToken = process.env.ZOHO_BILLING_REFRESH_TOKEN;
    const clientId = process.env.ZOHO_BILLING_CLIENT_ID;
    const clientSecret = process.env.ZOHO_BILLING_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
        throw new Error('Missing ZOHO_BILLING_* credentials in environment variables');
    }

    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
        params: {
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
        },
    });

    return response.data;
}

// Get Zoho Billing access token with in-memory caching
async function getZohoBillingAccessToken() {
    const currentTime = Date.now();

    // Return cached token if still valid
    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        return cachedAccessToken;
    }

    try {
        if (tokenRefreshPromise) {
            return await tokenRefreshPromise;
        }

        tokenRefreshPromise = (async () => {
            let attempt = 0;
            while (attempt < 3) {
                try {
                    const data = await refreshBillingAccessToken();
                    cachedAccessToken = data.access_token;
                    const expiresIn = data.expires_in || 3600;
                    tokenExpiration = Date.now() + (expiresIn - 60) * 1000; // Subtract 60s buffer
                    return cachedAccessToken;
                } catch (error) {
                    const errorData = error.response?.data;
                    const message = errorData?.error_description || error.message || '';
                    const isRateLimit = message.toLowerCase().includes('too many requests');
                    attempt += 1;
                    if (!isRateLimit || attempt >= 3) {
                        throw error;
                    }
                    await sleep(1000 * attempt);
                }
            }
            throw new Error('Failed to refresh Zoho Billing access token');
        })();

        return await tokenRefreshPromise;
    } catch (error) {
        console.error('Error obtaining Zoho Billing access token:', error.response?.data || error.message);
        throw new Error('Failed to get Zoho Billing access token');
    } finally {
        tokenRefreshPromise = null;
    }
}

// Get custom field value from invoice
function getCustomFieldValue(invoice, fieldLabel) {
    const field = invoice.custom_fields?.find(cf => cf.label === fieldLabel);
    return field?.value || '';
}

// Helper function to add delay (rate limiting)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch subscriptions in batches to avoid rate limiting
// Zoho API limit: 30 requests per minute threshold
// We use 3 per batch with 7 second delay = ~25 requests per minute (safe margin)
async function fetchSubscriptionDetailsInBatches(subscriptions, batchSize = 3, delayMs = 7000) {
    const results = [];

    console.log(`Fetching details for ${subscriptions.length} subscriptions in batches of ${batchSize}...`);

    for (let i = 0; i < subscriptions.length; i += batchSize) {
        const batch = subscriptions.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(subscriptions.length / batchSize)}...`);

        const batchPromises = batch.map(sub =>
            getOrderDetails(sub.subscription_id).catch(err => {
                console.error(`Failed to fetch details for ${sub.subscription_id}:`, err.message);
                return sub; // Return minimal data if fetch fails
            })
        );

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Add delay between batches to avoid rate limiting (30 req/min threshold)
        if (i + batchSize < subscriptions.length) {
            await delay(delayMs);
        }
    }

    console.log(`Completed fetching ${results.length} subscription details`);
    return results;
}

// Get pending orders (both invoices and subscriptions with cf_shipping_status=New Manual Order)
async function getPendingOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Fetch subscriptions (1 API call)
        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        // Filter subscriptions with status "New Manual Order"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            const status = (subscription.cf_shipping_status || '').trim().toLowerCase();
            return status === 'new manual order';
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "New Manual Order"`);

        // Return subscriptions with custom field addresses
        return filteredSubscriptions.map(sub => ({
            ...sub,
            _source: 'subscription'
        }));
    } catch (error) {
        console.error('Error fetching pending orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get shipped orders (subscriptions with customer addresses)
async function getShippedOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Fetch subscriptions (1 API call)
        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        // Filter subscriptions with status "Shipped"
        const filteredSubscriptions = subscriptions.filter(subscription => {
            return subscription.cf_shipping_status === 'Shipped';
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions with status "Shipped"`);

        // Return subscriptions with custom field addresses
        return filteredSubscriptions.map(sub => ({
            ...sub,
            _source: 'subscription'
        }));
    } catch (error) {
        console.error('Error fetching shipped orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get subscriptions pending T-Mobile activation
async function getPendingTmobileActivations() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const subscriptionsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: { per_page: 200 }
        });

        const subscriptions = subscriptionsResponse.data.subscriptions || [];

        const filteredSubscriptions = subscriptions.filter((subscription) => {
            const simCard = (subscription.cf_sim_card_number || '').trim();
            const activeOnTmobile = (subscription.cf_active_on_tmobile || '').trim().toLowerCase();
            const status = (subscription.status || subscription.subscription_status || '').trim().toLowerCase();

            return simCard !== '' && activeOnTmobile === 'no' && status === 'live';
        });

        console.log(`Found ${filteredSubscriptions.length} subscriptions pending T-Mobile activation`);

        // Fetch full details for each subscription to get all SIM card fields
        // Use Promise.all for parallel requests (faster than sequential)
        const detailedSubscriptions = await Promise.all(
            filteredSubscriptions.map(async (sub) => {
                try {
                    const detailResponse = await axios.get(
                        `https://www.zohoapis.com/billing/v1/subscriptions/${sub.subscription_id}`,
                        {
                            headers: {
                                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                                'X-com-zoho-subscriptions-organizationid': orgId
                            }
                        }
                    );
                    const fullSub = detailResponse.data.subscription;
                    // Extract custom field values from the custom_fields array
                    const customFieldValues = {};
                    if (fullSub.custom_fields) {
                        fullSub.custom_fields.forEach(field => {
                            if (field.api_name) {
                                customFieldValues[field.api_name] = field.value;
                            }
                        });
                    }
                    // Merge: keep original list data, add custom field values
                    return {
                        ...sub,
                        ...customFieldValues,
                        _source: 'subscription'
                    };
                } catch (err) {
                    console.error(`Failed to fetch details for subscription ${sub.subscription_id}:`, err.message);
                    return { ...sub, _source: 'subscription' };
                }
            })
        );

        return detailedSubscriptions;
    } catch (error) {
        console.error('Error fetching pending T-Mobile activations:', error.response?.data || error.message);
        throw error;
    }
}

// Get order details by invoice ID
async function getOrderDetails(invoiceId) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/invoices/${invoiceId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        return response.data.invoice;
    } catch (error) {
        console.error('Error fetching invoice details:', error.response?.data || error.message);
        throw error;
    }
}

// Update invoice custom fields
async function updateInvoiceFields(invoiceId, customFields) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        const response = await axios.put(
            `https://www.zohoapis.com/billing/v1/invoices/${invoiceId}`,
            { custom_fields: customFields },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.invoice;
    } catch (error) {
        console.error('Error updating invoice:', error.response?.data || error.message);
        throw error;
    }
}

// Keep old subscription functions for backwards compatibility if needed
async function updateSubscriptionFields(subscriptionId, customFields) {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        console.log('Updating subscription', subscriptionId, 'with', customFields.length, 'custom fields');

        const response = await axios.put(
            `https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`,
            { custom_fields: customFields },
            {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'X-com-zoho-subscriptions-organizationid': orgId,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.subscription;
    } catch (error) {
        console.error('Error updating subscription:', error.response?.data || error.message);
        console.error('Payload was:', JSON.stringify({ custom_fields: customFields }, null, 2));
        throw error;
    }
}

// Format order (subscription with custom field address) for queue display
function formatOrderForQueue(record) {
    const shippingStatus = record.cf_shipping_status || '';
    const simCardNumbers = [];

    if (record.cf_sim_card_number) {
        simCardNumbers.push(record.cf_sim_card_number);
    }
    if (record.cf_secondary_sim_card_number) {
        simCardNumbers.push(record.cf_secondary_sim_card_number);
    }
    for (let i = 3; i <= 30; i += 1) {
        const fieldName = `cf_sim_card_number_${i}`;
        if (record[fieldName]) {
            simCardNumbers.push(record[fieldName]);
        }
    }

    // Use subscription custom fields for address
    const shippingAddress = {
        address: record.cf_street || '',
        address2: record.cf_street_2 || '',
        city: record.cf_city || '',
        state: record.cf_state || '',
        zip: record.cf_zip_code || '',
        country: record.cf_country || 'USA'
    };

    // Device type: use cf_device_type if set and not "Blank", otherwise "Sim Card Only"
    let deviceType = 'Sim Card Only';
    if (record.cf_device_type && record.cf_device_type !== 'Blank' && record.cf_device_type !== '') {
        deviceType = record.cf_device_type;
    }

    return {
        // Frontend expects invoice_id - use customer_id for mark-shipped lookup
        invoice_id: record.customer_id,
        invoice_number: record.subscription_number || record.name || '',
        // Show actual subscription ID and number
        subscription_id: record.subscription_id,
        subscription_number: record.subscription_number || record.name || '',
        customer_name: record.customer_name || '',
        email: record.email || '',
        phone: record.phone || record.mobile_phone || '',
        shipping_address: shippingAddress,
        // Device type from addon
        device_type: deviceType,
        status: shippingStatus === 'Shipped' ? 'shipped' : (record.cf_sim_card_number ? 'ready_to_ship' : 'pending_sim'),
        assigned_sim: record.cf_sim_card_number || '',
        sim_card_numbers: simCardNumbers,
        tracking_number: record.cf_tracking_number || '',
        line_status: record.cf_line_status || '',
        device_status: record.cf_device_status || '',
        ordered_by: record.cf_ordered_by || '',
        subscription_status: record.status || record.subscription_status || '',
        active_on_tmobile: record.cf_active_on_tmobile || '',
        tmobile_line_number: record.cf_tmobile_line_number || '',
        device_sn: record.cf_device_sn || record.cf_device_s_n || '',
        sim_card_quantity: record.cf_sim_card_quantity || '',
        device_quantity: record.cf_device_quantity || '',
        created_date: record.created_time,
        updated_date: record.updated_time,
        shipped_date: record.cf_shipping_date || null
    };
}

module.exports = {
    getZohoBillingAccessToken,
    getPendingOrders,
    getShippedOrders,
    getPendingTmobileActivations,
    getOrderDetails,
    updateInvoiceFields,  // Backwards compatibility (points to updateSubscriptionFields)
    updateSubscriptionFields,
    formatOrderForQueue,
    getCustomFieldValue
};
