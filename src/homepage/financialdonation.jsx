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
        </div>
    );
}
