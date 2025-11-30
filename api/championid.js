const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});
const { getZohoAccessToken, getZohoCRMAccessToken } = require('./_utils');

/**
 *
 * @param {*} req --> query params: Name, moduleName, param
 * @param {*} res --> response data from zoho api as a json object
 * @returns response data from the zoho api search endpoint
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    const { Name, moduleName, param } = req.query;
    console.log(`Received request for module: ${moduleName}, searching by ${param}: ${Name}`);

    // decode parameter --> email, phone, etc
    const paramType = decodeURIComponent(param);

    try {
        // Use CRM token for CRM modules, Creator token for Creator modules
        // CRM modules: Computer_Donors, Computer_Check_in_Forms, Contacts
        // Creator modules: Champions, and others
        const crmModules = ['Computer_Donors', 'Computer_Check_in_Forms', 'Contacts'];
        const useCRM = crmModules.includes(moduleName);

        const accessToken = useCRM
            ? await getZohoCRMAccessToken()
            : await getZohoAccessToken();
        console.log(accessToken);

        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }
        const requestUrl = `https://www.zohoapis.com/crm/v2/${moduleName}/search?criteria=(${paramType}:equals:${Name})`;

        const response = await axios.get(requestUrl, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                
            },
        });

        if (response.data.data) {
            console.log(`${module} data retrieved.`);
            res.json(response.data);
        } else {
            console.log("Record not found");
            res.status(404).json({ error: "Record not found" });
        }
    } catch (error) {
        console.error(`Error fetching ${requestUrl} data:`, error.response ? error.response.data : error.message);
        
        return res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching the data.' });
    }
}
