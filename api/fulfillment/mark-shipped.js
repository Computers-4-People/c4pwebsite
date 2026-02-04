const { updateInvoiceFields, updateSubscriptionFields, getZohoBillingAccessToken, clearBillingTokenCache } = require('./zoho-billing');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Send error notification email
async function sendErrorEmail(errorDetails) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ZOHO_MAIL_USER || 'info@computers4people.org',
                pass: process.env.ZOHO_MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: '"Fulfillment System" <info@computers4people.org>',
            to: 'dylanzajac@computers4people.org, barbara@computers4people.org',
            subject: '🚨 Fulfillment System Error - Mark Shipped Failed',
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2 style="color: #dc2626;">⚠️ Fulfillment System Error</h2>
                        <p>An error occurred while marking an order as shipped.</p>

                        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Error Details:</h3>
                            <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
                            <p><strong>Invoice/Customer ID:</strong> ${errorDetails.invoice_id || 'Unknown'}</p>
                            <p><strong>SIM Card:</strong> ${errorDetails.sim_card || (errorDetails.sim_cards ? errorDetails.sim_cards.join(', ') : 'Not provided')}</p>
                            <p><strong>Tracking Number:</strong> ${errorDetails.tracking_number || 'Not provided'}</p>
                            <p><strong>Error Message:</strong></p>
                            <pre style="background-color: #ffffff; padding: 10px; border-radius: 4px; overflow-x: auto;">${errorDetails.error}</pre>
                        </div>

                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            This is an automated notification from the Fulfillment Portal.
                        </p>
                    </body>
                </html>
            `,
            text: `Fulfillment System Error\n\nTime: ${new Date().toLocaleString()}\nInvoice ID: ${errorDetails.invoice_id}\nSIM Card: ${errorDetails.sim_card || (errorDetails.sim_cards ? errorDetails.sim_cards.join(', ') : 'Not provided')}\nTracking: ${errorDetails.tracking_number}\n\nError: ${errorDetails.error}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Error notification email sent to Dylan and Barbara');
    } catch (emailError) {
        console.error('Failed to send error notification email:', emailError.message);
    }
}

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const body = req.body || {};
    const orgId = process.env.ZOHO_ORG_ID;

    // Retry up to 2 times on auth errors
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            const { invoice_id, tracking_number, sim_card, sim_cards, device_sn } = body;

            if (!invoice_id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing invoice_id (subscription_id)'
                });
            }

            // invoice_id is actually customer_id now (since invoices don't have subscription_id)
            // We need to find the subscription for this customer
            const customerId = invoice_id;
            const accessToken = await getZohoBillingAccessToken();

        // Get all subscriptions for this customer
        const subsResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            },
            params: {
                per_page: 200
            }
        });

        const subscriptions = subsResponse.data.subscriptions || [];
        const subscription = subscriptions.find(sub => sub.customer_id === customerId);

        if (!subscription) {
            throw new Error(`No subscription found for customer_id ${customerId}`);
        }

        const subscriptionId = subscription.subscription_id;

        // Fetch full subscription details to get custom_fields array
        const subDetailResponse = await axios.get(`https://www.zohoapis.com/billing/v1/subscriptions/${subscriptionId}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'X-com-zoho-subscriptions-organizationid': orgId
            }
        });

        const fullSubscription = subDetailResponse.data.subscription;

        // Update subscription with shipping info
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        // Support both single sim_card and sim_cards array
        const simCardValues = Array.isArray(sim_cards)
            ? sim_cards.map(v => String(v || '').trim()).filter(Boolean)
            : (sim_card ? [String(sim_card).trim()] : []);

        // Build the custom fields payload
        // We need to include ALL existing fields plus any new ones we want to set
        const existingFields = fullSubscription.custom_fields || [];
        const existingApiNames = new Set(existingFields.map(f => f.api_name).filter(Boolean));

        // Start with existing fields, updating values where needed
        const customFields = existingFields.map(field => {
            if (field.api_name === 'cf_shipping_status') {
                return { ...field, value: 'Shipped' };
            }
            if (field.api_name === 'cf_shipping_date') {
                return { ...field, value: currentDate };
            }
            if (field.api_name === 'cf_tracking_number' && tracking_number) {
                return { ...field, value: tracking_number };
            }
            if (field.api_name === 'cf_sim_card_number' && simCardValues[0]) {
                return { ...field, value: simCardValues[0] };
            }
            if (field.api_name === 'cf_secondary_sim_card_number' && simCardValues[1]) {
                return { ...field, value: simCardValues[1] };
            }
            for (let i = 3; i <= 30; i++) {
                if (field.api_name === `cf_sim_card_number_${i}` && simCardValues[i - 1]) {
                    return { ...field, value: simCardValues[i - 1] };
                }
            }
            if ((field.api_name === 'cf_device_sn' || field.api_name === 'cf_device_s_n') && device_sn) {
                return { ...field, value: device_sn };
            }
            return field;
        });

        // Add fields that weren't in the subscription but exist in Zoho schema
        // These will be set for the first time on this subscription
        if (!existingApiNames.has('cf_shipping_date')) {
            customFields.push({ api_name: 'cf_shipping_date', value: currentDate });
        }
        if (tracking_number && !existingApiNames.has('cf_tracking_number')) {
            customFields.push({ api_name: 'cf_tracking_number', value: tracking_number });
        }
        if (simCardValues[0] && !existingApiNames.has('cf_sim_card_number')) {
            customFields.push({ api_name: 'cf_sim_card_number', value: simCardValues[0] });
        }
        if (simCardValues[1] && !existingApiNames.has('cf_secondary_sim_card_number')) {
            customFields.push({ api_name: 'cf_secondary_sim_card_number', value: simCardValues[1] });
        }
        for (let i = 3; i <= 30; i++) {
            if (simCardValues[i - 1] && !existingApiNames.has(`cf_sim_card_number_${i}`)) {
                customFields.push({ api_name: `cf_sim_card_number_${i}`, value: simCardValues[i - 1] });
            }
        }
        if (device_sn && !existingApiNames.has('cf_device_s_n') && !existingApiNames.has('cf_device_sn')) {
            customFields.push({ api_name: 'cf_device_s_n', value: device_sn });
        }

        await updateSubscriptionFields(subscriptionId, customFields);

            return res.status(200).json({
                success: true,
                message: 'Order marked as shipped'
            });
        } catch (error) {
            const status = error.response?.status;
            const code = error.response?.data?.code;

            // On 401 or code 57 (unauthorized), clear cache and retry once
            if ((status === 401 || code === 57) && attempt === 0) {
                console.warn('Got 401/unauthorized in mark-shipped, clearing cache and retrying...');
                clearBillingTokenCache();
                continue;
            }

            console.error('Error marking order as shipped:', error);

            // Send error notification email
            await sendErrorEmail({
                invoice_id: body.invoice_id,
                sim_card: body.sim_card,
                sim_cards: Array.isArray(body.sim_cards) ? body.sim_cards : undefined,
                tracking_number: body.tracking_number,
                error: error.message || 'Failed to mark order as shipped',
                stack: error.stack
            });

            return res.status(500).json({
                success: false,
                error: error.message || 'Failed to mark order as shipped'
            });
        }
    }
};
