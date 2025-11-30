import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import PortalDropdown from '../components/portaldropdown';
import { decodeJWT, validateJWT } from '../utils/jwtValidation';

// added this
import { useSearchParams } from 'react-router-dom';

function Portal() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/champions');
      };

    axios.defaults.withCredentials = true;

    const [searchParams] = useSearchParams();
    var [recordId, setRecordId] = useState(searchParams.get('recordId') || '');
    var [jwt, setJwt] = useState(searchParams.get('jwt') || '');

    const [championId, setChampionId] = useState('');
    var [module, setModule] = useState('Contacts'); // Default to Contacts for Applicants
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [inventoryData, setInventoryData] = useState([]); 
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); 
    const [selectedDonation, setSelectedDonation] = useState("")
    var [isloading, setIsloading] = useState(true);
    

    const [type, setType] = useState(null);
   
    var newModule = null;
    var reqName = null;


    // Set the API base URL dynamically based on environment
    const API_BASE_URL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : '';

    // Image sources for slider (if applicable)
    const images = [
        '/Hotspot/simcard.png',
        '/Hotspot/t10front.png',
        '/Hotspot/t10back.png',
        '/Hotspot/t10side.png'
    ];

    
    // added this
    useEffect(() => {
        (async () => {
            try {
             
                const urlRecordId = searchParams.get('recordId');
                const urlAuthCode = searchParams.get('jwt') || null;
                
                // Get the session token and ensure it's a string
                const storedToken = sessionStorage.getItem('session');
                const cookieValue = typeof storedToken === 'string' ? storedToken : null;
                
                // If we have a valid session token, we don't need to validate
                if (cookieValue) {
                    console.log('Using existing session');
                    setRecordId(urlRecordId);

                    const validation = validateJWT(cookieValue, urlRecordId);

                    if (!validation.isValid) {
                        console.log(validation.message);
                        sessionStorage.removeItem('session');
                        setError('Session expired. Please log in again.');
                        return;
                    }

                    axios.defaults.headers.common['Authorization'] = `Bearer ${cookieValue}`;

                    // Check champion type and redirect donors immediately
                    const championCheck = await axios.get(`${API_BASE_URL}/api/Champions/${urlRecordId}`);
                    const championType = championCheck.data?.Champion_Type;
                    const isDonor = championType?.find(t => t === 'Computer Donor' || t === 'Loser');

                    if (isDonor) {
                        sessionStorage.setItem('championResp', JSON.stringify(championCheck.data));
                        navigate(`/champions?recordId=${urlRecordId}`);
                        return;
                    }

                    console.log('Calling fetchData');
                    await fetchData();

                    return;
                }
    
                // Only do auth code validation if we don't have a session
                if (!cookieValue) {
                    
                    const timestamp = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                        params: { key: urlRecordId, typeOfData: 'time' },
                    });
                    
                    const validate = await axios.get(`${API_BASE_URL}/api/validateAuthCode`, {
                        params: { authCode: urlAuthCode, timestamp: 
                            timestamp.data.data, userId: urlRecordId },
                    });
                    
    
                    if (validate.data.valid) {
                       
                        await axios.delete(`${API_BASE_URL}/api/redis-cache`, {
                            params: { key: urlRecordId, typeOfData: 'time' },
                        });
    
                        setRecordId(urlRecordId);

                        const authToken = await getJWT(urlRecordId);
                        sessionStorage.setItem('session', authToken);

                        axios.defaults.headers.common['Authorization'] =
                        `Bearer ${authToken}`;

                        // Check champion type and redirect donors BEFORE loading all data
                        const championCheck = await axios.get(`${API_BASE_URL}/api/Champions/${urlRecordId}`);
                        const championType = championCheck.data?.Champion_Type;
                        const isDonor = championType?.find(t => t === 'Computer Donor' || t === 'Loser');

                        if (isDonor) {
                            // Store champion data and redirect immediately for donors
                            sessionStorage.setItem('championResp', JSON.stringify(championCheck.data));
                            navigate(`/champions?recordId=${urlRecordId}`);
                            return;
                        }

                        await fetchData();
                       
                    } else {
                     
                        setError('Invalid or expired authentication code');
                    }
                }
            } catch (error) {
                console.error('Error in useEffect:', error);
                setError('Error fetching data. Please try again.');
            }
        })();
    }, [searchParams]);


    const getJWT = async(recordID) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/jwt`, {
                recordID
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            // Ensure we're getting a token string
            const token = response.data.token;
            if (!token || typeof token !== 'string') {
                console.error('Invalid token received:', token);
                throw new Error('Invalid token format received');
            }
            
            // Store the token as a string
            sessionStorage.setItem('session', token);
           
            return token;
            
        } catch (error) {
            console.error('Error in getting JWT:', error);
            throw error;
        }
    }

    // -----------------------------------------------------------------------------

    // Auto-slide functionality (if using image slider)
    useEffect(() => {
        const interval = setInterval(() => {
            handleNextImage();
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, [selectedImageIndex]);

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const scrollToForm = () => {
        const formSection = document.getElementById("inquiry-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };



    // -----------------------------------------------------------------------------

    const fetchData = async () => {
      
        if (sessionStorage.getItem('module')){
           
            if (await cachedFetch()) {
                console.log('conditional hit');
                return;
            }
        }
       
        setError('');
        setData(null);
        setInventoryData([]);

        if (!recordId) {
            setError('Please enter an ID.');
            return;
        }

        const reqChampion = `${API_BASE_URL}/api/Champions/${recordId}`;
        const championResp = await axios.get(reqChampion);

        sessionStorage.setItem('championResp', JSON.stringify(championResp.data));
        sessionStorage.setItem('recordId', championResp.data.id);

        const name = championResp.data?.Name;
        const email = championResp.data?.Email;
        const found = championResp.data?.Champion_Type;

        const type = found.find(t => t === 'Computer Donor' 
            || t === 'Computer Applicant' || t === 'Loser');

        if (!type) {
            console.error('Champion type not found:', found);
            setError('Invalid champion type');
            return -1;
        }

        if (type === 'Computer Donor' || type === 'Loser') {
            reqName = await fetchWithChampion(email, 'Computer_Donors', 'Email');
            sessionStorage.setItem('type', 'Computer Donations');
        }

        else {
            reqName = await fetchWithChampion(email, 'Contacts', 'Email');
            sessionStorage.setItem('type', 'Contacts');
        }
        
        // put this in a helper function --
        let dateList = [];
        for (let i = 0; i < reqName.data.length; i++) { 

            var d = Date.parse(reqName.data[i].Entry_Date);
            dateList.push(d);
        }

        let maximum = dateList.indexOf(Math.max(...dateList));
        const newSelectedDonation = reqName.data[maximum].Entry_Date + " Donation";
        setSelectedDonation(newSelectedDonation);        
        sessionStorage.setItem('selectedDonationOld', newSelectedDonation);
  
        const id = reqName.data[maximum].id;
        
        recordId = id;

        if (reqName.data[maximum].Status === "Donated" || 
            reqName.data[maximum].Status === "Archived") {
 
            newModule = 'Computer_Donors';
        }

        else {
            newModule = 'Contacts';
        }

        const requestUrl = `${API_BASE_URL}/api/${newModule}/${recordId}`;
        
        try {
            const response = await axios.get(requestUrl);
   
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setData(response.data);

                await cacheData(`${searchParams.get('recordId')}`, 'data', response.data);
                const resp = await getCachedData(`${searchParams.get('recordId')}`, 'data');
    
                setModule(newModule);
  
                module = newModule;
                sessionStorage.setItem('module', newModule);

                if (module === 'Contacts') {
                    if (response.data.Status === 'Client') {
                        fetchInventoryByRecipientId(recordId, 
                            `${searchParams.get('recordId')}`);
                    }
                } else if (module === 'Computer_Donors') {

                    const donorId = response.data.Donor_ID;

                    if (donorId) {
                        fetchInventoryByDonorId(donorId,
                            `${searchParams.get('recordId')}`);
                    }

                    // Auto-redirect donors to champions page after a short delay to ensure sessionStorage is set
                    setTimeout(() => {
                        navigate(`/champions?recordId=${searchParams.get('recordId')}`);
                    }, 100);
                }
                setIsloading(false);
            }
        } catch (error) {
     
            console.error('Error fetching data:', error);
            if (error.response && error.response.data 
                && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Network Error: Unable to retrieve data.');
            }
        }
    
    };


    const cacheData = async (key, typeOfData, value) => {
        try {
            await axios.post(`${API_BASE_URL}/api/redis-cache`, {
                key: key,
                typeOfData: typeOfData,
                value: value
            });
        } catch (error) {
            console.error('Error in cacheData:', error);
        }
    }

    const getCachedData = async (key, typeOfData) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                params: { key: key, typeOfData: typeOfData },
            });
            
            if (response?.data?.data) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.error('Error in getCachedData:', error);
            return null;
        }
    }



    const cachedFetch = async () => {
        try {
            let cachedInventory = null;  // Initialize as null instead

            if (sessionStorage.getItem('module') !== 'Contacts') {
                cachedInventory = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                    params: { key: `${recordId}`, typeOfData: 'inventory' },
                });
         
            }

            const cachedData = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                params: { key: `${recordId}`, typeOfData: 'data' },
            });
        
            if (cachedData?.data?.data) {
                const module = sessionStorage.getItem('module');
                const selectedDonation = sessionStorage.getItem('selectedDonationOld');
                
                const stateUpdates = [
                    setSelectedDonation(selectedDonation),
                    setModule(module),
                    setData(cachedData.data.data)
                ];

                console.log('cachedInventory', cachedInventory);
        
                if (cachedInventory?.data?.data) {
         
                    stateUpdates.push(setInventoryData(cachedInventory.data.data));
                }

                await Promise.all(stateUpdates).then(() => {

                    setIsloading(false);
                });
                return true;
            }

            return false;

        } catch (error) {
            console.error('Error fetching from Redis cache:', error);
            return false;
        }
    }


    /**
     * 
     * @param {*} Name email of the applicant/donor
     * @param {*} moduleName module name of where the applicant/donor is located
     * @param {*} param the parameter type to search for (email, phone, etc)
     * @returns response data from the api/championid endpoint 
     */
    // fetch donor or applicant data with champion name
    const fetchWithChampion = async (Name, moduleName, param) => {
        try {
            const requestUrl = `${API_BASE_URL}/api/championid?Name=${encodeURIComponent(Name)}
            &moduleName=${encodeURIComponent(moduleName)}&param=${encodeURIComponent(param)}`;

            const response = await axios.get(requestUrl);
   
            return response.data;
        }
        catch(e) {
            console.error('Error fetching champion-related data:', e);
            throw e;
        }
    }

    const fetchInventoryByRecipientId = async (recipientId, recordId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                params: { searchField: 'Recipient', searchValue: recipientId },
            });
    
            if (response.data && response.data.length > 0) {


                setInventoryData(response.data);
               await cacheData(recordId, 'inventory', response.data);

               const cachedInventory = await getCachedData(recordId, 'inventory');
   
            } else {
                console.log('No inventory data found for this recipient.');
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const fetchInventoryByDonorId = async (donorId, recordId) => {
        try {
            const req = `${API_BASE_URL}/api/computer-inventory`;
            const params = { searchField: 'Donor_ID', searchValue: donorId };
   
            const response = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                params: { searchField: 'Donor_ID', searchValue: donorId },
            });
    
            if (response.data && response.data.length > 0) {

                setInventoryData(response.data);
                await cacheData(recordId, 'inventory', response.data);

                const cachedInventory = await getCachedData(recordId, 'inventory');

            } else {
                console.log('No inventory data found for this donor.');
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };


        

    const renderStatusMessage = () => {
        if (module !== 'Contacts' || !data) return null;

        const { Status, Denial_Reason, Nominating_Organization } = data;

        // Map CRM statuses to the new statuses you've provided
        switch (Status) {
            case 'Applicants No Recommendation':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Submitted</h3>
                        <p>
                            We have your application, we are now waiting on the recommendation
                            letter from the nominating recommender (listed below). We will not
                            review your application until we receive this.
                        </p>
                    </div>
                );
            case 'Recommendation Received':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Recommendation Received</h3>
                        <p>We have received the recommendation letter from your recommender!</p>
                    </div>
                );
            case 'Applicants to approve':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Pending Review</h3>
                        <p>
                            We have everything we need! Our application committee is reviewing your
                            application, please be patient. We will notify you once we have made a
                            decision.
                        </p>
                    </div>
                );
            case 'Denied Applicant':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Denied</h3>
                        <p>
                            <strong>Reason(s):</strong> {Denial_Reason || 'Not specified'}
                        </p>
                        <p>
                            Possible reasons for denial: Not located in NJ, NYC, MA; no
                            recommendation received; recommendation is not from a valid non-profit;
                            don't meet the income requirements.
                        </p>
                    </div>
                );
            case 'Approved Applicants':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Approved</h3>
                        <p>
                            You have been approved for a computer, and we will be contacting your
                            recommender shortly to arrange the drop-off. You will be notified once
                            delivered.
                        </p>
                    </div>
                );
            case 'Client':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Delivered</h3>
                        <p>
                            We are happy to inform you that we dropped off the requested computer to{' '}
                            {Nominating_Organization || 'your nominating organization'}.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    // Helper function to calculate total weight
    const calculateTotalWeight = () => {
        return inventoryData.reduce((total, item) => {
            const weight = parseFloat(item.Weight) || 0;
            return total + weight;
        }, 0);
    };

    // Function to convert inventory data to CSV and trigger download
    const downloadCSV = () => {
        if (inventoryData.length === 0) {
            alert('No inventory data available to download.');
            return;
        }

        // Define the headers you want to include in the CSV
        const headers = [
            'Model',
            'Computer_Type',
            'Date_Added',
            'Date_Donated',
            'Date_Recycled',
            'Weight',
        ];

        // Create rows from inventoryData
        const rows = inventoryData.map((item) => [
            item.Model || '',
            item.Computer_Type || '',
            item.Date_Added || '',
            item.Date_Donated || '',
            item.Date_Recycled || '',
            item.Weight || '',
        ]);

        // Combine headers and rows
        const csvContent = [headers, ...rows]
            .map((e) => e.join(','))
            .join('\n');

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'donated_computers.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    // Show loading screen while checking authentication and champion type
    if (isloading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-600 mx-auto mb-6"></div>
                    <h2 className="text-2xl font-semibold text-gray-700">Loading your portal...</h2>
                    <p className="text-gray-500 mt-2">Please wait while we verify your access</p>
                </div>
            </div>
        );
    }

    return (

    <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full mt-20">
            {/* Welcome Header */}

            <div className="mb-6">
                <h1 className="text-4xl font-bold text-black">Welcome back,  </h1>
                <p className="text-gray-700">We created this portal specifically for you.</p>

            </div>
            

            {/* Main Content Grid */}
            <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left Sidebar Navigation */}
                <div className="w-full md:w-64 space-y-2">
                    
                        <div>
                            <PortalDropdown className="flex-shrink-0" type={sessionStorage.getItem('type')} applicantType={sessionStorage.getItem('type')}/>
                        </div>
                    
                </div>
                

                {/* Center Content Section */}
                <div className="flex-grow">
                    {data && (
                        <div className="bg-green-50 p-6 rounded-lg">
                            {module === 'Contacts' ? (
                                <div className="applicant-info">
                                    <h2 className="text-center text-3xl font-bold mb-4 text-c4p">
                                        Applicant Tracker
                                    </h2>
                                    <ProgressBar status={data.Status} />

                                    <div className="bg-gray-100 p-4 rounded mb-4">
                                        {renderStatusMessage()}
                                    </div>
                                    <div className="p-4 bg-white rounded shadow w-full">
                                        <h2 className="text-2xl font-bold text-center mb-6 text-c4p">
                                            Applicant Information
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <p>
                                                <strong>Name:</strong> {data.Full_Name || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {data.Email || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> {data.Phone || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Nominating Organization:</strong>{' '}
                                                {data.Nominating_Organization || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Recommender Name:</strong>{' '}
                                                {`${data.Recommenders_Name || ''} ${
                                                    data.Recommenders_Last_Name || ''
                                                }`.trim() || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Recommender Email:</strong>{' '}
                                                {data.Recommenders_Email || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded shadow w-full mt-4">
                                        <h3 className="text-xl font-semibold text-c4p mb-2">
                                            Computer Request Details
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {data.Laptop_Quantity && (
                                                <p>
                                                    <strong>Laptop Quantity:</strong> {data.Laptop_Quantity}
                                                </p>
                                            )}
                                            {data.Desktop_Quantity && (
                                                <p>
                                                    <strong>Desktop Quantity:</strong> {data.Desktop_Quantity}
                                                </p>
                                            )}
                                            {data.Tablet_Quantity && (
                                                <p>
                                                    <strong>Tablet Quantity:</strong> {data.Tablet_Quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {data.Status === 'Client' && inventoryData.length > 0 && (
                                        <div className="p-4 bg-gray-200 rounded shadow w-full mt-4">
                                            <h3 className="text-xl font-semibold text-c4p mb-2">
                                                Assigned Computer(s)
                                            </h3>
                                            <div className="space-y-4">
                                                {inventoryData.map((item) => (
                                                    <div key={item.ID} className="bg-white p-4 rounded shadow">
                                                        <p>
                                                            <strong>Model:</strong> {item.Model || 'N/A'}
                                                        </p>
                                                        <p>
                                                            <strong>Status:</strong> {item.Status || 'N/A'}
                                                        </p>
                                                        <p>
                                                            <strong>Computer Type:</strong>{' '}
                                                            {item.Computer_Type || 'N/A'}
                                                        </p>
                                                        <p>
                                                            <strong>Location:</strong> {item.Location || 'N/A'}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    
                                </div>
                            ) : (
                                <div className="donor-details">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="ml-auto flex items-center space-x-4">
                                            <a
                                                href="#"
                                                onClick={downloadCSV}
                                                className="text-green-500 hover:text-green-700 font-medium underline"
                                            >
                                                Download Spreadsheet
                                            </a>

                                            <div className="relative">
                                                <button className="flex items-center justify-between w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                                    <span>{selectedDonation}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-green-100 border-collapse">
                                            <thead>
                                                <tr className="border border-gray-300">
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Model</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Serial #</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Date Added</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Date Donated</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Date Recycled</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">Erasure Date</th>
                                                    <th className="py-2 px-4 text-left border border-gray-300 font-medium">View Data Certificate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inventoryData.length > 0
                                                    ? inventoryData.map((item, index) => (
                                                        <tr key={item.ID} className="border border-gray-300">
                                                            <td className="py-2 px-4 border border-gray-300">{item.Model || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">{item.Barcode_Save || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">{item.Date_Added || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">{item.Date_Donated || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">{item.Date_Recycled || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">{item.Erasure_Date || "N/A"}</td>
                                                            <td className="py-2 px-4 border border-gray-300">
                                                                {item.Data_Certificate ? (
                                                                    <a href={item.Data_Certificate} className="text-blue-600 hover:underline">
                                                                        View
                                                                    </a>
                                                                ) : (
                                                                    "N/A"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                    : 
                                                    Array.from({ length: 15 }).map((_, index) => (
                                                        <tr key={index} className="border border-gray-300">
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                            <td className="py-2 px-4 border border-gray-300"></td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    </div>
);
}


export default Portal;