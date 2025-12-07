
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiUsers, FiPackage, FiTarget } from 'react-icons/fi';
import Header from '../components/header';
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
            {/* Header Section */}
            <Header props={{
                bgImage: '/donation.jpg',
                titlePart1: 'Champion',
                titlePart2: 'Leaderboard',
                description: 'Celebrating companies making a difference through computer donations',
                links: []
            }} />

            {/* Stats Overview Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-title text-gray-900 mb-4">
                        Progress Toward 1 Million Computers Donated
                    </h2>
                    <p className="text-xl text-gray-600 font-paragraph">
                        Together, we're collecting computers to bridge the digital divide
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner relative">
                        <div
                            className="bg-gradient-to-r from-c4p to-c4p-hover h-full transition-all duration-1000 ease-out"
                            style={{
                                width: `${Math.min(
                                    parseFloat(stats.percentageComplete) < 50
                                        ? parseFloat(stats.percentageComplete) * 2
                                        : parseFloat(stats.percentageComplete),
                                    100
                                )}%`
                            }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 text-white font-bold text-sm"
                            style={{
                                left: `${Math.min(
                                    parseFloat(stats.percentageComplete) < 50
                                        ? parseFloat(stats.percentageComplete) * 2
                                        : parseFloat(stats.percentageComplete),
                                    100
                                )}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {!loading && stats.totalComputersDonated.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex justify-end mt-2 text-sm text-gray-600">
                        <span>{stats.goal.toLocaleString()} Goal</span>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Computers */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-c4p hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Computers Donated
                                </p>
                                <p className="text-3xl font-bold text-c4p-dark mt-2">
                                    {loading ? <AnimatedDots /> : stats.totalComputersDonated.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-c4p bg-opacity-10 p-4 rounded-full">
                                <FiPackage className="text-3xl text-c4p" />
                            </div>
                        </div>
                    </div>

                    {/* Total Weight */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Weight
                                </p>
                                <p className="text-3xl font-bold text-blue-700 mt-2">
                                    {loading ? <AnimatedDots /> : `${stats.totalWeight.toLocaleString()} lbs`}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-full">
                                <FiTrendingUp className="text-3xl text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Total Companies */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Contributing Companies
                                </p>
                                <p className="text-3xl font-bold text-purple-700 mt-2">
                                    {loading ? <AnimatedDots /> : stats.totalCompanies.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-full">
                                <FiUsers className="text-3xl text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Remaining to Goal */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    Remaining to Goal
                                </p>
                                <p className="text-3xl font-bold text-orange-700 mt-2">
                                    {loading ? (
                                        <AnimatedDots />
                                    ) : (
                                        (stats.goal - stats.totalComputersDonated).toLocaleString()
                                    )}
                                </p>
                            </div>
                            <div className="bg-orange-100 p-4 rounded-full">
                                <FiTarget className="text-3xl text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Rankings by Industry Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h3 className="text-3xl font-title text-gray-900 mb-6 text-center">
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
