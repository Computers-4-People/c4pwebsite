import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Certificate from '../components/certificates/Certificate';
import '../components/certificates/certificate.css';

export default function CertificatePage() {
    const [searchParams] = useSearchParams();
    const inventoryId = searchParams.get('id');

    const [certificateData, setCertificateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!inventoryId) {
            setError('No inventory ID provided');
            setLoading(false);
            return;
        }

        fetchCertificateData();
    }, [inventoryId]);

    const fetchCertificateData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/certificate/${inventoryId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch certificate data: ${response.statusText}`);
            }

            const data = await response.json();
            setCertificateData(data);
        } catch (err) {
            console.error('Error fetching certificate:', err);
            setError(err.message || 'Failed to load certificate');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        // Set document title for PDF filename suggestion
        const originalTitle = document.title;
        document.title = `Certificate-${certificateData?.reportId || inventoryId}`;

        // Trigger print dialog (user can select Save as PDF)
        setTimeout(() => {
            window.print();
            // Restore original title after print dialog
            setTimeout(() => {
                document.title = originalTitle;
            }, 100);
        }, 100);
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Loading certificate...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Error Loading Certificate</h2>
                <p style={{ color: 'red' }}>{error}</p>
                <p>Inventory ID: {inventoryId || 'Not provided'}</p>
            </div>
        );
    }

    if (!certificateData) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>No Certificate Data</h2>
                <p>Unable to load certificate for inventory ID: {inventoryId}</p>
            </div>
        );
    }

    return (
        <div className="certificate-page">
            {/* Action Bar - Hidden in print */}
            <div className="action-bar" style={{
                position: 'sticky',
                top: 0,
                background: 'white',
                padding: '20px',
                borderBottom: '2px solid #ccc',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}>
                <button
                    onClick={handlePrint}
                    style={{
                        padding: '10px 20px',
                        background: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    🖨️ Print
                </button>
                <button
                    onClick={handleDownload}
                    style={{
                        padding: '10px 20px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    📄 Download PDF
                </button>
            </div>

            {/* Certificate Display */}
            <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
                <Certificate data={certificateData} />
            </div>

            {/* Print-only styles */}
            <style>{`
                @media print {
                    /* Hide action bar */
                    .action-bar {
                        display: none !important;
                        visibility: hidden !important;
                    }

                    /* Hide navbar and footer from App.js */
                    body > div > div > nav,
                    body > div > div > footer,
                    nav,
                    footer,
                    header,
                    .navbar,
                    .footer {
                        display: none !important;
                        visibility: hidden !important;
                        position: absolute !important;
                        left: -9999px !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }

                    /* Ensure body and html are clean */
                    @page {
                        margin: 0.3in;
                        size: letter;
                    }

                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                    }

                    /* Only show certificate */
                    body * {
                        visibility: hidden !important;
                    }

                    .certificate-container,
                    .certificate-container * {
                        visibility: visible !important;
                    }

                    .certificate-container {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
}
