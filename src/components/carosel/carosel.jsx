import React, {useState} from 'react';
export default function Carosel ({ blocks }, interval = 0) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const nextSlide = () => { 
        setCurrentIndex((prevIndex) => 
            prevIndex === blocks.length -1 ? 0 : prevIndex + 1
        )
    }
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? blocks.length - 1 : prevIndex - 1
        )
    }

    return (
        <div className='overflow-hidden whitespace-nowrap mx-auto relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* <button onClick={prevSlide}></button> */}
            <span className='inline-block inline-flex space-x-5 pl-[100%] mb-14' style={{animation: `ticker 10s linear infinite ${isHovered ? 'paused' : ''}`}}>
                <div className='h-64 w-64 bg-gray-300 rounded-xl'>This is a test</div>
                <div className='h-64 w-64 bg-gray-300 rounded-xl'>This is a test</div>
            </span>
            <style>
                {`
                    @keyframes ticker{
                        0% {transform: translateX(0);}
                        100% {transform: translateX(-100%);}
                    }
                    span:hover {
                        animation-play-state: paused;
                    }
                `}
            </style>
            {/* <button onClick={nextSlide}></button> */}
        </div>
    ) 
}