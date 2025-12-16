import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

export default function Contact() {
    const scrollToForm = () => {
        document.getElementById("inquiry-form").scrollIntoView({ behavior: "smooth" });
        
    };


    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Contact Us/contactbackground.jpeg',
                titlePart1: 'Contact Us',
                titlePart2: `We're Here to Assist You`,
                description: <div className='space-y-7'><p>Phone: (201) 669-3062</p> <p>Hours: Monday-Friday 9:00 a.m. to 5:00 p.m. EST</p>
                <p>Click the floating "i" button in the bottom left corner to access our Help Center for instant answers or reach out for further assistance.</p></div>,
                links: [{text: 'Contact our Team', clickAction: scrollToForm}]
            }}/>

            {/* Out of Office Notice */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-y-2 border-yellow-400 px-4 py-6 sm:py-8 shadow-sm">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl">⚠️</div>
                    <div className="text-center sm:text-left">
                        <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                            Holiday Notice
                        </p>
                        <p className="text-sm sm:text-base text-gray-700">
                            Our team is out of office from <span className="font-semibold">December 24th - January 4th</span>.
                            Any inquiries will be addressed at our soonest convenience upon our return.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/Contact Us/contactbackground.jpeg')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    scrolling="no"
    aria-label='Contact Form'
    style={{ width: '100%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/ContactUs/formperma/aIybWxHhYaCxg2xCQeEPGbTxvaTbLNmsTEJp_gjmCJI'
    id="inquiry-form"
  ></iframe>
</div>
        </div>
    );
}
