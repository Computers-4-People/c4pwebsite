import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/header';
import Testimonial from '../components/testimonial';
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
export default function Financialdonation() {
    return (
        <div className='font-sans'>
            <Header props={{
                bgImage: '/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpg',
                titlePart1: 'Take Action',
                titlePart2: 'Become a Champion',
                description: 'Every person deserves equitable access to opportunities. Your donation helps provide essential tech access and makes a difference for those in need.',
                links: [{text: 'Donate Monetarily', clickAction: () => handleScroll("cash-donation")}, {text: 'Donate a Device', url: '/donate'}]
            }} />
            <Testimonial props={{
                title2: 'Computers 4 People is transforming lives through technology every day',
                desc2: <div  id="cash-donation" className='space-y-7'>
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
                links: [{text:'Learn More', url:'/impact'}]
            }}/>
        </div>
    );
}
