import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What sizes are available?",
    answer:
      "We offer sizes from S to XXL. Please check the size chart on the checkout page for detailed measurements.",
  },
  {
    question: "When will my sweatshirt arrive?",
    answer:
      "Orders typically ship within 3-5 business days and arrive within 7-10 business days depending on your location.",
  },
  {
    question: "What is the sweatshirt made of?",
    answer:
      "Our Shield sweatshirts are made from high-quality, comfortable cotton-blend fabric designed for everyday wear.",
  },
  {
    question: "Can I return or exchange my sweatshirt?",
    answer:
      "Yes! We accept returns and exchanges within 30 days of purchase. Items must be unworn and in original condition. Contact us at info@computers4people.org to initiate a return.",
  },
  {
    question: "Where does my money go?",
    answer:
      "100% of profits go to Computers 4 People, a nonprofit working to close the digital divide by giving away free computers and internet access to people who need them. Your purchase directly supports someone getting connected.",
  },
  {
    question: "Is this a limited edition item?",
    answer:
      "Yes! This is a limited quantity release. Once they're gone, they're gone. Get yours while supplies last.",
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

export default function ShieldSweatshirt() {
  const images = [
    "/Hotspot/sweatshirtfront.png",
    "/Hotspot/sweatshirtback.png"
  ];
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
        <div className="w-full order-2 lg:order-1">
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
            <div className="w-full sm:w-[640px] bg-gray-100 rounded-xl flex items-center justify-center p-8 min-h-[300px] max-h-[440px] mx-auto relative">
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide shadow">
                  Limited Quantity
                </span>
              </div>
              <img
                src={selectedImage}
                alt="Shield Sweatshirt"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="pt-4 sm:pl-[4.5rem]">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Shield Sweatshirt – Internet That Gives Back
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
              Wear your support for digital access. This exclusive Shield sweatshirt represents more than just comfort—it's a statement that everyone deserves internet access.

              <br /><br />
              <b>What makes it special:</b><br />
              - Premium quality cotton-blend fabric<br />
              - Shield logo design<br />
              - Limited quantity release<br />
              - 100% of profits support free internet access for those in need

              <br /><br />
              <b>About the mission:</b><br />
              Every purchase directly funds Shield Internet service for people who need affordable connectivity. When you wear this sweatshirt, you're helping students do homework, job seekers find work, and families stay connected.

              <br /><br />
              <b>Product details:</b><br />
              - Available in multiple sizes (S-XXL)<br />
              - Comfortable, durable design for everyday wear<br />
              - Machine washable<br />
              - Unisex sizing

              <br /><br />
              <b>Limited availability:</b><br />
              This is a special limited run. Once they're sold out, they're gone. Get yours now to show your support for digital access.

              <br /><br />
              Free shipping on all orders. Your sweatshirt will ship within 3-5 business days.
            </p>
          </div>
        </div>

        {/* Right: Stripe Checkout Button */}
        <div className="w-full order-1 lg:order-2 mt-0 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Support Digital Access
              </h3>
              <p className="text-gray-600 text-sm">
                Limited quantity available
              </p>
            </div>

            <a
              href="https://donate.stripe.com/4gMaEYc266gq5aZf9J1Nu02"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-c4p hover:bg-c4p-hover text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-200"
              >
                Order Your Shield Sweatshirt
              </motion.button>
            </a>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Secure checkout powered by Stripe
              </p>
              <p className="text-xs text-gray-500 mt-2">
                100% of profits support Computers 4 People's mission to close the digital divide
              </p>
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
