 import React from "react";

// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
import Textmarquee from "../components/textmarquee";
import InfoCard from "../components/infocard";
export default function Homepage() {
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    // Define the data for the InfoCards outside the return statement
  const cardsData = [
    {
      titlePart1: "Starts",
      titlePart2: "With a Donation",
      description: "Individuals and organizations donate their computers, tablets, keyboards and other electronic devices.",
      image: "../homepage/starts.jpg"
    },
    {
      titlePart1: "Undergoes",
      titlePart2: "Refurbishment",
      description: "Every device goes through a meticulous refurbishing and data wiping process to be in optimal condition.",
      image: "../homepage/undergoes.jpg"
    },
    {
      titlePart1: "Match",
      titlePart2: "With a Recipient",
      description: "Devices are redistributed to people in underserved communities.",
      image: "../homepage/match.png"
    },
    {
      titlePart1: "Becomes",
      titlePart2: "Catalyst for Change",
      description: "People use these devices to open opportunities in jobs, education, telehealth, and beyond!",
      image: "../homepage/becomes.jpg"
    },
    {
      titlePart1: "Equip",
      titlePart2: "People to succeed",
      description: "These refurbished devices become a gateway to acquire the digital skills they need.",
      image: "../homepage/equip.jpg"
    }
  ];
    return (
        <div className='font-sans overflow-x-hidden'>
    <div
        style={{
            backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/homepage/background.jpeg')`
        }}
        className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
    >
        <div className="px-2 sm:px-4 md:px-6 grid grid-cols-1 md:grid-cols-8 grid-rows-auto justify-items-start">
            <h1 className='col-start-1 md:col-end-4 text-left font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                <p className='text-c4p animate-fade-up'>TRANSFORM A LIFE</p>
                <p className='text-white animate-fade-up'>WITH TECHNOLOGY</p>
            </h1>
            <div className="col-start-1 md:col-end-4 animate-fade-up">
                <div className="flex flex-col md:flex-row">
                    <Link to="/ewaste" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">🤍 Donate your computers</Link>
                    <Link 
                        to="/programs" 
                        className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                    >
                        Discover our programs
                    </Link>
                </div>
            </div>
        </div>
    </div>
        <h2 className="m-14 mt-20 text-5xl font-bold text-left">Be Part of the Change</h2>
            <div>
                <InfoCard cards={cardsData}/>
            </div>
            <div className='h-screen text-black'>
                <h2 className="ml-14 mb-20 text-5xl font-bold">Give Unused Tech a Second Chance</h2>
                    <div className='grid grid-rows-6 grid-cols-6 relative'>
                    <img src="../secondchance.png" className='col-span-3 row-span-3 animate-fade-right animate-once' />
    
            <div className='absolute inset-0 col-start-4 col-end-6 row-start-1 row-end-4 bg-contain bg-top bg-no-repeat z-0 animate-jump animate-once' style={{ backgroundImage: "url('../quotes.png')" }} />
    
            <div className='z-10 col-start-4 col-end-6 row-start-2 row-end-2 text-center text-xl bg-contain bg-top bg-no-repeat'>
                <p>Thanks to the laptop I received from Computers 4 People; I can now create artwork every night when I get home!</p>
                    <p className='text-right italic'>-Mallika</p>
            </div>
    
            <div className='grid grid-cols-2 col-start-4 col-end-6 row-start-3 items-center text-center text-xl gap-3 z-20'>
                <Link to="/ewaste" className='bg-c4p rounded h-12 pr-3 pt-2.5 hover:bg-c4p-hover hover:text-white'>🤍 Donate your ewaste</Link>
                <Link to="/partner" className='border-2 border-black rounded h-12 pr-1 pt-2.5 hover:bg-black hover:text-white'>Become a Partner</Link>
                </div>
                </div>
            </div>

            <div className="bg-cover h-screen">
                <div className="mx-20 grid grid-cols-3 grid-rows-2 gap-5">
                    <h2 className="col-span-2 text-6xl font-sans font-bold">Ways to Get Involved</h2>
                    <p className="col-span-2 text-3xl ml-2"> Explore these ways to cultivate digital equity</p>
                    <div className="mt-4 row-start-3 col-span-3 grid grid-cols-3 justify-items-stretch gap-28 h-80">
                        <Link to="/ewastedropoff" className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10'src="../maps.png" />BECOME AN EWASTE DROP-OFF SITE</Link>
                        <Link to="/financialdonation" className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className="mb-10" src="../handshake.png"></img>SPONSOR DIGITAL ACCESS</Link>
                        <Link to="/volunteer" className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10' src='../hands.png'></img>VOLUNTEER</Link>
                    </div>
                </div>
            </div>
            <div className='bg-cover'>
                <Carosel/>
            </div>
        </div>
    )
}