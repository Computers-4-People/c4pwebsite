import React from "react";
import { Link } from "react-router-dom";
import Testimonial from "../components/testimonial";
import Header from "../components/header";

export default function Contact() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/ewastedropoff/dropoffbackground.jpg',
                titlePart1: 'Serve your community',
                titlePart2: 'Become an Electronics Drop-off',
                description: 'Help close the digital gap -- your location will collect devices, while Computers 4 People handles the rest, refurbishing and redistributing them to those in need.',
                links: [{text: 'Become a device drop-off site'}, {text: 'Find a drop-off site near me'}]
            }} />
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/ewastedropoff/dropoffbackground.jpg')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up text-left'>SERVE YOUR COMMUNITY</p>
                        <p className='text-white animate-fade-up text-left'>BECOME AN ELECTRONIC DROP-OFF</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>Help close the digital gap-your location will collect devices, while Computers 4 People handles the rest, refurbishing and redistributing them to those in need.</p>
                        <div className="flex flex-col md:flex-row">
                                <Link to="/refurbished" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Become a device drop-off site
                            </Link>
                            <Link
                               to="https://computers4people.zohodesk.com/portal/en/home"
                                className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                            >
                                Find a drop-off site near me
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Testimonial props={{
                title2:'You can help provide digital access to your neighborhood-collect disregarded devices',
                desc2: <div>                    <p className=''>
                A device has the power to uplift an individual, a family, and a community. By collecting discarded devices, you can help put tools that transform lives into the hands of those in need. Becoming a drop-off site, you will:
               </p>
               <ul className='list-disc list-inside text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 mt-4 ml-6'>
                   <li>Enhance foot traffic and community engagement.</li>
                   <li>Showcase commitment to environmental sustainability</li>
                   <li>Zero cost involvement.</li>
                   <li>Impact lives and close the digital gap.</li>
               </ul></div>,
                image:'../ewastedropoff/computerhandoff.png'
            }}/>
            <div className='bg-cover font-sans justify-evenly px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../ewastedropoff/computerhandoff.png" alt="" className='object-contain h-3/4 w-3/4' />
                </div>
                {/* Text Section */}
                <div className='flex flex-col justify-center'>
                    <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                    You can help provide digital access to your neighborhood-collect disregarded devices
                    </h2>
                    <p className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7'>
                     A device has the power to uplift an individual, a family, and a community. By collecting discarded devices, you can help put tools that transform lives into the hands of those in need. Becoming a drop-off site, you will:
                    </p>
                    <ul className='list-disc list-inside text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 mt-4 ml-6'>
                        <li>Enhance foot traffic and community engagement.</li>
                        <li>Showcase commitment to environmental sustainability</li>
                        <li>Zero cost involvement.</li>
                        <li>Impact lives and close the digital gap.</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Text Content */}
        <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase">
                Find an electronic drop-off site near me
            </h2>
            <p className="text-lg md:text-lg leading-7 md:leading-8 lg:leading-7">
                Find a nearby drop-off site for your unused electronics. Simply drop off your devices, and our partner locations will securely store them while Computers 4 People manages pickup, recycling, refurbishment, and redistribution to those in need.
            </p>
            {/* Text Box and Button for User Input */}
            <div className="space-y-4">
                <p className="text-lg font-semibold">Electronics Drop-Off Sites Near 07030</p>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <input
                        type="text"
                        placeholder="Enter Zip Code, City, or State"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button className="w-full md:w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-md hover:bg-green-600">
                        Find Drop-Off Sites
                    </button>
                </div>
            </div>
        </div>

        {/* Right Side: Image and Embedded Map */}
        <div className="flex justify-center items-center">
            <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.4471160571655!2d-122.416529!3d37.778517999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c212d4d59%3A0x6f9e0b0a5e0e9250!2sApple%20Union%20Square!5e0!3m2!1sen!2sus!4v1635537981234!5m2!1sen!2sus"
                    className="absolute top-0 left-0 w-full h-full border-0 rounded-md"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </div>
</div>
<div className='bg-cover font-sans justify-evenly px-4 mt-40 mb-20 sm:px-10 md:px-20 py-10'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Image Section */}
        <div className='flex justify-center'>
            <img src="../ewastedropoff/luis.png" alt="" className='h-auto md:max-w-[80%]' />
        </div>
        {/* Text Section */}
        <div className='flex flex-col justify-center'>
            <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                Become an electronics drop-off site in minutes
            </h2>
            <p className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7'>
                Becoming a drop-off site is simple: fill out our form, display a banner to show you're a proud drop-off location, and provide a secure area for a bin (6ft L x 3.5ft W) to store electronics. Call us when the bin is full, and we'll handle pickup, recycling, and refurbishing.
            </p>
            <div className="flex flex-col md:flex-row mt-10">
                <a href="" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Join us as a drop-off site</a>
            </div>
        </div>
    </div>
</div>

    </div>
    )
}