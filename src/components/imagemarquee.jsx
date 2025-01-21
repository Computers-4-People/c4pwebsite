import React, { useRef, useEffect } from "react";

export default function ImageMarquee({ images, title }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    if (!marquee) return;

    // Dynamically determine the width and repeat images
    const containerWidth = marquee.parentElement.offsetWidth;
    const imageWidth = 300 + 16; // Image width (300px) + spacing (16px)
    const repeatCount = Math.ceil((2 * containerWidth) / (images.length * imageWidth));

    marquee.style.width = `${repeatCount * images.length * imageWidth}px`;

    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed as needed

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= marquee.scrollWidth / 2) {
        scrollPosition = 0; // Reset to create a seamless loop
      }
      marquee.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    scroll();
  }, [images]);

  return (
    <div className="relative overflow-hidden bg-transparent">
      {/* Title */}
      {title && (
        <h3 className="text-center text-lg font-semibold mb-4">
          {title}
        </h3>
      )}

      {/* Marquee container */}
      <div
        ref={marqueeRef}
        className="flex space-x-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {/* Dynamically repeat images */}
        {Array.from({ length: 20 }).map((_, repeatIndex) => (
          images.map((image, index) => (
            <img
              key={`${repeatIndex}-${index}`}
              src={image.src}
              alt={image.alt}
              className="w-[300px] h-[200px] object-contain"
            />
          ))
        ))}
      </div>
    </div>
  );
}
