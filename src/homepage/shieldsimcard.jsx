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
      "You get unlimited internet on one of the biggest 5G networks in the country. There’s no contract, no credit check, and no hidden fees - just fast, reliable internet you can count on.",
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
  }  
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

export default function Shieldsimcard() {
  const images = ["/Hotspot/simcard.png", "/Hotspot/tmobilesimside.png"];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="bg-white py-20 px-4 sm:px-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <a
          href="/shield"
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
            {/* Thumbnails: left on desktop, below on mobile */}
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start gap-2 sm:pt-2">
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

            {/* Main Image */}
            <div className="w-full sm:w-[640px] bg-gray-100 rounded-xl flex items-center justify-center p-8 min-h-[300px] max-h-[440px] mx-auto">
              <img
                src={selectedImage}
                alt="SIM Card"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="pt-8 sm:pl-[4.5rem]">
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
- We ship you a free SIM card<br />
- Put it into your device<br />
- Turn it on and start using the internet

<br /><br />
No contracts. No hidden fees. No internet slowdowns. Just fast, simple internet that works nationwide.
</p>
<p className="text-sm text-gray-600 mt-10">
  <b>Looking to buy in bulk?</b> We offer custom partnerships for schools, nonprofits, and community programs. Reach out to discuss large orders: <a href="https://www.computers4people.org/contact" className="text-c4p underline">computers4people.org/contact</a>.
</p>
          </div>
        </div>

        {/* Right: Zoho Checkout Embed (aligned to image top) */}
        <div className="w-full mt-0 lg:-mt-20">
          <iframe
            src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105"
            title="Zoho Subscription Checkout"
            width="100%"
            height="1300px"
            frameBorder="0"
            scrolling="no"
            style={{
              border: "none",
              backgroundColor: "#ffffff",
            }}
          ></iframe>
        </div>
      </div>
      <FAQSection/>
    </div>
  );
}
