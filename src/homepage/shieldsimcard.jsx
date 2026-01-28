import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAffiliatePrefill from "../hooks/useAffiliatePrefill";
import ZohoCheckoutFrame from "../components/ZohoCheckoutFrame";
import { shieldFaqs } from "./shieldFaqs";

const faqs = shieldFaqs;

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-20 px-6 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center gap-3 min-w-0"
              >
                <span className="truncate">{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-gray-700 mt-2 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Shieldsimcard() {
  const images = ["/Hotspot/simcard.png", "/Hotspot/tmobilesimside.png"];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  useAffiliatePrefill();

  return (
    <div className="bg-white py-20 px-4 sm:px-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <a
          href="/shield#plans"
          className="inline-block text-c4p hover:underline font-medium text-sm"
        >
          ← Back to Shield
        </a>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Product Display */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <div className="w-full sm:w-[640px] bg-gray-100 rounded-xl flex items-center justify-center p-8 min-h-[300px] max-h-[440px] mx-auto order-1 sm:order-2">
              <img
                src={selectedImage}
                alt="SIM Card"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start gap-2 order-2 sm:order-1">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-22 h-14 object-cover rounded-md cursor-pointer border ${
                    selectedImage === img ? "border-c4p" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 sm:pl-[4.5rem] hidden lg:block">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Unlimited Internet Plan – SIM Card Only (No Device Included)
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
              Already have your own device? This plan gives you unlimited 4G and 5G internet for only $14.89/month.

              <br /><br />
              <b>This does not include a device.</b><br />
              You need to use your own hotspot, tablet, or wearable. It must be unlocked and work with T-Mobile or GSM SIM cards.

              <br /><br />
              <b>How it works:</b><br />
              - We ship you a free SIM card (1-2 weeks)<br />
              - Put it into your device<br />
              - Turn it on and start using the internet

              <br /><br />
              No contracts. No hidden fees. No internet slowdowns. Just fast, simple internet that works nationwide.
              <br/><br/>
              Prepaid Service<br />
              Shield Internet service is prepaid and billed monthly on the 1st. If you cancel, your service will remain active until the end of your current billing cycle, then automatically stop. No partial refunds are provided for unused days.
            </p>
            <p className="text-sm text-gray-600 mt-10">
              <b>Looking to buy in bulk?</b> Over 30 SIMs? Reach out. Otherwise, buy online as normal.
            </p>
          </div>
        </div>

        {/* Right: Checkout (mobile title/description) */}
        <div className="w-full mt-0 lg:-mt-20">
          <div className="lg:hidden mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Unlimited Internet Plan – SIM Card Only (No Device Included)
            </h1>
            <p className="text-gray-700 text-base">
              Already have your own device? This plan gives you unlimited 4G and 5G internet for only $14.89/month.
            </p>
          </div>
        <ZohoCheckoutFrame
  baseUrl="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105"
/>
          <div className="mt-4 lg:hidden">
            <p className="text-gray-700 text-base max-w-xl">
              <b>This does not include a device.</b><br />
              You need to use your own hotspot, tablet, or wearable. It must be unlocked and work with T-Mobile or GSM SIM cards.

              <br /><br />
              <b>How it works:</b><br />
              - We ship you a free SIM card (1-2 weeks)<br />
              - Put it into your device<br />
              - Turn it on and start using the internet

              <br /><br />
              No contracts. No hidden fees. No internet slowdowns. Just fast, simple internet that works nationwide.
              <br/><br/>
              Prepaid Service<br />
              Shield Internet service is prepaid and billed monthly on the 1st. If you cancel, your service will remain active until the end of your current billing cycle, then automatically stop. No partial refunds are provided for unused days.
            </p>
            <p className="text-sm text-gray-600 mt-10">
              <b>Looking to buy in bulk?</b> Over 30 SIMs? Reach out. Otherwise, buy online as normal.
            </p>
          </div>
        </div>
      </div>

      <FAQSection/>
    </div>
  );
}
