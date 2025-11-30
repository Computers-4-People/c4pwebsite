import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiPackage, FiCheck, FiCalendar, FiBarChart2 } from 'react-icons/fi';

function Champions() {
    const [inventoryData, setInventoryData] = useState([]);
    const [allInventoryData, setAllInventoryData] = useState([]);
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState('all');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalComputers: 0,
        totalWeight: 0,
        thisMonth: 0,
        totalDonations: 0
    });

    const championResp = JSON.parse(sessionStorage.getItem('championResp')) || {};
    const companyName = championResp.Company || `${championResp.First_Name} ${championResp.Last_Name}`;
    const firstName = championResp.First_Name || 'Valued';

    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    useEffect(() => {
        fetchDonorData();
    }, []);

    useEffect(() => {
        filterByDonation();
    }, [selectedDonation, allInventoryData]);

    const filterByDonation = () => {
        if (selectedDonation === 'all') {
            setInventoryData(allInventoryData);
        } else {
            const filtered = allInventoryData.filter(item => item.Donor_ID === selectedDonation);
            setInventoryData(filtered);
        }
    };

    const fetchDonorData = async () => {
        try {
            setLoading(true);

            console.log('Champion data:', championResp);

            // Get the Champion's record ID
            const championId = championResp.id || championResp.ID;
            console.log('Fetching donations for Champion ID:', championId);

            if (!championId) {
                console.error('No Champion ID found in championResp');
                setLoading(false);
                return;
            }

            // Get ALL Computer_Donors records for this champion using the Champion lookup field
            const donorResp = await axios.get(`${API_BASE_URL}/api/championid?Name=${championId}&moduleName=Computer_Donors&param=Champion`);

            console.log('Donor response:', donorResp.data);

            if (donorResp.data?.data && donorResp.data.data.length > 0) {
                const donorRecords = donorResp.data.data;
                setDonations(donorRecords);
                console.log(`Found ${donorRecords.length} donation records`);

                // Get inventory data from ALL donation records
                const allComputers = [];

                for (const donor of donorRecords) {
                    const donorId = donor.Donor_ID;
                    console.log(`Fetching inventory for Donor_ID: ${donorId}`);

                    try {
                        const inventoryResp = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                            params: { searchField: 'Donor_ID', searchValue: donorId }
                        });

                        const computers = inventoryResp.data || [];
                        console.log(`Found ${computers.length} computers for donor ${donorId}`);

                        // Add Date_Picked_Up from the donation record to each inventory item
                        const computersWithPickupDate = computers.map(computer => ({
                            ...computer,
                            Date_Picked_Up: donor.Date_Picked_Up || donor.Pickup_Date || 'N/A'
                        }));

                        allComputers.push(...computersWithPickupDate);
                    } catch (err) {
                        console.error(`Error fetching inventory for donor ${donorId}:`, err);
                    }
                }

                console.log(`Total computers across all donations: ${allComputers.length}`);
                setAllInventoryData(allComputers);
                setInventoryData(allComputers);

                // Calculate stats across ALL donations
                const totalWeight = allComputers.reduce((sum, item) => sum + (parseFloat(item.Weight) || 0), 0);
                const thisMonth = allComputers.filter(item => {
                    const donateDate = new Date(item.Date_Donated);
                    const now = new Date();
                    return donateDate.getMonth() === now.getMonth() &&
                           donateDate.getFullYear() === now.getFullYear();
                }).length;

                setStats({
                    totalComputers: allComputers.length,
                    totalWeight: totalWeight.toFixed(2),
                    thisMonth,
                    totalDonations: donorRecords.length
                });
            } else {
                console.log('No donation records found for this email');
            }
        } catch (error) {
            console.error('Error fetching donor data:', error);
            console.error('Error details:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (inventoryData.length === 0) {
            alert('No data available to download');
            return;
        }

        // Determine filename based on selected donation
        let filename;
        if (selectedDonation === 'all') {
            filename = `${companyName.replace(/\s+/g, '_')}_All_Donations.csv`;
        } else {
            const donationIndex = donations.findIndex(d => d.Donor_ID === selectedDonation);
            const donationDate = donations[donationIndex]?.Entry_Date || donations[donationIndex]?.Date_Donated || 'Unknown';
            filename = `${companyName.replace(/\s+/g, '_')}_Donation_${donationDate}.csv`;
        }

        const headers = ['Model', 'Serial #', 'Barcode', 'Computer Type', 'Date Picked Up', 'Date Donated', 'Date Recycled', 'Weight'];
        const rows = inventoryData.map(item => [
            item.Model || '',
            item.System_Serial_Number || '',
            item.Barcode_Save || '',
            item.Computer_Type || '',
            item.Date_Picked_Up || '',
            item.Date_Donated || '',
            item.Date_Recycled || '',
            item.Weight || ''
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pt-20">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Welcome back, {firstName}!</h1>
                            <p className="text-lg text-gray-600 mt-2">{companyName}</p>
                        </div>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            <FiDownload className="text-xl" />
                            Download Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Computers</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalComputers}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FiPackage className="text-3xl text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Weight</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalWeight} <span className="text-2xl text-gray-600">lbs</span></p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-full">
                                <FiBarChart2 className="text-3xl text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">This Month</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.thisMonth}</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-full">
                                <FiCalendar className="text-3xl text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Donations</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalDonations}</p>
                            </div>
                            <div className="bg-orange-100 p-4 rounded-full">
                                <FiCheck className="text-3xl text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Message */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <FiCheck className="text-3xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Thank You for Your Impact!</h2>
                            <p className="text-green-50 text-lg">
                                Your generous donation of <span className="font-bold">{stats.totalComputers} computers</span> has helped bridge the digital divide.
                                Together, we're empowering communities with technology and promoting environmental sustainability.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer for donations with no inventory */}
                {donations.length > 0 && inventoryData.length === 0 && (
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FiPackage className="text-2xl text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2">About Your Donation Records</h3>
                                <p className="text-blue-800">
                                    We have records of your generous donations, but the individual computer inventory details may not be available.
                                    This could be because these items were part of our old tracking system before we implemented detailed inventory tracking,
                                    or they were donated anonymously. Thank you for your continued support!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Computer Inventory Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Your Donated Computers</h2>
                                <p className="text-gray-300 mt-1">Complete inventory with data erasure certificates</p>
                            </div>
                            {donations.length > 1 && (
                                <div>
                                    <label className="text-white text-sm font-medium mr-3">Filter by Donation:</label>
                                    <select
                                        value={selectedDonation}
                                        onChange={(e) => setSelectedDonation(e.target.value)}
                                        className="bg-white text-gray-900 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                                    >
                                        <option value="all">All Donations ({stats.totalComputers} computers)</option>
                                        {donations.map((donation, index) => {
                                            const donationComputers = allInventoryData.filter(item => item.Donor_ID === donation.Donor_ID);
                                            const donationDate = donation.Entry_Date || donation.Date_Donated || 'N/A';
                                            return (
                                                <option key={donation.Donor_ID} value={donation.Donor_ID}>
                                                    Donation {index + 1} - {donationDate} ({donationComputers.length} computers)
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
                            </div>
                        ) : inventoryData.length === 0 ? (
                            <div className="text-center py-20">
                                <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No computers found in inventory</p>
                            </div>
                        ) : (
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Model</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Serial #</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Barcode</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date Picked Up</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date Donated</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date Recycled</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Weight</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Certificate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inventoryData.map((item, index) => (
                                        <tr key={item.ID || index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.Model || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-mono">{item.System_Serial_Number || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-mono">{item.Barcode_Save || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Computer_Type || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Date_Picked_Up || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Date_Donated || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Date_Recycled || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Weight ? `${item.Weight} lbs` : 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm">
                                                {item.Data_Certificate ? (
                                                    <a
                                                        href={item.Data_Certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                                                    >
                                                        <FiDownload className="text-sm" />
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-300">
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Data Security:</span> All donated computers undergo secure data erasure following NIST 800-88 standards.
                        Certificates of data destruction are available for each device above.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Champions;
