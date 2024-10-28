const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cachedAccessToken = null;
let tokenExpiration = null;

// Function to obtain Zoho access token using the refresh token
async function getZohoAccessToken() {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiration && currentTime < tokenExpiration) {
        console.log("Using cached access token");
        return cachedAccessToken;
    }

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token',
            },
        });

        cachedAccessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in - 60) * 1000;
        console.log("New Access Token obtained.");
        return cachedAccessToken;
    } catch (error) {
        console.error("Error obtaining access token:", error.response ? error.response.data : error.message);
        throw new Error('Failed to obtain access token');
    }
}

// Endpoint to fetch primary record data from Zoho CRM
app.get('/api/:module/:recordId', async (req, res) => {
    const { module, recordId } = req.params;
    console.log(`Received request for module: ${module}, ID: ${recordId}`);

    try {
        const accessToken = await getZohoAccessToken();
        const response = await axios.get(`${process.env.ZOHO_API_BASE_URL}/${module}/${recordId}`, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (response.data.data && response.data.data.length > 0) {
            console.log(`${module} data retrieved.`);
            res.json(response.data.data[0]);
        } else {
            console.log("Record not found");
            res.status(404).json({ error: "Record not found" });
        }
    } catch (error) {
        console.error(`Error fetching ${module} data:`, error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
});

// Endpoint to search for records in Zoho Creator's Computer Inventory by a search field and value
app.get('/api/computer-inventory', async (req, res) => {
    const { searchField, searchValue } = req.query;

    if (!searchField || !searchValue) {
        return res.status(400).json({ error: "Please provide searchField and searchValue query parameters." });
    }

    console.log(`Searching for Computer Inventory records with ${searchField}: ${searchValue}`);

    try {
        const accessToken = await getZohoAccessToken();

        let criteria;
        if (searchField === 'Recipient') {
            // Recipient is a TEXT field, compare as string
            criteria = `(${searchField}=="${searchValue}")`;
        } else if (searchField === 'Donor_ID') {
            // Donor_ID is a numeric field, compare as number
            criteria = `(${searchField}==${searchValue})`;
        } else if (!isNaN(searchValue)) {
            // Numeric field
            criteria = `(${searchField}==${searchValue})`;
        } else {
            // String field
            criteria = `(${searchField}=="${searchValue}")`;
        }

        // URL-encode the criteria
        const encodedCriteria = encodeURIComponent(criteria);

        // Use the correct report name from your Zoho Creator app
        const url = `${process.env.ZOHO_CREATOR_API_BASE_URL}/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?criteria=${encodedCriteria}`;

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
        res.status(500).json({ error: 'An error occurred while fetching inventory data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});