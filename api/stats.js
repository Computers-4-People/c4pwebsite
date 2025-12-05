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
    // Return cached stats if still valid
    const currentTime = Date.now();
    if (cachedStats && cacheExpiration && currentTime < cacheExpiration) {
        console.log("Returning cached stats");
        return res.json(cachedStats);
    }
    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }

        console.log("Fetching stats with optimized batching...");

        const donatedCriteria = encodeURIComponent(
            '(Status == "Donated") && (Computer_Type != "Monitor") && (Computer_Type != "Phone") && (Computer_Type != "Misc")'
        );
        const weightCriteria = encodeURIComponent('(Status == "Donated") || (Status == "Recycled")');

        let computersDonated = 0;
        let totalWeight = 0;

        try {
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const headers = { Authorization: `Zoho-oauthtoken ${accessToken}` };

            console.log("Fetching stats with parallel requests...");

            // Fetch multiple pages in parallel for speed
            const countPages = 70; // Fetch 70 pages = 14,000 records max
            const weightPages = 70; // Fetch 70 pages = 14,000 records max

            // COUNT: Parallel fetch
            const countPromises = [];
            for (let page = 0; page < countPages; page++) {
                const from = (page * 200) + 1;
                countPromises.push(
                    axios.get(
                        `${baseUrl}?criteria=${donatedCriteria}&from=${from}&limit=200`,
                        { headers, timeout: 8000 }
                    ).catch(err => {
                        console.error(`Count page ${page} error:`, err.message);
                        return null;
                    })
                );
            }

            // WEIGHT: Parallel fetch
            const weightPromises = [];
            for (let page = 0; page < weightPages; page++) {
                const from = (page * 200) + 1;
                weightPromises.push(
                    axios.get(
                        `${baseUrl}?criteria=${weightCriteria}&from=${from}&limit=200`,
                        { headers, timeout: 8000 }
                    ).catch(err => {
                        console.error(`Weight page ${page} error:`, err.message);
                        return null;
                    })
                );
            }

            // Wait for all requests to complete
            console.log("Waiting for parallel requests...");
            const [countResults, weightResults] = await Promise.all([
                Promise.all(countPromises),
                Promise.all(weightPromises)
            ]);

            // Process count results
            countResults.forEach((resp, index) => {
                if (resp && resp.data && resp.data.data) {
                    computersDonated += resp.data.data.length;
                }
            });

            // Process weight results
            weightResults.forEach((resp, index) => {
                if (resp && resp.data && resp.data.data) {
                    const records = resp.data.data;
                    const batchWeight = records.reduce((sum, r) => sum + (parseFloat(r.Weight) || 0), 0);
                    totalWeight += batchWeight;
                }
            });

            console.log(`Stats: ${computersDonated} computers, ${Math.round(totalWeight)} lbs`);

        } catch (error) {
            console.error("Error fetching stats:", error.message);
            // Use fallback values
            computersDonated = 5542;
            totalWeight = 69748;
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
