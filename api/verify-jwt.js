const jwt = require('jsonwebtoken');
const { parse } = require('cookie');


// add jwt to pakckage.json

/**
 * verifies a jwt token to make sure it is valid
 * @param {*} req N/A
 * @param {*} res a response object with a boolean detailing whether the token is valid or not
 */
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return res.status(401).json({ valid: false, error: 'No token provided' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        console.error(error);
        console.log(token);
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
} 