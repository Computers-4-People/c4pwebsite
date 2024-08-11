import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
export default function Volunteer() {
    const pressItems1 = [
        {
            image: '',
            title: 'Impact Report 2023',
            link: 'https://charityquest.io/'
        },
        {
            image: '',
            title: 'Impact Report 2022',
            link: 'https://charityquest.io/'
        },
        {
            image: '',
            title: 'Impact Report 2021',
            link: 'https://charityquest.io/'
        },
    ];
    return (
        <div className='font-sans overflow-x-hidden'>
        <div
            style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/impact/impactbackground.png')`
            }}
            className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
        >
            <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                    <p className='text-c4p animate-fade-up'>LEARN ABOUT THE</p>
                    <p className='text-white animate-fade-up'>IMPACT WE'VE MADE</p>
                </h1>
                <div className="col-start-1 md:col-end-4 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>
                        Dive into our Impact Reports to see how we’ve driven positive change and made a difference in the communities we serve.
                    </p>
                    <div className="flex flex-col md:flex-row">
                        <a href="https://charityquest.io/" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Read our 2023 Impact Report</a>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-cover font-sans justify-evenly px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../impact/impactreportbook.png" alt="" className='w-full h-auto md:max-w-md' />
                </div>
                {/* Text Section */}
                <div className='flex flex-col justify-center'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6'>
                        With YOU, WE’RE MAKING big STRIDES
                    </h2>
                    <p className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7'>
                    In a world where technology is crucial for education, employment, and connection, the digital divide remains a pressing challenge. Despite this, our mission to tackle e-waste and enhance digital inclusion has made significant strides in transforming discarded tech into valuable resources.<br/><br/>Thanks to the support of our dedicated partners, Computers 4 People has been able to refurbish and distribute thousands of computing devices, bridging gaps and creating new opportunities for individuals and families.<br/><br/>Dive into our latest Impact Report to see how your support has driven meaningful change and empowered communities.
                    </p>
                </div>
            </div>
        </div>
        <div className="bg-black p-80">
            <h2 className="text-white">Hello</h2>
        </div>
        <div id="media-highlights" className="mt-60">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">OUR IMPACT REPORTS</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Check out our impact reports to see how your support has made a difference</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>
        <div className='bg-cover font-sans justify-evenly px-4 mt-30 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Text Section */}
                <div className='flex flex-col text-right'>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                    "Volunteering with Computers 4 People was incredible! I helped by collecting and preparing computers for those in need, while immersing myself in American culture and making lasting friendships."<br/><br/>-Axel, International Volunteer
                    </p>
                </div>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../volunteer/volunteeraxel.png" alt="" className='w-full h-auto md:max-w-md' />
                </div>
            </div>
        </div>
        </div>
        )
    }