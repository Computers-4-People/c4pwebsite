const crypto = require('crypto');


/**
 * Generates an auth code for a user ID
 */
export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  
  try {
    const ip = req.headers['x-forwarded-for'] || 
              req.connection.remoteAddress || 
              req.socket.remoteAddress;

    
    const { userId } = req.query;

    // Create a unique string combining IP, timestamp, and user ID
    const dataToHash = `${ip}-${userId}-${process.env.AUTH_SECRET}`;
    
    // Generate hash
    const authCode = crypto
        .createHash('sha256')
        .update(dataToHash)
        .digest('hex')
        .substring(0, 32); 

    // Set expiration to 1 minute
    //const expiresAt = new Date(timestamp + 60000);
    
    return res.status(200).json({ authCode, active: true });


  } catch (error) {
    console.error('Error generating auth code:', error);
    return res.status(500).json({ error: 'Failed to generate auth code' });
  }
};
