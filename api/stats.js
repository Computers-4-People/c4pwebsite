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

        console.log("Fetching ALL stats from Zoho Creator (no filters)...");

        let computersDonated = 0;
        let totalWeight = 0;

        try {
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const headers = { Authorization: `Zoho-oauthtoken ${accessToken}` };

            console.log("Fetching stats with batched parallel requests...");

            const batchSize = 10; // Fetch 10 pages at a time to avoid overwhelming API
            const maxPages = 100; // Max pages to attempt

            // Helper function to fetch pages in batches
            async function fetchInBatches(maxPagesToFetch) {
                const allResults = [];
                let page = 0;
                let hasMore = true;

                while (hasMore && page < maxPagesToFetch) {
                    // Create batch of promises
                    const batchPromises = [];
                    for (let i = 0; i < batchSize && page < maxPagesToFetch; i++, page++) {
                        const from = (page * 200) + 1;
                        batchPromises.push(
                            axios.get(
                                `${baseUrl}?from=${from}&limit=200`,
                                { headers, timeout: 8000 }
                            ).catch(err => {
                                // Don't log 404s (expected when we reach end)
                                if (err.response?.status !== 404) {
                                    console.error(`Page ${page} error:`, err.message);
                                }
                                return null;
                            })
                        );
                    }

                    // Wait for this batch to complete
                    const batchResults = await Promise.all(batchPromises);

                    // Check if we got any valid results in this batch
                    const validResults = batchResults.filter(r => r && r.data && r.data.data);
                    if (validResults.length === 0) {
                        hasMore = false; // No valid results, stop fetching
                    } else {
                        allResults.push(...batchResults);
                        // If any result has < 200 records, we've reached the end
                        const hasPartialPage = validResults.some(r => r.data.data.length < 200);
                        if (hasPartialPage) {
                            hasMore = false;
                        }
                    }
                }

                return allResults;
            }

            // Fetch all data (no filtering)
            const allResults = await fetchInBatches(maxPages);

            // Process all results - count computers and sum weight
            let pagesSuccessful = 0;
            let totalRecords = 0;

            allResults.forEach((resp, index) => {
                if (resp && resp.data && resp.data.data) {
                    pagesSuccessful++;
                    const records = resp.data.data;
                    totalRecords += records.length;

                    // Count all records as computers
                    computersDonated += records.length;

                    // Sum all weights
                    const batchWeight = records.reduce((sum, r) => sum + (parseFloat(r.Weight) || 0), 0);
                    totalWeight += batchWeight;
                }
            });

            console.log(`Fetched: ${pagesSuccessful} pages successful, ${totalRecords} total records`);

            console.log(`Stats: ${computersDonated} computers, ${Math.round(totalWeight)} lbs`);

        } catch (error) {
            console.error("Error fetching stats:", error.message);
            // Use fallback values if fetch fails
            computersDonated = 5775;
            totalWeight = 64519;
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
