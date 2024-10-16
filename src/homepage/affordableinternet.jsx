import React from "react";

// Static Hotspot Image
const hotspotImage = "/Hotspot/T10 1.png";

export default function AffordableInternet() {
  const scrollToForm = () => {
    const formSection = document.getElementById("inquiry-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), 
            url('/refurbished/refurbishedbackground.png')`,
        }}
      >
        <div className="z-10 px-10">
          <h1 className="font-title text-7xl md:text-8xl 2xl:text-9xl mb-6">
            <p className="text-c4p animate-fade-up">Next-Gen Internet</p>
            <p className="text-white animate-fade-up">Only $10/month</p>
          </h1>
          <p className="text-white text-lg md:text-xl 2xl:text-2xl mb-8 animate-fade-up-delay">
            Get the **most affordable** internet available today. No one should<br/>
            be left behind in the digital age—stay connected, stay ahead!
          </p>
          <button
            onClick={scrollToForm}
            className="bg-c4p hover:bg-c4p-hover text-white text-lg font-semibold px-10 py-3 rounded-md shadow-lg transition duration-300 animate-fade-up"
          >
            Get Yours Now
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white py-16 px-8 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-c4p">
          Hotspot Plans & Features
        </h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-10">
          {/* Static Hotspot Photo */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={hotspotImage}
              alt="Hotspot Device"
              className="rounded-lg"
            />
          </div>

          {/* Internet Plan Info */}
          <div className="w-full md:w-2/3 text-lg text-gray-800 space-y-4">
            <ul className="space-y-2">
              <li>✅ Unlimited 4G LTE data with nationwide coverage</li>
              <li>✅ Connect up to 10 devices simultaneously</li>
              <li>✅ Portable and lightweight—take it anywhere</li>
              <li>✅ Secure connection with WPA2 encryption</li>
              <li>✅ No contract, renew yearly</li>
            </ul>
            <a
              href="https://www.t-mobile.com/coverage/coverage-map?icid=MGPO_TMO_C_5GNETWORK_MJR8SPU7KMEJO9V30719"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-c4p hover:bg-c4p-hover text-white font-semibold px-4 py-2 rounded-md shadow-md"
            >
              Check Coverage Map
            </a>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div
        id="inquiry-form"
        className="bg-black py-20 flex items-center justify-center"
      >
        <div className="w-full max-w-5xl p-10 rounded-lg">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6">
            Secure Your Internet Today
          </h2>
          <iframe
            className="w-full h-[85vh] rounded-lg border-2 border-c4p"
            scrolling="yes"
            aria-label="Hotspot Purchase Form"
            src="https://forms.zohopublic.com/Computers4People/form/PurchaseHotspots/formperma/BPtj0tI5JjmIlFMOoxr0aLx2FKPfd5Lg6noIgsD9qSU"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>

      {/* Renew Internet Section */}
      <div className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Already a Customer?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Renew your internet plan and stay connected to the world.
        </p>
        <a
          href="https://zfrmz.com/gJV8kQamz35e1CFDLp9e"
          className="bg-c4p hover:bg-c4p-hover text-white font-semibold px-8 py-4 rounded-md shadow-md"
        >
          Renew Your Internet
        </a>
      </div>
    </div>
  );
}
