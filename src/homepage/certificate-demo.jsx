import React, { useState } from 'react';
import Certificate from '../components/certificates/Certificate';
import { erasureCertificate, noHDDCertificate, destroyedCertificate } from '../data/sampleCertificates';

export default function CertificateDemo() {
    const [selectedCertificate, setSelectedCertificate] = useState('erasure');

    const certificates = {
        erasure: erasureCertificate,
        no_hdd: noHDDCertificate,
        destroyed: destroyedCertificate,
    };

    const currentCertificate = certificates[selectedCertificate];

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        window.print();
        // In production, this would call the PDF generation API
        // window.open(`/api/certificate-pdf/${currentCertificate.donorId}`, '_blank');
    };

    return (
        <div className="certificate-demo-page">
            {/* Action Bar - Hidden in print */}
            <div className="action-bar" style={{
                position: 'sticky',
                top: 0,
                background: 'white',
                padding: '20px',
                borderBottom: '2px solid #ccc',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px',
            }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setSelectedCertificate('erasure')}
                        style={{
                            padding: '10px 20px',
                            background: selectedCertificate === 'erasure' ? '#00a33b' : '#e0e0e0',
                            color: selectedCertificate === 'erasure' ? 'white' : '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Standard Erasure
                    </button>
                    <button
                        onClick={() => setSelectedCertificate('no_hdd')}
                        style={{
                            padding: '10px 20px',
                            background: selectedCertificate === 'no_hdd' ? '#00a33b' : '#e0e0e0',
                            color: selectedCertificate === 'no_hdd' ? 'white' : '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        No HDD
                    </button>
                    <button
                        onClick={() => setSelectedCertificate('destroyed')}
                        style={{
                            padding: '10px 20px',
                            background: selectedCertificate === 'destroyed' ? '#00a33b' : '#e0e0e0',
                            color: selectedCertificate === 'destroyed' ? 'white' : '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Destroyed/Shredded
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
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
                        onClick={handleDownloadPDF}
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
            </div>

            {/* Certificate Display */}
            <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
                <Certificate data={currentCertificate} />
            </div>

            {/* Print-only styles */}
            <style jsx>{`
                @media print {
                    .action-bar {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
