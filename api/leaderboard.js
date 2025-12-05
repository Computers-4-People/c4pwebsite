const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken, getZohoCRMAccessToken } = require('./_utils');

// Cache leaderboard data for 5 minutes (reduced from 1 hour for faster updates)
let cachedLeaderboard = null;
let cacheExpiration = null;

// Helper function to return empty leaderboard data
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
    // Allow cache bypass with ?refresh=true
    const skipCache = req.query.refresh === 'true';

    if (skipCache) {
        console.log("Cache bypass requested");
    }

    // Return cached data if still valid (unless refresh requested)
    const currentTime = Date.now();
    if (!skipCache && cachedLeaderboard && cacheExpiration && currentTime < cacheExpiration) {
        console.log("Returning cached leaderboard");
        return res.json(cachedLeaderboard);
    }

    try {
        console.log("Getting Creator access token...");
        const creatorToken = await getZohoAccessToken();

        if (!creatorToken) {
            console.error("Failed to get Creator token - returning empty leaderboard");
            return res.json(getEmptyLeaderboard());
        }

        console.log("Building leaderboard with full inventory and CRM data...");

        // Fetch ALL inventory records using batched parallel requests (like stats API)
        const batchSize = 10;
        const maxPages = 100;
        const inventoryUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal`;

        let allInventory = [];
        let page = 0;
        let hasMore = true;

        while (hasMore && page < maxPages) {
            const batchPromises = [];
            for (let i = 0; i < batchSize && page < maxPages; i++, page++) {
                const from = (page * 200) + 1;
                batchPromises.push(
                    axios.get(`${inventoryUrl}?from=${from}&limit=200`, {
                        headers: { Authorization: `Zoho-oauthtoken ${creatorToken}` },
                        timeout: 8000
                    }).catch(err => {
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
                validResults.forEach(r => {
                    allInventory = allInventory.concat(r.data.data);
                });
                const hasPartialPage = validResults.some(r => r.data.data.length < 200);
                if (hasPartialPage) hasMore = false;
            }
        }

        console.log(`Total inventory records fetched: ${allInventory.length}`);

        // Filter to count computers (exclude Monitor, Phone, Misc)
        const excludedTypes = ['Monitor', 'Phone', 'Misc'];
        const computers = allInventory.filter(record => {
            const type = record.Computer_Type || '';
            return !excludedTypes.includes(type);
        });

        console.log(`Total computers (excluding ${excludedTypes.join(', ')}): ${computers.length}`);

        // Build leaderboard by grouping inventory by Donor_ID
        const donorMap = new Map();

        computers.forEach(computer => {
            const donorId = computer.Donor_ID;
            if (!donorId) return;

            if (!donorMap.has(donorId)) {
                donorMap.set(donorId, {
                    id: `donor_${donorId}`,
                    donorId: donorId,
                    company: `Donor ${donorId}`,
                    computersDonated: 0,
                    totalWeight: 0,
                    latestDonation: null,
                    state: null,
                    industry: null
                });
            }

            const donor = donorMap.get(donorId);
            donor.computersDonated++;
            donor.totalWeight += parseFloat(computer.Weight) || 0;

            // Track latest donation
            if (computer.Date_Donated && computer.Date_Donated !== 'N/A') {
                if (!donor.latestDonation || computer.Date_Donated > donor.latestDonation) {
                    donor.latestDonation = computer.Date_Donated;
                }
            }
        });

        // Now fetch CRM data to enrich donor information
        console.log("Getting CRM access token...");
        const crmToken = await getZohoCRMAccessToken();

        if (crmToken) {
            try {
                console.log("Fetching Computer_Donors from CRM...");
                // Fetch Computer_Donors to map Donor_ID -> Champion_ID
                const donorsResp = await axios.get(
                    'https://www.zohoapis.com/crm/v2/Computer_Donors',
                    {
                        headers: { Authorization: `Zoho-oauthtoken ${crmToken}` },
                        params: { per_page: 200 },
                        timeout: 10000
                    }
                );

                const computerDonors = donorsResp.data.data || [];
                console.log(`Fetched ${computerDonors.length} Computer_Donors records`);
                if (computerDonors.length > 0) {
                    console.log("Sample Computer_Donors record:", JSON.stringify(computerDonors[0], null, 2));
                }

                // Fetch Champions to get company details
                console.log("Fetching Champions from CRM...");
                const championsResp = await axios.get(
                    'https://www.zohoapis.com/crm/v2/Champions',
                    {
                        headers: { Authorization: `Zoho-oauthtoken ${crmToken}` },
                        params: { per_page: 200 },
                        timeout: 10000
                    }
                );

                const champions = championsResp.data.data || [];
                console.log(`Fetched ${champions.length} Champions records`);
                if (champions.length > 0) {
                    console.log("Sample Champions record:", JSON.stringify(champions[0], null, 2));
                }

                // Build lookup maps
                const donorToChampion = new Map();
                computerDonors.forEach(cd => {
                    // Match using Donor_ID (e.g., "3313") to link with inventory records
                    if (cd.Donor_ID && cd.Champion) {
                        donorToChampion.set(cd.Donor_ID, cd.Champion.id);
                    }
                });

                const championDetails = new Map();
                champions.forEach(ch => {
                    championDetails.set(ch.id, {
                        company: ch.Company || ch.Name,
                        state: ch.State_Text || ch.State,
                        industry: ch.Industry
                    });
                });

                console.log(`Built lookup: ${donorToChampion.size} donor->champion mappings, ${championDetails.size} champion details`);

                // Enrich donor data with Champion information
                let enrichedCount = 0;
                donorMap.forEach((donor, donorId) => {
                    const championId = donorToChampion.get(donorId);
                    if (championId) {
                        const details = championDetails.get(championId);
                        if (details) {
                            donor.company = details.company || `Donor ${donorId}`;
                            donor.state = details.state;
                            donor.industry = details.industry;
                            enrichedCount++;
                        }
                    }
                });

                console.log(`Enriched ${enrichedCount} out of ${donorMap.size} donors with CRM information`);
            } catch (error) {
                console.error("Error fetching CRM data:", error.message);
                console.log("Continuing with basic donor information...");
            }
        }

        // Convert map to array and sort by computers donated
        const leaderboard = Array.from(donorMap.values())
            .filter(entry => entry.computersDonated > 0)
            .sort((a, b) => b.computersDonated - a.computersDonated)
            .map((entry, index) => ({
                ...entry,
                totalWeight: Math.round(entry.totalWeight)
            }));

        console.log(`Leaderboard entries: ${leaderboard.length}`);

        // Calculate overall stats
        const totalComputersDonated = leaderboard.reduce((sum, entry) => sum + entry.computersDonated, 0);
        const totalWeight = leaderboard.reduce((sum, entry) => sum + entry.totalWeight, 0);
        const totalCompanies = leaderboard.length;

        // Group by industry (skip null/undefined industries)
        const byIndustry = {};
        leaderboard.forEach(entry => {
            const ind = entry.industry;
            // Skip entries without industry data
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
            byIndustry[ind].totalWeight += entry.totalWeight;
        });

        // Group by state (skip null/undefined states)
        const byState = {};
        leaderboard.forEach(entry => {
            const st = entry.state;
            // Skip entries without state data
            if (!st || st === 'Unknown') return;

            if (!byState[st]) {
                byState[st] = {
                    state: st,
                    companies: 0,
                    computersDonated: 0,
                    totalWeight: 0
                };
            }
            byState[st].companies++;
            byState[st].computersDonated += entry.computersDonated;
            byState[st].totalWeight += entry.totalWeight;
        });

        const result = {
            leaderboard,
            stats: {
                totalComputersDonated,
                totalWeight,
                totalCompanies,
                goal: 1000000, // 1 million computer goal
                percentageComplete: ((totalComputersDonated / 1000000) * 100).toFixed(2)
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

        // Cache the results for 5 minutes
        cachedLeaderboard = result;
        cacheExpiration = Date.now() + (5 * 60 * 1000); // 5 minutes
        console.log('Leaderboard cached until:', new Date(cacheExpiration));
        console.log('Use ?refresh=true to bypass cache');

        res.json(result);

    } catch (error) {
        console.error("Error fetching leaderboard:", error.response ? error.response.data : error.message);
        console.error("Returning empty leaderboard due to error");
        // Return empty data instead of error to not break the frontend
        res.json(getEmptyLeaderboard());
    }
}
