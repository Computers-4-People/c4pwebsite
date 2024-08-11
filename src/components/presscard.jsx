import React, { useState } from 'react';

const PressCard = ({ pressItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? pressItems.length - 3 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === pressItems.length - 3 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
                {pressItems.map((item, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 px-2">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-500 mb-4">{item.date}</p>
                                <p className="text-gray-700 mb-6">{item.description}</p>
                                <a href={item.link} className="inline-block bg-c4p text-white px-4 py-2 rounded-md hover:bg-c4p-hover">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handlePrev}
                className="absolute left-[-90px] top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-600 focus:outline-none z-10 bg-white p-2"
                style={{ visibility: "visible" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={handleNext}
                className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-600 focus:outline-none z-10 bg-white p-2"
                style={{ visibility: "visible" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-14 h-14 font-bold">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default PressCard;
