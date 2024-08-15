import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
export default function Programs() {
    const cards = [
        {
            titlePart1: "Distribution of",
            titlePart2: "Refurbished Devices",
            description: "We refurbish donated devices and distribute them to communities in need across NYC, NJ, and MA.",
            image: "/programs/Programs/Recipient_Computers4People_Tote_Bag_Refurbished_Laptop_College_Bound.jpg"
        },
        {
            titlePart1:"Foundational",
            titlePart2: "Digital Skills",
            description: "We offer specialized digital courses and PC building classes to equip individuals with digital literacy.",
            image:"/programs/Programs/Teenagers_Building_PCs_Refurbished.jpg"
        },
        {
            titlePart1:"Affordable",
            titlePart2: "Internet Access",
            description: "We assist people in finding affordable Internet programs that meet their needs.",
            image:"/programs/Programs/Refurbished_Computers.jpg"
        }
    ]
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/programs/Programs/Unlocking_Access_To_The_Digital_World.JPG')`
                }}
                className="bg-cover h-full md:h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-2 md:grid-cols-6 grid-rows-auto justify-items-stretch mb-20">
                    <h1 className='col-start-1 md:col-end-5 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>UNCOVER POSSIBILITIES</p>
                        <p className='text-white animate-fade-up'>WITH OUR PROGRAMS</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                        Seize the opportunities at your fingertips with our programs—refurbished devices, affordable broadband, and essential digital skills courses  - are designed to help you become who you’re meant to be in the digital age.</p>
                        <div className="flex flex-col md:flex-row">
                                <Link to="/refurbished" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Apply for a Computer
                            </Link>
                            <Link
                               to="/dsclasses"
                                className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                            >
                                Enroll in a Digital Skills Class
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-full py-20'>
                <div className='ml-32'>
                    <h2 className='text-7xl font-title'>Programs tailored to foster growth</h2>
                    <p className='text-2xl'>Our programs are designed to help you achieve full participation in the digital world</p>
                </div>
                <div>
                    <InfoCard cards={cards} />
                </div>
            </div>

            <div className='h-screen text-black'>
            <div className='grid grid-rows-6 grid-cols-6 relative'>
                <img src="../Programs/programs/Computers4People_Community_Access_Refurbished_Donated_Computers.png" className=' col-span-2 row-span-3 animate-fade-right animate-once' />
                <div className='z-10 col-start-3 col-end-6 row-start-1 row-end-2 text-center text-xl bg-contain bg-top bg-no-repeat '>
                    <h3 className='text-5xl font-title'>Your Chance to Master Technology Can Be Today</h3>
                    <p className='text-2xl'>Everyone, regardless of age, gender or background, can learn technology; take the first step</p>
                </div>
        
                <div className='grid grid-cols-2 col-start-3 col-end-6 row-start-2 items-center text-center text-xl gap-3 z-20'>
                        <Link to="/ewaste" className='bg-c4p rounded h-12 pr-3 pt-2.5 hover:bg-c4p-hover hover:text-white'>🤍 Donate your ewaste</Link>
                        <Link to="/partner" className='border-2 border-black rounded h-12 pr-1 pt-2.5 hover:bg-black hover:text-white'>Become a Partner</Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}