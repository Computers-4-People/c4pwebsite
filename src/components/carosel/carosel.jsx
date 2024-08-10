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
    <div className='overflow-x-hidden relative flex mb-20 relative w-screen' style={{height: `35vh`}} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>

      <div className='flex w-full justify-around' style={{animation: `ticker 10s linear infinite ${isHovered ? 'paused' : ''} `}}>
        <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../haverhill.png')" }}><h3 className=''></h3></div>
        <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../bayonne.png')" }}><img src="" alt="" /></div>
        <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../hce.png')" }}></div>
        <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../hpl.png')" }}></div>

        </div>
      <div className='flex h-full w-full justify-around absolute top-0' 
            style={{animation: ` ticker2 10s linear infinite  ${isHovered ? 'paused' : ''}`}}>
              <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../haverhill.png')" }}></div>
              <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../bayonne.png')" }}></div>
              <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../hce.png')" }}></div>
              <div className='h-full w-1/4 bg-gray-200 mx-5 pt-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: "url('../hpl.png')" }}></div>
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