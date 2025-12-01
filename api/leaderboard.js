const axios = require('axios/dist/node/axios.cjs');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env.local'
});
const { getZohoAccessToken, getZohoCRMAccessToken } = require('./_utils');

// Cache leaderboard data for 1 hour to avoid timeout and reduce API calls
let cachedLeaderboard = null;
let cacheExpiration = null;

export default async function handler(req, res) {
    // Return cached data if still valid
    const currentTime = Date.now();
    if (cachedLeaderboard && cacheExpiration && currentTime < cacheExpiration) {
        console.log("Returning cached leaderboard");
        return res.json(cachedLeaderboard);
    }

    try {
        const creatorToken = await getZohoAccessToken();
        const crmToken = await getZohoCRMAccessToken();

        if (!creatorToken) {
            console.error("Failed to get Creator token");
            return res.status(500).json({ error: 'Failed to obtain Creator access token' });
        }

        if (!crmToken) {
            console.error("Failed to get CRM token");
            return res.status(500).json({ error: 'Failed to obtain CRM access token' });
        }

        console.log("Fetching Champions data for leaderboard...");

        // Step 1: Fetch ALL Champions from CRM
        let allChampions = [];
        let page = 1;
        let hasMoreRecords = true;
        const maxPages = 50; // Safety limit

        while (hasMoreRecords && page <= maxPages) {
            try {
                const championsUrl = `https://www.zohoapis.com/crm/v2/Champions?page=${page}&per_page=200`;

                const championsResp = await axios.get(championsUrl, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${crmToken}`,
                    },
                });

                const records = championsResp.data.data || [];
                console.log(`Fetched ${records.length} champions (page ${page})`);

                if (records.length > 0) {
                    allChampions = allChampions.concat(records);
                    page++;

                    // Check if there's more data
                    const info = championsResp.data.info;
                    if (!info || !info.more_records) {
                        hasMoreRecords = false;
                    }
                } else {
                    hasMoreRecords = false;
                }
            } catch (error) {
                console.error(`Error fetching Champions page ${page}:`, error.response?.data || error.message);
                throw new Error(`Failed to fetch Champions: ${error.message}`);
            }
        }

        console.log(`Total champions fetched: ${allChampions.length}`);

        // Filter to only Computer Donors
        const computerDonors = allChampions.filter(champion => {
            const championType = champion.Champion_Type || [];
            return championType.some(t => t === 'Computer Donor');
        });

        console.log(`Computer donors: ${computerDonors.length}`);

        // Step 2: Fetch ALL Computer_Donors records from CRM
        let allDonorRecords = [];
        page = 1;
        hasMoreRecords = true;

        while (hasMoreRecords) {
            const donorsUrl = `https://www.zohoapis.com/crm/v2/Computer_Donors?page=${page}&per_page=200`;

            const donorsResp = await axios.get(donorsUrl, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${crmToken}`,
                },
            });

            const records = donorsResp.data.data || [];
            console.log(`Fetched ${records.length} donor records (page ${page})`);

            if (records.length > 0) {
                allDonorRecords = allDonorRecords.concat(records);
                page++;

                // Check if there's more data
                const info = donorsResp.data.info;
                if (!info || !info.more_records) {
                    hasMoreRecords = false;
                }
            } else {
                hasMoreRecords = false;
            }
        }

        console.log(`Total donor records fetched: ${allDonorRecords.length}`);

        // Step 3: Fetch ALL Inventory records from Creator
        let allInventory = [];
        let from = 1;
        hasMoreRecords = true;

        console.log("Fetching inventory records...");

        while (hasMoreRecords) {
            const inventoryUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?from=${from}&limit=200`;

            const inventoryResp = await axios.get(inventoryUrl, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${creatorToken}`,
                },
            });

            const records = inventoryResp.data.data || [];
            console.log(`Fetched ${records.length} inventory records (from index ${from})`);

            if (records.length > 0) {
                allInventory = allInventory.concat(records);
                from += records.length;

                if (records.length < 200) {
                    hasMoreRecords = false;
                }
            } else {
                hasMoreRecords = false;
            }
        }

        console.log(`Total inventory records fetched: ${allInventory.length}`);

        // Filter to count ALL computers donated to C4P (exclude Monitor, Phone, Misc)
        // We count all statuses: In Stock, Donated, Recycled, etc.
        const excludedTypes = ['Monitor', 'Phone', 'Misc'];
        const allComputersDonatedToC4P = allInventory.filter(record => {
            const type = record.Computer_Type || '';

            // Only exclude specific non-computer types
            if (excludedTypes.includes(type)) return false;

            return true;
        });

        console.log(`Total computers donated to C4P (excluding ${excludedTypes.join(', ')}): ${allComputersDonatedToC4P.length}`);

        // Step 4: Build leaderboard by aggregating data
        const leaderboardMap = new Map();

        for (const champion of computerDonors) {
            const championId = champion.ID || champion.id;
            const companyName = champion.Company || `${champion.First_Name || ''} ${champion.Last_Name || ''}`.trim();

            // Get all donor records for this champion
            const championDonorRecords = allDonorRecords.filter(donor => {
                const donorChampionId = donor.Champion?.ID || donor.Champion;
                return donorChampionId === championId;
            });

            // Get all donor IDs for this champion
            const donorIds = championDonorRecords.map(donor => donor.Donor_ID);

            // Count ALL computers from inventory linked to these donor IDs
            const championComputers = allComputersDonatedToC4P.filter(computer => {
                return donorIds.includes(computer.Donor_ID);
            });

            // Calculate total weight
            const totalWeight = championComputers.reduce((sum, computer) => {
                return sum + (parseFloat(computer.Weight) || 0);
            }, 0);

            // Get most recent donation date
            const donationDates = championComputers
                .map(c => c.Date_Donated)
                .filter(d => d && d !== 'N/A')
                .sort()
                .reverse();
            const latestDonation = donationDates[0] || null;

            // Extract state from champion data if available
            const state = champion.State || champion.Mailing_State || null;

            // Extract industry from champion data if available
            const industry = champion.Industry || null;

            leaderboardMap.set(championId, {
                id: championId,
                company: companyName,
                firstName: champion.First_Name || '',
                lastName: champion.Last_Name || '',
                computersDonated: championComputers.length,
                totalWeight: Math.round(totalWeight),
                latestDonation: latestDonation,
                state: state,
                industry: industry,
                donorCount: donorIds.length
            });
        }

        // Convert map to array and sort by computers donated
        const leaderboard = Array.from(leaderboardMap.values())
            .filter(entry => entry.computersDonated > 0) // Only include champions with donations
            .sort((a, b) => b.computersDonated - a.computersDonated);

        // Calculate overall stats
        const totalComputersDonated = leaderboard.reduce((sum, entry) => sum + entry.computersDonated, 0);
        const totalWeight = leaderboard.reduce((sum, entry) => sum + entry.totalWeight, 0);
        const totalCompanies = leaderboard.length;

        // Group by industry
        const byIndustry = {};
        leaderboard.forEach(entry => {
            const ind = entry.industry || 'Uncategorized';
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

        // Group by state
        const byState = {};
        leaderboard.forEach(entry => {
            const st = entry.state || 'Unknown';
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

        // Cache the results for 1 hour
        cachedLeaderboard = result;
        cacheExpiration = Date.now() + (60 * 60 * 1000); // 1 hour
        console.log('Leaderboard cached until:', new Date(cacheExpiration));

        res.json(result);

    } catch (error) {
        console.error("Error fetching leaderboard:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
}
