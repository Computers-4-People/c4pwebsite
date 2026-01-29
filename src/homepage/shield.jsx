import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAffiliatePrefill from "../hooks/useAffiliatePrefill";
import { FiCheck, FiHome, FiWifi, FiUser } from "react-icons/fi";
import { shieldFaqs } from "./shieldFaqs";

const faqs = shieldFaqs;

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-20 border-t border-gray-200">
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

// Timed promo popup component (updated) - COMMENTED OUT - SNAP DEAL ENDED
// function PromoModal({ isOpen, onClose, onGoToDeal }) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* dark backdrop */}
//           <motion.div
//             className="fixed inset-0 bg-black/50 z-[200]"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//
//           {/* modal card */}
//           <motion.div
//             className="fixed inset-0 z-[210] flex items-center justify-center p-4"
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
//
//               {/* X button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-sm font-medium"
//                 aria-label="Close"
//               >
//                 ✕
//               </button>

//               {/* SIM Card image */}
//               <img
//                 src="/Hotspot/simcard.png"
//                 alt="Shield SIM Card"
//                 className="w-32 mx-auto mb-4 rounded-lg shadow-md"
//               />

//               {/* Headline */}
//               <h2 className="text-2xl font-bold text-gray-900 mb-3">
//               SNAP Relief - <span className="text-red-600">Available Now</span>
//               </h2>

//               {/* Subtext */}
//               <p className="text-gray-700 text-base leading-relaxed mb-6">
//               If you receive SNAP or Medicaid benefits, use coupon code "SNAP" for 1 month of free Shield Internet. Ends November 15th, 2025.
//               </p>

//               {/* CTA button */}
//               <button
//                 onClick={onGoToDeal}
//                 className="w-full bg-c4p text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-black/30 hover:opacity-95 transition"
//               >
//                 Claim My Free Month
//               </button>

//               {/* Subnote */}
//               <p className="text-[11px] text-gray-400 mt-4">
//                 100% of profit supports closing the digital divide.
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }


export default function ShieldHeader() {
  useAffiliatePrefill();
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [deviceChoice, setDeviceChoice] = useState("home");
  const [currentStep, setCurrentStep] = useState(1);
  const [zipCode, setZipCode] = useState("");
  const [zipStatus, setZipStatus] = useState("");
  const isYearly = billingCycle === "yearly";
  const subscriptionPrice = isYearly ? "$156/year" : "$14.89/mo";
  const internetOnlyHref = isYearly ? "/shieldsimcard12months" : "/shieldsimcard";
  const checkoutHref = (() => {
    if (deviceChoice === "home") {
      return isYearly ? "/shield5grouter12months" : "/shield5grouter";
    }
    if (deviceChoice === "portable") {
      return isYearly ? "/shieldhotspotsim12months" : "/shieldhotspotsim";
    }
    return isYearly ? "/shieldsimcard12months" : "/shieldsimcard";
  })();

  const handleZipCheck = (event) => {
    event.preventDefault();
    const trimmedZip = zipCode.trim();
    if (!/^\d{5}$/.test(trimmedZip)) {
      setZipStatus("Enter a valid 5-digit ZIP code.");
      return;
    }
    setZipStatus(`Great news — Shield is available in ${trimmedZip}. Expected speeds: 100–300 Mbps.`);
  };

  useEffect(() => {
    const savedPlan = localStorage.getItem("shield_plan");
    const savedDevice = localStorage.getItem("shield_device");
    if (savedPlan === "monthly" || savedPlan === "yearly") {
      setBillingCycle(savedPlan);
    }
    if (savedDevice === "none" || savedDevice === "portable" || savedDevice === "home") {
      setDeviceChoice(savedDevice);
    }
    if (savedPlan || savedDevice) {
      setCurrentStep(2);
    }
  }, []);

  useEffect(() => {
    const scrollToPlans = () => {
      if (window.location.hash === "#plans") {
        const plansSection = document.getElementById("plans");
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    scrollToPlans();
    window.addEventListener("hashchange", scrollToPlans);

    // Retry once in case layout hasn't finished.
    const t = setTimeout(scrollToPlans, 200);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollToPlans);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("shield_plan", billingCycle);
  }, [billingCycle]);

  useEffect(() => {
    localStorage.setItem("shield_device", deviceChoice);
  }, [deviceChoice]);
  const devicePrices = {
    none: 0,
    portable: 60,
    home: 175,
  };
  const devicePrice = devicePrices[deviceChoice] || 0;
  const checkoutLabel = isYearly ? "$156/yr" : "$14.89/mo";
  const checkoutDeviceAddon = devicePrice > 0 ? ` + $${devicePrice} device` : "";

  // state for promo popup - COMMENTED OUT - SNAP DEAL ENDED
  // const [showPromo, setShowPromo] = useState(false);

  // // show after ~8s
  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     setShowPromo(true);
  //   }, 8000);
  //   return () => clearTimeout(t);
  // }, []);

  // // scroll to the yearly plan ("12-Month Prepaid") and close popup
  // const handleGoToDeal = () => {
  //   const plansSection = document.getElementById("plans");
  //   if (plansSection) {
  //     plansSection.scrollIntoView({ behavior: "smooth" });
  //   }
  //   setShowPromo(false);
  // };

  return (
    <>
     {/* First Viewport: Hero */}
<div
  className="min-h-screen flex flex-col justify-center px-5 py-12 sm:py-16 lg:py-20 sm:px-8 lg:px-16 relative"
  style={{ backgroundColor: '#00280e' }}
>
  <div className="max-w-7xl mx-auto w-full">
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

      {/* Left side - Content */}
      <div className="flex flex-col flex-1 max-w-3xl">

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-3 mt-4 sm:mt-0"
        style={{ color: '#f4f9f6' }}
      >
        The Most Affordable,
        <br />
        <span style={{ color: '#00d64e' }}>Hassle-Free Internet</span>
      </motion.h1>

      {/* Social proof */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm sm:text-base mb-4 lg:mb-6"
        style={{ color: 'rgba(244, 249, 246, 0.6)' }}
      >
        Powering 1,000+ households everyday.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 mb-6 lg:mb-10"
      >
        <a href="#plans">
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 0 24px rgba(0, 214, 78, 0.24)' }}
            whileTap={{ scale: 0.98 }}
            className="font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-xl text-sm sm:text-base lg:text-lg transition-all duration-200"
            style={{ backgroundColor: '#00d64e', color: '#00280e' }}
          >
            Get Internet for $14.89
          </motion.button>
        </a>

        <a href="/shield-auth">
          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(244, 249, 246, 0.08)' }}
            whileTap={{ scale: 0.98 }}
            className="py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 border backdrop-blur-sm"
            style={{
              color: 'rgba(244, 249, 246, 0.8)',
              borderColor: 'rgba(244, 249, 246, 0.2)',
              backgroundColor: 'rgba(244, 249, 246, 0.05)'
            }}
          >
            Subscriber Portal →
          </motion.button>
        </a>
      </motion.div>

      {/* Credibility Strip - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
        className="relative rounded-xl px-4 py-3 lg:px-6 lg:py-3 mb-4 lg:mb-8 overflow-hidden w-full lg:w-auto lg:inline-flex lg:self-start group"
        style={{
          backgroundColor: 'rgba(244, 249, 246, 0.03)',
          border: '1px solid rgba(244, 249, 246, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
          <span
            className="text-[10px] uppercase tracking-[0.12em] font-medium"
            style={{ color: 'rgba(244, 249, 246, 0.45)' }}
          >
            As featured on
          </span>

          {/* Logo container with subtle hover drift */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between lg:justify-start gap-6 sm:gap-10 md:gap-12 lg:gap-14 transition-transform duration-[3000ms] ease-linear group-hover:translate-x-1">
              <img
                src="/logos/forbes.png"
                alt="Forbes"
                className="h-12 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <img
                src="/logos/nbc.png"
                alt="NBC"
                className="h-10 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <img
                src="/logos/kellyclarksonshow.png"
                alt="The Kelly Clarkson Show"
                className="h-12 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <img
                src="/logos/entrepreneur.png"
                alt="Entrepreneur"
                className="h-12 sm:h-12 md:h-14 lg:h-16 w-auto object-contain hidden md:block"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile: Photo + Testimonial side by side */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        className="lg:hidden flex items-center gap-4"
      >
        <div className="flex-shrink-0 w-28 sm:w-32">
          <img
            src="/Hotspot/shieldclient.png"
            alt="Shield Internet Customer"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        <div
          className="border-l-2 pl-3 flex-1"
          style={{ borderColor: 'rgba(244, 249, 246, 0.2)' }}
        >
          <p
            className="text-sm leading-snug italic mb-1"
            style={{ color: 'rgba(244, 249, 246, 0.75)' }}
          >
            "I was paying $85/month with Verizon. Switched to Shield and it just works."
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(244, 249, 246, 0.45)' }}
          >
            — Luke B., college student
          </p>
        </div>
      </motion.div>

      {/* Desktop: Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="hidden lg:block border-l-2 pl-4 max-w-md"
        style={{ borderColor: 'rgba(244, 249, 246, 0.2)' }}
      >
        <p
          className="text-base italic mb-2"
          style={{ color: 'rgba(244, 249, 246, 0.75)' }}
        >
          "I was paying $85/month with Verizon. Switched to Shield and it just works. Wish I found this sooner."
        </p>
        <p
          className="text-sm"
          style={{ color: 'rgba(244, 249, 246, 0.45)' }}
        >
          — Luke B., college student
        </p>
      </motion.div>

      </div>

      {/* Right side - Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="hidden lg:block flex-shrink-0 lg:w-[380px] xl:w-[420px]"
      >
        <img
          src="/Hotspot/shieldclient.png"
          alt="Shield Internet Customer"
          className="w-full h-auto rounded-3xl shadow-2xl"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
          }}
        />
      </motion.div>

    </div>
  </div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4, y: [0, 8, 0] }}
    transition={{
      opacity: { duration: 0.5, delay: 1.2 },
      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f4f9f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  </motion.div>
</div>

      {/* Plans Section */}
      <div id="plans" className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto px-0 lg:px-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-left">
            Get Internet in Minutes
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            No contracts. No credit checks. Cancel anytime.
          </p>

          {/* Guided Purchase */}
          <div className="max-w-[960px] mx-auto">
            <div
              className="rounded-[22px] bg-white/70 p-6 lg:px-8 lg:py-7 mb-10 relative overflow-hidden"
              style={{
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                minHeight: "380px",
              }}
            >
              <div className="text-xs text-gray-400 mb-5">Step {currentStep} of 2</div>

              <motion.div
                className="flex w-[200%]"
                animate={{ x: currentStep === 1 ? "0%" : "-50%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Step 1 */}
                <div className="w-1/2 pr-6 lg:pr-10">
                  <h3 className="text-2xl font-semibold text-gray-900 text-center">
                    Choose how you want to pay
                  </h3>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                      {
                        key: "monthly",
                        title: "Monthly",
                        price: "$14.89 / mo",
                        subtext: "Billed monthly · Cancel anytime",
                      },
                      {
                        key: "yearly",
                        title: "Yearly",
                        price: "$13.00 / mo",
                        subtext1: "$156 billed yearly",
                        subtext2: "Save $22 per year",
                        badge: "Most popular",
                      },
                    ].map((plan) => {
                      const selected = billingCycle === plan.key;
                      return (
                        <button
                          key={plan.key}
                          type="button"
                          onClick={() => setBillingCycle(plan.key)}
                          className={`relative text-left rounded-2xl border px-6 py-6 min-h-[190px] transition-shadow duration-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] ${
                            selected
                              ? "border-emerald-500 bg-emerald-50/40 shadow-[0_14px_30px_rgba(34,197,94,0.25)]"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-1 shadow">
                              {plan.badge}
                            </span>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">{plan.title}</span>
                          </div>
                          <p className="text-3xl font-semibold text-emerald-700 mt-3">{plan.price}</p>
                          {plan.subtext ? (
                            <p className="text-xs text-gray-500 mt-2">{plan.subtext}</p>
                          ) : (
                            <>
                              <p className="text-xs text-gray-500 mt-2">{plan.subtext1}</p>
                              <p className="text-xs text-emerald-700 mt-1">{plan.subtext2}</p>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex justify-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-c4p hover:bg-c4p-hover text-white font-semibold py-3 px-8 rounded-lg transition w-full sm:w-auto"
                    >
                      Next: Choose a device
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="w-1/2 pl-6 lg:pl-10 flex flex-col">
                  <div className="text-xs text-gray-400 mb-4">Step 2 of 2</div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        key: "home",
                        title: "Home Device",
                        subtitle: "Best for families and shared spaces",
                        price: "+$175 one-time",
                        badge: "Recommended",
                        icon: FiHome,
                      },
                      {
                        key: "portable",
                        title: "Portable Hotspot",
                        subtitle: "Take your internet anywhere",
                        price: "+$60 one-time",
                        icon: FiWifi,
                      },
                      {
                        key: "none",
                        title: "Use my own device",
                        subtitle: "Works with most 4G/5G devices & hotspots",
                        price: "$0",
                        icon: FiUser,
                      },
                    ].map((option) => {
                      const selected = deviceChoice === option.key;
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => setDeviceChoice(option.key)}
                          className={`relative flex flex-col items-start rounded-2xl border px-5 py-5 text-sm transition ${
                            selected
                              ? "border-emerald-500 text-gray-900 bg-emerald-50/50 shadow-[0_16px_34px_rgba(34,197,94,0.18)]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                          }`}
                        >
                          {selected && (
                            <span className="absolute top-3 right-3 h-6 w-6 rounded-full bg-c4p flex items-center justify-center">
                              <FiCheck className="text-white text-xs" />
                            </span>
                          )}
                          <span className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                            <Icon className="text-base" />
                          </span>
                          <div className="mt-4 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{option.title}</span>
                              {option.badge && (
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  {option.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{option.subtitle}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-4">{option.price}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    <p>Today: {deviceChoice === "home" ? "$175 device" : deviceChoice === "portable" ? "$60 device" : "$0 device"}</p>
                    <p>Recurring: {isYearly ? "$13.00 / month" : "$14.89 / month"}</p>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      ← Back
                    </button>
                    <a href={checkoutHref}>
                      <button className="bg-c4p hover:bg-c4p-hover text-white font-semibold py-3 px-8 rounded-lg transition">
                        Continue to checkout
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="bg-gray-100 py-16 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src="/Hotspot/shieldlaserfast.png"
              alt="Shield Internet speed"
              className="w-full max-w-md rounded-2xl shadow-sm"
            />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              What you need to know
            </h3>
            <div className="grid gap-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-c4p" />
                <p>Available in 49 states (not Alaska), plus Puerto Rico and the U.S. Virgin Islands.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-c4p" />
                <p>Truly unlimited internet.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-c4p" />
                <p>100% of profits donated to charity.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-c4p" />
                <p>Fast delivery.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
              <span>Powered by</span>
              <img
                src="/Hotspot/missiontelecomlogo.png"
                alt="Mission Telecom"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Timed Promo Popup - COMMENTED OUT - SNAP DEAL ENDED */}
      {/* <PromoModal
        isOpen={showPromo}
        onClose={() => setShowPromo(false)}
        onGoToDeal={handleGoToDeal}
      /> */}
    </>
  );
}
