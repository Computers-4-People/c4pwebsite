import React from 'react';

const Marquee = ({ text, duration = '10s', className = '' }) => {
  const marqueeStyle = {
    display: 'inline-block',
    paddingLeft: '100%', // Start outside the screen
    animation: `marquee ${duration} linear infinite`,
  };

  const marqueeContainerStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
  };

  return (
    <div className={`bg-cover bg-black p-16 text-white text-9xl ${className}`} style={marqueeContainerStyle}>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
      <p style={marqueeStyle}>{text}</p>
      <p style={marqueeStyle}>{text}</p> {/* Duplicate text for continuous effect */}
    </div>
  );
};

export default Marquee;
