const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoCRMAccessToken } = require('./_utils');

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log('Request method:', req.method);
    console.log('Request headers:', req.headers);

    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }

    // Accept both GET and POST
    let recipientIds, limit;

    if (req.method === 'POST') {
        ({ recipientIds, limit = 3 } = req.body);
    } else if (req.method === 'GET') {
        // For GET, expect recipientIds as comma-separated string
        const idsParam = req.query.recipientIds;
        recipientIds = idsParam ? idsParam.split(',') : [];
        limit = parseInt(req.query.limit) || 3;
    } else {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: `Method not allowed: ${req.method}` });
    }

    if (!recipientIds || !Array.isArray(recipientIds) || recipientIds.length === 0) {
        return res.status(400).json({ error: 'recipientIds array is required in request body' });
    }

    console.log(`Fetching testimonials for ${recipientIds.length} recipients`);

    try {
        const accessToken = await getZohoCRMAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain CRM access token' });
        }

        // Limit to first 20 recipient IDs to avoid query length issues
        const recipientIdArray = recipientIds.slice(0, 20);

        // Build CRM API criteria for searching check-in forms
        // Application is a lookup field - might need .id suffix
        const firstId = recipientIdArray[0];

        // Try different syntax options for lookup field
        console.log('Testing search for Application ID:', firstId);

        // Try without any criteria - just get all check-in forms
        const criteria = null;

        // Fetch ALL check-in forms from Zoho CRM with pagination
        let allCheckInForms = [];
        let page = 1;
        let hasMore = true;

        console.log("Fetching all check-in forms with pagination...");

        while (hasMore && page <= 20) {
            const url = `https://www.zohoapis.com/crm/v2/Computer_Check_in_Forms?per_page=200&page=${page}`;
            console.log(`Fetching page ${page}...`);

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });

            const pageForms = response.data.data || [];
            allCheckInForms = allCheckInForms.concat(pageForms);
            console.log(`  Page ${page}: ${pageForms.length} forms (total so far: ${allCheckInForms.length})`);

            // Check if there are more records
            hasMore = response.data.info?.more_records || false;
            page++;
        }

        const checkInForms = allCheckInForms;
        console.log(`Fetched ${checkInForms.length} total check-in forms from ${page - 1} pages`);

        if (checkInForms.length > 0) {
            console.log("Application IDs found in check-in forms:", checkInForms.map(f => f.Application?.id || f.Application));
        }

        if (checkInForms.length === 0) {
            console.log('No testimonials found matching criteria');
            console.log('This could mean:');
            console.log('1. No check-in forms exist for these recipients');
            console.log('2. Check-in forms exist but Can_we_share_this_response_publicly is not "Yes"');
            console.log('3. Check-in forms exist but Is_the_computer_working_well is not "Yes"');
            console.log('4. Application field in check-in forms does not match recipient IDs');
            return res.json([]);
        }

        // Fetch applicant details for each check-in form from CRM
        const testimonialsWithDetails = await Promise.all(
            checkInForms.map(async (form) => {
                try {
                    // Fetch the contact (applicant) details from CRM
                    // Handle Application being either an object with id property or a direct ID
                    const applicationId = form.Application?.id || form.Application;
                    const applicantUrl = `https://www.zohoapis.com/crm/v2/Contacts/${applicationId}`;

                    const applicantResponse = await axios.get(applicantUrl, {
                        headers: {
                            Authorization: `Zoho-oauthtoken ${accessToken}`,
                        },
                    });

                    const applicant = applicantResponse.data.data[0];

                    return {
                        ...form,
                        applicant: {
                            First_Name: applicant.First_Name,
                            Last_Name: applicant.Last_Name,
                            Address_1_City: applicant.Mailing_City || applicant.Address_1_City,
                            Age: applicant.Age
                        }
                    };
                } catch (error) {
                    console.error(`Error fetching applicant ${applicationId || form.Application}:`, error);
                    return form;
                }
            })
        );

        // Sort by date (most recent first) and take top N
        const sortedRecords = testimonialsWithDetails
            .sort((a, b) => {
                const dateA = new Date(a.Date);
                const dateB = new Date(b.Date);
                return dateB - dateA;
            })
            .slice(0, parseInt(limit));

        res.json(sortedRecords);

    } catch (error) {
        console.error("Error fetching testimonials:", error.response ? error.response.data : error.message);
        console.error("Full error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url
        });

        // Check if it's a module access error
        if (error.response?.data?.code === 'INVALID_MODULE' || error.response?.data?.message?.includes('module')) {
            console.error("MODULE ACCESS ERROR: Computer_Check_in_Forms module may not be accessible via API");
            console.error("Possible solutions:");
            console.error("1. Enable API access for Computer_Check_in_Forms in CRM settings");
            console.error("2. Add the module to your OAuth scope");
            console.error("3. Verify the exact module name in CRM");
        }

        res.status(500).json({
            error: error.response ? error.response.data : 'An error occurred while fetching testimonials.',
            details: error.response?.data
        });
    }
}
