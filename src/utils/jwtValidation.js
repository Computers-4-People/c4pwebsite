/**
 * Decodes a JWT token and returns its payload
 * @param {string} token - The JWT token to decode
 * @returns {Object|null} The decoded payload or null if invalid
 */
export const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

/**
 * Validates a JWT token's payload
 * @param {string} token - The JWT token to validate
 * @param {string} recordId - The recordId to check against
 * @returns {Object} Validation result with status and message
 */
export const validateJWT = (token, recordId) => {
    const decoded = decodeJWT(token);
    
    if (!decoded) {
        return {
            isValid: false,
            message: 'Invalid token format'
        };
    }

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
        return {
            isValid: false,
            message: 'Token expired'
        };
    }

    // Check if the recordId matches
    if (decoded.recordID !== recordId) {
        return {
            isValid: false,
            message: 'RecordId mismatch'
        };
    }

    return {
        isValid: true,
        message: 'Token is valid',
        payload: decoded
    };
};