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
            <div className="bg-yellow-50 border-b-2 border-yellow-400 px-4 py-3">
                <div className="max-w-7xl mx-auto">
                    <p className="text-center text-gray-800 font-medium text-sm sm:text-base">
                        ⚠️ <span className="font-semibold">Holiday Notice:</span> Our team is out of office from December 24th - January 4th.
                        Any inquiries will be addressed at our soonest convenience upon our return.
                    </p>
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
