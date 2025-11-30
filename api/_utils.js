const axios = require('axios/dist/node/axios.cjs');

let cachedAccessToken = null;
let tokenExpiration = null;

let cachedCRMAccessToken = null;
let crmTokenExpiration = null;

// Function to obtain Zoho Creator access token using the refresh token
export async function getZohoAccessToken() {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        console.log("Using cached Creator access token");
        return cachedAccessToken;
    }

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token',
            },
        });

        cachedAccessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000;
        console.log("New Creator Access Token obtained.");
        return cachedAccessToken;
    } catch (error) {
        console.error("Error obtaining Creator access token:", error.response ? error.response.data : error.message);
        // Return null or throw an error
        return null;
    }
}

// Function to obtain Zoho CRM access token using the refresh token
// Falls back to regular Zoho credentials if CRM-specific ones aren't set
export async function getZohoCRMAccessToken() {
    const currentTime = Date.now();

    if (cachedCRMAccessToken && crmTokenExpiration && currentTime < crmTokenExpiration) {
        console.log("Using cached CRM access token");
        return cachedCRMAccessToken;
    }

    try {
        // Use CRM-specific credentials if available, otherwise fall back to regular credentials
        const refreshToken = process.env.ZOHO_CRM_REFRESH_TOKEN || process.env.ZOHO_REFRESH_TOKEN;
        const clientId = process.env.ZOHO_CRM_CLIENT_ID || process.env.ZOHO_CLIENT_ID;
        const clientSecret = process.env.ZOHO_CRM_CLIENT_SECRET || process.env.ZOHO_CLIENT_SECRET;

        console.log("Using " + (process.env.ZOHO_CRM_REFRESH_TOKEN ? "CRM-specific" : "shared") + " credentials for CRM access");

        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
            },
        });

        cachedCRMAccessToken = response.data.access_token;
        crmTokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000;
        console.log("New CRM Access Token obtained.");
        return cachedCRMAccessToken;
    } catch (error) {
        console.error("Error obtaining CRM access token:", error.response ? error.response.data : error.message);
        // Return null or throw an error
        return null;
    }
}
