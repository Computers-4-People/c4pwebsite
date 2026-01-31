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

        console.log("Fetching stats from Zoho Creator...");

        let computersDonated = 0;
        let totalWeight = 0;

        try {
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const headers = { Authorization: `Zoho-oauthtoken ${accessToken}` };

            // Criteria for counting donated computers (excluding monitors, phones, misc)
            const donatedCriteria = encodeURIComponent(
                '(Status == "Donated") && (Computer_Type != "Monitor") && (Computer_Type != "Phone") && (Computer_Type != "Misc")'
            );
            // Criteria for weight (donated + recycled)
            const weightCriteria = encodeURIComponent('(Status == "Donated") || (Status == "Recycled")');

            // Fetch pages in parallel batches for efficiency
            const fetchAllPages = async (criteria, maxPages = 50) => {
                const allRecords = [];
                const batchSize = 10;
                let page = 0;
                let hasMore = true;

                while (hasMore && page < maxPages) {
                    const batchPromises = [];
                    for (let i = 0; i < batchSize && page < maxPages; i++, page++) {
                        const from = (page * 200) + 1;
                        batchPromises.push(
                            axios.get(
                                `${baseUrl}?criteria=${criteria}&from=${from}&limit=200`,
                                { headers, timeout: 8000 }
                            ).catch(err => {
                                if (err.response?.status !== 404) {
                                    console.error(`Page ${page} error:`, err.message);
                                }
                                return null;
                            })
                        );
                    }

                    const batchResults = await Promise.all(batchPromises);
                    const validResults = batchResults.filter(r => r && r.data && r.data.data);

                    if (validResults.length === 0) {
                        hasMore = false;
                    } else {
                        validResults.forEach(r => allRecords.push(...r.data.data));
                        const hasPartialPage = validResults.some(r => r.data.data.length < 200);
                        if (hasPartialPage) {
                            hasMore = false;
                        }
                    }
                }

                return allRecords;
            };

            // Fetch both counts in parallel
            const [donatedRecords, weightRecords] = await Promise.all([
                fetchAllPages(donatedCriteria),
                fetchAllPages(weightCriteria)
            ]);

            computersDonated = donatedRecords.length;
            totalWeight = weightRecords.reduce((sum, r) => sum + (parseFloat(r.Weight) || 0), 0);

            console.log(`Creator Stats: ${computersDonated} computers, ${Math.round(totalWeight)} lbs`);

        } catch (error) {
            console.error("Error fetching stats:", error.message);
            if (error.response) {
                console.error("Creator API error details:", error.response.status, error.response.data);
            }
            // Use fallback values if fetch fails
            computersDonated = 6478;
            totalWeight = 83780;
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
