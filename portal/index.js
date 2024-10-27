const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let cachedAccessToken = null;
let tokenExpiration = null;

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

        console.log("New Access Token:", cachedAccessToken);
        return cachedAccessToken;
    } catch (error) {
        console.error("Error obtaining access token:", error.response ? error.response.data : error.message);
        throw new Error('Failed to obtain access token');
    }
}

// Endpoint to fetch data from any module by record ID
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
            console.log(`${module} data retrieved:`, response.data.data[0]);
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

// Enhanced endpoint to fetch related list data for a specific record
app.get('/api/:module/:recordId/:relatedList', async (req, res) => {
    const { module, recordId, relatedList } = req.params;
    console.log(`Received request for related list: ${relatedList} of ${module}, ID: ${recordId}`);

    try {
        const accessToken = await getZohoAccessToken();

        // Construct related list API request URL
        const relatedListURL = `${process.env.ZOHO_API_BASE_URL}/${module}/${recordId}/${relatedList}`;
        console.log("Requesting Related List URL:", relatedListURL);

        const response = await axios.get(relatedListURL, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (response.data.data && response.data.data.length > 0) {
            console.log(`${relatedList} data retrieved for ${module}:`, response.data.data);
            res.json(response.data.data);
        } else {
            console.log(`No related records found for ${relatedList} in ${module}`);
            res.status(404).json({ error: "No related records found" });
        }
    } catch (error) {
        console.error(`Error fetching ${relatedList} data for ${module}:`, error.response ? error.response.data : error.message);

        // Check specific Zoho CRM error response
        if (error.response && error.response.data && error.response.data.code === "INVALID_DATA") {
            res.status(400).json({ error: "Invalid related list name. Verify the name in Zoho CRM." });
        } else {
            res.status(500).json({ error: 'An error occurred while fetching related list data.' });
        }
    }
});

// Start the backend server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
