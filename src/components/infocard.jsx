import React from 'react';

const InfoCard = ({ cards }) => {
  return (
    <div className="bg-cover text-black flex justify-center items-center w-full h-full">
      {/* Container for the cards */}
      <div className="m-11 flex overflow-x-auto md:overflow-x-visible md:flex-row md:justify-center w-full snap-x snap-mandatory">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`text-white group my-4 mx-2 min-w-full md:min-w-0 md:flex-1 rounded-2xl bg-cover bg-center relative bg-gray snap-start`}
            style={{
              height: "60vh", // Set a specific height for the cards
              backgroundImage: `linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0,0,0,0.5) 40%, transparent 50%), url(${card.image})`,
              backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
              backgroundSize: 'cover' // Ensure the image covers the entire area of the card
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500" />
            <div className="absolute bottom-0 duration-1000 overflow-hidden ml-5">
              <h3 className="font-bold text-xl uppercase">
                <p className="text-c4p">{card.titlePart1}</p>
                <p className="pb-2">{card.titlePart2}</p>
              </h3>
              <p className="h-10 pt-8 left-2 w-11/12 group-hover:h-48 border-t-4 duration-500 text-sm">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;

