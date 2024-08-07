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
        // <div className='overflow-hidden w-screen whitespace-nowrap mx-auto relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        //     {/* <button onClick={prevSlide}></button> */}
        //     <span className='inline-block inline-flex justify-evenly space-x-5 pl-[100%] mb-14' style={{animation: `ticker 10s linear infinite ${isHovered ? 'paused' : ''}`}}>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //         <div className='h-64 w-96 bg-gray-300 rounded-xl'>This is a test</div>
        //     </span>
        //     <style>
        //         {`
        //             @keyframes ticker{
        //                 0% {transform: translateX(0);}
        //                 100% {transform: translateX(-100%);}
        //             }
        //             span:hover {
        //                 animation-play-state: paused;
        //             }
        //         `}
        //     </style>
        //     {/* <button onClick={nextSlide}></button> */}
        // </div>
        <div className='overflow-x-hidden relative flex  mx-auto relative w-full' 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
     <div className='mb-14 ' 
           style={{animation: `ticker 10s  linear infinite whitespace-nowrap ${isHovered ? 'paused' : ''}`}}>
       <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
       <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
       <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
       {/* <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span> */}
       {/* Duplicate items for seamless loop */}
       </div>
     <div className='absolute top-0 mb-14 ' 
           style={{animation: `ticker2 10s linear infinite whitespace-nowrap ${isHovered ? 'paused' : ''}`}}>
        <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
        <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
        <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span>
        {/* <span className='h-64 w-96 bg-blue-300 rounded-xl mx-10 inline-block'>This is a test</span> */}
     </div>
     <style>
       {`
         @keyframes ticker {
           0% {transform: translateX(0%);}
           100% {transform: translateX(-100%);}
         }
        @keyframes ticker2 {
            0% {transform: translateX(100%)}
            100% {transform: translateX(0%)}
        }
         span:hover {
           animation-play-state: paused;
         }
       `}
     </style>
   </div>
    ) 
}