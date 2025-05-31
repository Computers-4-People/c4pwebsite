import React from 'react';
import { useState } from 'react';
import axios from 'axios';




const API_BASE_URL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';



const sendEmail = async (email, recordId, jwt) => {
    try {
        
        const response = await axios.post(`${API_BASE_URL}/api/email?email=${encodeURIComponent(email)}&recordId=${recordId}&jwt=${jwt}`);
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

const getAuthCode = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/api/getAuthCode?userId=${userId}`);
    return response.data.authCode;
}



// display html that says "sending email... within react component"
const fetchWithChampion = async (Name, moduleName, param) => {
    try {
        const requestUrl = `${API_BASE_URL}/api/championid?Name=${encodeURIComponent(Name)}&moduleName=${encodeURIComponent(moduleName)}&param=${encodeURIComponent(param)}`;

        console.log('url:', requestUrl);

        const response = await axios.get(requestUrl);
        console.log('response:', response.data);

        return response.data;
    }
    catch(e) {
        console.error('Error fetching champion-related data:', e);
        throw e;
    }
}


function Auth() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            console.log(email);
       //     await sendEmail(email, 0);

            const championResponse = await fetchWithChampion(email, 'Champions', 'Email');

            const id = championResponse.data[0].id;
           
            setSuccess(true);

         //   const tokenResp = await getJWT(email, id);

            const time = Date.now();

            const jwt = await getAuthCode(id, time);

            await axios.post(`${API_BASE_URL}/api/redis-cache`, {
                key: id,
                typeOfData: 'authCode',
                value: time
            });

         

            console.log('code', jwt);


            await sendEmail(email, id, jwt);


        } catch (error) {
            
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
    // Remove min-h-screen if causing overflow issues
    <div id="main-content" className="flex flex-col md:flex-row-reverse justify-center items-center min-h-screen font-auth px-4 md:px-0 overflow-hidden">
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Auth Form Section - Adjust positioning and width constraints */}
        <div className="w-full md:w-1/2 max-w-[500px] my-6 md:my-16 relative md:left-0 text-center">
            <div className="mt-2">
                <h1 className="text-3xl md:text-4xl font-auth mb-2">Hello Again!</h1>
                <p className="text-gray-600 mb-8 md:mb-16 font-auth text-base md:text-lg">Welcome back to the digital portal!</p>
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="email"
                        name="inputname"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full max-w-[400px] rounded-md py-3 px-3 ring-1 ring-inset ring-gray-400 focus:text-gray-800 bg-white font-sans text-lg"
                    />
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full max-w-[400px] mt-4 bg-c4p hover:bg-c4p-hover text-white px-4 py-2 rounded font-sans text-base md:text-lg"
                    >
                        {loading ? 'Sending...' : 'Unlock'}
                    </button>
                    {error && <p className="text-red-500 mt-2 font-sans">{error}</p>}
                    {success && <p className="text-green-500 mt-2 font-sans">we have sent you an email to login</p>}
                </div>
            </div>
        </div>

        {/* Image Section - Add size constraints and proper responsive behavior */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
            <img 
                src="/authpage/C4PAuth.png"
                alt="Computers 4 People Authentication"
                className="w-full max-w-[400px] md:max-w-[600px] rounded-3xl object-contain"
            />
        </div>
    </div>
);


}

export default Auth;