const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');

// Cache stats for 1 hour to avoid timeout
let cachedStats = null;
let cacheExpiration = null;

export default async function handler(req, res) {
    const skipCache = req.query.refresh === 'true';

    if (skipCache) {
        console.log("Cache bypass requested");
    }

    // Return cached stats if still valid
    const currentTime = Date.now();
    if (!skipCache && cachedStats && cacheExpiration && currentTime < cacheExpiration) {
        console.log("Returning cached stats");
        return res.json(cachedStats);
    }
    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }

        console.log("Fetching stats from Zoho Analytics...");

        let computersDonated = 0;
        let totalWeight = 0;

        try {
            // Use Zoho Analytics API for instant aggregated query
            const analyticsUrl = 'https://analyticsapi.zoho.com/restapi/v2/bulk/workspaces/2989565000000006002/views/2989565000000032139/data';

            const response = await axios.get(analyticsUrl, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });

            // Parse Analytics response - it should have the aggregated stats
            if (response.data && response.data.data) {
                const data = response.data.data;

                // The HQ view should have Total Computers Donated and Total Pounds Saved
                // Find these values in the response
                if (data.rows && data.rows.length > 0) {
                    const row = data.rows[0];
                    computersDonated = parseInt(row[0]) || 5777; // First column
                    totalWeight = parseInt(row[1]) || 64549; // Second column
                }
            }

            console.log(`Analytics Stats: ${computersDonated} computers, ${totalWeight} lbs`);

        } catch (error) {
            console.error("Error fetching stats:", error.message);
            if (error.response) {
                console.error("Analytics API error details:", error.response.status, error.response.data);
            }
            // Use fallback values if fetch fails
            computersDonated = 5777;
            totalWeight = 64549;
        }

        const stats = {
            computersDonated: computersDonated,
            poundsRecycled: Math.round(totalWeight)
        };

        console.log('Stats calculated:', stats);

        // Cache the results for 1 hour
        cachedStats = stats;
        cacheExpiration = Date.now() + (60 * 60 * 1000); // 1 hour
        console.log('Stats cached until:', new Date(cacheExpiration));

        res.json(stats);

    } catch (error) {
        console.error("Error fetching stats:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
}
