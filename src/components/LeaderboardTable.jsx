import React, { useState, useMemo } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const LeaderboardTable = ({ leaderboard = [], byIndustry = [] }) => {
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter leaderboard based on selected industry and search
    const filteredLeaderboard = useMemo(() => {
        let filtered = leaderboard;

        // Filter by industry
        if (selectedIndustry !== 'all') {
            filtered = filtered.filter(entry => {
                const industry = entry.industry || 'Uncategorized';
                return industry === selectedIndustry;
            });
        }

        // Filter by search query (company name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(entry =>
                entry.company.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [leaderboard, selectedIndustry, searchQuery]);

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

    return (
        <div className="w-full">
            {/* Filters Section */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-c4p focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                {/* Industry Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <FiFilter className="text-gray-600" />
                    <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-c4p focus:border-transparent bg-white cursor-pointer"
                    >
                        <option value="all">All Industries</option>
                        {byIndustry.map((industry) => (
                            <option key={industry.industry} value={industry.industry}>
                                {industry.industry} ({industry.computersDonated.toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {(selectedIndustry !== 'all' || searchQuery) && (
                    <button
                        onClick={() => {
                            setSelectedIndustry('all');
                            setSearchQuery('');
                        }}
                        className="text-sm text-c4p hover:text-c4p-hover font-medium transition-colors"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredLeaderboard.length} of {leaderboard.length} {filteredLeaderboard.length === 1 ? 'company' : 'companies'}
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
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                                Industry
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                                Computers Donated
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                                Total Weight (lbs)
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                                State
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredLeaderboard.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    {searchQuery || selectedIndustry !== 'all'
                                        ? 'No companies match your filters.'
                                        : 'No donation data available yet.'}
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
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-c4p bg-opacity-10 text-c4p-dark">
                                                {entry.industry || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-lg text-c4p-dark">
                                                {entry.computersDonated.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-gray-700">
                                            {entry.totalWeight.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-800 font-medium">
                                                {entry.state || 'N/A'}
                                            </span>
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
