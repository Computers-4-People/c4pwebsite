// Sample certificate data for testing

export const erasureCertificate = {
    certificateType: 'erasure',
    reportId: '33',
    digitalIdentifier: '460f7933b1298caf421f96ea59acae94',
    reportDate: 'Dec 19, 2023 13:30:44 EST',
    softwareVersion: 'BitRaser Drive Eraser 3.0.0.6',
    customerName: 'Tech Solutions Inc.',
    customerAddress: '123 Main Street, New York, NY 10001',

    // Erasure Summary
    disksToErase: '1 1 NIST 800-88',
    selectedMethod: 'Purge',
    successfulDisks: 1,
    failedDisks: 0,
    disksInProcess: 0,

    // Hardware Test
    hardwareTest: {
        motherboard: 'Successful',
        memory: 'Successful',
        mousePointer: 'Successful',
        bluetooth: 'Successful',
        webcam: 'Successful',
        pcSpeaker: 'Successful',
        processor: 'Successful',
        keyboard: 'Successful',
        wireless: 'Successful',
        battery: 'Successful(Capacity: 3684 mAh)',
    },

    // Hardware Information
    hardware: {
        manufacturer: 'Dell Inc. Inspiron 13-7368',
        modelName: '2618WB2',
        systemSerial: '/2618WB2/CN762066SU00EB',
        chassisSerial: '/',
        chassisType: 'Laptop',
        uuid: '4c4c4544-0036-3110-8038-b2c04f574232',
        skuNumber: '073C',
        usbHub: '6',
        memory: '8 GB',
    },

    // Disk Information
    diskInfo: {
        description: 'Disk 0, Model: SanDisk Z400s M.2 2280 256GB, Serial: 161326442434, Encryption: NA, SMART Status: PASSED Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz, Status: Populated, Enabled, Capable, Current Speed: 2300 MHz, Processor ID: E3',
    },

    // Network Adapter
    networkAdapter: '06 04 00 FF FB EB BF, Signature: Type 0, Family 6, Model 78, Stepping 3 Intel Wireless 3165, Interface Name: wlan0, MAC Address: ac:2b:6e:5b:d7:17, Interface: Wireless',

    // Donor ID
    donorId: '3302',

    // HDD Information (key fields)
    hddInfo: {
        model: 'SanDisk Z400s M.2 2280 256GB',
        size: '238.47 GB',
        serial: '161326442434',
    },

    // Erasure Results
    erasureResults: {
        method: 'NIST 800-88 Purge',
        endTime: 'December 19, 2023 17:09:32 IST',
        status: 'Completed',
    },

    // Validation
    technicianName: 'Hector Ramos',
    validatorName: 'Dylan Zajac',
    organization: 'Computers For People Inc.',
};

export const noHDDCertificate = {
    certificateType: 'no_hdd',
    reportId: '45',
    digitalIdentifier: '7a2b5e8c9d3f1a4b6e8c0d2f4a6b8c0e',
    reportDate: 'Jan 15, 2024 10:15:22 EST',
    softwareVersion: 'C4P Hardware Validator 2.1.0',
    customerName: 'Community Tech Center',
    customerAddress: '456 Oak Avenue, Boston, MA 02101',

    // Hardware Test
    hardwareTest: {
        motherboard: 'Successful',
        memory: 'Successful',
        mousePointer: 'Successful',
        bluetooth: 'Successful',
        webcam: 'Successful',
        pcSpeaker: 'Successful',
        processor: 'Successful',
        keyboard: 'Successful',
        wireless: 'Successful',
        battery: 'Successful(Capacity: 4200 mAh)',
    },

    // Hardware Information
    hardware: {
        manufacturer: 'HP Inc. EliteBook 840',
        modelName: 'G5',
        systemSerial: '/5CD8234XYZ',
        chassisSerial: '/CNU8234ABC',
        chassisType: 'Laptop',
        uuid: '3e3e3544-0025-2110-7028-a1b02c453221',
        skuNumber: '840G5',
        memory: '16 GB',
    },

    // Donor ID
    donorId: '3456',

    // Validation
    technicianName: 'Maria Rodriguez',
    validatorName: 'Dylan Zajac',
    organization: 'Computers For People Inc.',
};

export const destroyedCertificate = {
    certificateType: 'destroyed',
    reportId: '67',
    digitalIdentifier: '9f3d7c2a5b8e1d4f6c9a2b5e8d1c4f7a',
    reportDate: 'Feb 3, 2024 14:45:18 EST',
    softwareVersion: 'C4P Destruction Manager 1.5.0',
    customerName: 'Enterprise Data Services',
    customerAddress: '789 Tech Parkway, San Francisco, CA 94103',

    // Destruction Information
    destructionMethod: 'Industrial Shredder',
    destructionDate: 'Feb 3, 2024',
    equipmentUsed: 'Allegheny HDD-2 Industrial Shredder',
    drivesDestroyed: '1',
    totalWeight: '2.4',
    particleSize: '< 2mm',
    destructionStandard: 'NIST 800-88 Guidelines for Media Sanitization',
    certificationBody: 'NSA/CSS Evaluated Products List',

    // Hardware Information
    hardware: {
        manufacturer: 'Lenovo ThinkPad',
        modelName: 'T480',
        systemSerial: '/PF2AB3CD',
        chassisSerial: '/R90XYZ123',
    },

    // Drive Information
    driveInfo: {
        model: 'Samsung 860 EVO',
        serial: 'S4Z2NX0M123456',
        capacity: '500 GB',
        type: 'SSD (SATA)',
    },

    // Donor ID
    donorId: '3789',

    // Validation
    technicianName: 'James Chen',
    validatorName: 'Dylan Zajac',
    organization: 'Computers For People Inc.',
};
