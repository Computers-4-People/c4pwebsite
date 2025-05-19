// src/components/DonationProgressBar.js
import React, { useEffect, useState } from 'react';

const DonationProgressBar = () => {
    const [total, setTotal] = useState(0);
    const goal = 2000000;

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const res = await fetch('/api/donations-total');
                const data = await res.json();
                setTotal(data.total);
            } catch (err) {
                console.error('Failed to fetch donation total:', err);
            }
        };

        fetchTotal();
    }, []);

    const percentage = Math.min((total / goal) * 100, 100).toFixed(1);

    return (
        <div className="my-12 text-center px-6">
            <h2 className="text-3xl font-bold text-c4p mb-2">Support Our 2025 Goal</h2>
            <p className="text-lg mb-4">
                <strong>${total.toLocaleString()}</strong> raised of <strong>$2,000,000</strong>
            </p>
            <div className="w-full max-w-3xl mx-auto bg-gray-300 rounded-full h-8 overflow-hidden shadow-inner">
                <div
                    className="bg-c4p text-white h-full text-right pr-4 font-semibold text-lg leading-8"
                    style={{ width: `${percentage}%`, transition: 'width 1s ease-in-out' }}
                >
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

export default DonationProgressBar;
