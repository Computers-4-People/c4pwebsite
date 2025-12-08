import React from 'react';

export default function CertificateHeader({ data }) {
    const getTitleByType = () => {
        if (data.certificateType === 'destroyed') {
            return 'Certificate of Destruction';
        } else if (data.certificateType === 'no_hdd') {
            return 'Certificate of No Data';
        }
        return 'Certificate of Erasure';
    };

    return (
        <div className="certificate-header">
            <div className="header-top">
                <img src="/c4plogo.png" alt="Computers4People" className="certificate-logo" />
                <h1 className="certificate-title">{getTitleByType()}</h1>
            </div>

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
                <h3>Donor Information</h3>
                <div className="info-row">
                    <span className="label">Donor ID:</span>
                    <span className="value">{data.donorId}</span>
                </div>
                <div className="customer-row">
                    <div className="customer-column">
                        <div className="info-row">
                            <span className="label">Company Name:</span>
                            <span className="value">{data.customerName}</span>
                        </div>
                    </div>
                    <div className="customer-column">
                        <div className="info-row">
                            <span className="label">Address:</span>
                            <span className="value">{data.customerAddress}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
