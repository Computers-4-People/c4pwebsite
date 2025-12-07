const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken, getZohoCRMAccessToken } = require('./_utils');

// Cache leaderboard data for 30 minutes to reduce API load
let cachedLeaderboard = null;
let cacheExpiration = null;

function getEmptyLeaderboard() {
    return {
        leaderboard: [],
        stats: {
            totalComputersDonated: 0,
            totalWeight: 0,
            totalCompanies: 0,
            goal: 1000000,
            percentageComplete: "0.00"
        },
        byIndustry: [],
        byState: []
    };
}

export default async function handler(req, res) {
    const skipCache = req.query.refresh === 'true';

    if (skipCache) {
        console.log("Cache bypass requested");
    }

    const currentTime = Date.now();
    if (!skipCache && cachedLeaderboard && cacheExpiration && currentTime < cacheExpiration) {
        console.log("Returning cached leaderboard");
        return res.json(cachedLeaderboard);
    }

    try {
        // Fetch inventory stats (same as about page) in parallel with CRM data
        console.log("Getting access tokens...");
        const [creatorToken, crmToken] = await Promise.all([
            getZohoAccessToken(),
            getZohoCRMAccessToken()
        ]);

        if (!crmToken) {
            console.error("Failed to get CRM token - returning empty leaderboard");
            return res.json(getEmptyLeaderboard());
        }

        console.log("Building leaderboard from Computer_Donors CRM data...");

        // Use static values for inventory stats to avoid timeout
        // These are updated periodically from the actual inventory
        let totalComputersForStats = 5763;
        let totalWeightForStats = 76386;

        if (false) { // Disabled to prevent timeout
            try {
                const baseUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;
                const headers = { Authorization: `Zoho-oauthtoken ${creatorToken}` };

                const donatedCriteria = encodeURIComponent(
                    '(Status == "Donated") && (Computer_Type != "Monitor") && (Computer_Type != "Phone") && (Computer_Type != "Misc")'
                );
                const weightCriteria = encodeURIComponent('(Status == "Donated") || (Status == "Recycled")');

                const batchSize = 10;
                const maxPages = 100;

                async function fetchInventoryInBatches(criteria, maxPagesToFetch) {
                    const allResults = [];
                    let page = 0;
                    let hasMore = true;

                    while (hasMore && page < maxPagesToFetch) {
                        const batchPromises = [];
                        for (let i = 0; i < batchSize && page < maxPagesToFetch; i++, page++) {
                            const from = (page * 200) + 1;
                            batchPromises.push(
                                axios.get(
                                    `${baseUrl}?criteria=${criteria}&from=${from}&limit=200`,
                                    { headers, timeout: 8000 }
                                ).catch(err => {
                                    if (err.response?.status !== 404) {
                                        console.error(`Inventory page ${page} error:`, err.message);
                                    }
                                    return null;
                                })
                            );
                        }

                        const batchResults = await Promise.all(batchPromises);
                        const validResults = batchResults.filter(r => r && r.data && r.data.data);

                        if (validResults.length === 0) {
                            hasMore = false;
                        } else {
                            allResults.push(...batchResults);
                            const hasPartialPage = validResults.some(r => r.data.data.length < 200);
                            if (hasPartialPage) {
                                hasMore = false;
                            }
                        }
                    }

                    return allResults;
                }

                const [countResults, weightResults] = await Promise.all([
                    fetchInventoryInBatches(donatedCriteria, maxPages),
                    fetchInventoryInBatches(weightCriteria, maxPages)
                ]);

                // Process count
                countResults.forEach(resp => {
                    if (resp && resp.data && resp.data.data) {
                        totalComputersForStats += resp.data.data.length;
                    }
                });

                // Process weight
                weightResults.forEach(resp => {
                    if (resp && resp.data && resp.data.data) {
                        const records = resp.data.data;
                        const batchWeight = records.reduce((sum, r) => sum + (parseFloat(r.Weight) || 0), 0);
                        totalWeightForStats += batchWeight;
                    }
                });

                console.log(`Inventory stats: ${totalComputersForStats} computers, ${Math.round(totalWeightForStats)} lbs`);
            } catch (error) {
                console.error("Error fetching inventory stats:", error.message);
                // Use fallback
                totalComputersForStats = 5542;
                totalWeightForStats = 69748;
            }
        }

        // Helper function to fetch all pages in parallel batches
        const fetchAllPages = async (module, batchSize = 5) => {
            const firstResp = await axios.get(
                `https://www.zohoapis.com/crm/v2/${module}`,
                {
                    headers: { Authorization: `Zoho-oauthtoken ${crmToken}` },
                    params: { per_page: 200, page: 1 },
                    timeout: 5000
                }
            );

            let allData = firstResp.data.data || [];
            const hasMore = firstResp.data.info?.more_records || false;

            if (!hasMore) {
                return allData;
            }

            // Fetch remaining pages in parallel batches
            const pagesToFetch = [];
            for (let page = 2; page <= 80; page++) { // 80 pages = 16,000 records (balanced for timeout)
                pagesToFetch.push(page);
            }

            for (let i = 0; i < pagesToFetch.length; i += batchSize) {
                const batch = pagesToFetch.slice(i, i + batchSize);
                const batchPromises = batch.map(page => {
                    return axios.get(
                        `https://www.zohoapis.com/crm/v2/${module}`,
                        {
                            headers: { Authorization: `Zoho-oauthtoken ${crmToken}` },
                            params: { per_page: 200, page },
                            timeout: 5000
                        }
                    ).catch(err => {
                        if (err.response?.status === 404 || err.response?.status === 204) {
                            return null;
                        }
                        throw err;
                    });
                });

                const batchResults = await Promise.all(batchPromises);
                let allEmpty = true; // Only stop if ALL pages in batch are empty

                batchResults.forEach(resp => {
                    if (resp && resp.data && resp.data.data) {
                        allData = allData.concat(resp.data.data);
                        if (resp.data.data.length > 0) {
                            allEmpty = false; // At least one page has data
                        }
                    }
                });

                if (allEmpty) break; // Only stop if entire batch is empty
            }

            return allData;
        };

        // Fetch Computer_Donors and Champions in parallel
        const [computerDonors, allChampions] = await Promise.all([
            fetchAllPages('Computer_Donors'),
            fetchAllPages('Champions')
        ]);

        console.log(`Fetched ${computerDonors.length} Computer_Donors records`);
        console.log(`Fetched ${allChampions.length} Champions records`);

        // Debug: Check all Status values
        const statusCounts = {};
        computerDonors.forEach(donor => {
            const status = donor.Status || 'NULL';
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        console.log('Status distribution:', statusCounts);

        // Filter to only Donated status (exclude Archived, Pending, etc.)
        const donatedRecords = computerDonors.filter(donor => donor.Status === "Donated");
        console.log(`Filtered to ${donatedRecords.length} donated records (excluded ${computerDonors.length - donatedRecords.length})`);

        // Debug: Check sample donated record
        const sampleDonor = donatedRecords.find(d => d.Champion);
        if (sampleDonor) {
            console.log('Sample Computer_Donors record:', JSON.stringify(sampleDonor, null, 2));
        }

        // Debug: Show large donations to identify the 300k issue
        const largeDonations = computerDonors
            .map(d => ({
                id: d.id,
                status: d.Status,
                laptops: parseInt(d.Laptop_Quantity) || 0,
                desktops: parseInt(d.Desktop_Quantity) || 0,
                allInOne: parseInt(d.All_In_One_Quantity) || 0,
                total: (parseInt(d.Laptop_Quantity) || 0) + (parseInt(d.Desktop_Quantity) || 0) + (parseInt(d.All_In_One_Quantity) || 0),
                state: d.Mailing_State
            }))
            .filter(d => d.total > 1000)
            .sort((a, b) => b.total - a.total);
        console.log('Large donations (>1000 computers):', largeDonations);

        // Debug: Find Champions with Industry populated
        const championsWithIndustry = allChampions.filter(ch => ch.Industry != null);
        console.log(`Champions with Industry: ${championsWithIndustry.length} out of ${allChampions.length}`);
        if (championsWithIndustry.length > 0) {
            const sampleWithIndustry = championsWithIndustry.slice(0, 3).map(ch => ({
                id: ch.id,
                name: ch.Name || ch.Company,
                industry: ch.Industry,
                championType: ch.Champion_Type,
                championTypeText: ch.Champion_Type_Text
            }));
            console.log('Sample Champions WITH Industry:', JSON.stringify(sampleWithIndustry, null, 2));
        }

        // Debug: Count "Computer Donor" Champions
        const computerDonorChampions = allChampions.filter(ch =>
            ch.Champion_Type && ch.Champion_Type.includes("Computer Donor")
        );
        console.log(`Computer Donor Champions: ${computerDonorChampions.length} out of ${allChampions.length}`);

        const computerDonorsWithIndustry = computerDonorChampions.filter(ch => ch.Industry != null);
        const computerDonorsWithoutIndustry = computerDonorChampions.filter(ch => ch.Industry == null);
        console.log(`  - WITH Industry: ${computerDonorsWithIndustry.length}`);
        console.log(`  - WITHOUT Industry: ${computerDonorsWithoutIndustry.length}`);

        // Check if there's an alternate field name for Industry
        if (computerDonorsWithoutIndustry.length > 0) {
            const sampleWithoutIndustry = computerDonorsWithoutIndustry[0];
            const possibleIndustryFields = Object.keys(sampleWithoutIndustry).filter(key =>
                key.toLowerCase().includes('industry') || key.toLowerCase().includes('sector') || key.toLowerCase().includes('category')
            );
            console.log('Possible industry field names on Computer Donor without Industry:', possibleIndustryFields);
        }

        // Debug: Look up the specific Champion for Dove Cay, LLC and see ALL field names
        const doveCayChampion = allChampions.find(ch => ch.id === "4064166000111838001");
        if (doveCayChampion) {
            console.log('Dove Cay Champion ALL fields:', JSON.stringify(doveCayChampion, null, 2));

            // Look for Industry-like field names
            const fieldNames = Object.keys(doveCayChampion);
            const industryFields = fieldNames.filter(key =>
                key.toLowerCase().includes('industry') ||
                key.toLowerCase().includes('sector') ||
                key.toLowerCase().includes('category')
            );
            console.log('Possible industry field names:', industryFields);
        }

        // Build Champion lookup map
        const championDetails = new Map();
        allChampions.forEach(ch => {
            championDetails.set(ch.id, {
                name: ch.Name,
                state: ch.State_Text || ch.State,
                industry: ch.Industry,
                lastDonation: ch.Last_Time_Donated
            });
        });


        // Calculate computers from quantity fields
        function getComputerCount(donor) {
            const laptops = parseInt(donor.Laptop_Quantity) || 0;
            const desktops = parseInt(donor.Desktop_Quantity) || 0;
            const allInOne = parseInt(donor.All_In_One_Quantity) || 0;
            return laptops + desktops + allInOne;
        }

        // Build state map (only donated records)
        const byState = {};

        donatedRecords.forEach(donor => {
            const computers = getComputerCount(donor);

            const state = donor.Mailing_State;
            if (state) {
                if (!byState[state]) {
                    byState[state] = {
                        state,
                        computersDonated: 0,
                        totalWeight: 0
                    };
                }
                byState[state].computersDonated += computers;
            }
        });


        // Build leaderboard (consolidate by Champion, exclude personal donations, only donated)
        const championMap = new Map();

        donatedRecords.forEach(donor => {
            // Exclude personal/individual donations
            const isNotIndividual = donor.Personal_Company !== "Personal Donation" && donor.Personal_Company !== "Individual";
            if (!isNotIndividual) return;

            const computers = getComputerCount(donor);
            if (computers === 0) return;

            const championId = donor.Champion?.id;
            if (!championId) return;

            if (!championMap.has(championId)) {
                const details = championDetails.get(championId);
                championMap.set(championId, {
                    id: championId,
                    donorId: donor.id, // Add donor ID for debugging
                    company: details?.name || donor.Champion?.name || 'Unknown Company', // Use Champion Name field
                    state: donor.Mailing_State || null, // Use Computer_Donors Mailing_State
                    industry: details?.industry || null, // Get Industry from Champion if available
                    computersDonated: 0,
                    totalWeight: 0,
                    latestDonation: donor.Date_Picked_up || donor.Entry_Date || null // Use donation date from Computer_Donors
                });
            }

            const champion = championMap.get(championId);
            champion.computersDonated += computers;
        });

        console.log(`Built leaderboard with ${championMap.size} companies`);

        // Convert to array and sort
        const leaderboard = Array.from(championMap.values())
            .filter(entry => entry.computersDonated > 0)
            .sort((a, b) => b.computersDonated - a.computersDonated);

        // Group by industry
        const byIndustry = {};
        leaderboard.forEach(entry => {
            const ind = entry.industry;
            if (!ind || ind === 'Uncategorized' || ind === 'Unknown') return;

            if (!byIndustry[ind]) {
                byIndustry[ind] = {
                    industry: ind,
                    companies: 0,
                    computersDonated: 0,
                    totalWeight: 0
                };
            }
            byIndustry[ind].companies++;
            byIndustry[ind].computersDonated += entry.computersDonated;
        });

        // (Removed company count from byState map)

        const result = {
            leaderboard,
            stats: {
                totalComputersDonated: totalComputersForStats,
                totalWeight: Math.round(totalWeightForStats),
                totalCompanies: leaderboard.length,
                goal: 1000000,
                percentageComplete: ((totalComputersForStats / 1000000) * 100).toFixed(2)
            },
            byIndustry: Object.values(byIndustry).sort((a, b) => b.computersDonated - a.computersDonated),
            byState: Object.values(byState).sort((a, b) => b.computersDonated - a.computersDonated)
        };

        console.log('Leaderboard calculated:', {
            totalEntries: result.leaderboard.length,
            totalComputers: result.stats.totalComputersDonated,
            industries: result.byIndustry.length,
            states: result.byState.length
        });

        // Debug: Log entries without company names
        const noNameEntries = result.leaderboard.filter(e => e.company === 'Unknown Company');
        console.log(`Entries without names: ${noNameEntries.length}`);
        if (noNameEntries.length > 0) {
            console.log('Sample entries without names:', noNameEntries.slice(0, 5).map(e => ({
                championId: e.id,
                donorId: e.donorId,
                computers: e.computersDonated,
                state: e.state,
                industry: e.industry
            })));
        }

        // Debug: Log industry distribution
        const industryDist = {};
        result.leaderboard.forEach(e => {
            const ind = e.industry || 'NULL';
            industryDist[ind] = (industryDist[ind] || 0) + 1;
        });
        console.log('Industry distribution:', industryDist);

        cachedLeaderboard = result;
        cacheExpiration = Date.now() + (30 * 60 * 1000); // 30 minutes
        console.log('Leaderboard cached until:', new Date(cacheExpiration));

        res.json(result);

    } catch (error) {
        console.error("Error fetching leaderboard:", error.response ? error.response.data : error.message);
        console.error("Returning empty leaderboard due to error");
        res.json(getEmptyLeaderboard());
    }
}
