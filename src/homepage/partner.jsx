import React from "react";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

export default function Refurbished() {
    const scrollToForm = () => {
        document.getElementById("partnership-form").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{bgImage: '/Become a Partner/partnerbackground.jpg', titlePart1: 'Drive Positive Impact', titlePart2: 'Become a Partner',
            description: 'Join a network of 300+ non-profit partners that are tackling pressing community needs, uplifting people, and building bridges to lasting change worldwide.',
            links: [{text: 'Become a Partner', clickAction: scrollToForm}]
            }} />
            <Testimonial props={{
                title2: 'Why Join Us as a Partner?',
                desc2: 
                <ul className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 list-disc list-inside'>
                    <li>Bring Technology to Your Community: Help us provide computers to individuals in need.</li>
                    <li>Host Digital Skills Classes: Collaborate with us to offer essential tech education.</li>
                    <li>Innovative Partnerships: Join forces on creative solutions to enhance digital equity and impact.</li>
                </ul>,
                image: '../Become a Partner/partnerphoto.png'
            }} />
             <div id="partnership-form" style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/refurbished/refurbishedbackground.png')`}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                <div className='grid grid-cols-4 grid-rows-6 h-full pt-10'>
                    <iframe scrolling="no" id="donation-form" aria-label='Partner Application' style={{height: '90vh'}} className='col-span-6 md:col-span-2 row-start-1 row-span-5 w-full' src='https://forms.zohopublic.com/Computers4People/form/PartnershipApplicationDraft2024/formperma/AnuHDCVFeOCBdTmZZpXHF5Pdj1zM9ZEctklFyzZQZVE'></iframe>

                </div>
            </div>
        </div>
    );
}
