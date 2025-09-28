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
          titlePart1: "Drop Off Your",
          titlePart2: "Computers",
          description:
            "Donate your used tech at over 10,000 locations nationwide. It's fast, easy, and completely free.",
          links: [
            {
              text: "Find a drop-off site near me",
              clickAction: () => scrollToElement("findadropoff"),
            },
          ],
        }}
      />

      {/* Drop-Off Locations Section */}
      <div
        className="container mx-auto px-4 py-16 mb-20"
        style={{ marginBottom: "20rem" }}
      >
        <div id="findadropoff" className="space-y-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-subtitle">
            Drop Off Nationwide. Make an Impact.
          </h2>
          <p className="text-lg leading-7 md:leading-8">
            Computers 4 People now accepts{" "}
            <strong>laptops, smartphones, and tablets</strong> at over 10,000
            FedEx and Walgreens locations across the U.S. - completely FREE.
            <br />
            <br />
            To donate:
            <br />
            1. Fill out the{" "}
            <a href="/donate" className="text-c4p hover:underline">
              donate form
            </a>
            <br />
            2. Get your QR code
            <br />
            3. Drop off your boxed device at{" "}
            <a
              className="text-c4p hover:underline"
              href="https://local.fedex.com/en/search"
              target="_blank"
              rel="noopener noreferrer"
            >
              a location near you
            </a>
            <br />
            <br />
            We securely wipe all devices, refurbish what we can, and donate them
            to people in need. Anything we can’t reuse is recycled responsibly.
          </p>
          <p className="text-lg leading-7 md:leading-8">
            Want to donate <strong>other electronics</strong> like desktops,
            monitors, or printers? Please bring them to one of our official C4P
            facilities:
          </p>

          {/* Official C4P Drop-Off Locations */}
          <ul className="list-disc list-inside text-lg space-y-2 mt-6">
            <li>
              <a
                href="https://maps.app.goo.gl/9YfNz8L3JnzY11i89"
                target="_blank"
                rel="noopener noreferrer"
                className="text-c4p hover:underline"
              >
                C4P Hoboken
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/h9MEpo4xzz8XjzTg8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-c4p hover:underline"
              >
                Hoboken Library
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/YbUcjcVYP2g1mDRQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-c4p hover:underline"
              >
                Bayonne Library
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "10rem" }}></div>
    </div>
  );
}
