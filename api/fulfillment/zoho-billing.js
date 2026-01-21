const axios = require('axios');

let cachedAccessToken = null;
let tokenExpiration = null;

// Get Zoho Billing access token
async function getZohoBillingAccessToken() {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        return cachedAccessToken;
    }

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token',
            },
        });

        cachedAccessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000;
        return cachedAccessToken;
    } catch (error) {
        console.error('Error obtaining Zoho Billing access token:', error.response?.data || error.message);
        throw new Error('Failed to get Zoho access token');
    }
}

// Get custom field value from invoice
function getCustomFieldValue(invoice, fieldLabel) {
    const field = invoice.custom_fields?.find(cf => cf.label === fieldLabel);
    return field?.value || '';
}

// Get pending orders (invoices needing SIM assignment)
async function getPendingOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Get all invoices with status "sent" or "partially_paid"
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/invoices`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                status: 'sent,partially_paid',
                per_page: 200
            }
        });

        const invoices = response.data.invoices || [];

        // Filter for orders that need SIM cards
        return invoices.filter(invoice => {
            const shippingStatus = getCustomFieldValue(invoice, 'Shipping Status');
            const simCard = getCustomFieldValue(invoice, 'SIM Card Number');
            return shippingStatus !== 'Shipped' && !simCard;
        });
    } catch (error) {
        console.error('Error fetching pending orders:', error.response?.data || error.message);
        throw error;
    }
}

// Get shipped orders
async function getShippedOrders() {
    const accessToken = await getZohoBillingAccessToken();
    const orgId = process.env.ZOHO_ORG_ID;

    try {
        // Get all invoices with status "sent" or "partially_paid"
        const response = await axios.get(`https://www.zohoapis.com/billing/v1/invoices`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                status: 'sent,partially_paid',
                per_page: 200
            }
        });

        const invoices = response.data.invoices || [];

        // Filter for orders that have been shipped
        return invoices.filter(invoice => {
            const shippingStatus = getCustomFieldValue(invoice, 'Shipping Status');
            return shippingStatus === 'Shipped';
        });
    } catch (error) {
        console.error('Error fetching shipped orders:', error.response?.data || error.message);
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
        console.error('Error fetching order details:', error.response?.data || error.message);
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

// Format invoice for queue display
function formatOrderForQueue(invoice) {
    const shippingStatus = getCustomFieldValue(invoice, 'Shipping Status');

    return {
        invoice_id: invoice.invoice_id,
        invoice_number: invoice.invoice_number,
        customer_name: invoice.customer_name,
        email: invoice.email,
        phone: invoice.phone || '',
        shipping_address: {
            address: invoice.shipping_address?.street || '',
            address2: invoice.shipping_address?.street2 || '',
            city: invoice.shipping_address?.city || '',
            state: invoice.shipping_address?.state || '',
            zip: invoice.shipping_address?.zip || '',
            country: invoice.shipping_address?.country || 'USA'
        },
        device_type: getCustomFieldValue(invoice, 'Device Type'),
        status: shippingStatus === 'Shipped' ? 'shipped' : (getCustomFieldValue(invoice, 'SIM Card Number') ? 'ready_to_ship' : 'pending_sim'),
        assigned_sim: getCustomFieldValue(invoice, 'SIM Card Number'),
        tracking_number: getCustomFieldValue(invoice, 'Tracking Number'),
        line_status: getCustomFieldValue(invoice, 'Line Status'),
        device_status: getCustomFieldValue(invoice, 'Device Status'),
        ordered_by: getCustomFieldValue(invoice, 'Ordered By'),
        active_on_tmobile: getCustomFieldValue(invoice, 'Active on TMobile'),
        tmobile_line_number: getCustomFieldValue(invoice, 'TMobile Line Number'),
        device_sn: getCustomFieldValue(invoice, 'Device S/N'),
        created_date: invoice.created_time,
        updated_date: invoice.updated_time,
        shipped_date: shippingStatus === 'Shipped' ? invoice.updated_time : null
    };
}

module.exports = {
    getZohoBillingAccessToken,
    getPendingOrders,
    getShippedOrders,
    getOrderDetails,
    updateInvoiceFields,
    formatOrderForQueue,
    getCustomFieldValue
};
