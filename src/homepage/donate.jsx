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
            description: "Complimentary e-waste pickup available for a minimum of 10 devices, covering all electronic computing items - except appliances - in",
            image: "/Programs/E-waste/Images/Donor_Scheduling_Ewaste_Pickup.jpeg",
            alt: 'Dylan Zjac talking to a donor.'
        },
        {
            titlePart1: "Ambassadors Provide",
            titlePart2: "Simple Device Pickup",
            description: "Ambassadors transport electronic waste to the refurbishing center, where they are categorized into donatable and non-donatable devices",
            image: "/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpeg",
            alt: 'Computers 4 People Ambassadors picking up a donation.'
        },
        {
            titlePart1: "Donatable Devices",
            titlePart2: "are Refurbished & Clean",
            description: "Donatable devices undergo refurbishment to ensure optimal condition, including data wiping certified by NIST 800-88. Tax-receipts provided via email.",
            image: "/Programs/E-waste/Images/Child_Building_Refurbished_PCs.jpeg",
            alt: 'Volunteer refurbishing a donated device.'
        },
        {
            titlePart1: "Non-Donatable Devices",
            titlePart2: "Are Properly Recycled",
            description: "Non-donatable devices are properly recycled and disposed of with materials that can be reused and transformed into items such as cans and bottles.",
            image: "/Programs/E-waste/Images/Volunteer_Sorting_ewaste.jpeg",
            alt: 'Volunteer categorizing and recycling e waste and electronics.'
        },
        {
            titlePart1: "Recipients",
            titlePart2: "Obtain Computers",
            description: "Refurbished devices are matched with individuals and organizations in need, fostering digital equity in under-resourced communities.",
            image: "/Programs/E-waste/Images/Recipient_Receiving_Refurbished_Computer.jpeg",
            alt: 'A woman of advanced age receiving a refurbished computer and green computers 4 people tote bag.'
        }
    ]
    const iconsData = [
        {
          title: "Become an Electronics Drop-Off Site",
          image: "../maps.png",
          alt: "E-Waste Drop-off Site",
          link: "/ewastedropoff"
        },
        {
          title: "Sponsor Digital Access",
          image: "../handshake.png",
          alt: "Sponsor Digital Access",
          link: "/financialdonation"
        },
        {
          title: "Volunteer",
          image: "../hands.png",
          alt: "Volunteer",
          link: "/volunteer"
        }
      ];
     return (
        <div id="main-content" >
        <div className='font-sans mb-20 overflow-x-hidden'>
            <Header props={{
                bgImage: '/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpeg',
                titlePart1: 'Turn E-Waste',
                titlePart2: 'into Opportunties',
                description: <div className='space-y-10'><p>We're on a mission to collect unused devices, refurbishing what we can for communities and responsibly recycling the rest.</p><p>We're turning e-waste into tools for a responsible future.</p></div>,
                links: [{text: 'Schedule an electronics pickup', clickAction: () => handleScroll("donation-form")}]

                }}/>
            <div className='bg-cover'>
                <div className='pl-5 md:pl-14'>
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
                                Computers 4 People provides a hassle-free, complimentary services with
                                convenient drop-off points in NJ, NYC, and Massachusetts. Simply drop off
                                your e-waste, and we'll handle the rest for you.
                            </p>
                            <p>Tax receipts are provided upon request.</p>
                     </div>,
                image: '/Programs/E-waste/Images/Donor_with_Bulk_Ewaste_Laptops.jpeg',
                alt: 'Donor holding a bulk of donated laptops to be refurbished and redistributed to people in need.'
            }}/>
            </div>
            <div className="bg-cover mt-40">
                    <div className='self-center row-span-1col-span-2 mx-20'>
                        <h2 className="col-span-2 text-7xl font-title mb-3">Ways to Get Involved</h2>
                        <p className="col-span-2 text-2xl"> Explore these ways to cultivate digital equity</p>
                    </div>
                </div>
            <div className="my-5 p-5 mb-20 mt-10">
  <IconCards cards={iconsData} />
</div>
                <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/about/serving-3-states.jpg')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '100vh',
  backgroundSize: window.innerWidth > 720 ? 'cover' : 'cover', // Keep cover for both
  backgroundPosition: window.innerWidth > 720 ? 'center right' : 'center right', // Position more precisely for each view
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: window.innerWidth > 720 ? 'fixed' : 'scroll' // Fixed on desktop, scroll on mobile
}} className="bg-fixed">
  <iframe
    scrolling="no"
    id="donation-form"
    aria-label='Donate Computers'
    style={{ width: '100%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/DonateFormTest/formperma/6XerbAZaBgCkJBbbDpwBsaIWrd-2TmcGiUM1IL0dX2I'
  ></iframe>
</div>
            </div>
            
    )
}
