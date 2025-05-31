const crypto = require('crypto');

/**
 * Generates an auth code for a user ID
 */
export function generateAuthCode(userId, req) {
  
  const ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress;

  // Get current timestamp
  const timestamp = Date.now();
  
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
  
  return { authCode, active: true };
}
