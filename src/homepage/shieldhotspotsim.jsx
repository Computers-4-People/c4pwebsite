import { useState } from "react";

export default function Shieldsimcard() {
  const images = ["/Hotspot/hotspotsim.png","/Hotspot/hotspot.png", "/Hotspot/simcard.png"];
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
            Unlimited 4G & 5G Internet + T10 Hotspot (SIM Card Included)
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
            Get reliable, high-speed internet anywhere with this complete package: unlimited 4G & 5G internet for just $14.89/month, plus a powerful T10 mobile hotspot for a one-time fee of $60. The SIM card comes pre-installed in the device, so all you need to do is power it on and connect. The T10 hotspot connects up to 10 devices simultaneously.
<br/><br/>
Making it perfect for:
<br/>
-Home internet backup
<br/>
-Remote work or school
<br/>
-Traveling with consistent Wi-Fi
<br/>
-Sharing internet with family or team members
<br/><br/>
Your service runs on the T-Mobile network, with typical download speeds of 72–245 Mbps on 5G and 37–119 Mbps on 4G LTE. There are no contracts, no overage charges, no throttling, and auto-pay is enabled so your service stays active without interruption.
<br/><br/>
The hotspot is compact, rechargeable, and ready to go out of the box, no setup required.
            </p>
          </div>
        </div>

        {/* Right: Zoho Checkout Embed (aligned to image top) */}
        <div className="w-full mt-0 lg:-mt-20">
          <iframe
            src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=1"
            title="Zoho Subscription Checkout"
            width="100%"
            height="1000px"
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
