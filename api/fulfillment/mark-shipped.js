const { updateInvoiceFields, getOrderDetails } = require('./zoho-billing');

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

    try {
        const { invoice_id, tracking_number, sim_card } = req.body;

        if (!invoice_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing invoice_id'
            });
        }

        // Get current invoice to preserve other custom fields
        const invoice = await getOrderDetails(invoice_id);

        // Update invoice with shipping info
        const customFields = invoice.custom_fields.map(field => {
            if (field.label === 'Shipping Status') {
                return { ...field, value: 'Shipped' };
            }
            if (field.label === 'Tracking Number' && tracking_number) {
                return { ...field, value: tracking_number };
            }
            if (field.label === 'SIM Card Number' && sim_card) {
                return { ...field, value: sim_card };
            }
            return field;
        });

        await updateInvoiceFields(invoice_id, customFields);

        return res.status(200).json({
            success: true,
            message: 'Order marked as shipped'
        });
    } catch (error) {
        console.error('Error marking order as shipped:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to mark order as shipped'
        });
    }
};
