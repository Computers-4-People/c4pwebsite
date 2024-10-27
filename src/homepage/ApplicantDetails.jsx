import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

function ApplicantDetails() {
    const [recordId, setRecordId] = useState('');
    const [module, setModule] = useState('Contacts'); // Default to "Contacts" for Applicants
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setError('');
        setData(null);

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
            }
        } catch (error) {
            setError("Network Error: Unable to retrieve data.");
        }
    };

    const renderStatusMessage = () => {
        if (module !== 'Contacts' || !data) return null;

        const { Status, Denial_Reason, Nominating_Organization } = data;
        switch (Status) {
            case "Applicants No Recommendation":
                return <p><strong>Application Submitted:</strong> Waiting on recommendation letter...</p>;
            case "Applicants to approve":
                return <p><strong>Pending Review:</strong> Our committee is reviewing...</p>;
            case "Denied Applicant":
                return (
                    <p><strong>Application Denied:</strong> Reason(s): {Denial_Reason || "Not specified"}</p>
                );
            case "Approved Applicants":
                return <p><strong>Application Approved:</strong> Your computer is being prepared.</p>;
            case "Client":
                return (
                    <p><strong>Delivered:</strong> Delivered to {Nominating_Organization || 'organization'}.</p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl my-20">
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
                            <button
                                onClick={() => setData(null)}
                                className="w-full mt-6 p-3 font-semibold text-white rounded hover:bg-green-700"
                                style={{ backgroundColor: "#17de43" }}
                            >
                                Back to Search
                            </button>
                        </div>
                    ) : (
                        <div className="donor-info">
                            <h2 className="text-center text-3xl font-bold mb-4 text-blue-600">Donor Details</h2>
                            <div className="p-4 bg-blue-50 rounded shadow w-full">
                                <h2 className="text-2xl font-bold mb-4 text-blue-800">Computer Donor Information</h2>
                                <p><strong>Company:</strong> {data.Company || 'N/A'}</p>
                                <p><strong>Contact Person:</strong> {data.Name || 'N/A'}</p>
                                <p><strong>Email:</strong> {data.Email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {data.Phone || 'N/A'}</p>
                                <p><strong>Location:</strong> {data.Location || 'N/A'}</p>
                                <p><strong>Mailing Address:</strong> {`${data.Mailing_Street || ''}, ${data.Mailing_City || ''}, ${data.Mailing_State || ''} ${data.Mailing_Zip || ''}`.trim()}</p>
                            </div>
                            <div className="p-4 bg-blue-100 rounded shadow w-full mt-4">
                                <h3 className="text-xl font-semibold text-blue-800 mb-2">Donation Details</h3>
                                {data.Laptop_Quantity && <p><strong>Laptop Quantity:</strong> {data.Laptop_Quantity}</p>}
                                {data.Desktop_Quantity && <p><strong>Desktop Quantity:</strong> {data.Desktop_Quantity}</p>}
                                {data.Tablet_Quantity && <p><strong>Tablet Quantity:</strong> {data.Tablet_Quantity}</p>}
                                {data.Monitor_Quantity && <p><strong>Monitor Quantity:</strong> {data.Monitor_Quantity}</p>}
                                {data.Keyboard_Quantity && <p><strong>Keyboard Quantity:</strong> {data.Keyboard_Quantity}</p>}
                                {data.Mouse_Quantity && <p><strong>Mouse Quantity:</strong> {data.Mouse_Quantity}</p>}
                                {/* More fields if needed */}
                            </div>
                            <button
                                onClick={() => setData(null)}
                                className="w-full mt-6 p-3 font-semibold text-white rounded hover:bg-blue-700"
                                style={{ backgroundColor: "#0074cc" }}
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
