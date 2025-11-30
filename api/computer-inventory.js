const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');

export default async function handler(req, res) {
    const { searchField, searchValue } = req.query;

    

    if (!searchField || !searchValue) {
        return res.status(400).json({ error: "Please provide searchField and searchValue query parameters." });
    }

    console.log(`Searching for Computer Inventory records with ${searchField}: ${searchValue}`);

    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }

        let criteria;
        // Adjust the criteria based on the field and data type
        if (searchField === 'Donor_ID') {
            // Donor_ID - try as string in case it's a lookup or text field
            criteria = `(${searchField} == "${searchValue}")`;
        } else if (searchField === 'Recipient') {
            // Recipient is a text field
            criteria = `(${searchField} == "${searchValue}")`;
        } else if (!isNaN(searchValue)) {
            // Other numeric fields
            criteria = `(${searchField} == ${searchValue})`;
        } else {
            // String fields
            criteria = `(${searchField} == "${searchValue}")`;
        }

        // URL-encode the criteria
        const encodedCriteria = encodeURIComponent(criteria);

        // Use the correct report name from your Zoho Creator app
        const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;

        console.log("Constructed criteria:", criteria);

        // Fetch all records with pagination
        let allRecords = [];
        let from = 1;
        let hasMoreRecords = true;

        while (hasMoreRecords) {
            const url = `${baseUrl}?criteria=${encodedCriteria}&from=${from}&limit=200`;
            console.log("Requesting Search URL:", url);

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

                // If we got less than 200 records, we've reached the end
                if (records.length < 200) {
                    hasMoreRecords = false;
                }
            } else {
                hasMoreRecords = false;
            }
        }

        console.log(`Total inventory items found: ${allRecords.length}`);

        if (allRecords.length > 0) {
            res.json(allRecords);
        } else {
            console.log(`No items found with the given ${searchField}`);
            res.status(404).json({ error: `No items found with the given ${searchField}` });
        }
    } catch (error) {
        console.error("Error fetching inventory data:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching inventory data.' });
    }
}