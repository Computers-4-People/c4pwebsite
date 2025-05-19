// api/donations-total.js
const axios = require('axios');

let cachedToken = null;
let lastTokenTime = 0;

const getAccessToken = async () => {
    if (cachedToken && Date.now() - lastTokenTime < 50 * 60 * 1000) return cachedToken;

    const response = await axios.post(`https://accounts.zoho.com/oauth/v2/token`, null, {
        params: {
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token'
        }
    });

    cachedToken = response.data.access_token;
    lastTokenTime = Date.now();
    return cachedToken;
};

export default async function handler(req, res) {
    try {
        const token = await getAccessToken();

        const response = await axios.get(`https://www.zohoapis.com/crm/v2/Financial_Donations/search`, {
            headers: { Authorization: `Zoho-oauthtoken ${token}` },
            params: {
                criteria: `(Date:between:2025-01-01,2025-12-31)`
            }
        });

        const donations = response.data.data || [];
        const total = donations.reduce((sum, d) => sum + (d.Amount || 0), 0);

        res.status(200).json({ total });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
