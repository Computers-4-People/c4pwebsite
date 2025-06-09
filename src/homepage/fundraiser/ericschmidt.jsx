import React, { useState } from 'react';
import Header from '../../components/header';
import DonationProgressBar from '../../components/DonationProgressBar';

export default function EricSchmidt() {
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
              src="https://www.youtube.com/embed/D0Ih_w7lqLI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="text-left space-y-6 max-w-xl">
            <h1 className="text-4xl font-bold">Eric, Will You Join Us?</h1>
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
      <div id="donation-section" className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h3 className="text-3xl font-bold text-center">Test Your Donation’s Impact</h3>

        {/* Larger formatted input with dollar sign and commas */}
        <div>
          <label htmlFor="donation-input" className="sr-only">Donation Amount</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 select-none">$</span>
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
                ${method === opt ? 'bg-green-500 text-white border-green-600' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
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
              <p>Make checks payable to <strong>Computers For People Inc.</strong></p>
              <p>EIN: <strong>83-3405612</strong></p>
              <p>Mail to:</p>
              <p>
                <strong>
                  321 Newark St #32<br />
                  Hoboken, NJ 07030<br/>
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
