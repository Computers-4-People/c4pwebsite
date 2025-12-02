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

        console.log("Building leaderboard from inventory data only (simplified approach)...");

        // Fetch first 5 pages of inventory (1000 records) - enough for a good leaderboard
        let allInventory = [];
        const maxPages = 5;

        for (let pageNum = 0; pageNum < maxPages; pageNum++) {
            try {
                const from = (pageNum * 200) + 1;
                const inventoryUrl = `https://creator.zoho.com/api/v2/${process.env.ZOHO_CREATOR_APP_OWNER}/${process.env.ZOHO_CREATOR_APP_NAME}/report/Portal?from=${from}&limit=200`;

                const inventoryResp = await axios.get(inventoryUrl, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${creatorToken}`,
                    },
                    timeout: 5000
                });

                const records = inventoryResp.data.data || [];
                console.log(`Fetched ${records.length} inventory records (from ${from})`);

                if (records.length > 0) {
                    allInventory = allInventory.concat(records);
                    if (records.length < 200) break;
                } else {
                    break;
                }
            } catch (error) {
                console.error(`Error fetching inventory page ${pageNum}:`, error.message);
                break;
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
                    company: `Donor ${donorId}`, // Will show donor ID as company name
                    computersDonated: 0,
                    totalWeight: 0,
                    latestDonation: null,
                    state: null,
                    industry: 'Uncategorized'
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
