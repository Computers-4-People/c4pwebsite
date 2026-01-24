const crypto = require('crypto');

// In validateAuthCode.js
export default function handler(req, res) {
    // ... existing headers ...

    const { authCode, timestamp, userId } = req.query;
    const currentTime = Date.now();
    console.log('Received params:', { authCode, timestamp, userId });

    try {
        console.log('Timestamp:', timestamp);
        console.log('Time difference:', currentTime - timestamp);

        // Check if code is expired (1 minute)
        if (currentTime - timestamp > 60000) {
            console.log('Code expired');
            return res.status(401).json({ valid: false, error: 'Code expired' });
        }

        // Removed IP from hash to prevent validation failures due to IP changes
        const dataToHash = `${userId}-${timestamp}-${process.env.AUTH_SECRET}`;
        console.log('Data to hash:', dataToHash);

        const expectedCode = crypto
            .createHash('sha256')
            .update(dataToHash)
            .digest('hex')
            .substring(0, 32);



        const isValid = authCode === expectedCode;
        console.log('Is valid:', isValid);

        console.log('validateAuthCode - userId:', userId);
        console.log('validateAuthCode - timestamp:', timestamp);
        console.log('validateAuthCode - secret:', process.env.AUTH_SECRET);
        console.log('validateAuthCode - dataToHash:', dataToHash);
        console.log('validateAuthCode - expected code:', expectedCode);



        
        return res.status(200).json({valid: isValid});
    } catch (error) {
        console.error('Error validating auth code:', error);
        return res.status(500).json({ valid: false, error: 'Internal server error' });
    }
}