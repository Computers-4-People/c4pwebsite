import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';

const sendEmail = async (email, recordId, jwt) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/shield-email?email=${encodeURIComponent(email)}&recordId=${recordId}&jwt=${jwt}`);
        return response.data;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

const getJWT = async(email, recordID) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/jwt`, {
            email,
            recordID
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error in getting JWT:', error);
        throw error;
    }
}

const getAuthCode = async (userId, timestamp) => {
    const response = await axios.get(`${API_BASE_URL}/api/getAuthCode?userId=${userId}&timestamp=${timestamp}`);
    return response.data.authCode;
}

const fetchShieldSubscriber = async (email) => {
    try {
        const requestUrl = `${API_BASE_URL}/api/shield-subscriber?email=${encodeURIComponent(email)}`;
        console.log('url:', requestUrl);
        const response = await axios.get(requestUrl);
        console.log('response:', response.data);
        return response.data;
    }
    catch(e) {
        console.error('Error fetching Shield subscriber data:', e);
        throw e;
    }
}

function ShieldAuth() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccess(false);

            // Validate email is not empty
            if (!email || email.trim() === '') {
                throw new Error('Please enter an email address');
            }

            console.log(email);

            // Fetch Shield subscriber data by email
            const subscriberResponse = await fetchShieldSubscriber(email);

            if (!subscriberResponse.data || subscriberResponse.data.length === 0) {
                throw new Error('No Shield subscription found with this email. Please check your email or contact support.');
            }

            const subscriberData = subscriberResponse.data[0];
            const id = subscriberData.subscription_id || subscriberData.id;

            const time = Date.now();
            const jwt = await getAuthCode(id, time);

            await axios.post(`${API_BASE_URL}/api/redis-cache`, {
                key: id,
                value: time,
                typeOfData: 'time',
                expiryInSeconds: 120
            });

            console.log('Auth code generated:', jwt);

            // Send email with portal link
            await sendEmail(email, id, jwt);

            // Only set success after email is sent
            setSuccess(true);

        } catch (error) {
            console.error('Error:', error);
            // Display user-friendly error message
            if (error.response?.status === 404) {
                setError('No Shield subscription found with this email. Please check your email or contact support.');
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('An error occurred during authentication. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
    <div id="main-content" className="flex flex-col md:flex-row-reverse justify-center items-center min-h-screen font-auth px-4 md:px-0 overflow-hidden">
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* Auth Form Section */}
        <div className="w-full md:w-1/2 max-w-[500px] my-6 md:my-16 relative md:left-0 text-center">
            <div className="mt-2">
                <h1 className="text-3xl md:text-4xl font-auth mb-2">Hello Again!</h1>
                <p className="text-gray-600 mb-8 md:mb-16 font-auth text-base md:text-lg">Welcome to the Shield Internet Portal!</p>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col items-center space-y-4">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full max-w-[400px] rounded-md py-3 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800 bg-white font-sans text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full max-w-[400px] mt-4 bg-c4p hover:bg-c4p-hover text-white px-4 py-2 rounded font-sans text-base md:text-lg"
                    >
                        {loading ? 'Sending...' : 'Unlock'}
                    </button>
                    {error && <p className="text-red-500 mt-2 font-sans">{error}</p>}
                    {success && <p className="text-green-500 mt-2 font-sans">We have sent you an email to login. The code is valid for 2 minutes.</p>}
                </form>
            </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
                src="/authpage/C4PAuth.png"
                alt="Shield Portal Authentication"
                className="w-full max-w-[400px] md:max-w-[600px] rounded-3xl object-contain"
            />
        </div>
    </div>
);

}

export default ShieldAuth;
