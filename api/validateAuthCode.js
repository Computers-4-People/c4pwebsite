const crypto = require('crypto');

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { authCode, timestamp, userId } = req.query;

    if (!authCode || !timestamp || !userId) {
        return res.status(400).json({ valid: false, error: 'Missing required parameters' });
    }

    try {
        const ip = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress;
        
        const currentTime = Date.now();
        
        // Check if code is expired (1 minute)
        if (currentTime - timestamp > 60000) {
            return res.status(401).json({ valid: false, error: 'Code expired' });
        }

        
        const dataToHash = `${ip}-${userId}-${timestamp}-${process.env.AUTH_SECRET || 'default-secret'}`;
        const expectedCode = crypto
            .createHash('sha256')
            .update(dataToHash)
            .digest('hex')
            .substring(0, 32);

        // Compare the provided code with the expected code
        const isValid = authCode === expectedCode;
        return res.status(200).json({valid: isValid});
    } catch (error) {
        console.error('Error validating auth code:', error);
        return res.status(500).json({ valid: false, error: 'Internal server error' });
    }
}