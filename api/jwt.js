const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const axios = require('axios/dist/node/axios.cjs');


dotenv.config({
  path: './.env.local'
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_DATE = process.env.JWT_EXPIRATION_TIME; 
const t = "";

/**
 * 
 * @param {*} req request parameters include email and recordId 
 * @param {*} res response object with a token
 * @returns a json object with a token
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, recordID} = req.body;

  if (!email || !recordID) {
    return res.status(400).json({ error: 'email and recordId are required' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret is not configured' });
  }

  console.log('Current Environment:', {
    SECRET: process.env.JWT_SECRET,
    DATE: process.env.JWT_EXPIRATION_TIME,
    
  });

  try {
    const payload = {
      email,
    
      role: 'user'
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_DATE,
      algorithm: 'HS256'
    });

    // changed cookie settings to lax

   // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600`);
    // Send the token in the response
    res.status(200).json({ token });

  } catch (error) {
    console.error('JWT creation error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to create JWT' });
  }
}