const jwt = require('jsonwebtoken');
const { parse } = require('cookie');


// add jwt to pakckage.json

/**
 * verifies a jwt token to make sure it is valid
 * @param {*} req N/A
 * @param {*} res a response object with a boolean detailing whether the token is valid or not
 */
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

    const { urlJwt, recordId } = req.query; 
    console.log('Received params:', { urlJwt, recordId });

    if (!urlJwt || !recordId) {
        return res.status(401).json({ valid: false, error: 'Missing token or recordId' });
    }

    try {
        const decoded = jwt.verify(urlJwt, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        
        
        if (decoded.recordID !== recordId) {
            return res.status(401).json({ valid: false, error: 'Token recordId mismatch' });
        }

        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
}