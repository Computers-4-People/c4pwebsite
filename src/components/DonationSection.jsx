import React, { useState } from "react";

/**
 * <DonationSection />
 * -------------------
 * Encapsulates everything from the donation-progress bar down to the
 * payment-method forms, plus a "Past Supporters" logo banner.
 */
export default function DonationSection() {
  const [amount, setAmount] = useState(10000);
  const [method, setMethod] = useState("credit");

  /* ----------------------------- helpers ----------------------------- */
  const formatNumber = (num) => (isNaN(num) ? "" : num.toLocaleString());

  const parseNumber = (str) => {
    const cleaned = str.replace(/[^0-9]/g, "");
    const parsed = cleaned === "" ? 0 : parseInt(cleaned, 10);
    return Math.min(parsed, 2_000_000);
  };

  const calculateImpact = (amt) => {
    const devices = Math.floor(amt / 50);
    const lives = devices * 2.5;
    const gdp = devices * 500;
    return { devices, lives, gdp };
  };

  const impact = calculateImpact(amount);

  /* ------------------------------------------------------------------- */
  return (
    <>
      {/* --- Past supporters banner ----------------------------------- */}
      <section className="max-w-5xl mx-auto px-6 py-16 mt-20">
        <h4 className="text-center text-2xl font-semibold mb-8 uppercase tracking-wide">
          Past Supporters Include
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
          {[
            { src: "/Financial Contribution/schmidt.png", alt: "Schmidt Futures" },
            { src: "/Financial Contribution/bofa.png", alt: "Bank of America" },
            { src: "/Financial Contribution/fcc.png", alt: "Federal Communications Commission" },
            { src: "/Financial Contribution/qbe.png", alt: "QBE" },
            { src: "/Financial Contribution/metlife.png", alt: "MetLife Foundation" },
            { src: "/Financial Contribution/att.png", alt: "AT&T" },
          ].map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="h-28 md:h-32 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </section>

      {/* <div className="flex flex-col items-center py-10 px-4">
  <div className="w-full max-w-5xl h-48 rounded-xl overflow-hidden shadow-lg border">
    <iframe
      title="Donation Analytics"
      src="https://analytics.zoho.com/open-view/2989565000001939405"
      className="w-full h-full"
      frameBorder="0"
    ></iframe>
  </div>
  <p className="text-sm text-gray-500 mt-2 italic">Progress bar updated daily</p>
</div> */}

      {/* --- Impact calculator & payment options ----------------------- */}
      <div id="donation-section" className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <h3 className="text-3xl font-bold text-center">Test Your Impact and Donate Today</h3>

        {/* Donation amount input */}
        <div>
          <label htmlFor="donation-input" className="sr-only">Donation Amount</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 select-none">$</span>
            <input
              id="donation-input"
              type="text"
              value={formatNumber(amount)}
              onChange={(e) => setAmount(parseNumber(e.target.value))}
              className="w-full border rounded-lg pl-10 pr-4 py-4 text-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter donation amount"
            />
          </div>
        </div>

        {/* Impact stats */}
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

        {/* Payment method buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["credit", "ach", "check", "wire", "crypto"].map((opt) => (
            <button
              key={opt}
              onClick={() => setMethod(opt)}
              className={`px-6 py-4 rounded-lg border-2 font-semibold text-lg ${
                method === opt ? "bg-green-500 text-white border-green-600" : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic forms / instructions */}
        <div className="mt-6 space-y-4">
          {method === "ach" && (
            <iframe
              title="ACH Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/MakeaDonationACH/formperma/mw8B9BqMFtuyGiJNCBxs-F3YmtpC4WSi6FQoKR6q6M8"
            ></iframe>
          )}

          {method === "wire" && (
            <iframe
              title="Wire Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/Wellemailyouthedetails/formperma/vY6wCa_98cWceJjB21x_SCcYwgKR8Twdb7M6Lfy4_V4"
            ></iframe>
          )}

          {method === "crypto" && (
            <iframe
              title="Crypto Donation Form"
              className="w-full h-[700px] border rounded-lg"
              src="https://forms.zohopublic.com/Computers4People/form/Wellemailyouthedetails/formperma/vY6wCa_98cWceJjB21x_SCcYwgKR8Twdb7M6Lfy4_V4"
            ></iframe>
          )}

          {method === "check" && (
            <div className="border p-4 rounded-lg shadow text-sm">
              <p>Make checks payable to <strong>Computers For People Inc.</strong></p>
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

        {/* Credit form (default) */}
        {method === "credit" && (
          <iframe
            title="Credit Donation Form"
            className="w-full h-[700px] border rounded-lg"
            src="https://forms.zohopublic.com/Computers4People/form/DonateForm/formperma/-oOB6dH1UA3fpQV30XIgZNSyj7TFVh19ptZh_AebFWk"
          ></iframe>
        )}
      </div>
    </>
  );
}
