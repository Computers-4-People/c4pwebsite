const nodemailer = require('nodemailer');

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
        // Create portal link
        const portalLink = `https://www.computers4people.org/shield-portal?recordId=${recordId}&jwt=${jwt}`;

        // Configure nodemailer with Zoho
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ZOHO_MAIL_USER,
                pass: process.env.ZOHO_MAIL_PASS
            }
        });

        // Email HTML template
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background: linear-gradient(135deg, #007029 0%, #00d64e 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .content {
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }
                .button {
                    display: inline-block;
                    padding: 15px 30px;
                    background: #00d64e;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .button:hover {
                    background: #00a33b;
                }
                .footer {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Shield Portal</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Click the button below to access your Shield subscriber portal:</p>
                <div style="text-align: center;">
                    <a href="${portalLink}" class="button">Access Portal</a>
                </div>
                <p><strong>Note:</strong> This link will expire in 1 minute for security purposes.</p>
                <p>If you did not request this email, please ignore it or contact our support team.</p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} Computers 4 People Inc. All rights reserved.</p>
                <p>321 Newark St #32, Hoboken, NJ 07030</p>
            </div>
        </body>
        </html>
        `;

        // Send email
        const info = await transporter.sendMail({
            from: '"Computers 4 People - Shield" <info@computers4people.org>',
            to: email,
            subject: 'Your Shield Portal Access Link',
            html: emailHtml
        });

        console.log('Email sent:', info.messageId);

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
