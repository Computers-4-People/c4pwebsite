import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import Header from "../components/header";
import Testimonial from "../components/testimonial";

const handleScroll = (id) => {
    const element = document.getElementById(id);
    const offset = 100;  // Adjust this value to leave space above the h1
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
};

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
            link: '/contact'
        },
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Join the Pepper Fest Planning Committee',
            description: '10AM | In-Person',
            link: '/contact'
        },
        {
            image: '/volunteer/volunteerbackground.jpg',
            title: 'Know how to program? Assist with building out C4P technology.',
            description: '10AM | In-Person',
            link: '/contact'
        },
    ];
    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/volunteer/volunteerbackground.jpg',
                titlePart1: 'Make an Impact',
                titlePart2: 'Volunteer with Us',
                description: 'Whether it is refurbishing laptops, sorting donations, assisting with translations, or in event planning. Your efforts make a meaningful difference and help us serve and uplift our community.',
                links: [{text: 'Sign up to volunteer', url: 'https://charityquest.io/'}, {text: 'Plan a day of service', url: '/contact'}]
            }} />
        <Testimonial props={{
            title2: 'Volunteer Opportunities for Everyone: Tailored to Your Preferences',
            desc2: <div className='space-y-8'><p>Our volunteer opportunities are for everyone! <br/>No prior experience required. We offer training on how to refurbish computers and assist in event planning. Join us to make a meaningful impact, all while gaining valuable skills and meeting great like-minded people.</p><p>Volunteer opportunities available in-person or remote.</p></div>,
            image: '../volunteer/volunteersacha.jpeg',
            alt: 'Volunteer holding a spicy chili pepper plant for our annual fundraiser Pepper Fest'
        }} />
        <div id="media-highlights" className="mt-60">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-7xl text-gray-800 font-title uppercase mb-6">VOLUNTEER OPPORTUNITIES</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>In-person. Online. No Experience Required.</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>
        <div className='bg-cover font-sans justify-evenly px-4 mt-30 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Text Section */}
                <div className='flex flex-col text-center'>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                    "Volunteering with Computers 4 People was incredible! I helped by collecting and preparing computers for those in need, while immersing myself in American culture and making lasting friendships."<p className='text-right'>-Axel, International Volunteer</p>
                    </p>
                </div>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../volunteer/volunteeraxel.jpeg" alt="Axel" className='w-full h-auto md:max-w-md' />
                </div>
            </div>
        </div>
        </div>
        )
    }