const axios = require('axios/dist/node/axios.cjs');
const { getZohoAccessToken } = require('./_utils');

// Fallback values if API fails
const FALLBACK_STATS = {
    computersDonated: 6478,
    poundsRecycled: 83780
};

// Cache stats for 1 hour
let cachedStats = null;
let cacheExpiration = null;

export default async function handler(req, res) {
    const skipCache = req.query.refresh === 'true';

    // Return cached stats if valid
    if (!skipCache && cachedStats && cacheExpiration && Date.now() < cacheExpiration) {
        console.log('Returning cached stats');
        return res.json(cachedStats);
    }

    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            console.error('Failed to get access token');
            return res.json(FALLBACK_STATS);
        }

        // Call the getStats function in Zoho Creator
        const functionUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/function/getStats`;

        const response = await axios.post(functionUrl, {}, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });

        console.log('Zoho function response:', response.data);

        // Parse response - the function returns {computersDonated, poundsRecycled}
        const stats = response.data.result || response.data;

        if (stats.computersDonated && stats.poundsRecycled) {
            cachedStats = stats;
            cacheExpiration = Date.now() + (60 * 60 * 1000); // 1 hour
            console.log('Stats from Zoho:', stats);
            return res.json(stats);
        }

        console.log('Invalid response, using fallback');
        return res.json(FALLBACK_STATS);

    } catch (error) {
        console.error('Error calling Zoho function:', error.response?.data || error.message);
        return res.json(FALLBACK_STATS);
    }
}
