const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const key = process.env.API_KEY;
const mg = mailgun.client({
  username: 'api',
  key: process.env.API_KEY
});

const domain = process.env.DOMAIN;

const domainTwo = 'www.computers4people.org'

// need to create a one time token for the email url here

export default async function handler(req, res) {

  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, recordId } = req.query;

  
  if (!email || !recordId) {
    return res.status(400).json({ error: 'Email and recordId are required' });
  }

  if (!domain || !key) {
    return res.status(400).json({ error: 'Domain and key are required' });
  }

  try {
    const decodedEmail = decodeURIComponent(email);
    console.log('Current Environment:', {
      DOMAIN: process.env.DOMAIN,
      hasApiKey: process.env.API_KEY,
      
    });


    
    await mg.messages.create(domainTwo, {
      from: `Computers4People <mailgun@${domainTwo}>`,
      to: [decodedEmail],
      subject: 'Welcome to Computers4People!',
      text: `Your record ID is ${recordId}`,
      html: `<p> ${recordId} enter the record Id here: www.computers4people.com/portal <p> `
      // <p> enter the record Id here: www.computers4people.com/portal <p> 

      // old: `<h1> this is a test! </p>`
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Mailgun error:', {
      message: error.message,
      stack: error.stack,
      config: {
        domain: domainTwo,
        hasApiKey: !!process.env.API_KEY
      }
    });
    res.status(500).json({ error: 'Failed to send email' });
  }
}