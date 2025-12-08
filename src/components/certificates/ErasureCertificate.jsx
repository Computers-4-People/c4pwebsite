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
                            <span className="label">Total Disks:</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Disks to Erase:</span>
                            <span className="value">{data.disksToErase}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Selected Method:</span>
                            <span className="value">{data.selectedMethod}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Successful Disks:</span>
                            <span className="value success">{data.successfulDisks}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Failed Disks:</span>
                            <span className="value">{data.failedDisks}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Disks in Process:</span>
                            <span className="value">{data.disksInProcess}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hardware Test */}
            <div className="section">
                <h3>Hardware Test</h3>
                <div className="two-column-grid">
                    <div>
                        <div className="info-row">
                            <span className="label">Motherboard:</span>
                            <span className="value success">{data.hardwareTest.motherboard}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Memory:</span>
                            <span className="value success">{data.hardwareTest.memory}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Mouse/Pointer:</span>
                            <span className="value success">{data.hardwareTest.mousePointer}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Bluetooth:</span>
                            <span className="value success">{data.hardwareTest.bluetooth}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Webcam:</span>
                            <span className="value success">{data.hardwareTest.webcam}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">PC Speaker:</span>
                            <span className="value success">{data.hardwareTest.pcSpeaker}</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Processor:</span>
                            <span className="value success">{data.hardwareTest.processor}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Keyboard:</span>
                            <span className="value success">{data.hardwareTest.keyboard}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Wireless(Wifi):</span>
                            <span className="value success">{data.hardwareTest.wireless}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Battery:</span>
                            <span className="value success">{data.hardwareTest.battery}</span>
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
                        <div className="info-row">
                            <span className="label">Chassis Serial:</span>
                            <span className="value">{data.hardware.chassisSerial}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Board Serial:</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-row">
                            <span className="label">Chassis Type:</span>
                            <span className="value">{data.hardware.chassisType}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">UUID:</span>
                            <span className="value">{data.hardware.uuid}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">SKU Number:</span>
                            <span className="value">{data.hardware.skuNumber}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">USB Hub:</span>
                            <span className="value">{data.hardware.usbHub}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Memory (RAM):</span>
                            <span className="value">{data.hardware.memory}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disk Information */}
            <div className="section">
                <h3>Disk [1]</h3>
                <div className="disk-info">
                    <p>{data.diskInfo.description}</p>
                </div>
            </div>

            {/* Network Adapter / Other Components */}
            <div className="section">
                <h3>Network Adapter</h3>
                <p className="component-detail">{data.networkAdapter}</p>
            </div>

            {/* Custom Fields */}
            <div className="section">
                <h3>Custom Fields</h3>
                <div className="info-row">
                    <span className="label">Donor ID:</span>
                    <span className="value">{data.donorId}</span>
                </div>
            </div>

            {/* Erasure Results */}
            <div className="section">
                <h3>Erasure Results</h3>
                <div className="erasure-details">
                    <div className="info-row">
                        <span className="label">Erasure Method:</span>
                        <span className="value">{data.erasureResults.method}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Remapped Sectors:</span>
                        <span className="value">{data.erasureResults.remappedSectors}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Verification:</span>
                        <span className="value">{data.erasureResults.verification}</span>
                    </div>
                    <div className="two-column-grid">
                        <div>
                            <div className="info-row">
                                <span className="label">Start Time:</span>
                                <span className="value">{data.erasureResults.startTime}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Duration:</span>
                                <span className="value">{data.erasureResults.duration}</span>
                            </div>
                        </div>
                        <div>
                            <div className="info-row">
                                <span className="label">Write Passes:</span>
                                <span className="value">{data.erasureResults.writePasses}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Processed:</span>
                                <span className="value">{data.erasureResults.processed}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">End Time:</span>
                                <span className="value">{data.erasureResults.endTime}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Status:</span>
                                <span className="value success">{data.erasureResults.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="info-row">
                        <span className="label">CR - Cryptographic Erase:</span>
                        <span className="value">{data.erasureResults.cryptographicErase}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
