import { motion } from "framer-motion";

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
        </motion.div>

        {/* Bottom logo bar */}
        <div className="w-full py-6 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-10 gap-y-4 px-4">
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
                className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
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
              <li>No Contracts</li>
              <li>The Largest and Most Reliable 5G Network</li>
              <li>Speeds up to 500mbps</li>
              <li>100% of profits are donated to charity</li>
            </ul>
            <a href="#plans">
              <button className="mt-8 bg-c4p hover:bg-c4p text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition">
                Buy Now
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
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <a
              href="/shieldsimcard"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[380px]">
                <div className="flex justify-center items-center flex-grow">
                  <img
                    src="/Hotspot/simcard.png"
                    alt="Internet Service Only"
                    className="h-40 object-contain"
                  />
                </div>
                <div className="pt-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Internet Service Only</h3>
                  <p className="text-gray-600 text-sm">$14.89/Month</p>
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a
              href="/shieldhotspotsim"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[380px]">
                <div className="flex justify-center items-center flex-grow">
                  <img
                    src="/Hotspot/hotspotsim.png"
                    alt="Internet and 4G Device"
                    className="h-40 object-contain"
                  />
                </div>
                <div className="pt-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Internet and 4G Hotspot</h3>
                  <p className="text-gray-600 text-sm">$14.89/Month + $60</p>
                </div>
              </div>
            </a>
             {/* Card 3 */}
             <a
              href="/shield5grouter"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between h-[380px]">
                <div className="flex justify-center items-center flex-grow">
                  <img
                    src="/Hotspot/shieldrouterfront.png"
                    alt="Internet and 4G Device"
                    className="h-40 object-contain"
                  />
                </div>
                <div className="pt-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Shield 5G Home Router</h3>
                  <p className="text-gray-600 text-sm">PRE-ORDER $149</p>
                </div>
              </div>
            </a>
          </div>

          <p className="mt-40 text-sm text-gray-400 font-medium text-center">
            100% of profit supports closing the digital divide
          </p>
        </div>
      </div>
    </>
  );
}
