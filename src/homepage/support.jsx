import React, { useState } from 'react';
import Header from '../components/header';
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
            src="https://www.youtube.com/embed/ORY6p5V3AIQ"
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

      <div className="flex flex-col items-center py-10 px-4">
  <div className="w-full max-w-5xl h-48 rounded-xl overflow-hidden shadow-lg border">
    <iframe
      title="Donation Analytics"
      src="https://analytics.zoho.com/open-view/2989565000001939405"
      className="w-full h-full"
      frameBorder="0"
    ></iframe>
  </div>
  <p className="text-sm text-gray-500 mt-2 italic">Progress bar updated daily</p>
</div>


      <div
        id="donation-section"
        className="max-w-4xl mx-auto px-6 py-16 space-y-8"
      >
        <h3 className="text-3xl font-bold text-center">
          Test Your Donation’s Impact
        </h3>

        {/* Larger formatted input with dollar sign and commas */}
        <div>
          <label htmlFor="donation-input" className="sr-only">
            Donation Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 select-none">
              $
            </span>
            <input
              id="donation-input"
              type="text"
              value={formatNumber(amount)}
              onChange={(e) => {
                const parsed = parseNumber(e.target.value);
                setAmount(parsed);
              }}
              className="w-full border rounded-lg pl-10 pr-4 py-4 text-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter donation amount"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded-lg shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              💻 {impact.devices.toLocaleString()}
            </p>
            <p className="text-sm">Devices + AI Access</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              👥 {Math.floor(impact.lives).toLocaleString()}+
            </p>
            <p className="text-sm">Lives Impacted (2.5×)</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <p className="text-3xl font-bold flex items-center justify-center gap-2">
              💵 ${impact.gdp.toLocaleString()}
            </p>
            <p className="text-sm">Est. Lifetime GDP Impact</p>
          </div>
        </div>

        {/* Oversized payment method buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {['credit', 'ach', 'check', 'wire', 'crypto'].map((opt) => (
            <button
              key={opt}
              onClick={() => setMethod(opt)}
              className={`
                px-6 py-4 rounded-lg border-2 font-semibold text-lg
                ${
                  method === opt
                    ? 'bg-green-500 text-white border-green-600'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Fake details for ACH, Wire, Crypto, and Check only */}
        <div className="mt-6 space-y-4">
          {method === 'ach' && (
            <iframe
              title="ACH Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/MakeaDonationACH/formperma/mw8B9BqMFtuyGiJNCBxs-F3YmtpC4WSi6FQoKR6q6M8"
            ></iframe>
          )}

          {method === 'wire' && (
            <iframe
              title="Wire Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/Wellemailyouthedetails/formperma/vY6wCa_98cWceJjB21x_SCcYwgKR8Twdb7M6Lfy4_V4"
            ></iframe>
          )}

          {method === 'crypto' && (
            <iframe
              title="Crypto Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/Wellemailyouthedetails/formperma/vY6wCa_98cWceJjB21x_SCcYwgKR8Twdb7M6Lfy4_V4"
            ></iframe>
          )}

          {method === 'check' && (
            <div className="border p-4 rounded-lg shadow text-sm">
              <p>
                Make checks payable to{' '}
                <strong>Computers For People Inc.</strong>
              </p>
              <p>EIN: <strong>83-3405612</strong></p>
              <p>Mail to:</p>
              <p>
                <strong>
                  321 Newark St #32
                  <br />
                  Hoboken, NJ 07030
                  <br />
                  United States
                </strong>
              </p>
            </div>
          )}
        </div>

        {/* Only show the credit iframe */}
        {method === 'credit' && (
          <iframe
            title="Credit Donation Form"
            className="w-full h-[700px] border rounded-lg"
            src="https://forms.zohopublic.com/Computers4People/form/MakeaDonationACH/formperma/mw8B9BqMFtuyGiJNCBxs-F3YmtpC4WSi6FQoKR6q6M8"
          ></iframe>
        )}
      </div>
    </div>
  );
}

