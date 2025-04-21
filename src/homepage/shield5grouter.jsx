import { useState } from "react";

export default function Shield5grouter() {
  const images = ["/Hotspot/shieldrouterfront.png", "/Hotspot/shieldrouterside.png", "/Hotspot/shieldrouterside1.png", "/Hotspot/shieldrouterback.png", "/Hotspot/shieldrouterbottom.png"];
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
            Shield 5G Home Hotspot - Device Only (Pre-Order)
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
Need stronger Wi-Fi for your whole home? This is it.  
The Shield 5G Home Hotspot is a powerful device that delivers fast, reliable internet throughout your house. Ideal for families, video calls, streaming, and connecting multiple devices at once.

<br /><br />
<b>This product includes only the hardware.</b><br />
To use it, you must also purchase a <a className="text-c4p" href="/shieldsimcard">Shield Internet subscription</a> separately for $14.89/month.  

<br /><br />
<b>Why choose this router:</b><br />
- Stronger signal and faster speeds than a hotspot<br />
- Supports many devices at once<br />
- Built-in battery lasts up to 4 hours unplugged<br />
- Fully portable - take it anywhere<br />

<br /><br />
<b>Note:</b><br />
This is a pre-order. It’s not shipping yet, but we’ll notify you as soon as it’s on the way.
</p>

          </div>
        </div>

        {/* Right: Zoho Checkout Embed (aligned to image top) */}
        <div className="w-full mt-0 lg:-mt-20">
          <iframe
            src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/120"
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
