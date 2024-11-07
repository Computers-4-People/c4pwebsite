import React, { useState, useEffect } from 'react';

const PressCard = ({ pressItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check screen size and update the state based on window width
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePrev = () => {
        const totalVisibleItems = isMobile ? 1 : 3;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? pressItems.length - totalVisibleItems : prevIndex - 1
        );
    };

    const handleNext = () => {
        const totalVisibleItems = isMobile ? 1 : 3;
        setCurrentIndex((prevIndex) =>
            prevIndex === pressItems.length - totalVisibleItems ? 0 : prevIndex + 1
        );
    };

    const visibleItems = isMobile ? 1 : 3; // Show 1 card on mobile, 3 on larger screens

    return (
        <div className="relative w-full">
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    className="text-gray-800 hover:text-gray-600 focus:outline-none z-10 mb-10"
                    style={{ marginRight: '10px' }}
                >
                    <img src="/presscard/left-arrow.png" alt="Previous" className="w-16 h-20" />
                </button>
                <div className="w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / pressItems.length)}%)`,
                            width: `${pressItems.length * (100 / visibleItems)}%`,
                        }}
                    >
                        {pressItems.map((item, index) => (
                            <div key={index} className={`px-4 h-screen ${isMobile ? 'w-full' : 'w-1/3'}`}>
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                                    <div className="p-6 h-64">
                                        <h3 className="text-2xl font-bold mb-2 h-16 line-clamp-2 text-ellipsis">{item.title}</h3>
                                        <p className="text-gray-500 mb-4">{item.date}</p>
                                        <p className="text-gray-700 mb-6">{item.description}</p>
                                        <a href={item.link} className="inline-block bg-c4p text-black hover:text-white px-4 py-2 rounded-md hover:bg-c4p-hover">
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
                    className="text-gray-800 hover:text-gray-600 focus:outline-none z-10 mb-10"
                    style={{ marginLeft: '10px' }}
                >
                    <img src="/presscard/right-arrow.png" alt="Next" className="w-16 h-20" />
                </button>
            </div>
        </div>
    );
};

export default PressCard;
