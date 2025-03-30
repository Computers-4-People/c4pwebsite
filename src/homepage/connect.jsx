import React, { useState, useEffect } from "react";
import Header from "../components/header"; // Import the Header component

// Image sources for the hotspot
const images = [
  "/Hotspot/simcard.png",
  "/Hotspot/t10front.png",
  "/Hotspot/t10side.png",
  "/Hotspot/t10back.png",
];

export default function Connect() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected plan

  const scrollToForm = () => {
    const formSection = document.getElementById("purchase-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Automatically cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Handlers for selecting plans
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    scrollToForm(); // Scroll to the purchase form when a plan is selected
  };

  const handleHideForm = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header
        props={{
          bgImage: "/refurbished/refurbishedbackground.png",
          titlePart1: "C4P Connect",
          titlePart2: "Affordable Internet",
          description:
            "Access the nation's largest and most reliable unlimited mobile internet plan. Purchase or Renew Internet starting at $12/month.",
          links: [{ text: "Get Connected", clickAction: scrollToForm }],
          logos: ["/Hotspot/missiontelecom.png"], // Replace with actual logo paths
        }}
      />
      {/* Internet Plan Information */}
      <div className="bg-white py-32 flex flex-col md:flex-row items-center justify-center flex-1">
        <div className="w-full md:w-1/2">
          <div className="relative max-w-lg mx-auto">
            <img
              src={images[selectedImageIndex]}
              alt={`Hotspot Image ${selectedImageIndex + 1}`}
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 text-center">
          <ul className="space-y-4">
            <li>
              🌐 <strong>Unlimited 4G and 5G Data</strong> with no data caps or throttling
            </li>
            <li>
              🚀 Speeds provided with this plan:
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>5G:</strong> Download 72–245 Mbps | Upload 15–31 Mbps | Latency 19–37 ms
                </li>
                <li>
                  • <strong>4G:</strong> Download 37–119 Mbps | Upload 7–25 Mbps | Latency 24–40 ms
                </li>
              </ul>
            </li>
            <li>🔌 Connect up to 10 devices simultaneously</li>
            <li>🔒 Secure connection with WPA2 encryption for added safety</li>
            <li>🚛 Free 5 Day Shipping</li>
            <li>
              📍{" "}
              <a
                href="https://map.coveragemap.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-c4p hover:underline"
              >
                Check Signal Strength in Your Area
              </a>
            </li>
            <li>
              📄{" "}
              <a
                href="https://missiontelecom.org/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-c4p hover:underline"
              >
                View Privacy Policy
              </a>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
            <button
              onClick={() => handleSelectPlan("12-month")}
              className="bg-c4p hover:bg-c4p-hover text-white font-semibold rounded-md shadow-md px-4 py-2"
            >
              Purchase 12-Month Plan
            </button>
            <button
              onClick={() => handleSelectPlan("3-month")}
              className="bg-c4p hover:bg-c4p-hover text-white font-semibold rounded-md shadow-md px-4 py-2"
            >
              Purchase 3-Month Plan
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Form Section */}
      <div id="purchase-form" className="bg-gray-900 text-white py-16 flex flex-col items-center">
        {selectedPlan && (
          <div className="max-w-lg bg-white text-black p-6 rounded-lg shadow-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Purchase {selectedPlan === "12-month" ? "12-Month" : "3-Month"} Internet Plan
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Stay connected with affordable, reliable internet. Click the button below to purchase your{" "}
              {selectedPlan === "12-month" ? "12-month" : "3-month"} plan today!
            </p>
            <button
              onClick={handleHideForm}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-md mb-4"
            >
              Hide Form
            </button>

            {/* Conditional Rendering of the Purchase Form */}
            <div className="mt-6">
              {selectedPlan === "12-month" && (
                <iframe
                  width="100%"
                  height="998"
                  src="https://mobile.computers4people.org/subscribe/03638b39613949c17f5acef7f9c2e31ae1a7c0fe9a557b71f9dbc01d8bde3e04/1000?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=1"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="12-Month Purchase Form"
                ></iframe>
              )}
              {selectedPlan === "3-month" && (
                <iframe
                  width="100%"
                  height="998"
                  src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/3?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=1"
                  style={{
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="3-Month Purchase Form"
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Optional: You can uncomment and style the Free Internet Application Section if needed */}
      {/* <div className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">Qualify for Free Internet?</h2>
        <p className="text-gray-300 my-4">
          If you meet eligibility requirements through our partner programs, apply for free internet.
        </p>
        <a href="/hotspot" className="bg-c4p hover:bg-c4p-hover text-white font-semibold rounded-md shadow-md px-6 py-3">
          Apply for Free Internet
        </a>
      </div> */}
    </div>
  );
}
