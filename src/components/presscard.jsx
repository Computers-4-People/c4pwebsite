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
        <div className="relative w-full">
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    className="text-gray-800 hover:text-gray-600 focus:outline-none z-10"
                    style={{ marginRight: '10px' }}
                >
                    <img src="/presscard/leftarrow.png" alt="Previous" className="w-16 h-16" />
                </button>
                <div className="w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / pressItems.length)}%)`,
                            width: `${pressItems.length * (100 / 3)}%`,
                        }}
                    >
                        {pressItems.map((item, index) => (
                            <div key={index} className="w-1/3 px-4">
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
                </div>
                <button
                    onClick={handleNext}
                    className="text-gray-800 hover:text-gray-600 focus:outline-none z-10"
                    style={{ marginLeft: '10px' }}
                >
                    <img src="/presscard/rightarrow.png" alt="Next" className="w-16 h-16" />
                </button>
            </div>
        </div>
    );
};

export default PressCard;
