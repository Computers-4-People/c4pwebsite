import React from "react";
import { Link } from "react-router-dom";
export default function Programs() {
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
            <div>
                </div>
        </div>
    )
}