import React, { useState } from 'react';
import Header from '../../components/header';
import DonationSection from "../../components/DonationSection";
import DonationProgressBar from '../../components/DonationProgressBar';

export default function DavidSun() {
  const [amount, setAmount] = useState(1000000);
  const [method, setMethod] = useState('credit');

  // Helper: format number with commas
  const formatNumber = (num) => {
    if (isNaN(num)) return '';
    return num.toLocaleString();
  };

  // Parse a formatted string like "12,345" back to a number, clamped to $2,000,000
  const parseNumber = (str) => {
    const cleaned = str.replace(/[^0-9]/g, '');
    const parsed = cleaned === '' ? 0 : parseInt(cleaned, 10);
    return Math.min(parsed, 2000000);
  };

  const calculateImpact = (amt) => {
    const devices = Math.floor(amt / 50);
    const lives = devices * 2.5;
    const gdp = devices * 500;
    return { devices, lives, gdp };
  };

  const impact = calculateImpact(amount);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div id="main-content">
      <div className="bg-gray-100 py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
          <div className="w-[360px] h-[640px] rounded-3xl overflow-hidden shadow-lg border border-gray-300">
            <iframe
              width="360"
              height="640"
              src="https://www.youtube.com/embed/xw1JUoGZlqI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="text-left space-y-6 max-w-xl">
            <h1 className="text-4xl font-bold">David, Will You Join Us?</h1>
            <p className="text-lg">
              We’re raising $2 million to donate 40,000 computers, build a nationwide model, and launch Granson, your AI grandson that teaches people how to use a computer.
            </p>
            <p className="text-lg">
              At Computers 4 People, we’ve already delivered thousands of refurbished devices, over 5 million hours of internet, and digital skills training across NJ, NYC, and MA.
            </p>
            <p className="text-lg">
              With your support we can close the digital divide nationwide. Will you lead our fundraise with a $1M commitment?
            </p>
            <p className="text-lg">
              contact me:<br/>
              dylan@computers4people.org<br/>
              2014234666
            </p>
            <button
              onClick={() => handleScroll('donation-section')}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
            >
              Help Us Make It Happen
            </button>
          </div>
        </div>
      </div>
      <DonationSection />
    </div>
  );
}
