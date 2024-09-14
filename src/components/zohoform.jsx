// ZohoForm.jsx
import React from 'react';

const ZohoForm = ({ formSrc, ariaLabel, backgroundImage }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%), url('${backgroundImage}')`,
        height: '180vh'
      }}
      className="bg-cover bg-fixed h-screen bg-center bg-no-repeat"
    >
      <div className='grid grid-cols-4 grid-rows-6 h-full pt-10 pb-10'>
        <iframe
          scrolling="no"
          id="donation-form"
          aria-label={ariaLabel}
          style={{ height: '100%', width: '100%' }}
          className='col-span-6 md:col-span-2 row-start-1 row-span-5'
          src={formSrc}
        ></iframe>
      </div>
    </div>
  );
};

export default ZohoForm;
