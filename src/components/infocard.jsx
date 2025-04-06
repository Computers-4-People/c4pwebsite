import React from 'react';

const InfoCard = ({ cards }) => {
  return (
    <div className="bg-cover text-black flex justify-center items-center w-full h-full">
      <div className="m-11 flex overflow-x-auto md:overflow-x-visible md:flex-row md:justify-center w-full snap-x snap-mandatory">
        {cards.map((card, index) => (
          <div
            key={index}
            className="text-white group my-4 mx-2 min-w-full md:min-w-0 md:flex-1 rounded-2xl bg-cover bg-center relative snap-start"
            style={{
              height: "60vh",
              backgroundImage: `linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0,0,0,0.5) 40%, transparent 50%), url(${card.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-2xl">
              {/* Title */}
              <h3 className="font-subtitle text-lg md:text-xl uppercase leading-tight mb-2">
                <span className="block text-c4p whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.titlePart1}
                </span>
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.titlePart2}
                </span>
              </h3>

              {/* Description - smoothly reveals on hover */}
              <div
                className="font-paragraph text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-700 ease-in-out overflow-hidden"
              >
                {card.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
