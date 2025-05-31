const crypto = require('crypto');

// In validateAuthCode.js
export default function handler(req, res) {
    // ... existing headers ...

    const { authCode, timestamp, userId } = req.query;
    console.log('Received params:', { authCode, timestamp, userId });

    try {
        const ip = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress;
        
        const currentTime = Date.now();
        console.log('Current time:', currentTime);
        console.log('Timestamp:', timestamp);
        console.log('Time difference:', currentTime - timestamp);
        
        // Check if code is expired (1 minute)
        if (currentTime - timestamp > 60000) {
            console.log('Code expired');
            return res.status(401).json({ valid: false, error: 'Code expired' });
        }

        const dataToHash = `${ip}-${userId}-${timestamp}-${process.env.AUTH_SECRET || 'default-secret'}`;
        console.log('Data to hash:', dataToHash);
        
        const expectedCode = crypto
            .createHash('sha256')
            .update(dataToHash)
            .digest('hex')
            .substring(0, 32);
        
        console.log('Expected code:', expectedCode);
        console.log('Provided code:', authCode);
        
        const isValid = authCode === expectedCode;
        console.log('Is valid:', isValid);
        
        return res.status(200).json({valid: isValid});
    } catch (error) {
        console.error('Error validating auth code:', error);
        return res.status(500).json({ valid: false, error: 'Internal server error' });
    }
}