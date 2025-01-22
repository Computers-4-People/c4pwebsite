
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({
  path: './.env.local'
});

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({username: 'Computers4People', key: process.env.API_KEY});

const domain = 'sandbox028d9366440941f29d34eb3f81272721.mailgun.org';


export default async function handler(req, res) {
    const { email, recordId } = req.query;
    try {
    mg.messages.create(domain, {
        from: `Computers4People <mailgun@${domain}>`,
        to: [email],
        subject: 'Welcome to Computers4People!',
        text: `Your record ID is ${recordId}`,
        html: `<h1>Welcome to Computers4People!</h1><p>Your record ID is ${recordId}</p>`
    })
    .then(msg => console.log(msg))
    .catch(err => console.error(err));
    res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
}
}