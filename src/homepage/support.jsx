import React, { useState } from 'react';
import Header from '../components/header';
import DonationSection from "../components/DonationSection";
import DonationProgressBar from '../components/DonationProgressBar';

export default function Support() {
  const [amount, setAmount] = useState(10000);
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
    <div className="font-sans">
      <Header
        props={{
          bgImage: '/Financial Contribution/supportbackground.png',
          titlePart1: 'Everyone Deserves',
          titlePart2: 'Digital Access',
          description:
            'We are raising a transformative $2,000,000 to close the digital access gap.',
          links: [
            {
              text: 'Donate Now',
              clickAction: () => handleScroll('donation-section'),
            },
            { text: 'Donate Computers', url: '/donate' },
          ],
        }}
      />
      <div className="mt-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-64 md:h-80"
            src="https://www.youtube.com/embed/w6kwU9lIqic"
            title="Why Donate"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">I will close the Gap</h2>
          <p>
            I started Computers 4 People when I was 15, just picking up old devices and
            fixing them in my bedroom. I couldn't stop thinking about how many people were
            missing out just because they didn’t have a computer.
          </p>
          <p>
            Since then, we’ve donated thousands of computers, delivered over a million hours
            of internet access, and reached people across NJ, NYC, and now Massachusetts.
          </p>
          <p className="italic font-semibold">
            Our goal is big: 1 million computers donated by 2030.
          </p>
          <p>
            We’re raising to donate 40,000 computers in 2026, launch a scalable nationwide
            model, and roll out an AI assistant to automate digital skills training. Please
            consider being a part of this journey.
          </p>
          <p className="font-semibold">–Dylan Zajac</p>
        </div>
      </div>
      <DonationSection />
    </div>
  );
}

