import React from 'react';

export default function NoHDDCertificate({ data }) {
    return (
        <div className="no-hdd-certificate">
            {/* No HDD Notice */}
            <div className="section no-hdd-notice">
                <h3>No Hard Disk Drive Present</h3>
                <p className="notice-text">
                    This device does not contain a hard disk drive or solid-state drive.
                    No data storage media is present, therefore no data erasure was necessary.
                </p>
            </div>

            {/* Hardware Information */}
            <div className="section">
                <h3>Hardware Information</h3>
                <div className="two-column-grid">
                    <div>
                        <div className="info-row">
                            <span className="label">Manufacturer:</span>
                            <span className="value">{data.hardware.manufacturer}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Model Name:</span>
                            <span className="value">{data.hardware.modelName}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">System Serial:</span>
                            <span className="value">{data.hardware.systemSerial}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Chassis Type:</span>
                            <span className="value">{data.hardware.chassisType}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Memory (RAM):</span>
                            <span className="value">{data.hardware.memory}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verification Statement */}
            <div className="section verification-statement">
                <p>
                    This certificate confirms that the above device was inspected and found to contain
                    no hard disk drive or solid-state drive. The device has been tested and is ready
                    for distribution.
                </p>
            </div>
        </div>
    );
}
