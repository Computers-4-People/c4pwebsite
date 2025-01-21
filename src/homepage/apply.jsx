import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import InfoCard from "../components/infocard";
// import FrameWrapper from "../components/frameWrapper";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

export default function Apply() {
    const cardsData = [
        {
            titlePart1: "Donors &",
            titlePart2: "Refurbishing",
            description: "Generous donors provide devices, which are refurbished with secure data wiping and repairs, ensuring they are ready for recipients.",
            image: "../refurbished/donorsrefurb.jpg",
        },
        {
            titlePart1: "Apply &",
            titlePart2: "Nomination",
            description: "Applicants apply online (paper applications available) and list a recommender from a nominating non-profit. The recommender receives an email to upload a recommendation.",
            image: "../refurbished/applynomination.jpg",
        },
        {
            titlePart1: "Notifications &",
            titlePart2: "Review",
            description: (
                <>
                    Applicants are notified when their recommender submits the recommendation and the application is complete. Applications are reviewed for eligibility. Check <a href="/eligibility" className="text-green-500 hover:underline">eligibility requirements</a>.
                </>
            ),
            image: "../refurbished/notification.jpg",
        },
        {
            titlePart1: "Device",
            titlePart2: "Delivery",
            description: "Approved applicants are notified and devices are delivered to the nominating non-profit, where recipients can pick them up. There may be a waiting period based on availability.",
            image: "../refurbished/devicedelivery.jpg",
        },
        {
            titlePart1: "Transforming",
            titlePart2: "Lives",
            description: "We follow up with recipients to gather feedback and learn how the devices are creating new opportunities in their lives.",
            image: "../refurbished/transform.jpg",
        },
    ];
    const scrollToForm = () => {
        document.getElementById("apply-form").scrollIntoView({ behavior: "smooth" });
        
    };

    
    return (
        <div  id="main-content" className='font-sans overflow-hidden'>
        <Header props={{
            bgImage: '/refurbished/refurbishedbackground.jpeg',
            titlePart1: 'UNLOCKING OPPORTUNITIES,',
            titlePart2: 'ONE COMPUTER AT A TIME',
            description: <div className='space-y-10'><p>Computers 4 People refurbishes and delivers donated devices to those in need. Complete our 10-min application today!</p></div>,
            links: [{text: 'Apply for a Device', clickAction: scrollToForm}]

            }}/>
        <Testimonial
            props={{
                title2: 'Transforming Lives with Free Computers',
                desc2: (
                <p>
                    According to a <a className="text-green-500 hover:underline" href="https://www.pewresearch.org/short-reads/2021/06/22/digital-divide-persists-even-as-americans-with-lower-incomes-make-gains-in-tech-adoption/">
                    Pew Research study
                    </a>, 41% of adults with lower incomes do not own a desktop or laptop computer. This limits access to critical opportunities in education, employment, and healthcare. Computers 4 People provides refurbished laptops, desktops, and tablets at no cost, ensuring everyone can unlock their potential.
                </p>
                ),
                image: '../refurbished/recipient.jpg',
                side: 'left',
  }}
/>
<Testimonial
  props={{
    title2: 'From Donors to Recipients: A Full Circle of Impact',
    desc2: (
      <p>
        Generous individuals and organizations donate their unused devices, which are then meticulously
        refurbished and securely <a className="text-green-500 hover:underline" href="/donate">data-wiped</a> to be in optimal condition. These devices are matched with recipients (located in New Jersey, New York City, or Massachusetts) to help
        them achieve their goals. Due to reliance on donations, applicants may experience a short
        waiting period, but the impact is well worth it.
      </p>
    ),
    image: '../refurbished/luis.png',
    side: 'right',
  }}
/>
        <div className='bg-cover font-sans justify-evenly px-4 mb-20 sm:px-10'>
                <div className='flex flex-col text-left md:ml-12 mt-40'>
                <h2 className='text-2xl md:text-4xl lg:text-7xl font-title uppercase mb-6'>
                Giving Devices a Second Chance
                    </h2>
                    <p className='text-lg md:text-2xl leading-7 md:leading-8 lg:leading-10'>
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
  height: '100vh',
  backgroundSize: window.innerWidth > 720 ? 'cover' : 'cover', // Keep cover for both
  backgroundPosition: window.innerWidth > 720 ? 'center right' : 'center right', // Position more precisely for each view
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: window.innerWidth > 720 ? 'fixed' : 'scroll' // Fixed on desktop, scroll on mobile
}} className="bg-fixed">
  <iframe
    scrolling="no"
    id="apply-form"
    aria-label='Apply For Computers! (2024 Draft Individuals)'
    style={{ width: '100%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/ApplyforaComputertestKPIs/formperma/zk0NnJSBFpkXO4ULlGN4TOKt9HESX6_p5mgQFoS6lSA'
  ></iframe>
</div>
            </div>
        )
    }