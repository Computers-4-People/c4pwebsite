import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/header';
import Testimonial from '../components/testimonial';

export default function Financialdonation() {
    return (
        <div className='font-sans'>
            <Header props={{
                bgImage: '/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpg',
                titlePart1: 'Take Action',
                titlePart2: 'Become a Champion',
                description: 'Every person deserves equitable access to opportunities. Your donation helps provide essential tech access and makes a difference for those in need.',
                links: [{text: 'Donate Monetarily' }, {text: 'Donate a Device', url: '/ewaste'}]
            }} />
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpg')`}} 
            className="bg-cover md:h-screen h-full bg-center bg-fixed bg-no-repeat">
                <div className="flex flex-col justify-center h-full w-3/4 space-y-5 p-14">
                    <div className='col-start-1 col-end-4 row-start-2 font-title text-8xl'>
                        <p className='text-[#0FE006] col-span-2 object-fill mb-5'>Take Action</p>
                        <p className='text-white col-span-2'>Become a Champion</p>
                    </div>
                    <p className='text-white text-lg w-1/2'>
                        Every person deserves equitable access to opportunities. Your 
                        donation helps provide essential tech access and make a
                        difference for those in need.
                    </p>
                    <div className='mt-10 row-start-3 col-span-4 row-span-2 flex flex-row justify-items-start flex-wrap text-center text-xl w-128'>
                        <a 
                            href="https://secure.givelively.org/donate/computers-for-people/computers-4-people-fundraiser-2024?ref=sd_widget"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0FE006] h-10 mr-3 h-11 rounded-md pt-2 px-5"
                        >
                            Donate Monetarily
                        </a>
                        <Link to="/ewaste" className='border-2 rounded-md border-white h-11 text-white h-10 pt-1.5 px-5'>
                            Donate a Device
                        </Link>
                    </div>
                </div>
            </div>
            <Testimonial props={{
                title2: 'Computers 4 People is transforming lives through technology every day',
                desc2: <div className='space-y-7'>
                        <p className=''>
                            By providing the tools needed to unlock countless opportunities, Computers 4 People
                            is changing the course of thousands of lives.
                        </p>
                        <p className=''>
                            Discover the impact we've made.
                        </p>
                </div>,
                side:'right',
                image: '../Financial Contribution/Computers 4 People Recipient with Refurbished Laptop.png',
                links: [{text:'Learn More'}]
            }}/>
            <div className='h-full text-black py-20 px-10'>
                <div className='grid grid-rows-1 grid-cols-6 relative px-20'>
                    <div className='col-span-4 flex flex-col justify-center space-y-10 my-10'>
                        <h2 className='text-5xl font-title'>Computers 4 People is transforming lives through technology every day</h2>
                        <p className='text-xl mt-5'>
                            By providing the tools needed to unlock countless opportunities, Computers 4 People
                            is changing the course of thousands of lives.
                        </p>
                        <p className='text-xl'>
                            Discover the impact we've made.
                        </p>
                        <Link className='text-xl bg-c4p hover:bg-c4p-hover w-1/4 py-2 px-8 rounded text-center'>
                            Learn More
                        </Link>
                    </div>
                    <img src="../Financial Contribution/Computers 4 People Recipient with Refurbished Laptop.png" className='col-start-5 col-span-2 row-span-3 animate-fade-right animate-once' />
                </div>
            </div>
        </div>
    );
}
