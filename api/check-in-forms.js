const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoCRMAccessToken } = require('./_utils');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { recipientIds, limit = 3 } = req.body;

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
        const criteriaArray = recipientIdArray.map(id => `(Application:equals:${id})`);
        const criteria = `((Can_we_share_this_response_publicly:equals:Yes (you can include my name))and(Is_the_computer_working_well:equals:Yes)and(or(${criteriaArray.join(',')})))`;

        // Fetch check-in forms from Zoho CRM
        const url = `https://www.zohoapis.com/crm/v2/Computer_Check_in_Forms/search?criteria=${encodeURIComponent(criteria)}`;

        console.log("Requesting testimonials from CRM:", url);
        console.log("Searching for recipient IDs:", recipientIdArray);

        const response = await axios.get(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        const checkInForms = response.data.data || [];
        console.log(`Found ${checkInForms.length} check-in forms`);

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
                    const applicantUrl = `https://www.zohoapis.com/crm/v2/Contacts/${form.Application}`;

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
