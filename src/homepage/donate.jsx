import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

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

export default function Donate () {
    const cards = [
        {
            titlePart1: "Donors",
            titlePart2: "Arrange a Pickup",
            description: "Complimentary e-waste pickup available for a minimum of 10 devices, covering all electronic computing items - except appliances - in ",
            image: "/Programs/E-waste/Images/Donor_Scheduling_Ewaste_Pickup.jpg"
        },
        {
            titlePart1: "Ambassadors Provide",
            titlePart2: "Simple Device Pickup",
            description: "Ambassadors transport electronic waste to the refurbishing center, where they are catagorized into donatable and non-donatable devices",
            image: "/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpg"
        },
        {
            titlePart1: "Donatable Devices",
            titlePart2: "are Refurbished & Clean",
            description: "Donatable devices undergo refurbishment to ensure optimal condition, including data wiping certified by NIST 800-88. Tax-recepits provided via email.",
            image: "/Programs/E-waste/Images/Child_Building_Refurbished_PCs.JPG"
        },
        {
            titlePart1: "Non-Donatable Devices",
            titlePart2: "Are Properly Recycled",
            description: "Non-donatable devices are properly recycled and disposed of with materials that can be reused and transformed into items such as cans and bottles.",
            image: "/Programs/E-waste/Images/Volunteer_Sorting_ewaste.png"
        },
        {
            titlePart1: "Recipients",
            titlePart2: "Obtain Computers",
            description: "Refurbished devices are matched with individuals and organizations in need, fostering digital equity in under-resourced communities.",
            image: "/Programs/E-waste/Images/Recipient_Receiving_Refurbished_Computer.jpg"
        }
    ]
    
     return (
        <div className='font-sans mb-20'>
            <Header props={{
                bgImage: '/about/serving-3-states.jpg',
                titlePart1: 'Turn E-Waste',
                titlePart2: 'into Opportunties',
                description: <div className='space-y-10'><p>We're on a mission to collect unused devices, refurbishing what we can for communities and responsibly recycling the rest.</p><p>We're turning E-waste into tools for a responsible future.</p></div>,
                links: [{text: 'Schedule an electronics pickup', clickAction: () => handleScroll("donation-form")}]

                }}/>
            <div className='bg-cover p-10'>
                <div className='pl-14'>
                    <h2 className='text-7xl font-title mt-10'>GIVING UNUSED ELECTRONICS A NEW LIFE</h2>
                    <p className='text-3xl mt-5'>Someone's disregard electronics can become a lifeline for others.</p>
                </div>
            <div>
                    <InfoCard cards={cards}></InfoCard>
                </div>
            </div>

            <Testimonial props={{
                title2: 'Easy and Convenient Electronics Drop-off sites in your community',
                desc2: <div>
                            <p className='my-5'>
                                Computers 4 People provices a hassle-free, complimentary services with
                                convenient drop-off points in NJ, NYC, and Massachusetts. Simply drop off
                                your e-waste, and we'll handle the rest for you.
                            </p>
                            <p>Tax receipts are provided upon request.</p>
                     </div>,
                image: '/refurbished/luis.png'
            }}/>
            <div className="bg-cover mt-10" style={{height: "100vh"}}>
                <div className="mx-20 grid grid-cols-3 grid-rows-2 h-full">
                    <div className='self-center col-span-2'>
                        <h2 className="col-span-2 text-6xl font-sans font-bold mb-10">Ways to Get Involved</h2>
                        <p className="col-span-2 text-3xl ml-2"> Explore these ways to cultivate digital equity</p>
                    </div>
                    <div className=''>
                        <IconCards className='mt-4 row-start-2 col-span-3' />
                    </div>
                </div>
            </div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/refurbished/refurbishedbackground.png')`, height:"150vh"}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat">
                <div className='grid grid-cols-4 grid-rows-6 h-full pt-10 pb-10'>
                    <iframe scrolling="no" id="donation-form" aria-label='Donate Form (2024 Draft)' style={{height: '150vh'}} className='col-span-6 md:col-span-2 row-start-1 row-span-5 w-full' src='https://forms.zohopublic.com/Computers4People/form/DonateFormTest/formperma/6XerbAZaBgCkJBbbDpwBsaIWrd-2TmcGiUM1IL0dX2I'></iframe>
                </div>
            </div>
        </div>
    )
}
