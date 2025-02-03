import React from 'react';
import { useState } from 'react';
import axios from 'axios';


const API_BASE_URL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';



const sendEmail = async (email, recordId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/email?email=${email}&recordId=${recordId}`);
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        return response.json();
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// display html that says "sending email... within react component"
const getRecordId = async (email) => {
    try {
    // might need to encode the other query params
    const response = await axios.get(`${API_BASE_URL}/api/championid?email=${encodeURIComponent(email)}&moduleName=Contacts&param=Email`);
    const recordId = response.data.id;
    if (recordId) {
        sendEmail(email, recordId);
    }

    
    }
    catch (error) {
        console.error('Error getting recordId:', error);
        throw error;
    }
}


function Auth() {

    const [email, setEmail] = useState('');


    return (
        <div id="main-content" className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-half max-w-5xl my-10 sm:my-16">
            <div class="mt-2">
            <input
            type="text"
            name="inputname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="block w-half rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            />
            
            </div>
            <label class="pt-1 block text-gray-500 text-sm">Enter your email</label>
            </div>
        </div>
    );
}

export default Auth;