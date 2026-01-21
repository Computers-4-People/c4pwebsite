const { updateInvoiceFields, getCustomFieldValue, getOrderDetails } = require('./zoho-billing');
const { assignSim } = require('./sim-inventory');

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
        const { invoice_id, iccid } = req.body;

        if (!invoice_id || !iccid) {
            return res.status(400).json({
                success: false,
                error: 'Missing invoice_id or iccid'
            });
        }

        // Assign SIM in inventory
        await assignSim(iccid, invoice_id);

        // Get current invoice to preserve other custom fields
        const invoice = await getOrderDetails(invoice_id);

        // Update invoice with SIM card number
        const customFields = invoice.custom_fields.map(field => {
            if (field.label === 'SIM Card Number') {
                return { ...field, value: iccid };
            }
            return field;
        });

        await updateInvoiceFields(invoice_id, customFields);

        return res.status(200).json({
            success: true,
            message: 'SIM card assigned successfully'
        });
    } catch (error) {
        console.error('Error assigning SIM:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to assign SIM'
        });
    }
};
