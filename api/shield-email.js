const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({
    path: './.env.local'
});

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { email, recordId, jwt } = req.query;

    if (!email || !recordId || !jwt) {
        return res.status(400).json({
            success: false,
            error: 'Missing required parameters'
        });
    }

    try {
        console.log('Starting email send process...');
        const startTime = Date.now();

        // Create portal link
        const portalLink = `https://www.computers4people.org/shield-portal?recordId=${recordId}&jwt=${jwt}`;

        console.log('Creating transporter...');
        // Configure nodemailer with Zoho
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            pool: true,
            auth: {
                user: process.env.ZOHO_MAIL_USER || 'info@computers4people.org',
                pass: process.env.ZOHO_MAIL_PASSWORD
            }
        });
        console.log(`Transporter created in ${Date.now() - startTime}ms`);

        // Simplified email HTML template
        const emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #00d64e;">Shield Portal Access</h1>
            <p>Click the button below to access your Shield subscriber portal:</p>
            <p style="margin: 30px 0;">
              <a href="${portalLink}"
                 style="background-color: #00d64e; color: white; padding: 12px 30px;
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Access Portal
              </a>
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              <strong>Note:</strong> This link will expire in 1 minute for security purposes.
            </p>
            <p style="color: #666; font-size: 12px;">
              If you didn't request this, please ignore this email.
            </p>
          </body>
        </html>
        `;

        // Send email
        console.log(`Sending email to ${email}...`);
        const sendStartTime = Date.now();
        const info = await transporter.sendMail({
            from: '"Computers 4 People - Shield" <info@computers4people.org>',
            to: email,
            subject: 'Your Shield Portal Access Link',
            html: emailHtml,
            text: `Shield Portal Access\n\nAccess your Shield subscriber portal at: ${portalLink}\n\nNote: This link will expire in 1 minute for security purposes.\n\nIf you didn't request this, please ignore this email.`
        });

        console.log(`Email sent in ${Date.now() - sendStartTime}ms:`, info.messageId);
        console.log(`Total email process time: ${Date.now() - startTime}ms`);

        return res.status(200).json({
            success: true,
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending Shield email:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to send email'
        });
    }
};
