import React, {useState} from 'react';
export default function Carosel ({ blocks }, interval = 0) {
    const [currentIndex, setCurrentIndex] = useState(0);
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
        <div className='overflow-hidden whitespace-nowrap mx-auto relative'>
            {/* <button onClick={prevSlide}></button> */}
            <span className='inline-block pl-[100%]' style={{animation: 'ticker 5s linear infinite'}}>TEST</span>
            <style>
                {`
                    @keyframes ticker{
                        0% {transform: translateX(0);}
                        100% {transform: translateX(-100%);}
                    }
                `}
            </style>
            {/* <button onClick={nextSlide}></button> */}
        </div>
    ) 
}