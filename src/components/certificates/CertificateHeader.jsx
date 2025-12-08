import React from 'react';

export default function CertificateHeader({ data }) {
    const getTitleByType = () => {
        if (data.certificateType === 'destroyed') {
            return 'C4P - Certificate of Destruction';
        }
        return 'C4P - Certificate of Erasure';
    };

    return (
        <div className="certificate-header">
            <img src="/c4plogo.png" alt="Computers4People" className="certificate-logo" />
            <h1 className="certificate-title">{getTitleByType()}</h1>

            <div className="report-info">
                <div className="report-column">
                    <div className="info-row">
                        <span className="label">Report ID:</span>
                        <span className="value">{data.reportId}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Digital Identifier:</span>
                        <span className="value">{data.digitalIdentifier}</span>
                    </div>
                </div>
                <div className="report-column">
                    <div className="info-row">
                        <span className="label">Report Date:</span>
                        <span className="value">{data.reportDate}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Software Version:</span>
                        <span className="value">{data.softwareVersion}</span>
                    </div>
                </div>
            </div>

            <div className="customer-details">
                <h3>Customer Details</h3>
                <div className="customer-row">
                    <div className="customer-column">
                        <div className="info-row">
                            <span className="label">Customer Name:</span>
                            <span className="value">{data.customerName}</span>
                        </div>
                    </div>
                    <div className="customer-column">
                        <div className="info-row">
                            <span className="label">Customer Address:</span>
                            <span className="value">{data.customerAddress}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
