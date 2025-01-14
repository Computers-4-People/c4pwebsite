import React from 'react';

export default function Marquee({ text, duration = 10 }) {
  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: `marquee ${duration}s linear infinite`,
  };

  const marqueeContainerStyle = {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div
      className="relative w-full bg-black text-white p-16 text-9xl"
      style={marqueeContainerStyle}
    >
      <div style={marqueeStyle} className="marquee-content">
        <span>{text}</span>
        <span style={{ paddingLeft: '20%' }}>{text}</span> {/* Duplicate text */}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); } /* Start off-screen on the right */
            100% { transform: translateX(-150%); } /* Move off-screen to the left */
          }

          .marquee-content {
            width: 220%; /* Total width should be twice the original text width */
          }
        `}
      </style>
    </div>
  );
}
