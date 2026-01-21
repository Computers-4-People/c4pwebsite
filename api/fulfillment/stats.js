const { getPendingOrders, getCustomFieldValue } = require('./zoho-billing');
const { getInventoryStats } = require('./sim-inventory');

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
        // Get all pending orders
        const invoices = await getPendingOrders();

        // Count orders needing SIM
        const pendingSimCount = invoices.filter(invoice => {
            const simCard = getCustomFieldValue(invoice, 'SIM Card Number');
            return !simCard;
        }).length;

        // Get SIM inventory stats
        const inventoryStats = await getInventoryStats();

        // TODO: Get shipped today count from Zoho
        // For now, return 0
        const shippedTodayCount = 0;

        return res.status(200).json({
            success: true,
            stats: {
                pending_sim_count: pendingSimCount,
                unassigned_sims_count: inventoryStats.unassigned_sims,
                shipped_today_count: shippedTodayCount
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch stats'
        });
    }
};
