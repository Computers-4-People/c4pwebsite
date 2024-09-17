import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import Header from "../components/header";
import Testimonial from '../components/testimonial';

export default function Impact() {
    const pressItems1 = [
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2023',
            link: 'https://charityquest.io/'
        },
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2022',
            link: 'https://charityquest.io/'
        },
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2021',
            link: 'https://charityquest.io/'
        },
    ];
    
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/impact/impactbackground.png',
                titlePart1: 'Learn About the',
                titlePart2: `Impact We've Made`,
                description: `Dive into our Impact Reports to see how we've driven positive change and made a difference in the communities we serve.`,
                links: [{text: 'Read our 2023 Impact Report', url:"/impact/2023impactreport.pdf"}]
            }}/>

            <Testimonial props={{
                title2: `With you we're making big strides`,
                desc2: 
                <div className='space-y-10'> 
                    <p>
                    In a world where technology is crucial for education, employment, and connection, the digital divide remains a pressing challenge. Despite this, our mission to tackle e-waste and enhance digital inclusion has made significant strides in transforming discarded tech into valuable resources
                    </p>
                    <p>
                    Thanks to the support of our dedicated partners, Computers 4 People has been able to refurbish and distribute thousands of computing devices, bridging gaps and creating new opportunities for individuals and families.
                    </p>
                    <p>
                    Dive into our latest Impact Report to see how your support has driven meaningful change and empowered communities.
                    </p>
                </div>,
                image: '../impact/impactreportbook.png'
            }}/> 
            
            <div className="bg-black p-10 md:p-20">
                <img src="/impact/2023impact.png" className="md:w-3/4 md:m-auto"></img>
            </div>

            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">OUR IMPACT REPORTS</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Check out our impact reports to see how your support has made a difference</p>
            </div>

            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>

            <div className='min-h-screen text-black mb-20'>
                {/* Heading */}
                <h2 className="ml-14 mb-10 text-5xl text-center font-bold mt-40">Give disregarded Tech a Chance to Improve Lives</h2>

                {/* Content Wrapper */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                    {/* Image on the Left */}
                    <div className='flex justify-center'>
                        <img src="/impact/recipient.png" alt='' className='animate-fade-right animate-once h-auto max-w-full md:max-w-md' />
                    </div>

                    {/* Quote and Buttons on the Right */}
                    <div>
                        <div className='bg-contain bg-top bg-no-repeat mb-6 md:mr-40 ' style={{ backgroundImage: "url('../quotes.png')" }}>
                            <p className='p-4 pl-0'>
                                "Fantastic! My new computer runs smoothly with excellent RAM, something my old one couldn't do. No more crashes during big projects or layout designs! It’s truly made a difference, saving me time and frustration. Thanks Computers 4 People!"<br/><br/>-Natalia
                            </p>
                        </div>

                        {/* Updated Button Section */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link to="/donate" className='bg-c4p rounded h-12 px-6 py-2 w-full md:w-auto flex items-center justify-center hover:bg-c4p-hover hover:text-white text-center'>
                                Donate your device
                            </Link>
                            <Link to="/financialdonation" className='border-2 border-black rounded h-12 px-6 py-2 w-full md:w-auto flex items-center justify-center hover:bg-black hover:text-white text-center'>
                                Make a financial contribution
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
