import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

export default function Contact() {
    const scrollToForm = () => {
        const formSection = document.getElementById("inquiry-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Contact Us/contactbackground.png',
                titlePart1: 'Contact Us',
                titlePart2: `We're Here to Assist to You`,
                description: <div className='space-y-7'><p>Hours: Monday-Friday 9:00 a.m. to 5:00 p.m EST</p> 
                <p>Visit our Help Center for instant answers or reach out to us for further assistance</p></div>,
                links: [{text: 'Contact our Team', clickAction: scrollToForm}, {text: 'Visit our Help Center', url:"https://computers4people.zohodesk.com/portal/en/home"}]
            }}/>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/refurbished/refurbishedbackground.png')`, height:"150vh"}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                <div className='grid grid-cols-4 grid-rows-6 h-full pt-10'>
                    <iframe id="donation-form" aria-label='Contact us' style={{height: '90vh'}} className='col-span-6 md:col-span-2 row-start-1 row-span-5 w-full' src='https://forms.zohopublic.com/Computers4People/form/ContactUs/formperma/aIybWxHhYaCxg2xCQeEPGbTxvaTbLNmsTEJp_gjmCJI'></iframe>

                </div>
            </div>
        </div>
    );
}
