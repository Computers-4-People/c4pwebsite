import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

function ApplicantDetails() {
    const [recordId, setRecordId] = useState('');
    const [module, setModule] = useState('Contacts'); // Default to "Contacts" for Applicants
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [inventoryData, setInventoryData] = useState([]); // State for computer inventory data

    const fetchData = async () => {
        setError('');
        setData(null);
        setInventoryData([]);

        if (!recordId) {
            setError("Please enter an ID.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/${module}/${recordId}`);
            if (response.data.error) {
                setError("Record not found.");
            } else {
                setData(response.data);

                // Fetch inventory data based on Applicant ID or Donor_ID
                if (module === "Contacts") {
                    if (response.data.Status === "Client") {
                        fetchInventoryByRecipientId(recordId);
                    }
                } else if (module === "Computer_Donors") {
                    const donorId = response.data.Donor_ID;
                    if (donorId) {
                        fetchInventoryByDonorId(donorId);
                    }
                }
            }
        } catch (error) {
            setError("Network Error: Unable to retrieve data.");
        }
    };

    const fetchInventoryByRecipientId = async (recipientId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/computer-inventory`, {
                params: { searchField: "Recipient", searchValue: recipientId }
            });
            if (response.data && response.data.length > 0) {
                setInventoryData(response.data);
            } else {
                console.log("No inventory data found for this recipient.");
            }
        } catch (error) {
            console.error("Error fetching inventory data:", error.message);
        }
    };

    const fetchInventoryByDonorId = async (donorId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/computer-inventory`, {
                params: { searchField: "Donor_ID", searchValue: donorId }
            });
            if (response.data && response.data.length > 0) {
                setInventoryData(response.data);
            } else {
                console.log("No inventory data found for this donor.");
            }
        } catch (error) {
            console.error("Error fetching inventory data:", error.message);
        }
    };

    const renderStatusMessage = () => {
        if (module !== 'Contacts' || !data) return null;

        const { Status, Denial_Reason, Nominating_Organization } = data;

        // Map CRM statuses to the new statuses you've provided
        switch (Status) {
            case "Applicants No Recommendation":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Submitted</h3>
                        <p>We have your application, we are now waiting on the recommendation letter from your nominating recommender (listed below). We will not review your application until we receive this.</p>
                    </div>
                );
            case "Recommendation Received":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Recommendation Received</h3>
                        <p>We have received the recommendation letter from your recommender!</p>
                    </div>
                );
            case "Applicants to approve":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Pending Review</h3>
                        <p>We have everything we need! Our application committee is reviewing your application, please be patient. We will notify you once we have made a decision.</p>
                    </div>
                );
            case "Denied Applicant":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Denied</h3>
                        <p><strong>Reason(s):</strong> {Denial_Reason || "Not specified"}</p>
                        <p>Possible reasons for denial: Not located in NJ, NYC, MA; no recommendation received; recommendation is not from a valid non-profit; don’t meet the income requirements.</p>
                    </div>
                );
            case "Approved Applicants":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Application Approved</h3>
                        <p>You have been approved for a computer, and we will be contacting your recommender shortly to arrange the drop-off. You will be notified once delivered.</p>
                    </div>
                );
            case "Client":
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Delivered</h3>
                        <p>We are happy to inform you that we dropped off the requested computer to {Nominating_Organization || 'your nominating organization'}.</p>
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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl my-20">
                {!data ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6">The Digital Portal</h2>
                        <select
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                        >
                            <option value="Contacts">Applicants</option>
                            <option value="Computer_Donors">Computer Donors</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter ID"
                            value={recordId}
                            onChange={(e) => setRecordId(e.target.value)}
                            className="border border-gray-300 rounded p-3 w-full mb-4"
                        />
                        <button
                            onClick={fetchData}
                            className="w-full p-3 font-semibold text-white rounded hover:bg-green-700"
                            style={{ backgroundColor: "#17de43" }}
                        >
                            Fetch Details
                        </button>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </>
                ) : (
                    module === 'Contacts' ? (
                        <div className="applicant-info">
                            <h2 className="text-center text-3xl font-bold mb-4 text-c4p">Applicant Tracker</h2>
                            <ProgressBar status={data.Status} />

                            <div className="bg-gray-100 p-4 rounded mb-4">
                                {renderStatusMessage()}
                            </div>
                            <div className="p-4 bg-white rounded shadow w-full">
                                <h2 className="text-2xl font-bold text-center mb-6 text-c4p">Applicant Information</h2>
                                <p><strong>Name:</strong> {data.Full_Name || 'N/A'}</p>
                                <p><strong>Email:</strong> {data.Email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {data.Phone || 'N/A'}</p>
                                <p><strong>Nominating Organization:</strong> {data.Nominating_Organization || 'N/A'}</p>
                                <p><strong>Recommender Name:</strong> {`${data.Recommenders_Name || ''} ${data.Recommenders_Last_Name || ''}`.trim()}</p>
                                <p><strong>Recommender Email:</strong> {data.Recommenders_Email || 'N/A'}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded shadow w-full mt-4">
                                <h3 className="text-xl font-semibold text-c4p mb-2">Computer Request Details</h3>
                                {data.Laptop_Quantity && <p><strong>Laptop Quantity:</strong> {data.Laptop_Quantity}</p>}
                                {data.Desktop_Quantity && <p><strong>Desktop Quantity:</strong> {data.Desktop_Quantity}</p>}
                                {data.Tablet_Quantity && <p><strong>Tablet Quantity:</strong> {data.Tablet_Quantity}</p>}
                                {/* More quantities if needed */}
                            </div>

                            {/* Display Assigned Computer Section if Applicant is a Client */}
                            {data.Status === "Client" && inventoryData.length > 0 && (
                                <div className="p-4 bg-gray-200 rounded shadow w-full mt-4">
                                    <h3 className="text-xl font-semibold text-c4p mb-2">Assigned Computer(s)</h3>
                                    {inventoryData.map((item) => (
                                        <div key={item.ID} className="mb-4">
                                            <p><strong>Model:</strong> {item.Model || 'N/A'}</p>
                                            <p><strong>Status:</strong> {item.Status || 'N/A'}</p>
                                            <p><strong>Computer Type:</strong> {item.Computer_Type || 'N/A'}</p>
                                            <p><strong>Location:</strong> {item.Location || 'N/A'}</p>
                                            {/* Add more fields as needed */}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => { setData(null); setInventoryData([]); }}
                                className="w-full mt-6 p-3 font-semibold text-white rounded hover:bg-green-700"
                                style={{ backgroundColor: "#17de43" }}
                            >
                                Back to Search
                            </button>
                        </div>
                    ) : (
                        // Donor details section
                        <div className="donor-info">
                            <h2 className="text-center text-3xl font-bold mb-4 text-c4p">Donor Details</h2>
                            <div className="p-4 bg-green-50 rounded shadow w-full">
                                <h2 className="text-2xl font-bold mb-4 text-c4p">Computer Donor Information</h2>
                                <p><strong>Company:</strong> {data.Company || 'N/A'}</p>
                                <p><strong>Contact Person:</strong> {data.Name || 'N/A'}</p>
                                <p><strong>Email:</strong> {data.Email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {data.Phone || 'N/A'}</p>
                                <p><strong>Location:</strong> {data.Location || 'N/A'}</p>
                                <p><strong>Mailing Address:</strong> {`${data.Mailing_Street || ''}, ${data.Mailing_City || ''}, ${data.Mailing_State || ''} ${data.Mailing_Zip || ''}`.trim()}</p>
                            </div>

                            {/* Display Donated Computers Section */}
                            {inventoryData.length > 0 && (
                                <div className="p-4 bg-green-100 rounded shadow w-full mt-4">
                                    {/* Display Total Computers Donated and Total Weight */}
                                    <div className="flex justify-around mb-6">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-c4p">{inventoryData.length}</p>
                                            <p className="text-lg">Total Computers Donated</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-c4p">{calculateTotalWeight()} lbs</p>
                                            <p className="text-lg">Total Weight</p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-c4p mb-4">Donated Computers</h3>
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">Model</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">Computer Type</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">Date Added</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">Date Donated</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm text-c4p">Date Recycled</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryData.map((item, index) => (
                                                <tr key={item.ID} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.Model || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.Computer_Type || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.Date_Added || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.Date_Donated || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{item.Date_Recycled || 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <button
                                onClick={() => { setData(null); setInventoryData([]); }}
                                className="w-full mt-6 p-3 font-semibold text-white rounded hover:bg-green-700"
                                style={{ backgroundColor: "#17de43" }}
                            >
                                Back to Search
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ApplicantDetails;
