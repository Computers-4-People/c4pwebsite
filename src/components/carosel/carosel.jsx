import React, {useEffect, useState} from 'react';
export default function Carosel ({ blocks }, interval = 0) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect (() => {

    }, [])
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
        <div className='overflow-x-hidden relative flex mb-20 relative w-full' 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>

     <div className='' style={{animation: `ticker 10s linear infinite ${isHovered ? 'paused' : ''} `}}>
       <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../haverhill.png')" }}><h3 className=''></h3></span>
       <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../bayonne.png')" }}><img src="" alt="" /></span>
       <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../hce.png')" }}></span>
       <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../hpl.png')" }}></span>
       {/* <span className='h-64 w-96 bg-gray-300 rounded-xl mx-10 inline-block'>This is a test</span> */}
       {/* figure out how to add whitespace-nowrap */}
       </div>
     <div className='absolute top-0' 
           style={{animation: `ticker2 10s linear infinite  ${isHovered ? 'paused' : ''}`}}>
        {/* <span className='h-64 w-96 bg-gray-200 mx-5 inline-block pt-5'><h3 className=''></h3></span>
        <span className='h-64 w-96 bg-gray-200 mx-5 inline-block pt-5'></span>
        <span className='h-64 w-96 bg-gray-200 mx-5 inline-block pt-5'></span> */}
            <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../haverhill.png')" }}></span>
            <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../bayonne.png')" }}></span>
            <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../hce.png')" }}></span>
            <span className='h-64 w-80 bg-gray-200  mx-5 inline-block pt-5' style={{ backgroundImage: "url('../hpl.png')" }}></span>
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