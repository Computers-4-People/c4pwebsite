import React from "react";
import Header from "../components/header";

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function DropOffLocations() {
  return (
    <div id="main-content" className="font-sans overflow-x-hidden">
      {/* Header Section */}
      <Header
        props={{
          bgImage: "/ewastedropoff/dropoffbackground.jpeg",
          titlePart1: "Find Nearby",
          titlePart2: "Electronic Drop-Off Locations",
          description:
            "Search for the most convenient locations to drop off your electronics. Together, we can close the digital divide and promote sustainability.",
          links: [
            {
              text: "Find a drop-off site near me",
              clickAction: () => scrollToElement("findadropoff"),
            },
          ],
        }}
      />

      {/* Drop-Off Locations Section */}
      <div className="container mx-auto px-4 py-16 mb-20">
        <div id="findadropoff" className="space-y-6">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-title">
            Find a Drop-Off Site Near You
          </h2>
          <p className="text-lg md:text-lg leading-7 md:leading-8">
            Drop off your electronics securely at our partner locations. Complete the{" "}
            <a href="/donate" className="text-blue-500 hover:underline">donate form</a> and attach your Donor ID to get a tax receipt and track your donation. We’ll handle recycling, refurbishment, or redistribution to those in need.
          </p>
          {/* Embedded Google Maps Locator */}
          <div className="relative w-full pb-[56.25%] mt-8">
            <iframe
              src="https://storage.googleapis.com/maps-solutions-37fwki99o4/locator-plus/bqa2/locator-plus.html"
              className="absolute top-0 left-0 w-full h-full border-0 rounded-md"
              loading="lazy"
              title="Drop-Off Locations Map"
              style={{ border: "0", height: "80vh" }}
            ></iframe>
          </div>
        </div>
        {/* Additional padding for mobile */}
        <div className="h-32 md:h-16"></div>
      </div>
    </div>
  );
}
