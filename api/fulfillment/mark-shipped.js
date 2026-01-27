const { updateInvoiceFields, updateSubscriptionFields } = require('./zoho-billing');
const axios = require('axios');
const { getZohoBillingAccessToken } = require('./zoho-billing');
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
        const orgId = process.env.ZOHO_ORG_ID;

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

        const cleanedSimCards = Array.isArray(sim_cards)
            ? sim_cards.map((value) => String(value || '').trim()).filter(Boolean)
            : (sim_card ? [String(sim_card).trim()] : []);

        const fields = fullSubscription.custom_fields || [];
        const byApi = new Map();
        const byLabel = new Map();

        fields.forEach((field) => {
            if (field.api_name) {
                byApi.set(field.api_name, field);
            }
            if (field.label) {
                byLabel.set(field.label, field);
            }
        });

        const payload = [];
        const addFieldValue = (field, value) => {
            if (!field || value === undefined) return;
            const entry = { value };
            if (field.api_name) entry.api_name = field.api_name;
            if (field.label) entry.label = field.label;
            payload.push(entry);
        };

        addFieldValue(byApi.get('cf_shipping_status') || byLabel.get('Shipping Status'), 'Shipped');
        addFieldValue(byApi.get('cf_shipping_date') || byLabel.get('Shipping Date'), currentDate);
        if (tracking_number) {
            addFieldValue(byApi.get('cf_tracking_number') || byLabel.get('Tracking Number'), tracking_number);
        }

        if (cleanedSimCards[0]) {
            addFieldValue(byApi.get('cf_sim_card_number') || byLabel.get('SIM Card Number'), cleanedSimCards[0]);
        }
        if (cleanedSimCards[1]) {
            addFieldValue(
                byApi.get('cf_secondary_sim_card_number') || byLabel.get('Secondary SIM Card Number'),
                cleanedSimCards[1]
            );
        }

        for (let i = 3; i <= 30; i += 1) {
            const index = i - 1;
            const value = cleanedSimCards[index];
            if (!value) continue;
            const apiName = `cf_sim_card_number_${i}`;
            const label = `SIM Card Number ${i}`;
            addFieldValue(byApi.get(apiName) || byLabel.get(label), value);
        }

        if (device_sn) {
            addFieldValue(byApi.get('cf_device_sn') || byApi.get('cf_device_s_n') || byLabel.get('Device SN'), device_sn);
        }

        if (payload.length === 0) {
            throw new Error('No matching custom fields found to update.');
        }

        await updateSubscriptionFields(subscriptionId, payload);

        return res.status(200).json({
            success: true,
            message: 'Order marked as shipped'
        });
    } catch (error) {
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
};
