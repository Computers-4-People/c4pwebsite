import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/header';
import Testimonial from '../components/testimonial';
const scrollToForm = () => {
    document.getElementById("financialdonation").scrollIntoView({ behavior: "smooth" });
    
};

export default function Support() {
    return (
        <div id="main-content" >
        <div className='font-sans'>
            <Header props={{
                bgImage: '/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpeg',
                titlePart1: 'Take Action',
                titlePart2: 'Become a Champion',
                description: 'Every person deserves equitable access to opportunities. Your donation helps provide essential tech access and makes a difference for those in need.',
                links: [{text: 'Donate Monetarily', clickAction: scrollToForm}, {text: 'Donate a Device', url: '/donate'}]
            }} />
            </div>

            <Testimonial props={{
                title2: 'Computers 4 People is transforming lives',
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
                image: '../Financial Contribution/Computers 4 People Recipient with Refurbished Laptop.jpeg',
                links: [{text:'Learn More', url:'/about'}],
                alt: 'A child holding a Computers 4 People green tote bag with a donated, refurbished laptop inside.'
            }}/>
            <div>
            <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.jpeg')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '750vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    className="pt-20"
    scrolling="no"
    aria-label='Checkin Form'
    style={{ width: '90%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://secure.givelively.org/donate/computers-for-people/computers-4-people-fundraiser-2025?ref=sd_widget'
    id="financialdonation"
 ></iframe>
</div>
            </div>
        </div>
    );
}   
