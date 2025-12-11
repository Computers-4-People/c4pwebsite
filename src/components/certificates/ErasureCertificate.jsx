import React from 'react';

export default function ErasureCertificate({ data }) {
    return (
        <div className="erasure-certificate">
            {/* Erasure Summary */}
            <div className="section">
                <h3>Erasure Summary</h3>
                <div className="two-column-grid">
                    <div>
                        <div className="info-row">
                            <span className="label">Drives to Erase:</span>
                            <span className="value">{data.disksToErase}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Selected Method:</span>
                            <span className="value">{data.selectedMethod || 'Pending Erasure'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Number of Passes:</span>
                            <span className="value">{data.numberOfPasses || 3}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Successful Drives:</span>
                            <span className="value success">{data.successfulDisks}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Failed Drives:</span>
                            <span className="value">{data.failedDisks}</span>
                        </div>
                    </div>
                </div>
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

            {/* Key Drive/Erasure Information */}
            <div className="section">
                <h3>Drive Erasure Details</h3>
                <div className="two-column-grid">
                    <div>
                        <div className="info-row">
                            <span className="label">Drive Model:</span>
                            <span className="value">{data.hddInfo?.model || 'SanDisk Z400s M.2 2280 256GB'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Size:</span>
                            <span className="value">{data.hddInfo?.size || '238.47 GB'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Serial Number (SN):</span>
                            <span className="value">{data.hddInfo?.serial || '161326442434'}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Erasure Method:</span>
                            <span className="value">{data.erasureResults?.method || 'NIST 800-88 Purge'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">End Time:</span>
                            <span className="value">{data.erasureResults?.endTime || 'December 19, 2023 17:09:32 IST'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Status:</span>
                            <span className="value success">{data.erasureResults?.status || 'Completed'}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
