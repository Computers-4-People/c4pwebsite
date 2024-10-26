import React, { useState } from "react";
import Header from "../components/header";  // Import the Header component

// Example image sources for the hotspot
const images = [
  '/Hotspot/t10front.png',
  '/Hotspot/t10back.png',
  '/Hotspot/t10side.png',
  '/Hotspot/simcard.png'
];

export default function AffordableInternet() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Manage current image index

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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Header 
        props={{
          bgImage: '/refurbished/refurbishedbackground.png',
          titlePart1: 'C4P Mobile Internet',
          titlePart2: 'Only $10/month',
          description: 'Stay connected with the most affordable internet available today.',
          links: [{ text: 'Get Connected', clickAction: scrollToForm }, { text: 'Renew Service', url:'https://zfrmz.com/gJV8kQamz35e1CFDLp9e'}]
        }} 
      />

      {/* Information Section */}
      <div className="bg-white py-32 flex flex-col md:flex-row items-center justify-center relative">
        <div className="w-full md:w-1/2 text-center mb-8 md:mb-0">
          <img
            src="/Hotspot/C4P Sim.png"
            alt="Computers 4 People branded Sim Card"
            className="w-full max-w-xs md:max-w-sm mx-auto"
          />
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

      {/* Big Title Overlay */}
      <div className="relative flex justify-center">
        <h1 className="absolute top-[-50px] text-5xl md:text-6xl font-title text-black z-10 mt-20">
          Secure Your Internet Today!
        </h1>
      </div>

      {/* Form Section with Image Carousel and Arrows */}
      <div id="inquiry-form" className="bg-white flex items-center justify-center relative">
        <div className="w-full max-w-5xl p-0 rounded-lg flex flex-col md:flex-row items-center">
          
          {/* Thumbnails and Arrows Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            {/* Arrows */}
            <div className="flex items-center justify-between w-full max-w-xs mb-4">
              <button onClick={handlePrevImage} className="text-4xl text-gray-600 hover:text-black">
                &#8249; {/* Left arrow */}
              </button>
              <img
                src={images[selectedImageIndex]}
                alt="T10 Hotspot Device"
                className="w-full h-auto border-4 border-black rounded-lg"
              />
              <button onClick={handleNextImage} className="text-4xl text-gray-600 hover:text-black">
                &#8250; {/* Right arrow */}
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4 justify-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`T10 Hotspot - ${index}`}
                  className={`w-20 h-20 border-2 ${selectedImageIndex === index ? 'border-c4p' : 'border-gray-300'} rounded-md cursor-pointer hover:opacity-80`}
                  onClick={() => setSelectedImageIndex(index)} // Change the main image when clicked
                />
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg">
            <iframe
              className="w-full h-[160vh] rounded-lg border-2 border-c4p"
              scrolling="no"
              aria-label="Hotspot Purchase Form"
              src="https://forms.zohopublic.com/Computers4People/form/PurchaseHotspots/formperma/BPtj0tI5JjmIlFMOoxr0aLx2FKPfd5Lg6noIgsD9qSU"
              style={{ border: "none" }}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Renew Internet Section */}
      <div className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Qualify for free Internet?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          If you are part of a partnership program with Computers 4 People. You can apply for a free hotspot and data.
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
