import { useState } from "react";

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
    </div>
  );
}
