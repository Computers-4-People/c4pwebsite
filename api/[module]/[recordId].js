const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});
const { getZohoAccessToken } = require('../_utils');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    
  const { module, recordId } = req.query;
    console.log(`Received request for module: ${module}, ID: ${recordId}`);

    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }
        const response = await axios.get(`https://www.zohoapis.com/crm/v2/${module}/${recordId}`, {
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
        return res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching the data.' });
    }
}