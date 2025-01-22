const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'Computers4People', key: process.env.API_KEY || '110217f8bff22a71a02b973dad53f074-9c3f0c68-a15068ee'});

const domain = process.env.DOMAIN;


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