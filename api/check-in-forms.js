const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken } = require('./_utils');

export default async function handler(req, res) {
    const { recipientIds, limit = 3 } = req.query;

    if (!recipientIds) {
        return res.status(400).json({ error: 'recipientIds parameter is required' });
    }

    console.log(`Fetching testimonials for recipients: ${recipientIds}`);

    try {
        const accessToken = await getZohoAccessToken();
        if (!accessToken) {
            return res.status(500).json({ error: 'Failed to obtain access token' });
        }

        // Parse recipient IDs
        const recipientIdArray = recipientIds.split(',');

        // Build criteria to match recipients
        const recipientCriteria = recipientIdArray.map(id => `(Application == ${id})`).join(' || ');
        const criteria = `((Can_we_share_this_response_publicly == "Yes") && (Is_the_computer_working_well == "Yes") && (${recipientCriteria}))`;
        const encodedCriteria = encodeURIComponent(criteria);

        // Fetch check-in forms
        const url = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/All_Computer_Check_in_Forms?criteria=${encodedCriteria}`;

        console.log("Requesting testimonials URL:", url);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        const checkInForms = response.data.data || [];
        console.log(`Found ${checkInForms.length} check-in forms`);

        // Fetch applicant details for each check-in form
        const testimonialsWithDetails = await Promise.all(
            checkInForms.map(async (form) => {
                try {
                    // Fetch the applicant details
                    const applicantUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/All_Computer_Applications/${form.Application}`;

                    const applicantResponse = await axios.get(applicantUrl, {
                        headers: {
                            Authorization: `Zoho-oauthtoken ${accessToken}`,
                        },
                    });

                    const applicant = applicantResponse.data.data;

                    return {
                        ...form,
                        applicant: {
                            First_Name: applicant.First_Name,
                            Last_Name: applicant.Last_Name,
                            Address_1_City: applicant.Address_1_City,
                            Age: applicant.Age
                        }
                    };
                } catch (error) {
                    console.error(`Error fetching applicant ${form.Application}:`, error);
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
        res.status(500).json({ error: error.response ? error.response.data : 'An error occurred while fetching testimonials.' });
    }
}
