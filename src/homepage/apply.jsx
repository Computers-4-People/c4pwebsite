import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import InfoCard from "../components/infocard";
// import FrameWrapper from "../components/frameWrapper";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

// const handleScroll = (id) => {
//     const element = document.getElementById(id);
//     const offset = 100;  // Adjust this value to leave space above the h1
//     const bodyRect = document.body.getBoundingClientRect().top;
//     const elementRect = element.getBoundingClientRect().top;
//     const elementPosition = elementRect - bodyRect;
//     const offsetPosition = elementPosition - offset;

//     window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//     });
// };

const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) return; // Ensure the element exists

    const headerOffset = 60;  // Adjust this to match your fixed header height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
};

export default function Apply() {
    const cardsData = [
        {
          titlePart1: "Donors",
          titlePart2: "Schedule A Pickup",
          description: "Individuals and companies donate their devices to us and we partner with local organizations to redistribute them to the community.",
          image: "../refurbished/donors.JPG"
        },
        {
            titlePart1: "Individuals & Orgs",
            titlePart2: "Apply for a Device",
            description: "Individuals and companies donate their devices to us and we partner with local organizations to redistribute them to the community.",
            image: "../refurbished/ambasadors.JPG"
        },
        {
            titlePart1: "Devices",
            titlePart2: "Undergoes Refurbishing",
            description: "Computers 4 People refurbishes and cleans computers thoroughly to optimal condition.",
            image: "../refurbished/devices.JPG"
        },
        {
            titlePart1: "Recipients",
            titlePart2: "Recieve Devices",
            description: "Recipient receives an email when the computer is delivered to the sponsoring organization.",
            image: "../refurbished/recipients.JPG"
        },
        {
            titlePart1: "A Catalyst",
            titlePart2: "of Change Begins",
            description: "Computers 4 People follows up via email to see how the computer is enabling opportunities and gather feedback.",
            image: "../refurbished/catalyst.png"
        }
      ];
    return (
        <div  id="main-content" className='font-sans overflow-hidden'>
        <Header props={{
            bgImage: '/refurbished/refurbishedbackground.png',
            titlePart1: 'UNLOCKING OPPORTUNITIES,',
            titlePart2: 'ONE COMPUTER AT A TIME',
            description: <div className='space-y-10'><p>Computers 4 People works tirelessly to refurbish and deliver donated devices to those in need. Complete our 10-min application today!</p></div>,
            links: [{text: 'Apply for a Device', clickAction: () => handleScroll("apply-form")}]

            }}/>
        <Testimonial props={{
            title2: 'Supporting Underserved Communities with Free Computers',
            desc2: <p><a href="https://www.pewresearch.org/short-reads/2021/06/22/digital-divide-persists-even-as-americans-with-lower-incomes-make-gains-in-tech-adoption/">Forty-one percent of adults with lower incomes do not own a desktop or laptop computer</a>, limiting their access to economic, educational, and social opportunities. Computers 4 People provide refurbished laptops, desktops, all-in-one and tablets at no cost to individuals and organizations in need to help people grasp the resources at their disposal.</p>,
            image: '../refurbished/recipient.jpg',
            side: 'left'
        }} />
        <Testimonial props={{
            title2: 'Our devices come from generous donors',
            desc2: 'Our devices come from individuals and organizations who generously provide their unused equipment to us. Each device undergoes a meticulous refurbishing and data wiping process to be in optimal condition before being matched to a recipient. Due to our' +
            ' reliance on donated devices, there may be a waiting period for computer applicants.',
            image: '../refurbished/luis.png',
            side: 'right'
        }}/>
        <div className='bg-cover font-sans justify-evenly px-4 mb-20 sm:px-10 md:px-20'>
                <div className='flex flex-col text-left md:ml-20 mt-40'>
                <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                Giving Devices a Second Chance
                    </h2>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                    Each device has a unique story before reaching its new home.</p>
            </div>
            <div>
                <InfoCard cards={cardsData}/>
            </div>
            </div>
            <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/applybackground2.JPG')`,
  display: 'flex',
  alignItems: 'start', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '115vh',
  backgroundSize: window.innerWidth > 720 ? 'cover' : 'cover', // Keep cover for both
  backgroundPosition: window.innerWidth > 720 ? 'center right' : 'center right', // Position more precisely for each view
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: window.innerWidth > 720 ? 'fixed' : 'scroll' // Fixed on desktop, scroll on mobile
}} className="bg-fixed">
  <iframe
    scrolling="no"
    id="apply-form"
    aria-label='Apply For Computers! (2024 Draft Individuals)'
    style={{ width: '100%', height: '76%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/ApplyForComputers2024Draft/formperma/bAlXxxX5A17U75_UNCjXMmfBaH3aR0c5kD2o-9FbngA'
  ></iframe>
</div>
            </div>
        )
    }