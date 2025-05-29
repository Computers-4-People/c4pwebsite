import axios from 'axios';
import dotenv from 'dotenv';
import { getZohoAccessToken } from './_utils.js';

dotenv.config({ path: './.env.local' });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const accessToken = await getZohoAccessToken();

    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to obtain access token' });
    }

    const url = `https://www.zohoapis.com/crm/v2/Financial_Donations/search?criteria=(Date:between:2025-01-01,2025-12-31)`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`
      }
    });

    const records = response.data.data || [];
    const total = records.reduce((sum, r) => sum + (r.Amount || 0), 0);

    return res.status(200).json({ total });
  } catch (error) {
    console.error('Donation API Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch donation total' });
  }
}
