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

    const handleDownload = () => {
        // Use browser's print dialog with "Save as PDF" option
        window.print();
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
        <div>
            {/* Action bar for print/download - hidden during print */}
            <div className="action-bar" style={{
                padding: '20px',
                textAlign: 'center',
                background: '#f5f5f5',
                borderBottom: '1px solid #ddd'
            }}>
                <button
                    onClick={handlePrint}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    Print Certificate
                </button>
                <button
                    onClick={handleDownload}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    Download PDF
                </button>
            </div>

            {/* Certificate display */}
            <Certificate data={certificateData} />
        </div>
    );
}
