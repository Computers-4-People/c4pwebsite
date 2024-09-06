import React from 'react';

const InfoCard = ({ cards }) => {
  return (
    <div className="bg-cover text-black flex justify-center items-center w-full h-full">
      <div className="m-11 flex flex-col overflow-x-scroll md:flex-row justify-center md:justify-evenly w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`text-white group my-4 mx-2 w-full md:w-1/${cards.length} rounded-2xl bg-cover bg-center relative bg-gray`}
            style={{
              height: "60vh", // Set a specific height for the cards
              backgroundImage: `linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0,0,0,0.5) 40%, transparent 50%), url(${card.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500" />
            <div className="absolute bottom-0 duration-1000 overflow-hidden ml-5">
              <h3 className="font-bold text-xl uppercase">
                <p className="text-c4p">{card.titlePart1}</p>
                <p className="pb-2">{card.titlePart2}</p>
              </h3>
              <p className="h-2 pt-3 left-2 w-11/12 group-hover:h-32 border-t-4 duration-500 text-sm">
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
