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
                console.log("Fetching Computer_Donors and Champions from CRM in parallel...");

                // Helper function to fetch all pages in parallel batches
                const fetchAllPages = async (module, batchSize = 5) => {
                    // First, fetch page 1 to check if there are more records
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

                    // Estimate total pages (assume ~15 pages max based on previous runs)
                    // Fetch remaining pages in parallel batches
                    const pagesToFetch = [];
                    for (let page = 2; page <= 20; page++) {
                        pagesToFetch.push(page);
                    }

                    // Fetch in batches
                    for (let i = 0; i < pagesToFetch.length; i += batchSize) {
                        const batch = pagesToFetch.slice(i, i + batchSize);
                        const batchPromises = batch.map(page =>
                            axios.get(
                                `https://www.zohoapis.com/crm/v2/${module}`,
                                {
                                    headers: { Authorization: `Zoho-oauthtoken ${crmToken}` },
                                    params: { per_page: 200, page },
                                    timeout: 5000
                                }
                            ).catch(err => {
                                if (err.response?.status === 404 || err.response?.status === 204) {
                                    return null; // No more data
                                }
                                throw err;
                            })
                        );

                        const batchResults = await Promise.all(batchPromises);
                        let foundEmpty = false;

                        batchResults.forEach(resp => {
                            if (resp && resp.data && resp.data.data) {
                                allData = allData.concat(resp.data.data);
                                if (resp.data.data.length < 200) {
                                    foundEmpty = true;
                                }
                            } else {
                                foundEmpty = true;
                            }
                        });

                        // Stop if we found a partial or empty page
                        if (foundEmpty) break;
                    }

                    return allData;
                };

                // Fetch both in parallel
                const [computerDonors, champions] = await Promise.all([
                    fetchAllPages('Computer_Donors'),
                    fetchAllPages('Champions')
                ]);

                console.log(`Fetched ${computerDonors.length} Computer_Donors records`);
                console.log(`Fetched ${champions.length} Champions records`);

                if (computerDonors.length > 0) {
                    console.log("Sample Computer_Donors record:", JSON.stringify(computerDonors[0], null, 2));
                }
                if (champions.length > 0) {
                    console.log("Sample Champions record:", JSON.stringify(champions[0], null, 2));
                }

                // Build lookup maps - only include company donations
                const donorToChampion = new Map();
                let companyDonationCount = 0;
                computerDonors.forEach(cd => {
                    // Only include company donations (exclude individual donations)
                    const isCompany = cd.Personal_Company === "Company Donation";
                    if (isCompany) companyDonationCount++;

                    // Match using Donor_ID (e.g., "3313") to link with inventory records
                    if (isCompany && cd.Donor_ID && cd.Champion) {
                        donorToChampion.set(cd.Donor_ID, cd.Champion.id);
                    }
                });
                console.log(`Found ${companyDonationCount} company donations out of ${computerDonors.length} total Computer_Donors`);

                const championDetails = new Map();
                champions.forEach(ch => {
                    championDetails.set(ch.id, {
                        company: ch.Company || ch.Name,
                        state: ch.State_Text || ch.State,
                        industry: ch.Industry
                    });
                });

                console.log(`Built lookup: ${donorToChampion.size} donor->champion mappings, ${championDetails.size} champion details`);

                // Debug: Log sample IDs from both maps
                const sampleInventoryIds = Array.from(donorMap.keys()).slice(0, 5);
                const sampleCRMIds = Array.from(donorToChampion.keys()).slice(0, 5);
                console.log("Sample inventory Donor_IDs:", sampleInventoryIds, "Types:", sampleInventoryIds.map(id => typeof id));
                console.log("Sample CRM Donor_IDs:", sampleCRMIds, "Types:", sampleCRMIds.map(id => typeof id));

                // Regroup by Champion instead of Donor_ID to consolidate companies
                const championMap = new Map();
                let enrichedCount = 0;

                donorMap.forEach((donor, donorId) => {
                    const championId = donorToChampion.get(donorId);

                    if (championId) {
                        const details = championDetails.get(championId);
                        if (details) {
                            enrichedCount++;

                            // Group by Champion ID
                            if (!championMap.has(championId)) {
                                championMap.set(championId, {
                                    id: championId,
                                    company: details.company || `Champion ${championId}`,
                                    state: details.state,
                                    industry: details.industry,
                                    computersDonated: 0,
                                    totalWeight: 0,
                                    latestDonation: null
                                });
                            }

                            const champion = championMap.get(championId);
                            champion.computersDonated += donor.computersDonated;
                            champion.totalWeight += donor.totalWeight;

                            // Update latest donation
                            if (donor.latestDonation) {
                                if (!champion.latestDonation || donor.latestDonation > champion.latestDonation) {
                                    champion.latestDonation = donor.latestDonation;
                                }
                            }
                        }
                    }
                });

                console.log(`Enriched ${enrichedCount} donors and consolidated into ${championMap.size} companies`);

                // Use champion map instead of donor map for the leaderboard
                donorMap.clear();
                championMap.forEach((value, key) => {
                    donorMap.set(key, value);
                });
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
