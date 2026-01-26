const { getPendingOrders, getShippedOrders, getPendingTmobileActivations } = require('./zoho-billing');

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
        // Get all pending and shipped orders
        const [pendingOrders, shippedOrders, pendingTmobile] = await Promise.all([
            getPendingOrders(),
            getShippedOrders(),
            getPendingTmobileActivations()
        ]);

        // Count SIMs to ship (all pending orders need SIM cards)
        const simsToShip = pendingOrders.length;

        // Count Shield 5G to ship (pending orders with device type Shield 5G)
        const shield5GToShip = pendingOrders.filter(order =>
            order.cf_device_type?.toLowerCase() === 'shield 5g'
        ).length;

        // Count T10 to ship (pending orders with device type T10)
        const t10ToShip = pendingOrders.filter(order =>
            order.cf_device_type?.toLowerCase() === 't10'
        ).length;

        // Count shipped in last 2 days
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const shippedLast2Days = shippedOrders.filter(order => {
            if (!order.cf_shipping_date) return false;
            const shippedDate = new Date(order.cf_shipping_date);
            return shippedDate >= twoDaysAgo;
        }).length;

        return res.status(200).json({
            success: true,
            stats: {
                sims_to_ship: simsToShip,
                shield_5g_to_ship: shield5GToShip,
                t10_to_ship: t10ToShip,
                shipped_last_2_days: shippedLast2Days,
                pending_tmobile_activation: pendingTmobile.length
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
