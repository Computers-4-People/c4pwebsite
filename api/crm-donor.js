const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoCRMAccessToken } = require('./_utils');

/**
 * Fetch Computer_Donors record from CRM to get Date_Picked_Up
 */
export default async function handler(req, res) {
    const { donorId } = req.query;

    if (!donorId) {
        return res.status(400).json({ error: 'donorId parameter is required' });
    }

    console.log(`Fetching Computer_Donors from CRM for Donor_ID: ${donorId}`);

    try {
        const accessToken = await getZohoCRMAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain CRM access token' });
        }

        // Search Computer_Donors in CRM by Donor_ID
        const criteria = `(Donor_ID:equals:${donorId})`;
        const url = `https://www.zohoapis.com/crm/v2/Computer_Donors/search?criteria=${encodeURIComponent(criteria)}`;

        console.log('Requesting CRM Computer_Donors:', url);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (response.data.data && response.data.data.length > 0) {
            const donor = response.data.data[0];
            console.log(`Found Computer_Donors record, Date_Picked_Up: ${donor.Date_Picked_Up}`);
            res.json({
                Date_Picked_Up: donor.Date_Picked_Up || null,
                Donor_ID: donor.Donor_ID
            });
        } else {
            console.log('No Computer_Donors record found in CRM');
            res.status(404).json({ error: 'Computer_Donors record not found in CRM' });
        }
    } catch (error) {
        console.error('Error fetching CRM Computer_Donors:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching CRM data.' });
    }
}
