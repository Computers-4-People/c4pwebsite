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
        const urlJwt = searchParams.get('jwt');

        if (!urlJwt) {
            setError('Authentication required. Please use the link from your email.');
            return;
        }

        if (!urlRecordId) {
            setError('Invalid access. Record ID is missing.');
            return;
        }

        // Validate JWT token
        const apiValidation = await axios.get(`${API_BASE_URL}/api/verify-jwt?urlJwt=${urlJwt}`);
        console.log('apiValidation:', apiValidation.data);

        if (!apiValidation.data.valid) {
            setError('Invalid or expired authentication token. Please request a new login link.');
            return;
        }

        // Verify that the recordId in the JWT matches the URL recordId for security
        if (apiValidation.data.user.recordID !== urlRecordId) {
            setError('Access denied. Authentication token does not match the requested record.');
            return;
        }

        // If all validations pass, proceed
        setRecordId(urlRecordId);
        setJwt(urlJwt);

        setTimeout(() => {
            fetchData();
        }, 0);

    } catch (error) {
        console.error('Error during authentication:', error);
        if (error.response?.status === 401) {
            setError('Invalid or expired authentication token. Please request a new login link.');
        } else {
            setError('Authentication error. Please try again or request a new login link.');
        }
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
                setModule(newModule);
                console.log(newModule);
                console.log(module);
                module = newModule;

                // Fetch inventory data based on Applicant ID or Donor_ID
                if (module === 'Contacts') {
                    if (response.data.Status === 'Client') {
                        fetchInventoryByRecipientId(recordId);
                    }
                } else if (module === 'Computer_Donors') {
                    
                    const donorId = response.data.Donor_ID;
                    console.log('donorId', donorId);
                    if (donorId) {
                        fetchInventoryByDonorId(donorId);
                    }
                }
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

    const fetchInventoryByRecipientId = async (recipientId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                params: { searchField: 'Recipient', searchValue: recipientId },
            });
            console.log('Inventory Data Response:', response.data);
            if (response.data && response.data.length > 0) {
                setInventoryData(response.data);
                console.log('Inventory Data:', response.data);
            } else {
                console.log('No inventory data found for this recipient.');
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const fetchInventoryByDonorId = async (donorId) => {
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

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl my-10 sm:my-16">
//                 {!data ? (
//                     <>
//                         {/* <h2 className="text-2xl font-bold text-center mb-6">The Digital Portal</h2> */}
//                         {/* <select
//                             className="border border-gray-300 rounded p-2 mb-4 w-full sm:w-1/2 mx-auto block"
//                             value={module}
//                             onChange={(e) => setModule(e.target.value)}
//                         >
//                             <option value="Contacts">Applicants</option>
//                             <option value="Computer_Donors">Computer Donors</option>
//                         </select> */}
//                         {/* <input
//                             type="text"
//                             placeholder="Enter ID"
//                             value={recordId}
//                             onChange={(e) => setRecordId(e.target.value)}
//                             className="border border-gray-300 rounded p-3 w-full mb-4"
//                         /> */}
//                         {/* <button
//                             onClick={fetchData}
//                             className="w-full sm:w-1/2 p-3 font-semibold text-white rounded hover:bg-green-700 transition-colors duration-300 mx-auto block"
//                             style={{ backgroundColor: '#17de43' }}
//                         >
//                             Fetch Details
//                         </button> */}
//                         {/* {error && <p className="text-red-500 mt-4 text-center">{error}</p>} */}
//                     </>
//                 ) : module === 'Contacts' ? (
//                     <div className="applicant-info">
//                         <h2 className="text-center text-3xl font-bold mb-4 text-c4p">
//                             Applicant Tracker
//                         </h2>
//                         <ProgressBar status={data.Status} />

//                         <div className="bg-gray-100 p-4 rounded mb-4">
//                             {renderStatusMessage()}
//                         </div>
//                         <div className="p-4 bg-white rounded shadow w-full">
//                             <h2 className="text-2xl font-bold text-center mb-6 text-c4p">
//                                 Applicant Information
//                             </h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <p>
//                                     <strong>Name:</strong> {data.Full_Name || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Email:</strong> {data.Email || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Phone:</strong> {data.Phone || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Nominating Organization:</strong>{' '}
//                                     {data.Nominating_Organization || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Recommender Name:</strong>{' '}
//                                     {`${data.Recommenders_Name || ''} ${
//                                         data.Recommenders_Last_Name || ''
//                                     }`.trim() || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Recommender Email:</strong>{' '}
//                                     {data.Recommenders_Email || 'N/A'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="p-4 bg-gray-100 rounded shadow w-full mt-4">
//                             <h3 className="text-xl font-semibold text-c4p mb-2">
//                                 Computer Request Details
//                             </h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 {data.Laptop_Quantity && (
//                                     <p>
//                                         <strong>Laptop Quantity:</strong> {data.Laptop_Quantity}
//                                     </p>
//                                 )}
//                                 {data.Desktop_Quantity && (
//                                     <p>
//                                         <strong>Desktop Quantity:</strong> {data.Desktop_Quantity}
//                                     </p>
//                                 )}
//                                 {data.Tablet_Quantity && (
//                                     <p>
//                                         <strong>Tablet Quantity:</strong> {data.Tablet_Quantity}
//                                     </p>
//                                 )}
//                                 {/* Add more quantities if needed */}
//                             </div>
//                         </div>

//                         {/* Display Assigned Computer Section if Applicant is a Client */}
//                         {data.Status === 'Client' && inventoryData.length > 0 && (
//                             <div className="p-4 bg-gray-200 rounded shadow w-full mt-4">
//                                 <h3 className="text-xl font-semibold text-c4p mb-2">
//                                     Assigned Computer(s)
//                                 </h3>
//                                 <div className="space-y-4">
//                                     {inventoryData.map((item) => (
//                                         <div key={item.ID} className="bg-white p-4 rounded shadow">
//                                             <p>
//                                                 <strong>Model:</strong> {item.Model || 'N/A'}
//                                             </p>
//                                             <p>
//                                                 <strong>Status:</strong> {item.Status || 'N/A'}
//                                             </p>
//                                             <p>
//                                                 <strong>Computer Type:</strong>{' '}
//                                                 {item.Computer_Type || 'N/A'}
//                                             </p>
//                                             <p>
//                                                 <strong>Location:</strong> {item.Location || 'N/A'}
//                                             </p>
//                                             {/* Add more fields as needed */}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <button
//                             onClick={() => {
//                                 setData(null);
//                                 setInventoryData([]);
//                             }}
//                             className="w-full sm:w-1/2 mt-6 p-3 font-semibold text-white rounded hover:bg-green-700 transition-colors duration-300 mx-auto block"
//                             style={{ backgroundColor: '#17de43' }}
//                         >
//                             Back to Search
//                         </button>
//                     </div>
//                 ) : (
//                     // Donor details section
//                     <div className="donor-info">
//                         <h2 className="text-center text-3xl font-bold mb-4 text-c4p">
//                             Donor Details
//                         </h2>
//                         <div className="p-4 bg-green-50 rounded shadow w-full">
//                             <h2 className="text-2xl font-bold mb-4 text-c4p">
//                                 Computer Donor Information
//                             </h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <p>
//                                     <strong>Company:</strong> {data.Company || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Contact Person:</strong> {data.Name || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Email:</strong> {data.Email || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Phone:</strong> {data.Phone || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Location:</strong> {data.Location || 'N/A'}
//                                 </p>
//                                 <p>
//                                     <strong>Mailing Address:</strong>{' '}
//                                     {`${data.Mailing_Street || ''}, ${data.Mailing_City || ''}, ${
//                                         data.Mailing_State || ''
//                                     } ${data.Mailing_Zip || ''}`.trim() || 'N/A'}
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Display Donated Computers Section */}
//                         {inventoryData.length > 0 && (
//                             <div className="p-4 bg-green-100 rounded shadow w-full mt-4">
//                                 {/* Display Total Computers Donated and Total Weight */}
//                                 <div className="flex flex-col sm:flex-row justify-around mb-6">
//                                     <div className="text-center mb-4 sm:mb-0">
//                                         <p className="text-4xl font-bold text-c4p">
//                                             {inventoryData.length}
//                                         </p>
//                                         <p className="text-lg">Total Computers Donated</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p className="text-4xl font-bold text-c4p">
//                                             {calculateTotalWeight()} lbs
//                                         </p>
//                                         <p className="text-lg">Total Weight</p>
//                                     </div>
//                                 </div>

//                                 {/* Download CSV Button */}
//                                 <div className="flex justify-end mb-4">
//                                     <button
//                                         onClick={downloadCSV}
//                                         className="px-4 py-2 bg-c4p text-white rounded hover:bg-green-700 transition-colors duration-300"
//                                     >
//                                         Download CSV
//                                     </button>
//                                 </div>

//                                 <h3 className="text-xl font-semibold text-c4p mb-4">
//                                     Donated Computers
//                                 </h3>
//                                 <div className="overflow-x-auto">
//                                     <table className="min-w-full bg-white">
//                                         <thead>
//                                             <tr>
//                                                 <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
//                                                     Model
//                                                 </th>
//                                                 <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
//                                                     Computer Type
//                                                 </th>
//                                                 <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
//                                                     Date Added
//                                                 </th>
//                                                 <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
//                                                     Date Donated
//                                                 </th>
//                                                 <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
//                                                     Date Recycled
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {inventoryData.map((item, index) => (
//                                                 <tr
//                                                     key={item.ID}
//                                                     className={index % 2 === 0 ? 'bg-gray-100' : ''}
//                                                 >
//                                                     <td className="py-2 px-4 border-b border-gray-200">
//                                                         {item.Model || 'N/A'}
//                                                     </td>
//                                                     <td className="py-2 px-4 border-b border-gray-200">
//                                                         {item.Computer_Type || 'N/A'}
//                                                     </td>
//                                                     <td className="py-2 px-4 border-b border-gray-200">
//                                                         {item.Date_Added || 'N/A'}
//                                                     </td>
//                                                     <td className="py-2 px-4 border-b border-gray-200">
//                                                         {item.Date_Donated || 'N/A'}
//                                                     </td>
//                                                     <td className="py-2 px-4 border-b border-gray-200">
//                                                         {item.Date_Recycled || 'N/A'}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}

//                         <button
//                             onClick={() => {
//                                 setData(null);
//                                 setInventoryData([]);
//                             }}
//                             className="w-full sm:w-1/2 mt-6 p-3 font-semibold text-white rounded hover:bg-green-700 transition-colors duration-300 mx-auto block"
//                             style={{ backgroundColor: '#17de43' }}
//                         >
//                             Back to Search
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

return (


    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

        {data && 
        <div className="flex justify-center items-start gap-x-4 mt-10 sm:mt-16">
        <PortalDropdown className="flex-shrink-0" type={sessionStorage.getItem('type')}/>
        </div>
        }


        {data && (
            
            
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl my-10 sm:my-16">
                
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

                        {/* <button
                            onClick={() => {
                                setData(null);
                                setInventoryData([]);
                            }}
                            className="w-full sm:w-1/2 mt-6 p-3 font-semibold text-white rounded hover:bg-green-700 transition-colors duration-300 mx-auto block"
                            style={{ backgroundColor: '#17de43' }}
                        >
                            Back to Search
                        </button> */}
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
                    
                    <div className="donor-info">
                        <h2 className="text-center text-3xl font-bold mb-4 text-c4p">
                            Donor Details
                        </h2>
                        <div className="p-4 bg-green-50 rounded shadow w-full">
                            <h2 className="text-2xl font-bold mb-4 text-c4p">
                                Computer Donor Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <p>
                                    <strong>Company:</strong> {data.Company || 'N/A'}
                                </p>
                                <p>
                                    <strong>Contact Person:</strong> {data.Name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Email:</strong> {data.Email || 'N/A'}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {data.Phone || 'N/A'}
                                </p>
                                <p>
                                    <strong>Location:</strong> {data.Location || 'N/A'}
                                </p>
                                <p>
                                    <strong>Mailing Address:</strong>{' '}
                                    {`${data.Mailing_Street || ''}, ${data.Mailing_City || ''}, ${
                                        data.Mailing_State || ''
                                    } ${data.Mailing_Zip || ''}`.trim() || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {inventoryData.length > 0 && (
                            <div className="p-4 bg-green-100 rounded shadow w-full mt-4">
                                <div className="flex flex-col sm:flex-row justify-around mb-6">
                                    <div className="text-center mb-4 sm:mb-0">
                                        <p className="text-4xl font-bold text-c4p">
                                            {inventoryData.length}
                                        </p>
                                        <p className="text-lg">Total Computers Donated</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-c4p">
                                            {calculateTotalWeight()} lbs
                                        </p>
                                        <p className="text-lg">Total Weight</p>
                                    </div>
                                </div>

                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={downloadCSV}
                                        className="px-4 py-2 bg-c4p text-white rounded hover:bg-green-700 transition-colors duration-300"
                                    >
                                        Download CSV
                                    </button>
                                </div>

                                <h3 className="text-xl font-semibold text-c4p mb-4">
                                    Donated Computers
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
                                                    Model
                                                </th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
                                                    Computer Type
                                                </th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
                                                    Date Added
                                                </th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
                                                    Date Donated
                                                </th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">
                                                    Date Recycled
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryData.map((item, index) => (
                                                <tr
                                                    key={item.ID}
                                                    className={index % 2 === 0 ? 'bg-gray-100' : ''}
                                                >
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {item.Model || 'N/A'}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {item.Computer_Type || 'N/A'}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {item.Date_Added || 'N/A'}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {item.Date_Donated || 'N/A'}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {item.Date_Recycled || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* <button
                            onClick={() => {
                                setData(null);
                                setInventoryData([]);
                            }}
                            className="w-full sm:w-1/2 mt-6 p-3 font-semibold text-white rounded hover:bg-green-700 transition-colors duration-300 mx-auto block"
                            style={{ backgroundColor: '#17de43' }}
                        >
                            Back to Search


                        </button> */}
                        {/* <button
                            onClick={handleClick}
                            className="fixed right-4 top-20 bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center"
                        >
                            Champions
                        </button> */}

                        
                    </div>
                )}
            </div>

            
        )}
    </div>
);
}

export default Portal;