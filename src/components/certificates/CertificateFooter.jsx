import React from 'react';

export default function CertificateFooter({ data }) {
    return (
        <div className="certificate-footer">
            <div className="validation-details">
                <h3>Erasure & Validation Details</h3>
                <div className="validation-row">
                    <div className="validation-column">
                        <div className="info-row">
                            <span className="label">Technician Name:</span>
                            <span className="value">{data.technicianName}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Validator Name:</span>
                            <span className="value">{data.validatorName}</span>
                        </div>
                    </div>
                    <div className="validation-column">
                        <div className="info-row">
                            <span className="label">Organization:</span>
                            <span className="value">{data.organization}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Organization:</span>
                            <span className="value">{data.organization}</span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="certification-statement">
                I hereby state that the data erasure process has been carried out in accordance with the given specifications.
            </p>

            <div className="signatures">
                <div className="signature-block">
                    <div className="signature-line">
                        <span className="signature-text">Sample Signature</span>
                    </div>
                    <div className="signature-label">Data Erasure Technician</div>
                </div>
                <div className="signature-block">
                    <div className="signature-line">
                        <span className="signature-text">Sample Signature</span>
                    </div>
                    <div className="signature-label">Validator</div>
                </div>
            </div>

            <div className="certificate-date">
                <span className="label">Date:</span>
                <span className="value">{data.reportDate}</span>
            </div>
        </div>
    );
}
