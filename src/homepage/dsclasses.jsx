import React from "react";
import { Link } from "react-router-dom";
export default function DSClasses() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/socialmedia/socialmediabackground.png')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>ACQUIRE THE FOUNDATIONAL</p>
                        <p className='text-white animate-fade-up'>SKILLS TO THRIVE DIGITALLY</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                        From foundational digital literacy courses for all ages to specialized PC building courses for teenagers and digital skills classes in Arabic, our curriculum caters to diverse learning needs.
                        </p>
                        <Link 
                            to="/ewaste" 
                            className="block md:inline-block text-center text-xl animate-fade-up bg-c4p h-11 rounded-md pt-2 px-7 hover:bg-c4p-hover hover:text-white"
                        >
                            Discover our courses
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                </div>
        </div>
    )
}