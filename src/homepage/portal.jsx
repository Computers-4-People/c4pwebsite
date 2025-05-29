import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import PortalDropdown from '../components/portaldropdown';


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

    

    
  //  var [recordId, setRecordId] = useState('');
    const [championId, setChampionId] = useState('');
    var [module, setModule] = useState('Contacts'); // Default to "Contacts" for Applicants
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [inventoryData, setInventoryData] = useState([]); // State for computer inventory data
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // For image slider if applicable
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
      //  const urlJwt = searchParams.get('jwt') || jwt;
     //   const apiValidation = await axios.get(`${API_BASE_URL}/api/verify-jwt?urlJwt=${urlJwt}`);
      //  console.log('apiValidation:', apiValidation.data);

        // make sure to add back in urlJWt and apiValidation.data.valid after testing
        if (urlRecordId) {
            setRecordId(urlRecordId);
            setTimeout(() => {
                fetchData();
            }, 0);


        }


    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
    }
    })();
    }, [searchParams]); 


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



    

    const fetchData = async () => {

        // const cachedInventory = sessionStorage.getItem('inv');
        // const cachedData = sessionStorage.getItem('data');
        // console.log(cachedInventory, cachedData);
        if (await cachedFetch()) {
            return;
        }
       
        setError('');
        setData(null);
        setInventoryData([]);

        if (!recordId) {
            setError('Please enter an ID.');
            return;
        }

        // recordId here is the champion recordId
        const reqChampion = `${API_BASE_URL}/api/Champions/${recordId}`;
        const championResp = await axios.get(reqChampion);
        console.log('successfully retrieved champion information', championResp.data);

        // cache the championResp data in sessionStorage to use in Champions.jsx
        sessionStorage.setItem('championResp', JSON.stringify(championResp.data));
        sessionStorage.setItem('recordId', championResp.data.id);

        const name = championResp.data?.Name;
        const email = championResp.data?.Email;
        const found = championResp.data?.Champion_Type;
        console.log("here is the champion's name", name);
        console.log("here is the Champion's Email", email);
        console.log("Champion types:", found);

        const type = found.find(t => t === 'Computer Donor' || t === 'Computer Applicant' || t === 'Loser');
        console.log("type", type);
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
        
        // put this in a helper function
        let dateList = [];
        for (let i = 0; i < reqName.data.length; i++) { 
            console.log(`${i}&${reqName.data[i].Entry_Date}`, reqName.data[i]);
            var d = Date.parse(reqName.data[i].Entry_Date);
            dateList.push(d);
        }

        let maximum = dateList.indexOf(Math.max(...dateList));
        const newSelectedDonation = reqName.data[maximum].Entry_Date + " Donation";
        setSelectedDonation(newSelectedDonation);        
        sessionStorage.setItem('selectedDonationOld', newSelectedDonation);
        console.log(sessionStorage.getItem('selectedDonationOld'));


        console.log('max entry', reqName.data[maximum]);
        console.log(dateList);
        console.log(reqName.data[maximum].Entry_Date);
        console.log('successfully retrieved applicant information', reqName);
        
        const id = reqName.data[maximum].id;
        
        console.log('recordId before:', recordId);
        console.log('recordId after:', id);

        //mutates to computer_donor or applicant record id
        recordId = id;

        if (reqName.data[maximum].Status === "Donated" || reqName.data[maximum].Status === "Archived") {
            console.log('Applicant is not a client');
            newModule = 'Computer_Donors';
        }

        else {
            console.log('Applicant is a client');
            newModule = 'Contacts';
        }

        console.log('newModule', newModule);
        console.log('module', module);
        // get recordId from request and put it here
        const requestUrl = `${API_BASE_URL}/api/${newModule}/${recordId}`;
        
        console.log('Attempting to fetch from:', requestUrl);

        try {
            const response = await axios.get(requestUrl);
            console.log('API Response:', response.data);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setData(response.data);

                await cacheData(`${searchParams.get('recordId')}`, 'data', response.data);

                setModule(newModule);
                console.log(newModule);
                console.log(module);
                module = newModule;
                sessionStorage.setItem('module', newModule);

                // Fetch inventory data based on Applicant ID or Donor_ID
                if (module === 'Contacts') {
                    if (response.data.Status === 'Client') {
                        fetchInventoryByRecipientId(recordId, `${searchParams.get('recordId')}`);
                    }
                } else if (module === 'Computer_Donors') {
                    
                    const donorId = response.data.Donor_ID;
                    console.log('donorId', donorId);
                    if (donorId) {
                        fetchInventoryByDonorId(donorId,`${searchParams.get('recordId')}`);
                    }
                }
                setIsloading(false);
            }
        } catch (error) {
            console.log(module);
            console.log(recordId);
            console.log(API_BASE_URL);
            console.error('Error fetching data:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Network Error: Unable to retrieve data.');
            }
        }
    
    };


    const cacheData = async (key, typeOfData, value) => {
        await axios.post(`${API_BASE_URL}/api/redis-cache`, {
            key: key,
            typeOfData: typeOfData,
            value: value
        });
    }



    const cachedFetch = async () => {
        try {

            const cachedInventory = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                params: { key: `${recordId}`, typeOfData: 'inventory' },
            });

            const cachedData = await axios.get(`${API_BASE_URL}/api/redis-cache`, {
                params: { key: `${recordId}`, typeOfData: 'data' },
            });

            if (cachedInventory && cachedData) {
                const module = sessionStorage.getItem('module');
                const selectedDonation = sessionStorage.getItem('selectedDonationOld');


                await Promise.all([
                    setSelectedDonation(selectedDonation),
                    setModule(module),
                    setInventoryData(cachedInventory),
                    setData(cachedData)
                ]).then(()=> {
                    console.log('All states updated');
                    console.log('Using cached inventory data');
                    console.log(selectedDonation);
                    setIsloading(false);
                });
                return true;
            }
            console.log('No cached data found');
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

    const fetchInventoryByRecipientId = async (recipientId, recordId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                params: { searchField: 'Recipient', searchValue: recipientId },
            });
            console.log('Inventory Data Response:', response.data);
            if (response.data && response.data.length > 0) {


                setInventoryData(response.data);
                await cacheData(recordId, 'inventory', response.data);


                console.log('Inventory Data:', response.data);
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
            console.log('here');
            console.log(req, params);
            const response = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                params: { searchField: 'Donor_ID', searchValue: donorId },
            });
            console.log('Inventory Data Response:', response.data);
            if (response.data && response.data.length > 0) {

                setInventoryData(response.data);
                await cacheData(recordId, 'inventory', response.data);
                
                console.log('Inventory Data:', response.data);
                console.log(inventoryData);
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
                    {data && !isloading && (
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

                                    <div className="flex left-50 items-center">
                                        <button
                                            onClick={handleClick}
                                            className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg"
                                        >
                                            Champions
                                        </button>
                                    </div>
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