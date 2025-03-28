
const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv'); 


dotenv.config({
  path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');

const API_BASE_URL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';


export default async function handler(req, res) {

    try {

    const {email} = req.query;
    
    const decodedEmail = decodeURIComponent(email);
    
        const accessToken = await getZohoAccessToken();
        
        // endpoint here
        const requestUrl = `${API_BASE_URL}/api/championid?email=${encodeURIComponent(decodedEmail)}&moduleName=Champions&param=Email`;

        const resp = await axios.get(requestUrl, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        });

        const championId = resp.data[0].id;
        client.set('info', championId);
        return res.status(200).json({ championId });

    }

    catch (error) {
        console.error('Error fetching record ID:', error);
        res.status(500).json({ error: 'Failed to fetch record ID' });
    }




}