const { getAllSims } = require('./sim-inventory');

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
        const sims = await getAllSims();

        return res.status(200).json({
            success: true,
            sims: sims
        });
    } catch (error) {
        console.error('Error fetching SIMs:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch SIMs'
        });
    }
};
