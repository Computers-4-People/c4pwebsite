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

        // Fetch inventory records with pagination (limit to prevent timeout)
        let allRecords = [];
        const maxPages = 10; // Limit to 2000 records to prevent timeout

        console.log("Fetching inventory records for stats (limited to prevent timeout)...");

        for (let pageNum = 0; pageNum < maxPages; pageNum++) {
            const from = (pageNum * 200) + 1;
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const url = `${baseUrl}?from=${from}&limit=200`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                    },
                    timeout: 3000 // 3 second timeout per request
                });

                const records = response.data.data || [];
                console.log(`Fetched ${records.length} records (from index ${from})`);

                if (records.length > 0) {
                    allRecords = allRecords.concat(records);

                    if (records.length < 200) {
                        break; // No more records
                    }
                } else {
                    break;
                }
            } catch (error) {
                console.error(`Error fetching inventory page ${pageNum}:`, error.message);
                break; // Continue with what we have
            }
        }

        console.log(`Total records fetched: ${allRecords.length}`);

        // Filter for donated computers (exclude Monitor, Phone, Misc)
        const excludedTypes = ['Monitor', 'Phone', 'Misc'];
        const donatedComputers = allRecords.filter(record => {
            const status = record.Status;
            const type = record.Computer_Type || '';

            // Must have Status = "Donated"
            if (status !== 'Donated') return false;

            // Must NOT be excluded types (exact match)
            const isExcluded = excludedTypes.includes(type);

            return !isExcluded;
        });

        console.log(`Donated computers (excluding ${excludedTypes.join(', ')}): ${donatedComputers.length}`);

        // Calculate total weight (donated or recycled)
        const totalWeight = allRecords.reduce((sum, record) => {
            const status = record.Status;
            const weight = parseFloat(record.Weight) || 0;

            // Include if Status is "Donated" or "Recycled"
            if (status === 'Donated' || status === 'Recycled') {
                return sum + weight;
            }

            return sum;
        }, 0);

        const stats = {
            computersDonated: donatedComputers.length,
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
