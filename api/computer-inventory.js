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
            // Donor_ID is a numeric field
            criteria = `(${searchField} == ${searchValue})`;
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
        const url = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?criteria=${encodedCriteria}`;

        console.log("Constructed criteria:", criteria);
        console.log("Requesting Search URL:", url);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        console.log("Zoho Creator API response:", response.data);

        if (response.data.data && response.data.data.length > 0) {
            console.log("Inventory items found.");
            res.json(response.data.data);
        } else {
            console.log(`No items found with the given ${searchField}`);
            res.status(404).json({ error: `No items found with the given ${searchField}` });
        }
    } catch (error) {
        console.error("Error fetching inventory data:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching inventory data.' });
    }
}