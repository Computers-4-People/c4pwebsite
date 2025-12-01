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

        console.log("Using Zoho Creator aggregate queries for efficient stats...");

        // Get count of donated computers using criteria
        // Criteria: Status = "Donated" AND Computer_Type NOT IN (Monitor, Phone, Misc)
        const donatedCriteria = encodeURIComponent(
            '(Status == "Donated") && (Computer_Type != "Monitor") && (Computer_Type != "Phone") && (Computer_Type != "Misc")'
        );

        const donatedCountUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?criteria=${donatedCriteria}&max_records=1`;

        let computersDonated = 0;
        try {
            const countResp = await axios.get(donatedCountUrl, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
                timeout: 5000
            });

            // Zoho Creator doesn't have a direct count endpoint, but we can get the count from response metadata
            computersDonated = countResp.data.info?.total_count || 0;
            console.log(`Computers donated count: ${computersDonated}`);
        } catch (error) {
            console.error("Error getting donated computer count:", error.message);
        }

        // For weight, we need to fetch records to sum the Weight field
        // Fetch only records with Status = Donated or Recycled to calculate weight
        const weightCriteria = encodeURIComponent('(Status == "Donated") || (Status == "Recycled")');
        const weightUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?criteria=${weightCriteria}&from=1&limit=200`;

        let totalWeight = 0;
        try {
            // Fetch first 200 records to calculate weight (sample)
            const weightResp = await axios.get(weightUrl, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
                timeout: 5000
            });

            const records = weightResp.data.data || [];
            console.log(`Fetched ${records.length} records for weight calculation`);

            totalWeight = records.reduce((sum, record) => {
                const weight = parseFloat(record.Weight) || 0;
                return sum + weight;
            }, 0);

            // Estimate total weight based on sample if we have partial data
            const totalRecords = weightResp.data.info?.total_count || records.length;
            if (records.length < totalRecords && records.length > 0) {
                const avgWeight = totalWeight / records.length;
                totalWeight = avgWeight * totalRecords;
                console.log(`Estimated total weight from ${records.length} samples: ${Math.round(totalWeight)} lbs`);
            }
        } catch (error) {
            console.error("Error calculating weight:", error.message);
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
