// pages/shieldsimcard12months.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAffiliatePrefill from "../hooks/useAffiliatePrefill";
import ZohoCheckoutFrame from "../components/ZohoCheckoutFrame";

const faqs = [
  {
    question: "Why We Call It Shield",
    answer:
      "Shield means protection. Shield Internet is part of Computers 4 People, a nonprofit that gives free computers to those in need. Shield protects your right to connect: offering affordable, reliable internet, and freedom from big contracts. Every dollar goes back to providing free computers and digital skills. Shield is more than a name, it’s our promise to stand with you.",
  },
  {
    question: "Who can get Shield Internet?",
    answer:
      "Shield Internet is built for people who need affordable, reliable service - including students, families focused on education, and those working toward new career opportunities. If you’re looking for a low-cost way to stay connected, Shield may be the right fit. Just verify you meet the eligibility requirements by checking a box when you order. No documentation. No paperwork. No stress.",
  },
  {
    question: "See Shield Internet's Broadband Facts Label",
    answer: (
      <div>
        <p>
          Here is Shield Internet&apos;s Broadband Facts label, showing key details
          about pricing, speeds, and terms in a simple, transparent format.
        </p>
        <img
          src="/Hotspot/shieldbroadbandfacts.png"
          alt="Shield Internet Broadband Facts Label"
          className="mt-4 w-full max-w-xl rounded-lg shadow-md border border-gray-200"
        />
      </div>
    ),
  },
  {
    question: "What is the coverage of Shield Internet?",
    answer: (
      <>
        Shield Internet uses the largest nationwide 5G network (Only available in the United States). You can check coverage in your area by visiting this{" "}
        <a
          href="https://www.t-mobile.com/coverage/coverage-map?icid=MGPO_TMO_P_TMOSWAPPNP_0BLNXB4P50PQBSLHM30956"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Coverage Map
        </a>.
      </>
    ),
  },
  {
    question: "When will my order arrive?",
    answer:
      "Most orders arrive in about 10 business days. If you order just the SIM card, it will ship on its own. If you order the hotspot, your SIM card will already be inside the device when it arrives. For the Shield 5G Home Router (pre-order), the shipping timeline is currently unknown - we’ll send you updates as soon as it’s on the way.",
  },
  {
    question: "What does the internet plan include?",
    answer:
      "You get unlimited internet on one of the biggest 5G networks in the country. No data overages. No annual service contract. On network coverage only, no domestic roaming. During congestion, customers on this plan may notice speeds lower than other customers and further reduction if using >100GB/mo., due to data prioritization.",
  },
  {
    question: "Is the router locked or restricted?",
    answer:
      "The Shield 5G Home Router is fully unlocked and portable. It works with most SIM cards and supports 5G, 4G, and 3G networks. The Shield 5G Hotspot, however, is locked to work only with our Shield Internet plan.",
  },
  {
    question: "What if I have technical issues?",
    answer:
      "We’ve got you covered. You’ll get easy setup instructions, tips to boost your signal, and email support if you need help. Just reach out anytime at info@computers4people.org.",
  },
  {
    question: "Where does my money go?",
    answer:
      "100% of profits go to Computers 4 People, a nonprofit working to close the digital divide by giving away free computers and digital training to people who need them.",
  },
  {
    question: "Can I buy in bulk?",
    answer:
      "Yes! If you're looking to provide internet access for a group, organization, or program, please reach out to us to explore a custom partnership: info@computers4people.org",
  },
];

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

export default function ShieldSimCardTwelveMonths() {
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
              12-Month Prepaid Internet — SIM Card Only (No Device)
            </h1>
            <p className="text-gray-700 text-base max-w-xl mb-6">
              Internet service only (no device). SIM included — just insert and go. $156 one-time for 12 months.
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
              <li>Prepaid — pay once per 12-month term</li>
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

            <p className="text-xs text-gray-500 mt-6">
              Your payment includes shipping and processing. Service begins about 10 days after signup.
              Shield Internet is a prepaid service. Bundles automatically renew at the end of each term unless cancelled before the renewal date.
              No partial refunds are provided for unused days.
            </p>
          </div>
        </div>

        {/* Right: checkout (mobile title/description) */}
        <div className="w-full mt-0 lg:-mt-20">
          <div className="lg:hidden mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              12-Month Prepaid Internet — SIM Card Only (No Device)
            </h1>
            <p className="text-gray-700 text-base">
              Internet service only (no device). SIM included — just insert and go. $156 one-time for 12 months.
            </p>
          </div>
        <ZohoCheckoutFrame
  baseUrl="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/1000"
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
              <li>Prepaid — pay once per 12-month term</li>
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

            <p className="text-xs text-gray-500 mt-6">
              Your payment includes shipping and processing. Service begins about 10 days after signup.
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
