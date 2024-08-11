import React from "react";
import { Link } from "react-router-dom";
export default function Team() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/press/pressbackground.jpg')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>FIND OUT WHO ARE</p>
                        <p className='text-white animate-fade-up'>BEHIND THE SCENES</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                        Meet the exceptional individuals leading our mission and creating transformative change in their communities—see how you can be a part of this impactful journey!</p>
                        <div className="flex flex-col md:flex-row">
                                <Link to="/refurbished" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Meet the Team
                            </Link>
                            <Link
                               to="/dsclasses"
                                className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                            >
                                Meet the Board
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-20 mt-20">
            <h2 className="col-span-2 text-9xl font-title uppercase">MISSION CONTROL</h2>

            </div>
            <div className="px-20 mt-20">
            <h2 className="col-span-2 text-9xl font-title uppercase">BOARD OF DIRECTORS</h2>

            </div>
        </div>
    )
}