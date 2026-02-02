const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code, clientId, clientSecret } = req.body;

    if (!code || !clientId || !clientSecret) {
        return res.status(400).json({ error: 'Code, clientId, and clientSecret are required' });
    }

    const redirectUri = 'https://computers4people.org/generate-billing-token';

    try {
        console.log('=== GENERATING BILLING REFRESH TOKEN ===');
        console.log('Client ID:', clientId.substring(0, 20) + '...');
        console.log('Code received:', code.substring(0, 20) + '...');

        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                code: code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }
        });

        console.log('SUCCESS! Generated Billing refresh token');
        console.log('Refresh token:', response.data.refresh_token ? 'Present' : 'Missing');
        console.log('Scopes:', response.data.scope);

        return res.status(200).json({
            success: true,
            refresh_token: response.data.refresh_token,
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            token_type: response.data.token_type,
            scope: response.data.scope
        });
    } catch (error) {
        console.error('=== ERROR GENERATING BILLING TOKEN ===');
        console.error('Status:', error.response?.status);
        console.error('Error:', error.response?.data || error.message);

        return res.status(error.response?.status || 500).json({
            success: false,
            error: error.message,
            details: error.response?.data
        });
    }
};
