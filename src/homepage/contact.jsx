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
            <div className="mt-20 min-h-screen flex justify-center items-center" id="inquiry-form">
                <iframe 
                    aria-label='Inquiries Form' 
                    className="w-full h-full border-0" 
                    src='https://forms.zohopublic.com/Computers4People/form/ACPInquiry/formperma/Dx57tdHHrUQhpvkiUzWtSDiDNVj72PaVd3nJdw6C7tM'
                    style={{ minHeight: '185vh', height: '100%', width: '100%' }}
                >
                </iframe>
            </div>
        </div>
    );
}
