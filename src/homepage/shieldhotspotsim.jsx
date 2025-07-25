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
            T10 Mobile Hotspot with Unlimited Nationwide Internet
            </h1>
            <p className="text-gray-700 text-base max-w-xl">
Take fast internet with you anywhere.  
This small, rechargeable device fits in your bag or pocket and gives you unlimited internet you can use at home, in the car, at work, or on the move.  

<br /><br />
<b>What’s included:</b><br />
- Unlimited 4G/5G Internet<br />
- T10 hotspot device 4G LTE only (SIM card already inside)<br />
- Connect up to 10 devices at the same time<br />
- Just turn it on and connect - no setup needed  

<br /><br />
<b>How to charge it:</b><br />
- Comes with a USB-C charger<br />
- Plug into any outlet or USB port<br />
- A full charge lasts about 8 hours  

<br /><br />
<b>Perfect for:</b><br />
- Doing school or work from anywhere<br />
- Watching videos or using apps<br />
- Road trips or travel<br />
- Sharing internet with your family  

<br /><br />
<b>No surprises:</b><br />
- No contracts - cancel anytime<br />
- No hidden fees<br />
- No internet toggling<br />
- You keep the device forever  

<br /><br />
Free shipping to anywhere in the U.S. Your device arrives ready to go - just turn it on and connect.
</p>
<p className="text-sm text-gray-600 mt-10">
  <b>Looking to buy in bulk?</b> We offer custom partnerships for schools, nonprofits, and community programs. Reach out to discuss large orders: <a href="https://www.computers4people.org/contact" className="text-c4p underline">computers4people.org/contact</a>.
</p>
          </div>
        </div>

        {/* Right: Zoho Checkout Embed (aligned to image top) */}
        <div className="w-full mt-0 lg:-mt-20">
          <iframe
            src="https://mobile.computers4people.org/subscribe/d98e62cf656eb2344296c67863c94b77835d327f877b7e75ad482bf477cf719e/105?addon_code%5B0%5D=t10&addon_quantity%5B0%5D=1"
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
