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
        <div className='font-sans'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/homepage/background.jpeg')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-2 text-justify font-title text-8xl'>
                        <p class='text-c4p mb-5 animate-fade-up'>TRANSFORM A LIFE</p>
                        <p class='text-white animate-fade-up'>WITH TECHNOLOGY</p>
                    </div>
                    {/* <div className='mt-10 w-81 grid grid-cols-2 col-start-1 col-end-4 row-start-4 text-center text-xl gap-3'>
                        <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link>
                    </div> */}
                    <div className='mt-10 row-start-3 col-span-4 row-span-2 flex flex-row justify-items-start flex-wrap text-center text-xl w-128'>
                        <Link to="/ewaste" className="animate-fade-up bg-c4p h-10 mr-3 h-11 rounded-md pt-2 px-5 hover:bg-c4p-hover hover:text-white">🤍 Donate your ewaste</Link>
                        <Link to="/programs" className='animate-fade-up border-2 rounded-md border-white h-11 text-white h-10 pt-1.5 px-5 hover:bg-white hover:text-black'> Discover our programs </Link>
                    </div>
                </div>
            </div>
            <div>
                <Textmarquee text="10,000,000 hours of connectivity provided" duration={15} />
            </div>
        <h2 className="m-14 mt-20 text-5xl font-bold text-left">Be Part of the Change</h2>
            <div>
                <InfoCard cards={cardsData} />
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
                <Link to="/ewaste" className='bg-[#0FE006] rounded h-12 pr-3 pt-2.5 hover:bg-green-800 hover:text-white'>🤍 Donate your ewaste</Link>
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
                <Carosel></Carosel>
            </div>
        </div>
    )
}