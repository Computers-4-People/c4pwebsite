import { useState } from "react";

export default function Shield5grouter() {
  const images = ["/Hotspot/shieldrouterfront.png", "/Hotspot/shieldrouterside.png", "/Hotspot/shieldrouterside1.png", "/Hotspot/shieldrouterback.png", "/Hotspot/simcard.png"];
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
              Shield 5G Home Hotspot + Unlimited Internet (May be Delayed Due to Limited Supply)
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
              Need stronger Wi-Fi for your whole home? This is it.
              The Shield 5G Home Hotspot is a powerful, portable device that delivers fast, reliable internet throughout your house – perfect for families, schoolwork, video calls, and streaming.

              <br /><br />
              <b>What’s included:</b><br />
              - Shield 5G Home Router<br />
              - Unlimited 4G/5G Internet via T-Mobile network<br />
              - SIM card shipped seperately<br />
              - Connect multiple devices simultaneously<br />

              <br />
              <b>Features:</b><br />
              - Faster & stronger signal than mobile hotspots<br />
              - Battery backup lasts up to 4 hours unplugged<br />
              - Fully portable - use it at home or on the go<br />
              - Just turn it on and connect - no setup required<br />
              - Built in VPN for security<br />

              <br />
              <b>Plan Details:</b><br />
              - $14.89/month for truly unlimited internet<br />
              - No data caps, no throttling, no surprise fees<br />
              - Cancel anytime - no contracts<br />

              <br />
              Free shipping anywhere in the U.S. Your device arrives pre-configured and ready to use.
              <br /><br />
              <b>Note:</b><br />
We currently have limited inventory and are shipping in waves. Orders may be delayed depending on demand. You’ll receive a confirmation email with tracking information once your unit is ready to ship.
            </p>
          </div>
        </div>

        {/* Right: Zoho Checkout Embed (aligned to image top) */}
        <div className="w-full mt-0 lg:-mt-20">
          <iframe
            src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105?addon_code%5B0%5D=5&addon_quantity%5B0%5D=1"
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
