const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api', // This should be 'api', not 'Computers4People'
  key: process.env.API_KEY
});

const domain = process.env.DOMAIN;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, recordId } = req.query;

  
  if (!email || !recordId) {
    return res.status(400).json({ error: 'Email and recordId are required' });
  }

  try {
    
    await mg.messages.create(domain, {
      from: `Computers4People <mailgun@${domain}>`,
      to: [email],
      subject: 'Welcome to Computers4People!',
      text: `Your record ID is ${recordId}`,
      html: `<h1>Welcome to Computers4People!</h1><p>Your record ID is ${recordId}</p>`
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}