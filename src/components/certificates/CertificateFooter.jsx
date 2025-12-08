import React from 'react';

export default function CertificateFooter({ data }) {
    return (
        <div className="certificate-footer">
            <div className="validation-details">
                <h3>Validation Details</h3>
                <div className="validation-row">
                    <div className="validation-column">
                        <div className="info-row">
                            <span className="label">Technician Name:</span>
                            <span className="value">{data.technicianName}</span>
                        </div>
                    </div>
                    <div className="validation-column">
                        <div className="info-row">
                            <span className="label">Organization:</span>
                            <span className="value">{data.organization || "Computers 4 People"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="certification-statement">
                I hereby state that the data erasure/destruction process has been carried out in accordance with the given specifications.
            </p>

            <div className="signatures">
                <div className="signature-block">
                    <div className="signature-line">
                        {data.validatorSignature ? (
                            <img src={data.validatorSignature} alt="Validator Signature" className="signature-image" />
                        ) : (
                            <span className="signature-text">Dylan Zajac</span>
                        )}
                    </div>
                    <div className="signature-label">{data.validatorName || "Dylan Zajac"}</div>
                    <div className="signature-title">{data.validatorTitle || "Founder & Executive Director"}</div>
                    <div className="signature-org">Computers 4 People</div>
                </div>
            </div>

            <div className="certificate-date">
                <span className="label">Date:</span>
                <span className="value">{data.reportDate}</span>
            </div>
        </div>
    );
}
