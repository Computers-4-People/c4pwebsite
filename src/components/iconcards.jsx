import React from "react";
import { Link } from "react-router-dom";

// Props should include an array of cards to display
const IconCards = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-5">
            {cards.map((card, index) => (
                <Link
                    to={card.link}
                    key={index}
                    className="group block overflow-hidden rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <div
                        className="relative h-64 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${card.image})`,
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition duration-300 ease-in-out group-hover:bg-opacity-60">
                            <span className="text-white text-3xl font-subtitle">
                                {card.title}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default IconCards;
