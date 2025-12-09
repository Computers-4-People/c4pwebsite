import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiPackage, FiCheck, FiCalendar, FiBarChart2, FiEye } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import JSZip from 'jszip';
import Certificate from '../components/certificates/Certificate';
import '../components/certificates/certificate.css';

function Champions() {
    const [inventoryData, setInventoryData] = useState([]);
    const [allInventoryData, setAllInventoryData] = useState([]);
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState('all');
    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(null);

    const championResp = JSON.parse(sessionStorage.getItem('championResp')) || {};
    const companyName = championResp.Company || `${championResp.First_Name} ${championResp.Last_Name}`;
    const firstName = championResp.First_Name || 'Valued';

    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    useEffect(() => {
        fetchDonorData();
    }, []);

    useEffect(() => {
        // TEMPORARILY DISABLED - Fetch testimonials after inventory data is loaded
        // if (allInventoryData.length > 0) {
        //     fetchTestimonials().finally(() => {
        //         // Turn off loading after testimonials are fetched
        //         setLoading(false);
        //     });
        // } else if (donations.length > 0 && allInventoryData.length === 0 && loading) {
        //     // If we have donations but no inventory, turn off loading
        //     setLoading(false);
        // }

        // Turn off loading when inventory data is loaded (testimonials disabled)
        if (allInventoryData.length > 0 || (donations.length > 0 && allInventoryData.length === 0)) {
            setLoading(false);
        }
    }, [allInventoryData, donations]);

    const fetchTestimonials = async () => {
        try {
            // Wait for inventory data to be loaded first
            if (allInventoryData.length === 0) {
                return;
            }

            // Get unique recipient IDs from this champion's donated computers
            // Recipient is a lookup field, so it returns an object with ID property
            const recipientIds = [...new Set(
                allInventoryData
                    .map(item => {
                        // Handle both object format {ID: "123"} and direct ID
                        if (typeof item.Recipient === 'object' && item.Recipient !== null) {
                            return item.Recipient.ID || item.Recipient.id;
                        }
                        return item.Recipient;
                    })
                    .filter(id => id && id !== 'N/A')
            )];

            if (recipientIds.length === 0) {
                return;
            }

            // Use GET with query params (POST wasn't working)
            // Request high limit to get ALL check-in forms for client-side filtering
            const recipientIdsParam = recipientIds.join(',');
            const response = await axios.get(`${API_BASE_URL}/api/check-in-forms`, {
                params: {
                    recipientIds: recipientIdsParam,
                    limit: 10000  // High limit to get all forms, we'll filter client-side
                }
            });

            const allTestimonials = response.data || [];

            // Get set of recipient IDs from this donor's inventory
            const recipientIdsSet = new Set(allInventoryData.map(item => {
                if (typeof item.Recipient === 'object' && item.Recipient !== null) {
                    return item.Recipient.ID || item.Recipient.id;
                }
                return item.Recipient;
            }).filter(id => id && id !== 'N/A'));

            // Filter to only testimonials from THIS donor's recipients
            const matchingTestimonials = allTestimonials.filter(testimonial => {
                const applicationId = testimonial.Application?.id || testimonial.Application;
                return recipientIdsSet.has(applicationId);
            });

            // Filter to only testimonials that can be shared with name AND have applicant data
            const shareableTestimonials = matchingTestimonials.filter(testimonial => {
                const canShareWithName = testimonial.Can_we_share_this_response_publicly === "Yes (you can include my name)";
                const hasApplicantData = testimonial.applicant?.First_Name;
                return canShareWithName && hasApplicantData;
            });

            // Add donor IDs to matched testimonials
            const testimonialsWithDonorId = shareableTestimonials.map(testimonial => {
                const applicationId = testimonial.Application?.id || testimonial.Application;
                const inventoryItem = allInventoryData.find(item => {
                    const recipientId = typeof item.Recipient === 'object' ? (item.Recipient.ID || item.Recipient.id) : item.Recipient;
                    return recipientId === applicationId;
                });

                return {
                    ...testimonial,
                    donorId: inventoryItem?.Donation_ID || 'Unknown'
                };
            });

            // Take top 3
            const topThree = testimonialsWithDonorId.slice(0, 3);

            setTestimonials(topThree);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

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
                        let computers = [];
                        try {
                            const inventoryResp = await axios.get(`${API_BASE_URL}/api/computer-inventory`, {
                                params: { searchField: 'Donor_ID', searchValue: donorId }
                            });
                            computers = inventoryResp.data || [];
                            console.log(`Found ${computers.length} computers for donor ${donorId}`);
                        } catch (inventoryErr) {
                            if (inventoryErr.response?.status === 404) {
                                console.log(`No inventory found for Donor_ID ${donorId} (404) - items may not be entered yet`);
                                computers = [];
                            } else {
                                throw inventoryErr; // Re-throw other errors
                            }
                        }

                        // Add donor ID to each inventory item
                        const computersWithDonationInfo = computers.map(computer => ({
                            ...computer,
                            Donation_ID: donor.Donor_ID
                        }));

                        allComputers.push(...computersWithDonationInfo);
                    } catch (err) {
                        console.error(`Error fetching data for donor ${donorId}:`, err);
                    }
                }

                console.log(`Total computers across all donations: ${allComputers.length}`);
                setAllInventoryData(allComputers);
                setInventoryData(allComputers);

                // Calculate stats across ALL donations
                const totalWeight = allComputers.reduce((sum, item) => sum + (parseFloat(item.Weight) || 0), 0);

                // Calculate percentage donated (computers with Date_Donated vs Date_Recycled)
                const donatedCount = allComputers.filter(item => item.Date_Donated && item.Date_Donated !== 'N/A').length;
                const donatedPercentage = allComputers.length > 0
                    ? Math.round((donatedCount / allComputers.length) * 100)
                    : 0;

                setStats({
                    totalComputers: allComputers.length,
                    totalWeight: totalWeight.toFixed(2),
                    donatedPercentage,
                    totalDonations: donorRecords.length
                });
            } else {
                console.log('No donation records found for this email');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching donor data:', error);
            console.error('Error details:', error.response?.data);
            setLoading(false);
        }
        // Note: Don't set loading to false in success case if we have data
        // Let the testimonials useEffect handle it after testimonials load
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

        const headers = ['Manufacturer', 'Model', 'Serial #', 'Barcode', 'Computer Type', 'Weight'];
        const rows = inventoryData.map(item => {
            // Handle Manufacturer dropdown field
            const manufacturer = typeof item.Manufacturer === 'string'
                ? item.Manufacturer
                : (item.Manufacturer?.display_value || item.Manufacturer?.[0] || '');

            return [
                manufacturer,
                item.Model || '',
                item.System_Serial_Number || '',
                item.Barcode_Save || '',
                item.Computer_Type || '',
                item.Weight || ''
            ];
        });

        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleViewCertificate = async (itemId) => {
        setGeneratingPdf(itemId);

        try {
            // Fetch certificate data
            const response = await fetch(`${API_BASE_URL}/api/certificate/${itemId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch certificate data');
            }

            const certData = await response.json();

            // Create temporary container that's hidden but still renderable
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'fixed';
            tempContainer.style.top = '-10000px';
            tempContainer.style.left = '0';
            tempContainer.style.width = '8.5in';
            tempContainer.style.visibility = 'hidden';
            tempContainer.style.opacity = '0';
            tempContainer.style.pointerEvents = 'none';
            document.body.appendChild(tempContainer);

            // Render Certificate component
            const root = ReactDOM.createRoot(tempContainer);

            // Use a promise to wait for render
            await new Promise((resolve) => {
                root.render(<Certificate data={certData} />);
                // Wait for render and CSS to apply
                setTimeout(resolve, 300);
            });

            // Get the actual certificate container element
            const certElement = tempContainer.querySelector('.certificate-container');

            if (!certElement) {
                throw new Error('Certificate element not found after rendering');
            }

            // Generate PDF with serial number in filename
            const serialNumber = certData.hardware?.systemSerial || itemId;
            const pdfTitle = `${serialNumber} - Data Certificate`;
            const filename = `${pdfTitle}.pdf`;

            const opt = {
                margin: 0.2,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait',
                    putOnlyUsedFonts: true,
                    compress: true
                }
            };

            // Generate the PDF and get the jsPDF instance to set metadata
            const pdf = await html2pdf().set(opt).from(certElement).toPdf().get('pdf');

            // Set PDF metadata
            pdf.setProperties({
                title: pdfTitle,
                subject: 'Data Erasure Certificate',
                author: 'Computers 4 People',
                keywords: 'certificate, data erasure, NIST',
                creator: 'Computers 4 People Portal'
            });

            // Create blob with proper type
            const pdfBlob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf;name=' + filename }));

            // Open in new tab - this will show the title from metadata
            const newWindow = window.open(blobUrl, '_blank');

            // Set download filename using document.title (some browsers respect this)
            if (newWindow) {
                setTimeout(() => {
                    try {
                        newWindow.document.title = pdfTitle;
                    } catch (e) {
                        // Cross-origin restriction, ignore
                    }
                }, 100);
            }

            // Cleanup
            root.unmount();
            document.body.removeChild(tempContainer);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setGeneratingPdf(null);
        }
    };

    const handleDownloadCertificate = async (itemId) => {
        setGeneratingPdf(itemId);

        try {
            // Fetch certificate data
            const response = await fetch(`${API_BASE_URL}/api/certificate/${itemId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch certificate data');
            }

            const certData = await response.json();

            // Create temporary container
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'fixed';
            tempContainer.style.top = '-10000px';
            tempContainer.style.left = '0';
            tempContainer.style.width = '8.5in';
            tempContainer.style.visibility = 'hidden';
            tempContainer.style.opacity = '0';
            tempContainer.style.pointerEvents = 'none';
            document.body.appendChild(tempContainer);

            // Render Certificate component
            const root = ReactDOM.createRoot(tempContainer);

            await new Promise((resolve) => {
                root.render(<Certificate data={certData} />);
                setTimeout(resolve, 300);
            });

            const certElement = tempContainer.querySelector('.certificate-container');

            if (!certElement) {
                throw new Error('Certificate element not found after rendering');
            }

            // Generate PDF with serial number in filename
            const serialNumber = certData.hardware?.systemSerial || itemId;
            const filename = `${serialNumber} - Data Certificate.pdf`;

            const opt = {
                margin: 0.2,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Download directly
            await html2pdf().set(opt).from(certElement).save();

            // Cleanup
            root.unmount();
            document.body.removeChild(tempContainer);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setGeneratingPdf(null);
        }
    };

    const downloadAllPDFs = async () => {
        if (inventoryData.length === 0) {
            alert('No certificates available to download');
            return;
        }

        const zip = new JSZip();
        const folder = zip.folder('Data_Certificates');

        alert(`Generating ${inventoryData.length} certificates. This may take a moment...`);

        try {
            // Generate PDFs for each inventory item
            for (let i = 0; i < inventoryData.length; i++) {
                const item = inventoryData[i];

                // Fetch certificate data
                const response = await fetch(`${API_BASE_URL}/api/certificate/${item.ID}`);
                if (!response.ok) continue;

                const certData = await response.json();

                // Create temporary container
                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'fixed';
                tempContainer.style.top = '-10000px';
                tempContainer.style.left = '0';
                tempContainer.style.width = '8.5in';
                tempContainer.style.visibility = 'hidden';
                document.body.appendChild(tempContainer);

                // Render Certificate component
                const root = ReactDOM.createRoot(tempContainer);
                root.render(<Certificate data={certData} />);
                await new Promise(resolve => setTimeout(resolve, 300));

                const certElement = tempContainer.querySelector('.certificate-container');
                if (!certElement) continue;

                // Use serial number in filename
                const serialNumber = certData.hardware?.systemSerial || item.ID;
                const filename = `${serialNumber} - Data Certificate.pdf`;

                const opt = {
                    margin: 0.2,
                    filename: filename,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                const pdfBlob = await html2pdf().set(opt).from(certElement).output('blob');
                folder.file(filename, pdfBlob);

                // Cleanup
                root.unmount();

                // Clean up
                document.body.removeChild(tempContainer);
            }

            // Generate and download the zip file
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipUrl = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = `${companyName.replace(/\s+/g, '_')}_Data_Certificates.zip`;
            link.click();
            URL.revokeObjectURL(zipUrl);

            alert('All certificates downloaded successfully!');
        } catch (error) {
            console.error('Error generating PDFs:', error);
            alert('Failed to generate some certificates. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-20 font-subtitle">
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
                            className="flex items-center gap-2 bg-c4p hover:bg-c4p-hover text-brand-black px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            <FiDownload className="text-xl" />
                            Download Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-c4p mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading your dashboard...</p>
                        </div>
                    </div>
                ) : (
                    <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Computers</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats?.totalComputers || 0}</p>
                            </div>
                            <div className="bg-neutral-100 p-4 rounded-full">
                                <FiPackage className="text-3xl text-c4p-dark" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Weight</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats?.totalWeight || 0} <span className="text-2xl text-gray-600">lbs</span></p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FiBarChart2 className="text-3xl text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Donated</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats?.donatedPercentage || 0}<span className="text-2xl text-gray-600">%</span></p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FiCheck className="text-3xl text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Donations</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{stats?.totalDonations || 0}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-full">
                                <FiCheck className="text-3xl text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section - TEMPORARILY DISABLED */}
                {/* {testimonials.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Recipients of Your Computers Are Saying</h2>
                        <p className="text-sm text-gray-600 mb-6 italic">These individuals have agreed to share their name and testimonial publicly.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => {
                                // Get name and city from Computer Application (Contact record)
                                const firstName = testimonial.applicant?.First_Name;
                                const city = testimonial.applicant?.Mailing_City;
                                const displayName = city ? `${firstName} from ${city}` : firstName;

                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="text-3xl">💬</div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    {displayName}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {testimonial.Date && new Date(testimonial.Date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 italic">
                                            "{testimonial.Testimonial1 || testimonial.Testimonial || testimonial.Feedback || testimonial.Comments || 'Thank you for helping me get connected!'}"
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )} */}

                {/* Impact Message */}
                <div className="bg-gradient-to-r from-c4p-dark to-c4p-darker rounded-xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <FiCheck className="text-3xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Thank You for Your Impact!</h2>
                            <p className="text-green-50 text-lg">
                                Your generous donation of <span className="font-bold">{stats?.totalComputers || 0} computers</span> has helped bridge the digital divide.
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
                                    We have records of your donation, but inventory details are not yet available.
                                    This may be because items have not been picked up or entered into inventory yet, or were donated anonymously.
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
                                        className="bg-white text-gray-900 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-c4p focus:ring-2 focus:ring-green-200 outline-none"
                                    >
                                        <option value="all">All Donations ({stats?.totalComputers || 0} computers)</option>
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
                        {inventoryData.length === 0 ? (
                            <div className="text-center py-20">
                                <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No computers found in inventory</p>
                            </div>
                        ) : (
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Manufacturer</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Model</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Serial #</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Barcode</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Weight</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <div className="flex flex-col gap-2">
                                                <span>Data Certificates</span>
                                                <button
                                                    onClick={downloadAllPDFs}
                                                    className="inline-flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-all whitespace-nowrap"
                                                    title="Download all certificates as ZIP"
                                                >
                                                    <FiDownload className="text-xs" />
                                                    Download All
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inventoryData.map((item, index) => {
                                        // Handle Manufacturer dropdown field (might be string, object, or array)
                                        const manufacturer = typeof item.Manufacturer === 'string'
                                            ? item.Manufacturer
                                            : (item.Manufacturer?.display_value || item.Manufacturer?.[0] || 'N/A');

                                        return (
                                        <tr key={item.ID || index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{manufacturer}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.Model || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-mono">{item.System_Serial_Number || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-mono">{item.Barcode_Save || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Computer_Type || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{item.Weight ? `${item.Weight} lbs` : 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewCertificate(item.ID)}
                                                        disabled={generatingPdf === item.ID}
                                                        className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-2 py-1.5 rounded text-sm transition-all"
                                                        title="View Certificate"
                                                    >
                                                        {generatingPdf === item.ID ? (
                                                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <FiEye className="text-sm" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownloadCertificate(item.ID)}
                                                        disabled={generatingPdf === item.ID}
                                                        className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-2 py-1.5 rounded text-sm transition-all"
                                                        title="Download Certificate"
                                                    >
                                                        {generatingPdf === item.ID ? (
                                                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <FiDownload className="text-sm" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        );
                                    })}
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
                </>
                )}
            </div>
        </div>
    );
}

export default Champions;
