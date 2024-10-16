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
        <div id="main-content" >
        <div className='font-sans'>
            <Header props={{
                bgImage: '/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpg',
                titlePart1: 'Take Action',
                titlePart2: 'Become a Champion',
                description: 'Every person deserves equitable access to opportunities. Your donation helps provide essential tech access and makes a difference for those in need.',
                links: [{text: 'Donate Monetarily', clickAction: () => handleScroll("financialdonation")}, {text: 'Donate a Device', url: '/donate'}]
            }} />
            </div>

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
                links: [{text:'Learn More', url:'/impact'}],
                alt: 'A child holding a Computers 4 People green tote bag with a donated, refurbished laptop inside.'
            }}/>
            <div>
            <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '430vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    className="pt-20"
    scrolling="no"
    aria-label='Checkin Form'
    style={{ width: '90%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://secure.givelively.org/donate/computers-for-people/computers-4-people-fundraiser-2024?ref=sd_widget'
    id="financialdonation"
 ></iframe>
</div>
            </div>
        </div>
    );
}   
