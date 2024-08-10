import React from 'react';

const InfoCard = ({ cards }) => {
  return (
    <div className="bg-cover text-black">
      <div className="m-11 flex flex-wrap justify-center md:justify-start">
        {cards.map((card, index) => (
          <div
            key={index}
            className="text-white group h-96 m-4 w-full md:w-64 rounded-2xl bg-cover bg-center relative bg-gray"
            style={{
              backgroundImage: `linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0,0,0,0.5) 40%, transparent 50%), url(${card.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500" />
            <div className="absolute bottom-0 duration-1000 overflow-hidden ml-5">
              <h3 className="font-bold text-xl uppercase">
                <p className="text-[#0FE006]">{card.titlePart1}</p>
                <p>{card.titlePart2}</p>
              </h3>
              <p className="h-2 left-2 w-11/12 group-hover:h-32 border-t-4 duration-500 text-sm">
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