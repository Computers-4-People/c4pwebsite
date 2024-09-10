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
            {/* Form Section */}
            <div id="partnership-form">
                <iframe
                    aria-label='Partnership Application'
                    className="w-full h-full border-0"
                    src='https://forms.zohopublic.com/Computers4People/form/PartnershipApplication/formperma/LXC_W4X5dA-gXn0sMyqsRIwqPg4y0DRmqPqziLpD__Y'
                    style={{ minHeight: '185vh', height: '100%', width: '100%' }}
                >
                </iframe>
            </div>

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
        </div>
    );
}
