const axios = require('axios');

let cachedAccessToken = null;
let tokenExpiration = null;

// Function to obtain Zoho access token using the refresh token
export async function getZohoAccessToken() {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        console.log("Using cached access token");
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
        console.log("New Access Token obtained.");
        return cachedAccessToken;
    } catch (error) {
        console.error("Error obtaining access token:", error.response ? error.response.data : error.message);
        // Return null or throw an error
        return null;
    }
}
