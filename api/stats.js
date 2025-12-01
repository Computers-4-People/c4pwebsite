const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');

export default async function handler(req, res) {
    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }

        // Fetch ALL inventory records with pagination
        let allRecords = [];
        let from = 1;
        let hasMoreRecords = true;

        console.log("Fetching all inventory records for stats...");

        while (hasMoreRecords) {
            const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
            const url = `${baseUrl}?from=${from}&limit=200`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
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
        }

        console.log(`Total records fetched: ${allRecords.length}`);

        // Filter for donated computers (exclude Other, Monitor, etc.)
        const excludedTypes = ['Other', 'Monitor', 'Monitors', 'Printer', 'Printers', 'Accessories', 'Accessory'];
        const donatedComputers = allRecords.filter(record => {
            const status = record.Status;
            const type = record.Computer_Type || record.Type || '';

            // Must have Status = "Donated"
            if (status !== 'Donated') return false;

            // Must NOT be excluded types
            const isExcluded = excludedTypes.some(excludedType =>
                type.toLowerCase().includes(excludedType.toLowerCase())
            );

            return !isExcluded;
        });

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

        res.json(stats);

    } catch (error) {
        console.error("Error fetching stats:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
}
