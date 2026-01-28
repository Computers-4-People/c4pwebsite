// pages/shieldsimcard6months.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAffiliatePrefill from "../hooks/useAffiliatePrefill";
import ZohoCheckoutFrame from "../components/ZohoCheckoutFrame";
import { shieldFaqs } from "./shieldFaqs";

const faqs = shieldFaqs;

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

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

export default function ShieldSimCardSixMonths() {
  const images = ["/Hotspot/simcard.png", "/Hotspot/tmobilesimside.png"];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  useAffiliatePrefill();

  return (
    <div className="bg-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <a href="/shield#plans" className="inline-block text-c4p hover:underline font-medium text-sm">
          ← Back to Shield
        </a>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: product */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <div className="w-full sm:w-[640px] bg-gray-100 rounded-xl flex items-center justify-center p-8 min-h-[300px] max-h-[440px] mx-auto relative order-1 sm:order-2">
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide shadow">
                  Back to School Sale
                </span>
              </div>
              <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide shadow">
                Ends Sept 14
              </span>
              <img src={selectedImage} alt="SIM Card" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start gap-2 order-2 sm:order-1">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumb ${i + 1}`}
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
              6-Month Prepaid Internet — SIM Card Only (No Device)
            </h1>
            <p className="text-gray-700 text-base max-w-xl mb-6">
              Internet service only (no device). SIM included — just insert and go. $84 one-time for 6 months.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">What’s Included in Every Bundle</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Unlimited data (no caps, no slowdowns)</li>
              <li>Nationwide coverage on T-Mobile’s 4G & 5G network</li>
              <li>SIM card included – just insert and go</li>
              <li>One-time payment, no monthly billing hassles</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">How It Works</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>We ship you a SIM card (delivery takes 1–2 weeks)</li>
              <li>Insert it into your unlocked hotspot, tablet, or GSM-compatible phone</li>
              <li>Power on and start browsing, streaming, learning, and connecting</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">No Contracts, No Hidden Fees</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Prepaid — pay once per 6-month term</li>
              <li>No cancellation fees</li>
              <li>Plan automatically renews at the end of each term unless cancelled</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Perfect for Back-to-School</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Students learning from home</li>
              <li>Families needing affordable internet</li>
              <li>Job seekers and remote workers</li>
              <li>Anyone who wants reliable, nationwide connectivity</li>
            </ul>

            <p className="mt-4 text-sm font-medium text-red-600">Act fast! This Back-to-School Flash Sale ends September 14th.</p>

            <p className="text-xs text-gray-500 mt-6">
              Your payment includes shipping and processing. Service begins about 10 days after subscribing.
              Shield Internet is a prepaid service. Bundles automatically renew at the end of each term unless cancelled before the renewal date.
              No partial refunds are provided for unused days.
            </p>
          </div>
        </div>

        {/* Right: checkout (mobile title/description) */}
        <div className="w-full mt-0 lg:-mt-20">
          <div className="lg:hidden mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              6-Month Prepaid Internet — SIM Card Only (No Device)
            </h1>
            <p className="text-gray-700 text-base">
              Internet service only (no device). SIM included — just insert and go. $84 one-time for 6 months.
            </p>
          </div>
        <ZohoCheckoutFrame
  baseUrl="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/60"
/>
          <div className="mt-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-3">What’s Included in Every Bundle</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Unlimited data (no caps, no slowdowns)</li>
              <li>Nationwide coverage on T-Mobile’s 4G & 5G network</li>
              <li>SIM card included – just insert and go</li>
              <li>One-time payment, no monthly billing hassles</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">How It Works</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>We ship you a SIM card (delivery takes 1–2 weeks)</li>
              <li>Insert it into your unlocked hotspot, tablet, or GSM-compatible phone</li>
              <li>Power on and start browsing, streaming, learning, and connecting</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">No Contracts, No Hidden Fees</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Prepaid — pay once per 6-month term</li>
              <li>No cancellation fees</li>
              <li>Plan automatically renews at the end of each term unless cancelled</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Perfect for Back-to-School</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>Students learning from home</li>
              <li>Families needing affordable internet</li>
              <li>Job seekers and remote workers</li>
              <li>Anyone who wants reliable, nationwide connectivity</li>
            </ul>

            <p className="mt-4 text-sm font-medium text-red-600">Act fast! This Back-to-School Flash Sale ends September 14th.</p>

            <p className="text-xs text-gray-500 mt-6">
              Your payment includes shipping and processing. Service begins about 10 days after subscribing.
              Shield Internet is a prepaid service. Bundles automatically renew at the end of each term unless cancelled before the renewal date.
              No partial refunds are provided for unused days.
            </p>
          </div>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
