const { getPendingOrders, getShippedOrders, formatOrderForQueue } = require('./zoho-billing');

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

    try {
        const { status } = req.query;

        let invoices;
        if (status === 'shipped') {
            invoices = await getShippedOrders();
        } else {
            // Default to pending orders
            invoices = await getPendingOrders();
        }

        const orders = invoices.map(invoice => formatOrderForQueue(invoice));

        return res.status(200).json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.error('Error in queue endpoint:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch orders'
        });
    }
};
