import React from "react";
import { Link } from "react-router-dom";

// Props should include an array of cards to display
const IconCards = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-5">
            {cards.map((card, index) => (
                <Link to={card.link} key={index} className="group block overflow-hidden rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                    <img src={card.image} alt={card.alt} className="w-full mb-5 transition duration-300 ease-linear group-hover:opacity-75" />
                    <div className="bg-white p-5 text-center font-bold">
                        {card.title}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default IconCards;

