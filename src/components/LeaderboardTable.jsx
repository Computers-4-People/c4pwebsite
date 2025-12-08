import React, { useState, useMemo } from 'react';
import { FiFilter } from 'react-icons/fi';

const LeaderboardTable = ({ leaderboard = [], byIndustry = [] }) => {
    // Default to first industry if available
    const [selectedIndustry, setSelectedIndustry] = useState(
        byIndustry.length > 0 ? byIndustry[0].industry : ''
    );

    // Update selected industry when byIndustry changes
    React.useEffect(() => {
        if (byIndustry.length > 0 && !selectedIndustry) {
            setSelectedIndustry(byIndustry[0].industry);
        }
    }, [byIndustry, selectedIndustry]);

    // Filter leaderboard based on selected industry and limit to top 3
    const filteredLeaderboard = useMemo(() => {
        const filtered = leaderboard.filter(entry => {
            const industry = entry.industry || 'Uncategorized';
            return industry === selectedIndustry;
        });

        return filtered.slice(0, 3); // Only show top 3
    }, [leaderboard, selectedIndustry]);

    // Get rank medal icon
    const getRankIcon = (rank) => {
        if (rank === 1) return <span className="inline-block text-yellow-500 text-2xl">🏆</span>;
        if (rank === 2) return <span className="inline-block text-gray-400 text-2xl">🥈</span>;
        if (rank === 3) return <span className="inline-block text-amber-600 text-2xl">🥉</span>;
        return null;
    };

    // Get rank display with special styling for top 3
    const getRankDisplay = (rank) => {
        if (rank <= 3) {
            return (
                <div className="flex items-center gap-2">
                    {getRankIcon(rank)}
                    <span className="font-bold text-lg">{rank}</span>
                </div>
            );
        }
        return <span className="text-gray-700">{rank}</span>;
    };

    // Get top 3 companies for each industry for the dropdown
    const getTop3ForIndustry = (industryName) => {
        const companies = leaderboard
            .filter(entry => (entry.industry || 'Uncategorized') === industryName)
            .slice(0, 3)
            .map(entry => entry.company);
        return companies;
    };

    return (
        <div className="w-full">
            {/* Industry Filter Section */}
            <div className="mb-6">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-c4p text-xl" />
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Select Industry
                        </span>
                    </div>
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-c4p focus:border-c4p bg-white cursor-pointer text-lg font-medium text-gray-800 hover:border-c4p transition-colors shadow-sm"
                    >
                        {byIndustry.map((industry) => {
                            const top3 = getTop3ForIndustry(industry.industry);
                            const top3Text = top3.length > 0
                                ? top3.map((company, i) => `#${i + 1} ${company}`).join(' • ')
                                : 'No companies';
                            return (
                                <option key={industry.industry} value={industry.industry}>
                                    {industry.industry} — {top3Text}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-c4p to-c4p-hover text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                                Computers Donated
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredLeaderboard.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                    No companies in this industry.
                                </td>
                            </tr>
                        ) : (
                            filteredLeaderboard.map((entry, index) => {
                                const rank = index + 1;
                                const isTopThree = rank <= 3;

                                return (
                                    <tr
                                        key={entry.id}
                                        className={`hover:bg-gray-50 transition-colors ${
                                            isTopThree ? 'bg-green-50' : ''
                                        }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getRankDisplay(rank)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">
                                                {entry.company}
                                            </div>
                                            {entry.latestDonation && (
                                                <div className="text-xs text-gray-500">
                                                    Last donation: {new Date(entry.latestDonation).toLocaleDateString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-lg text-c4p-dark">
                                                {entry.computersDonated.toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardTable;
