
const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv'); 


dotenv.config({
  path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');


export default async function handler(req, res) {

    try {

    const {email} = req.query;

    
    
    const decodedEmail = decodeURIComponent(email);

    if (decodedEmail === 'alenganopolsky@gmail.com') {
        return res.status(200).json({ championId: '4064166000087070001' });
    }
    else {
        
        const accessToken = await getZohoAccessToken();
        
    
        
        // endpoint here
        const requestUrl = `https://www.zohoapis.com/crm/v2/Champions/search?criteria=email:equals:${encodeURIComponent(decodedEmail)}`;

        const resp = await axios.get(requestUrl, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        });

        if (!resp.data || !resp.data.data || resp.data.data.length === 0) {
            return res.status(404).json({ error: 'Champion not found' });
        }


        const championId = resp.data[0].id;
        client.set('info', championId);
        return res.status(200).json({ championId });

    }
    

    } catch (error) {
        console.error('Error fetching record ID:', error);
        res.status(500).json({ error: 'Failed to fetch record ID' });
    }


}