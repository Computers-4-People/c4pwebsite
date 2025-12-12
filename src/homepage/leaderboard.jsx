
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import USMapChart from '../components/USMapChart';
import LeaderboardTable from '../components/LeaderboardTable';

const AnimatedDots = () => {
    return (
        <span className="inline-flex gap-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
        </span>
    );
};

function Leaderboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    const fetchLeaderboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`${API_BASE_URL}/api/leaderboard`);
            setData(response.data);
            console.log('Leaderboard data loaded:', response.data);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to load leaderboard data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const stats = data?.stats || {
        totalComputersDonated: 0,
        totalWeight: 0,
        totalCompanies: 0,
        goal: 1000000,
        percentageComplete: 0
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-32 lg:pb-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-title text-gray-900 mb-3">
                        Champion Leaderboard
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 font-paragraph">
                        Celebrating companies making a difference through computer donations
                    </p>
                </div>

                {/* Thermometer and Leaderboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Vertical Thermometer */}
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-title text-gray-900 mb-4 text-center">
                            Progress Toward 1 Million Computers
                        </h2>

                        <div className="flex flex-col items-center">
                            {/* Goal at top */}
                            <div className="text-center mb-3">
                                <div className="text-4xl font-bold text-gray-900">
                                    {stats.goal.toLocaleString()}
                                </div>
                                <div className="text-base text-gray-600">Goal</div>
                            </div>

                            {/* Thermometer */}
                            <div className="relative w-24 lg:w-20 h-64 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-c4p to-c4p-hover transition-all duration-1000 ease-out"
                                    style={{
                                        height: `${Math.min(
                                            parseFloat(stats.percentageComplete) < 50
                                                ? parseFloat(stats.percentageComplete) * 2
                                                : parseFloat(stats.percentageComplete),
                                            100
                                        )}%`
                                    }}
                                />
                            </div>

                            {/* Current amount at bottom */}
                            <div className="text-center mt-3">
                                <div className="text-4xl font-bold text-c4p-dark">
                                    {loading ? <AnimatedDots /> : stats.totalComputersDonated.toLocaleString()}
                                </div>
                                <div className="text-base text-gray-600">Computers Donated</div>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard Table */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-2xl font-title text-gray-900 mb-4 text-center">
                            Top Companies by Industry
                        </h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-2xl text-gray-500">
                                    Loading leaderboard<AnimatedDots />
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-600 py-12">
                                {error}
                                <button
                                    onClick={fetchLeaderboardData}
                                    className="mt-4 px-6 py-2 bg-c4p hover:bg-c4p-hover text-white rounded-lg transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <LeaderboardTable
                                leaderboard={data?.leaderboard || []}
                                byIndustry={data?.byIndustry || []}
                            />
                        )}
                    </div>
                </div>

                {/* Highlights Section */}
                {!loading && !error && data?.highlights && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
                        {/* Latest Donation */}
                        {data.highlights.latestDonation && (
                            <div className="bg-white rounded-xl shadow-md p-3 lg:p-6 border-l-4 border-c4p">
                                <div className="text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1 lg:mb-2">
                                    Latest Donation
                                </div>
                                <div className="text-sm lg:text-xl font-bold text-gray-900 truncate">
                                    {data.highlights.latestDonation.company}
                                </div>
                                <div className="text-lg lg:text-2xl font-bold text-c4p-dark mt-1">
                                    {data.highlights.latestDonation.computers.toLocaleString()}
                                </div>
                                {data.highlights.latestDonation.date && (
                                    <div className="text-xs lg:text-sm text-gray-500 mt-1">
                                        {new Date(data.highlights.latestDonation.date).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Biggest Donation Ever */}
                        {data.highlights.biggestDonation && (
                            <div className="bg-white rounded-xl shadow-md p-3 lg:p-6 border-l-4 border-c4p">
                                <div className="text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1 lg:mb-2">
                                    Biggest Donation
                                </div>
                                <div className="text-sm lg:text-xl font-bold text-gray-900 truncate">
                                    {data.highlights.biggestDonation.company}
                                </div>
                                <div className="text-lg lg:text-2xl font-bold text-c4p-dark mt-1">
                                    {data.highlights.biggestDonation.computers.toLocaleString()}
                                </div>
                                {data.highlights.biggestDonation.date && (
                                    <div className="text-xs lg:text-sm text-gray-500 mt-1">
                                        {new Date(data.highlights.biggestDonation.date).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Biggest Donation This Month */}
                        {data.highlights.biggestDonationThisMonth && (
                            <div className="bg-white rounded-xl shadow-md p-3 lg:p-6 border-l-4 border-c4p">
                                <div className="text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1 lg:mb-2">
                                    Top This Month
                                </div>
                                <div className="text-sm lg:text-xl font-bold text-gray-900 truncate">
                                    {data.highlights.biggestDonationThisMonth.company}
                                </div>
                                <div className="text-lg lg:text-2xl font-bold text-c4p-dark mt-1">
                                    {data.highlights.biggestDonationThisMonth.computers.toLocaleString()}
                                </div>
                                {data.highlights.biggestDonationThisMonth.date && (
                                    <div className="text-xs lg:text-sm text-gray-500 mt-1">
                                        {new Date(data.highlights.biggestDonationThisMonth.date).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Top Industry */}
                        {data.highlights.topIndustry && (
                            <div className="bg-white rounded-xl shadow-md p-3 lg:p-6 border-l-4 border-c4p">
                                <div className="text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1 lg:mb-2">
                                    Leading Industry
                                </div>
                                <div className="text-sm lg:text-xl font-bold text-gray-900 truncate">
                                    {data.highlights.topIndustry.industry}
                                </div>
                                <div className="text-lg lg:text-2xl font-bold text-c4p-dark mt-1">
                                    {data.highlights.topIndustry.computersDonated.toLocaleString()}
                                </div>
                                <div className="text-xs lg:text-sm text-gray-500 mt-1">
                                    {data.highlights.topIndustry.companies} companies
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* US Map Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h3 className="text-3xl font-title text-gray-900 mb-6 text-center">
                        Donations by State
                    </h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-2xl text-gray-500">
                                Loading map<AnimatedDots />
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 py-12">
                            {error}
                        </div>
                    ) : (
                        <USMapChart byState={data?.byState || []} />
                    )}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-gradient-to-r from-c4p to-c4p-hover rounded-xl shadow-xl p-8 text-center text-white">
                    <h3 className="text-3xl font-title mb-4">
                        Join the Leaderboard
                    </h3>
                    <p className="text-xl font-paragraph mb-6 max-w-2xl mx-auto">
                        Does your company have computers to donate? Become a Champion and help us reach our goal of 1 million computers!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/support"
                            className="px-8 py-3 bg-white text-c4p font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                        >
                            Fund Access
                        </a>
                        <a
                            href="/donate"
                            className="px-8 py-3 bg-c4p-darker text-white font-semibold rounded-lg hover:bg-c4p-darkest transition-colors shadow-md"
                        >
                            Donate Computers
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Leaderboard;
