import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Why We Call It Shield",
    answer:
      "Shield means protection. Shield Internet is part of Computers 4 People, a nonprofit that gives free computers to those in need. Shield protects your right to connect: offering affordable, reliable internet, and freedom from big contracts. Every dollar goes back to providing free computers and digital skills. Shield is more than a name, it’s our promise to stand with you.",
  },
  {
    question: "Who can get Shield Internet?",
    answer:
      "If your household gets SNAP, Medicaid, SSI, free school lunch, or earns under 200% of the Federal Poverty Level, you’re likely eligible. Just check a box to confirm when you order. No documentation. No paperwork. No stress.",
  },
  {
    question: "When will my order arrive?",
    answer:
      "Most orders arrive in about 10 business days. If you order just the SIM card, it will ship on its own. If you order the hotspot, your SIM card will already be inside the device when it arrives. For the Shield 5G Home Router (pre-order), the shipping timeline is currently unknown - we’ll send you updates as soon as it’s on the way.",
  },
  {
    question: "What does the internet plan include?",
    answer:
      "You get unlimited internet on one of the biggest 5G networks in the country. There’s no contract, no credit check, and no hidden fees - just fast, reliable internet you can count on.",
  },
  {
    question: "Is the router locked or restricted?",
    answer:
      "The Shield 5G Home Router is fully unlocked and portable. It works with most SIM cards and supports 5G, 4G, and 3G networks. The Shield Hotspot, however, is locked to work only with our Shield Internet (T-Mobile) plan.",
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
];


function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-20 px-6 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center"
              >
                {faq.question}
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

export default function ShieldHeader() {
  return (
    <>
      {/* First Viewport: Hero + Media Logos */}
      <div className="min-h-screen flex flex-col justify-between bg-gray-100 px-4 text-center">
        {/* Main header section centered vertically */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-grow flex flex-col items-center justify-center"
        >
          
          {/* Shield icon + text */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
            <img
              src="/Hotspot/shieldlogo.png"
              alt="Shield Icon"
              className="w-32 sm:w-40"
            />
            <img
              src="/Hotspot/shield.png"
              alt="Shield Text"
              className="w-60 sm:w-80"
            />
          </div>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-800">
            Unlimited Internet. Lowest Monthly Price in America. Zero Strings Attached.
          </p>

          {/* CTA button (scrolls to info/features) */}
          <a href="#features" className="mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-c4p hover:bg-c4p text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
            >
              Get Connected Now
            </motion.button>
          </a>
          {/* Mission Telecom Image at bottom of hero section */}
<div className="mt-10">
  <img
    src="/Hotspot/missiontelecom.png"
    alt="Mission Telecom"
    className="mx-auto h-12 sm:h-16 object-contain"
  />
</div>

        </motion.div>

{/* Bottom logo bar */}
<div className="w-full py-6 bg-white border-t border-gray-200">
  <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
    {[
      { src: "/logos/forbes.png", alt: "Forbes" },
      { src: "/logos/nbc.png", alt: "NBC" },
      { src: "/logos/abc7.png", alt: "ABC 7" },
      { src: "/logos/yahoonews.png", alt: "Yahoo News" },
      { src: "/logos/bloomberg.png", alt: "Bloomberg" },
    ].map((logo) => (
      <img
        key={logo.alt}
        src={logo.src}
        alt={logo.alt}
        className="h-8 sm:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
      />
    ))}
  </div>
</div>
</div>

      {/* Second Viewport: Features */}
      <div id="features" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          {/* Image side */}
          <div className="flex-1 w-full">
            <img
              src="/Hotspot/happycustomer.png"
              alt="Happy customer"
              className="rounded-[2rem] w-full object-cover"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 w-full text-left ml-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Take Back Control of <br />Your Internet
            </h2>
            <ul className="text-gray-800 space-y-3 text-lg">
          
              <li>No contract. No credit check.</li>
              <li>Fast speeds for videos, school, and work.</li>
              <li>Truly unlimited - use it as much as you want.</li>
              <li>Only $14.89/month.</li>
              <li>100% of profits are donated to charity</li>
            </ul>
            <a href="#plans">
              <button className="mt-8 bg-c4p hover:bg-c4p text-white font-semibold rounded-lg shadow-lg transition">
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-c4p hover:bg-c4p text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
            >
              Buy Now
            </motion.button>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-20 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
            How it Works
          </h2>
          <div className="flex justify-center">
            <img
              src="/Hotspot/howitworks.png"
              alt="How it Works"
              className="rounded-2xl shadow-lg w-full max-w-2xl"
            />
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div id="plans" className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-left">
            Choose What You Need
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{/* Card 1: Hotspot + Internet */}
<a href="/shieldhotspotsim" className="block">
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[440px]">
    
    {/* Title at Top */}
    <h4 className="text-sm font-medium text-center text-gray-500 mb-2">I need internet on the go</h4>

    {/* Image */}
    <div className="flex justify-center items-center">
      <img
        src="/Hotspot/hotspotsim.png"
        alt="Shield Hotspot"
        className="h-40 object-contain"
      />
    </div>

    {/* 3 Lines Under Image */}
    <div className="pt-6 text-left">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Shield 4G Hotspot + Internet</h3>
      <p className="text-gray-900 text-sm font-medium mb-1">$60 Device + $14.89/Month</p>
      <p className="text-gray-600 text-sm">Portable Wi-Fi you can take anywhere. Connect 10 devices!</p>
    </div>
  </div>
</a>

{/* Card 2: 5G Home Router */}
<a href="/shield5grouter" className="block">
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[440px]">
    
    {/* Title at Top */}
    <h4 className="text-sm font-medium text-center text-gray-500 mb-2">I need internet at home</h4>

    {/* Image */}
    <div className="flex justify-center items-center">
      <img
        src="/Hotspot/shieldrouterfront.png"
        alt="Shield Router"
        className="h-40 object-contain"
      />
    </div>

    {/* 3 Lines Under Image */}
    <div className="pt-6 text-left">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Shield 5G Home Hotspot</h3>
      <p className="text-gray-900 text-sm font-medium mb-1">$149 Device + $14.89/Month</p>
      <p className="text-gray-600 text-sm">Stronger signal and great for shared spaces. Connect up to 32 devices!</p>
    </div>
  </div>
</a>

{/* Card 3: SIM Card Only */}
<a href="/shieldsimcard" className="block">
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[440px]">
    
    {/* Title at Top */}
    <h4 className="text-sm font-medium text-center text-gray-500 mb-2">I already have a device, but need internet service</h4>

    {/* Image */}
    <div className="flex justify-center items-center">
      <img
        src="/Hotspot/simcard.png"
        alt="SIM Card"
        className="h-40 object-contain"
      />
    </div>

    {/* 3 Lines Under Image */}
    <div className="pt-6 text-left">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Internet Service Only</h3>
      <p className="text-gray-900 text-sm font-medium mb-1">$14.89/Month</p>
      <p className="text-gray-600 text-sm">Works with hotspots, tablets, or wearables that take a SIM card.</p>
    </div>
  </div>
</a>

</div>

          <p className="mt-40 text-sm text-gray-400 font-medium text-center">
            100% of profit supports closing the digital divide
          </p>
        </div>
      </div>
      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
