const crypto = require('crypto');

export function validateAuthCode(code, userId, req) {
    try {
      const ip = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress;
      
      // Get current timestamp
      const currentTime = Date.now();
      
      // Check if code is expired (1 minute)
      if (currentTime - timestamp > 60000) {
        return false;
      }
  
      // Recreate the hash with the same parameters
      const dataToHash = `${ip}-${userId}-${timestamp}-${process.env.AUTH_SECRET || 'default-secret'}`;
      const expectedCode = crypto
          .createHash('sha256')
          .update(dataToHash)
          .digest('hex')
          .substring(0, 32);
  
      // Compare the provided code with the expected code
      return code === expectedCode;
    } catch (error) {
      console.error('Error validating auth code:', error);
      return false;
    }
  }