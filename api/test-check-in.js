const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoCRMAccessToken } = require('./_utils');

/**
 * Simple test to see if Computer_Check_in_Forms module is accessible
 */
export default async function handler(req, res) {
    try {
        const accessToken = await getZohoCRMAccessToken();
        console.log('CRM Access Token obtained');

        // Try to get just one record from Computer_Check_in_Forms
        const url = `https://www.zohoapis.com/crm/v2/Computer_Check_in_Forms?per_page=1`;

        console.log('Testing access to Computer_Check_in_Forms module...');
        console.log('URL:', url);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        console.log('SUCCESS! Module is accessible');
        console.log('Response:', response.data);

        res.json({
            success: true,
            message: 'Computer_Check_in_Forms module is accessible',
            recordCount: response.data.data?.length || 0,
            data: response.data
        });

    } catch (error) {
        console.error('ERROR accessing Computer_Check_in_Forms:');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Error Code:', error.response?.data?.code);
        console.error('Error Message:', error.response?.data?.message);
        console.error('Full Response:', JSON.stringify(error.response?.data, null, 2));

        res.status(500).json({
            success: false,
            error: 'Failed to access Computer_Check_in_Forms',
            status: error.response?.status,
            errorCode: error.response?.data?.code,
            errorMessage: error.response?.data?.message,
            fullError: error.response?.data
        });
    }
}
