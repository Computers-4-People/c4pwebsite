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

        console.log("Fetching ALL inventory records for accurate stats...");

        // Fetch ALL records to get accurate count and weight
        let allRecords = [];
        let from = 1;
        let hasMoreRecords = true;

        while (hasMoreRecords) {
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const url = `${baseUrl}?from=${from}&limit=200`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                    },
                    timeout: 5000
                });

                const records = response.data.data || [];
                console.log(`Fetched ${records.length} records (from index ${from})`);

                if (records.length > 0) {
                    allRecords = allRecords.concat(records);
                    from += records.length;

                    if (records.length < 200) {
                        hasMoreRecords = false;
                    }
                } else {
                    hasMoreRecords = false;
                }
            } catch (error) {
                console.error(`Error fetching records from ${from}:`, error.message);
                // Continue with what we have if we get an error
                hasMoreRecords = false;
            }
        }

        console.log(`Total records fetched: ${allRecords.length}`);

        // Filter for donated computers (exclude Monitor, Phone, Misc)
        const excludedTypes = ['Monitor', 'Phone', 'Misc'];
        const donatedComputers = allRecords.filter(record => {
            const status = record.Status;
            const type = record.Computer_Type || '';

            if (status !== 'Donated') return false;
            if (excludedTypes.includes(type)) return false;

            return true;
        });

        console.log(`Donated computers (excluding ${excludedTypes.join(', ')}): ${donatedComputers.length}`);

        // Calculate total weight (donated or recycled)
        const totalWeight = allRecords.reduce((sum, record) => {
            const status = record.Status;
            const weight = parseFloat(record.Weight) || 0;

            if (status === 'Donated' || status === 'Recycled') {
                return sum + weight;
            }

            return sum;
        }, 0);

        const computersDonated = donatedComputers.length;

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
