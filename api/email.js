const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});

const { getZohoAccessToken } = require('./_utils');

/**
 * Sends authentication email via Zoho CRM
 * @param {*} req request parameters include email and recordId
 * @param {*} res response object with some message detailing an error or success
 * @returns a json object with a message saying email was sent successfully, otherwise an error message
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, recordId, jwt } = req.query;

  if (!email || !recordId || !jwt) {
    return res.status(400).json({ error: 'Email, recordId, and jwt are required' });
  }

  try {
    const decodedEmail = decodeURIComponent(email);

    // Get Zoho access token
    const accessToken = await getZohoAccessToken();

    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to obtain Zoho access token' });
    }

    // Create portal link
    const portalLink = `https://www.computers4people.org/portal?recordId=${recordId}&jwt=${jwt}`;

    // Prepare email data for Zoho CRM
    const emailData = {
      data: [
        {
          from: {
            user_name: "Computers 4 People",
            email: "noreply@computers4people.org"
          },
          to: [
            {
              user_name: decodedEmail.split('@')[0],
              email: decodedEmail
            }
          ],
          subject: "Welcome to Computers4People Portal!",
          content: `
            <html>
              <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="color: #17de43;">Welcome to Computers4People!</h1>
                <p>Click the button below to access your portal:</p>
                <p style="margin: 30px 0;">
                  <a href="${portalLink}"
                     style="background-color: #17de43; color: white; padding: 12px 30px;
                            text-decoration: none; border-radius: 5px; display: inline-block;">
                    Access Your Portal
                  </a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="background-color: #f5f5f5; padding: 10px; word-break: break-all;">
                  ${portalLink}
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                  This link will expire for security purposes. If you didn't request this, please ignore this email.
                </p>
              </body>
            </html>
          `,
          mail_format: "html"
        }
      ]
    };

    // Send email via Zoho CRM API
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/Emails/actions/send',
      emailData,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Zoho email response:', response.data);

    if (response.data.data && response.data.data[0].status === 'success') {
      res.status(200).json({ message: 'Email sent successfully via Zoho' });
    } else {
      throw new Error('Zoho email send failed');
    }

  } catch (error) {
    console.error('Zoho email error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    res.status(500).json({
      error: 'Failed to send email',
      details: error.response?.data || error.message
    });
  }
}