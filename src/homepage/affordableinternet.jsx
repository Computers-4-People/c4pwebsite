import React, { useState, useEffect } from "react";
import Header from "../components/header"; // Import the Header component

// Updated image sources for the hotspot, starting with simcard.png
const images = [
  '/Hotspot/simcard.png',
  '/Hotspot/t10front.png',
  '/Hotspot/t10back.png',
  '/Hotspot/t10side.png'
];

export default function AffordableInternet() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Start with simcard.png
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToForm = () => {
    const formSection = document.getElementById("inquiry-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Functions to handle next and previous images
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [selectedImageIndex]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <Header 
        props={{
          bgImage: '/refurbished/refurbishedbackground.png',
          titlePart1: 'C4P Mobile Internet',
          titlePart2: 'Only $10/month',
          description: 'Stay connected with the most affordable internet available today.',
          links: [
            { text: 'Get Connected', clickAction: scrollToForm },
            // { text: 'Renew Service', url:'https://zfrmz.com/gJV8kQamz35e1CFDLp9e'}
          ]
        }} 
      />

      {/* Information Section with Integrated Image Slider */}
      <div className="bg-white py-32 flex flex-col md:flex-row items-center justify-center relative flex-1">
        {/* Image Slider */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
          {/* Arrows and Main Image */}
          <div className="flex items-center justify-center w-full max-w-xl mb-4">
            <button
              onClick={handlePrevImage}
              className="text-4xl text-gray-600 hover:text-black mx-2 focus:outline-none"
              aria-label="Previous Image"
            >
              &#8249; {/* Left arrow */}
            </button>
            <img
              src={images[selectedImageIndex]}
              alt={`Hotspot Image ${selectedImageIndex + 1}`}
              className="w-full h-auto max-w-lg rounded-lg"
            />
            <button
              onClick={handleNextImage}
              className="text-4xl text-gray-600 hover:text-black mx-2 focus:outline-none"
              aria-label="Next Image"
            >
              &#8250; {/* Right arrow */}
            </button>
          </div>
        </div>

        {/* Internet Plan Info */}
        <div className="w-full md:w-1/2 text-lg text-gray-800 space-y-4 text-center md:text-left">
          <ul className="space-y-4">
            <li>🌐 Unlimited 4G LTE data with nationwide coverage</li>
            <li>🔌 Connect up to 10 devices simultaneously</li>
            <li>🎒 Portable and lightweight—take it anywhere</li>
            <li>🔒 Secure connection with WPA2 encryption</li>
            <li>📅 No contract, renew yearly</li>
            <li>✅ $10/Month for Data | $60 for the Device</li>
            <li>🚚 Free 1 Week Shipping</li>
          </ul>
          <a
            href="https://www.t-mobile.com/coverage/coverage-map?icid=MGPO_TMO_C_5GNETWORK_MJR8SPU7KMEJO9V30719"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-c4p hover:bg-c4p-hover text-white font-semibold px-4 py-2 rounded-md shadow-md"
          >
            Check Coverage Map
          </a>
        </div>
      </div>

      {/* Full-Screen Form Section */}
      <div
        id="inquiry-form"
        className="bg-black flex items-center justify-center relative h-screen"
      >
        <div className="w-full h-full">
          <iframe
            loading="lazy"
            className="w-full h-full"
            scrolling="no"
            aria-label="Hotspot Purchase Form"
            src="https://forms.zohopublic.com/Computers4People/form/HotspotWaitlist/formperma/-2FoLFadGJP2PromraxAXtJQxTv-VHV1IsH7ENsLo88"
            style={{ border: "none" }}
            title="Hotspot Purchase Form"
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          ></iframe>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white">Loading...</div>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-white">Failed to load the form. Please try again later.</div>
            </div>
          )}
        </div>
      </div>

      {/* Renew Internet Section */}
      <div className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Qualify for free Internet?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          If you are part of a partnership program with Computers 4 People, you can apply for a free hotspot and data.
        </p>
        <a
          href="/Hotspot"
          className="bg-c4p hover:bg-c4p-hover text-white font-semibold px-8 py-4 rounded-md shadow-md"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
