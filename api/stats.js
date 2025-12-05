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
            // Fetch count and weight in parallel batches
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const headers = { Authorization: `Zoho-oauthtoken ${accessToken}` };

            // COUNT: Fetch all computers in batches of 200
            console.log("Counting donated computers...");
            let countFrom = 1;
            let countHasMore = true;

            while (countHasMore) {
                try {
                    const resp = await axios.get(
                        `${baseUrl}?criteria=${donatedCriteria}&from=${countFrom}&limit=200`,
                        { headers, timeout: 5000 }
                    );
                    const batchCount = resp.data.data?.length || 0;
                    computersDonated += batchCount;

                    if (batchCount < 200) {
                        countHasMore = false;
                    } else {
                        countFrom += 200;
                    }
                } catch (err) {
                    console.error(`Count batch error at ${countFrom}:`, err.message);
                    countHasMore = false;
                }
            }

            console.log(`Total computers counted: ${computersDonated}`);

            // WEIGHT: Fetch all weight records in batches of 200
            console.log("Calculating total weight...");
            let weightFrom = 1;
            let weightHasMore = true;

            while (weightHasMore) {
                try {
                    const resp = await axios.get(
                        `${baseUrl}?criteria=${weightCriteria}&from=${weightFrom}&limit=200`,
                        { headers, timeout: 5000 }
                    );
                    const records = resp.data.data || [];
                    const batchWeight = records.reduce((sum, r) => sum + (parseFloat(r.Weight) || 0), 0);
                    totalWeight += batchWeight;

                    if (records.length < 200) {
                        weightHasMore = false;
                    } else {
                        weightFrom += 200;
                    }
                } catch (err) {
                    console.error(`Weight batch error at ${weightFrom}:`, err.message);
                    weightHasMore = false;
                }
            }

            console.log(`Total weight calculated: ${Math.round(totalWeight)} lbs`);

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
