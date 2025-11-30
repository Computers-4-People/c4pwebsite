const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});

/**
 * Sends authentication email via Zoho Mail SMTP
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
    const portalLink = `https://www.computers4people.org/portal?recordId=${recordId}&jwt=${jwt}`;

    // Create Zoho Mail transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.ZOHO_MAIL_USER || 'info@computers4people.org',
        pass: process.env.ZOHO_MAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: '"Computers 4 People" <info@computers4people.org>',
      to: decodedEmail,
      subject: 'Welcome to Computers4People Portal!',
      html: `
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
      text: `Welcome to Computers4People! Access your portal at: ${portalLink}`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      message: 'Email sent successfully via Zoho Mail',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
}