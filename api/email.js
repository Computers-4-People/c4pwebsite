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

const domainTwo = 'computers4people.org'

// need to create a one time token for the email url here

/**
 * 
 * @param {*} req request parameters include email and recordId
 * @param {*} res response object with some message detailing an error or success
 * @returns a json object with a message saying email was sent successfully, otherwise an error message
 */
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
      DOMAIN: domainTwo,
      hasApiKey: process.env.API_KEY,
      
    });

    
    await mg.messages.create('www.computers4people.org', {
      from: "C4P Authentication <postmaster@www.computers4people.org>",
      to: [decodedEmail],
      subject: 'Welcome to Computers4People!',
      text: `Your record ID is ${recordId}`,
      html: `<h1> ${recordId} enter the record Id here: www.computers4people.com/portal?recordId=${encodeURIComponent(recordId)} </p> `
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