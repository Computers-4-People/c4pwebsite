const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken, getZohoCRMAccessToken } = require('../_utils');

/**
 * API endpoint to fetch certificate data for a specific inventory record
 * Fetches inventory data from Zoho Creator and donation data from CRM
 * Returns formatted certificate data ready for display
 */
export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Inventory ID parameter is required' });
    }

    console.log(`Fetching certificate data for inventory ID: ${id}`);

    try {
        // Step 1: Fetch inventory record from Zoho Creator
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain Creator access token' });
        }

        // Search for the inventory record by ID
        const criteria = `(ID == ${id})`;
        const encodedCriteria = encodeURIComponent(criteria);
        const inventoryUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?criteria=${encodedCriteria}`;

        console.log('Fetching inventory record:', inventoryUrl);

        const inventoryResponse = await axios.get(inventoryUrl, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        const inventoryRecords = inventoryResponse.data.data || [];

        if (inventoryRecords.length === 0) {
            console.log('No inventory record found with the given ID');
            return res.status(404).json({ error: 'Inventory record not found' });
        }

        const inventory = inventoryRecords[0];
        console.log('Inventory record found:', inventory.ID);
        console.log('Manufacturer field value:', inventory.Manufacturer);
        console.log('Manufacturer field type:', typeof inventory.Manufacturer);

        // Step 2: Fetch donation record from CRM using Donor_ID
        const donorId = inventory.Donor_ID;
        let companyName = 'Unknown';
        let address = 'Unknown';

        if (donorId) {
            console.log(`Fetching donation record for Donor_ID: ${donorId}`);

            const crmAccessToken = await getZohoCRMAccessToken();
            if (crmAccessToken) {
                try {
                    const donorCriteria = `(Donor_ID:equals:${donorId})`;
                    const donorUrl = `https://www.zohoapis.com/crm/v2/Computer_Donors/search?criteria=${encodeURIComponent(donorCriteria)}`;

                    console.log('Fetching CRM donation record:', donorUrl);

                    const donorResponse = await axios.get(donorUrl, {
                        headers: {
                            Authorization: `Zoho-oauthtoken ${crmAccessToken}`,
                        },
                    });

                    if (donorResponse.data.data && donorResponse.data.data.length > 0) {
                        const donor = donorResponse.data.data[0];
                        companyName = donor.Account_Name || donor.Name || 'Unknown';

                        // Build address from CRM fields
                        const street = donor.Mailing_Street || '';
                        const city = donor.Mailing_City || '';
                        const state = donor.Mailing_State || '';
                        const zip = donor.Mailing_Zip || '';

                        const addressParts = [street, city, state, zip].filter(part => part);
                        address = addressParts.length > 0 ? addressParts.join(', ') : 'Unknown';

                        console.log(`Found donation record - Company: ${companyName}`);
                    } else {
                        console.log('No CRM donation record found');
                    }
                } catch (crmError) {
                    console.error('Error fetching CRM donation record:', crmError.response ? crmError.response.data : crmError.message);
                    // Continue with default values
                }
            }
        }

        // Step 3: Determine certificate type
        const status = inventory.Status;
        const dataBearingDrives = inventory.Data_Bearing_Drives || [];
        const hasHDD = dataBearingDrives.length > 0;

        let certificateType = 'erasure'; // default
        if (status === 'Destroyed') {
            certificateType = 'destroyed';
        } else if (status === 'Donated' && !hasHDD) {
            certificateType = 'no_hdd';
        }

        console.log(`Certificate type determined: ${certificateType}`);

        // Step 4: Map fields to certificate data structure
        const certificateData = {
            // Common fields for all certificate types
            certificateType: certificateType,
            reportId: inventory.ID || 'N/A',
            digitalIdentifier: `C4P-${inventory.ID || 'XXXX'}`,
            reportDate: inventory.Date_Destroyed || inventory.Date_Received || new Date().toLocaleDateString(),
            softwareVersion: inventory.Software_Version || 'N/A',
            donorId: donorId || 'N/A',
            customerName: companyName,
            customerAddress: address,

            // Hardware information
            hardware: {
                manufacturer: typeof inventory.Manufacturer === 'string'
                    ? inventory.Manufacturer
                    : (inventory.Manufacturer?.display_value || inventory.Manufacturer?.[0] || 'Unknown'),
                modelName: inventory.Model || 'Unknown',
                systemSerial: inventory.System_Serial_Number || 'N/A',
                chassisType: inventory.Chassis_Type || 'N/A',
                chassisSerial: inventory.Chassis_Serial || 'N/A',
                memory: inventory.Memory_Size ? `${inventory.Memory_Size} GB` : 'N/A',
            },

            // Validation details
            technicianName: inventory.Technician_Name || 'N/A',
            organization: 'Computers 4 People',

            // Validator signature (hardcoded defaults)
            validatorName: 'Dylan Zajac',
            validatorTitle: 'Founder & Executive Director',
            validatorSignature: '/dylan-signature.png', // Path to signature image
        };

        // Add type-specific fields
        if (certificateType === 'erasure') {
            // Erasure certificate fields
            certificateData.disksToErase = dataBearingDrives.length;
            certificateData.selectedMethod = 'NIST 800-88 Purge';
            certificateData.successfulDisks = dataBearingDrives.length;
            certificateData.failedDisks = 0;

            // HDD Information (use first drive if multiple)
            if (dataBearingDrives.length > 0) {
                const primaryDrive = dataBearingDrives[0];
                certificateData.hddInfo = {
                    model: primaryDrive.Drive_Model || 'N/A',
                    size: primaryDrive.Drive_Size ? `${primaryDrive.Drive_Size} GB` : 'N/A',
                    serial: primaryDrive.Drive_Serial_Number || 'N/A',
                };

                certificateData.erasureResults = {
                    method: 'NIST 800-88 Purge',
                    endTime: inventory.Date_Destroyed || new Date().toLocaleString(),
                    status: 'Completed',
                };
            }
        } else if (certificateType === 'destroyed') {
            // Destroyed certificate fields
            certificateData.destructionMethod = inventory.Destruction_Type || 'Physical Destruction';
            certificateData.destructionDate = inventory.Date_Destroyed || 'N/A';
            certificateData.equipmentUsed = 'Industrial Shredder';
            certificateData.drivesDestroyed = dataBearingDrives.length || 1;
            certificateData.totalWeight = inventory.Weight || 'N/A';
            certificateData.particleSize = '< 2mm';
            certificateData.destructionStandard = 'NIST 800-88';
            certificateData.certificationBody = 'Computers 4 People';

            // Drive info (use first drive if available)
            if (dataBearingDrives.length > 0) {
                const primaryDrive = dataBearingDrives[0];
                certificateData.driveInfo = {
                    model: primaryDrive.Drive_Model || 'N/A',
                    serial: primaryDrive.Drive_Serial_Number || 'N/A',
                    capacity: primaryDrive.Drive_Size ? `${primaryDrive.Drive_Size} GB` : 'N/A',
                    type: primaryDrive.Drive_Type || 'HDD',
                };
            } else {
                // If no drive info, use system info
                certificateData.driveInfo = {
                    model: 'N/A',
                    serial: 'N/A',
                    capacity: 'N/A',
                    type: 'N/A',
                };
            }
        }
        // no_hdd type doesn't need additional fields beyond common ones

        console.log('Certificate data compiled successfully');
        res.json(certificateData);

    } catch (error) {
        console.error('Error fetching certificate data:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: error.response ? error.response.data : 'An error occurred while fetching certificate data.',
            details: error.message
        });
    }
}
