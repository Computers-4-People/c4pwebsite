import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import Header from "../components/header";
import Testimonial from "../components/testimonial";

export default function Volunteer() {
    const pressItems1 = [
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Refurbishing laptops, desktops, and all-in-ones',
            description: '10AM | In-Person',
            link: 'https://charityquest.io/'
        },
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Translate a document from English to Spanish',
            description: '10AM | In-Person',
            link: 'https://charityquest.io/'
        },
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Join the Pepper Fest Planning Committee',
            description: '10AM | In-Person',
            link: 'https://charityquest.io/'
        },
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Hang up poster and do outreach',
            description: '10AM | In-Person',
            link: 'https://charityquest.io/'
        },
    ];
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/volunteer/volunteerbackground.jpg',
                titlePart1: 'Make an Impact',
                titlePart2: 'Volunteer with Us',
                description: 'Whether it is refurbishing laptops, sorting donations, assisting with translations, or assissting in event planning. Your efforts make a meaningfull difference and help us serve and uplift our community.',
                links: [{text: 'Signup to Volunteer'}, {text: 'Plan a day of service', url: 'contact'}]
            }} />
        <div
            style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/volunteer/volunteerbackground.jpg')`
            }}
            className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
        >
            <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                    <p className='text-c4p animate-fade-up'>MAKE AN IMPACT</p>
                    <p className='text-white animate-fade-up'>VOLUNTEER WITH US</p>
                </h1>
                <div className="col-start-1 md:col-end-4 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>
                        Whether it is refurbishing laptops, sorting donations, assisting with translations, or assisting in event planning. Your efforts make a meaningful difference and help us serve and uplift our community.
                    </p>
                    <div className="flex flex-col md:flex-row">
                        <a href="https://charityquest.io/" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Signup to volunteer</a>
                        <Link 
                            to="/contact" 
                            className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                        >
                            Plan a Day of Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <Testimonial props={{
            title2: 'Volunteer Opportunities for Everyone: Tailored to Your Preferences',
            desc2: <div className='space-y-8'><p>Our volunteer opportunities are for everyone! No prior experience required. We offer training on how to refurbish computers and assist in event planning. Join us to make a meaningful impact, all while gaining valuable skills and meeting great like-minded people.</p><p>Volunteer opportunities available in-person or remote.</p></div>,
            image: '../volunteer/volunteersacha.png'
        }} />

        <div className='bg-cover font-sans justify-evenly px-4 mt-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../volunteer/volunteersacha.png" alt="" className='w-full h-auto md:max-w-md' />
                </div>
                {/* Text Section */}
                <div className='flex flex-col justify-center'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6'>
                        Volunteer Opportunities for Everyone: Tailored to Your Preferences
                    </h2>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                        Our volunteer opportunities are for everyone! No prior experience required. We offer training on how to refurbish computers and assist in event planning. Join us to make a meaningful impact, all while gaining valuable skills and meeting great like-minded people.<br/><br/>
                        Volunteer opportunities available in-person or remote.
                    </p>
                </div>
            </div>
        </div>
        <div id="media-highlights" className="mt-60">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">VOLUNTEER OPPORTUNITIES</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>In-person. Online. No Experience Required.</p>
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