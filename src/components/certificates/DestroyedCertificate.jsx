import React from 'react';

export default function DestroyedCertificate({ data }) {
    return (
        <div className="destroyed-certificate">
            {/* Destruction Summary */}
            <div className="section destruction-notice">
                <h3>Physical Destruction Certificate</h3>
                <p className="notice-text">
                    This certifies that the storage device(s) listed below have been physically destroyed
                    using industrial equipment, rendering all data permanently and irretrievably destroyed.
                </p>
            </div>

            {/* Destruction Information */}
            <div className="section">
                <h3>Destruction Summary</h3>
                <div className="two-column-grid">
                    <div>
                        <div className="info-row">
                            <span className="label">Destruction Method:</span>
                            <span className="value">{data.destructionMethod}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Destruction Date:</span>
                            <span className="value">{data.destructionDate}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Equipment Used:</span>
                            <span className="value">{data.equipmentUsed}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Drives Destroyed:</span>
                            <span className="value">{data.drivesDestroyed}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Total Weight:</span>
                            <span className="value">{data.totalWeight} lbs</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Particle Size:</span>
                            <span className="value">{data.particleSize}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hardware Information */}
            <div className="section">
                <h3>Destroyed Hardware Information</h3>
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
                        <div className="info-row">
                            <span className="label">Chassis Serial:</span>
                            <span className="value">{data.hardware.chassisSerial}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Drive Model:</span>
                            <span className="value">{data.driveInfo.model}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Drive Serial:</span>
                            <span className="value">{data.driveInfo.serial}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Drive Capacity:</span>
                            <span className="value">{data.driveInfo.capacity}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Drive Type:</span>
                            <span className="value">{data.driveInfo.type}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destruction Standard */}
            <div className="section">
                <h3>Destruction Verification</h3>
                <div className="info-row">
                    <span className="label">Standard Compliance:</span>
                    <span className="value">{data.destructionStandard}</span>
                </div>
                <div className="info-row">
                    <span className="label">Certification Body:</span>
                    <span className="value">{data.certificationBody}</span>
                </div>
                <p className="verification-text">
                    The physical destruction process ensures that all data is permanently unrecoverable
                    and meets or exceeds the requirements of {data.destructionStandard} for media sanitization.
                    The destroyed media has been reduced to particles smaller than {data.particleSize},
                    making data reconstruction impossible.
                </p>
            </div>

            {/* Destruction Certificate Statement */}
            <div className="section destruction-statement">
                <p className="statement-text">
                    <strong>Certificate Statement:</strong> This is to certify that the storage device(s)
                    identified above have been physically destroyed in accordance with industry standards
                    and best practices. All data previously stored on these devices is permanently and
                    irretrievably destroyed. This destruction was witnessed and verified by authorized personnel.
                </p>
            </div>
        </div>
    );
}
