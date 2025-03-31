// pages/connect.js
import React, { useState } from "react";
import ImageMarquee from "../components/imagemarquee";
import Testimonial from "../components/testimonial.jsx";
import Header from "../components/header";

export default function Connect() {
  const partnerLogos = [
    { src: "../logos/insidernj.png", alt: "Insider NJ" },
    { src: "../logos/forbes.png", alt: "Forbes" },
    { src: "../logos/abc7.png", alt: "ABC 7" },
    { src: "../logos/yahoonews.png", alt: "Yahoo News" },
    { src: "../logos/nbc.png", alt: "NBC" },
    { src: "../logos/hobokengirl.png", alt: "Hoboken Girl" },
    { src: "../logos/patch.png", alt: "Patch" },
    { src: "../logos/kellyclarksonshow.png", alt: "Kelly Clarkson Show" },
    { src: "../logos/benzinga.png", alt: "Benzinga" },
    { src: "../logos/roinj.png", alt: "ROI-NJ" },
    { src: "../logos/entrepreneur.png", alt: "Entrepreneur" },
    { src: "../logos/hudsonreporter.png", alt: "Hudson Reporter" },
    { src: "../logos/msn.png", alt: "MSN" },
    { src: "../logos/tapinto.png", alt: "TapInto" },
    { src: "../logos/bloomberg.png", alt: "Bloomberg" },
    { src: "../logos/news12.png", alt: "News 12" },
    { src: "../logos/jewishstandard.png", alt: "Jewish Standard" },
    { src: "../logos/aol.png", alt: "AOL" },
    { src: "../logos/hudsoncounty.png", alt: "Hudson County" },
    { src: "../logos/biztech.png", alt: "BizTech" },
    { src: "../logos/fox.png", alt: "Fox" },
    { src: "../logos/69wfmz.png", alt: "69 WFMZ" },
    { src: "../logos/broadwayworld.png", alt: "Broadway World" },
    { src: "../logos/bbj.png", alt: "BBJ" },
    { src: "../logos/eagletribune.png", alt: "Eagle Tribune" },
    { src: "../logos/govtech.png", alt: "GovTech" },
    { src: "../logos/njdigest.png", alt: "NJ Digest" },
    { src: "../logos/poetsandquants.png", alt: "Poets and Quants" },
    { src: "../logos/intheknow.png", alt: "In The Know" },
    { src: "../logos/njcom.png", alt: "NJ.com" },
    { src: "../logos/pbsnews.png", alt: "PBS News" },
    { src: "../logos/babsonthought.png", alt: "Babson Thought" }
  ];
  // Toggle: false => Monthly ($15), true => Yearly ($150)
  const [isYearly, setIsYearly] = useState(false);

  // Display text
  const displayedPrice = isYearly ? "$150/Year" : "$15/Month";
  const planSubtitle = isYearly
    ? "Pay once for a year—save $30!"
    : "Billed at $15/month.";

  // Replace these with your real Zoho subscription links
  const monthlyZohoLink =
    "https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=0";
  const yearlyZohoLink =
    "https://mobile.computers4people.org/subscribe/03638b39613949c17f5acef7f9c2e31ae1a7c0fe9a557b71f9dbc01d8bde3e04/1000?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=0";
  const planIframeSrc = isYearly ? yearlyZohoLink : monthlyZohoLink;

  const togglePlan = () => {
    setIsYearly((prev) => !prev);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 1) HEADER */}
      <Header
        props={{
          bgImage: "/refurbished/refurbishedbackground.png",
          titlePart1: "C4P Connect",
          titlePart2: "Affordable Internet",
          description:
            "Unlimited 4G/5G hotspot data with no caps or throttling. Only $15/month or $150/year.",
          links: [
            {
              text: "Get Connected",
              clickAction: () => {
                const el = document.getElementById("checkout-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              },
            },
          ],
          logos: ["/Hotspot/missiontelecom.png"],
        }}
      />
      {/* 2) NO ONE SHOULD HAVE TO CHOOSE... SECTION */}
      <Testimonial props={{
                      title2: '',
                      desc2: 'No one should have to choose between groceries and internet',
                      image: '../Hotspot/internetmain.png'
                  }} />

      {/* 3) PAYMENT SECTION */}
      <div
        id="checkout-section"
        className="max-w-6xl w-full mx-auto px-4 pb-12"
      >
        <div className="border border-gray-200 rounded-md shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Price toggle, T-Mobile SIM mention, T10 info */}
          <div className="space-y-6">
            {/* Price & Toggle */}
            <div>
              <h2 className="text-3xl font-bold text-green-600">
                {displayedPrice}
              </h2>
              <p className="text-sm text-gray-500">{planSubtitle}</p>
              <div className="mt-4 flex items-center">
                <span className="font-medium mr-2 text-gray-700">Monthly</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isYearly}
                    onChange={togglePlan}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-c4p peer-focus:ring-offset-2 peer-checked:bg-c4p rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all relative" />
                </label>
                <span className="font-medium ml-2 text-gray-700">Yearly</span>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-sm">
              A T-Mobile SIM is included with every plan. Simply pop it into your own unlocked device or add on a T10 hotspot for $60. Your plan auto-renews for uninterrupted coverage.
              </p>
            </div>

            {/* T10 Hotspot Info + Image */}
            <div className="border border-gray-200 rounded-md p-4">
              <img
                src="/Hotspot/t10front.png" /* Example T10 image */
                alt="T10 Hotspot"
                className="w-32 h-auto object-contain rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                T10 Hotspot ($60)
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
                <li>4G LTE speeds</li>
                <li>Connect up to 10 devices</li>
                <li>Compact &amp; user-friendly</li>
              </ul>
              <p className="text-gray-500 text-sm">
                Add the T10 at checkout or use your own unlocked hotspot.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Zoho Checkout iFrame */}
          <div
            className="rounded-md overflow-hidden flex items-start justify-center"
            style={{ minHeight: "600px" }}
          >
            <iframe
              src={planIframeSrc}
              width="100%"
              height="700"
              style={{ border: "none", borderRadius: "6px" }}
              title="Zoho Subscription Checkout"
            />
          </div>
        </div>
      </div>
      <div className="m-50"><ImageMarquee
                     images={partnerLogos}
                     title="We're new to selling internet. But you may have heard of us..."
                   />
                   </div>

      {/* 4) COMPETITOR ANALYSIS AT THE BOTTOM */}
      <div className="max-w-5xl w-full mx-auto px-4 pb-12 mt-20">
        <div className="border-2 border-gray-300 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Compare</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">Features</th>
                  <th className="py-3 px-4 text-center font-semibold">
                    C4P Connect
                  </th>
                  <th className="py-3 px-4 text-center font-semibold">
                    Other Large Carriers
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t">
                  <td className="py-3 px-4">Unlimited Data</td>
                  <td className="py-3 px-4 text-center">✔</td>
                  <td className="py-3 px-4 text-center">Throttled</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Monthly Cost</td>
                  <td className="py-3 px-4 text-center font-bold text-c4p">
                    $15
                  </td>
                  <td className="py-3 px-4 text-center">$50–$70</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Yearly Cost</td>
                  <td className="py-3 px-4 text-center font-bold text-c4p">
                    $150
                  </td>
                  <td className="py-3 px-4 text-center">$600–$840</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Free Shipping</td>
                  <td className="py-3 px-4 text-center">✔</td>
                  <td className="py-3 px-4 text-center">✘</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Hotspot Devices</td>
                  <td className="py-3 px-4 text-center">
                    T10 &amp; unlocked devices
                  </td>
                  <td className="py-3 px-4 text-center">Varies</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">100% profits are donated</td>
                  <td className="py-3 px-4 text-center">
                  ✔
                  </td>
                  <td className="py-3 px-4 text-center">✘</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
