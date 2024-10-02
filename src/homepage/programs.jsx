import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from '../components/header.jsx';
import Testimonial from "../components/testimonial.jsx";
export default function Programs() {
    const cards = [
        {
            titlePart1: "Distribution of",
            titlePart2: "Refurbished Devices",
            description: "We refurbish donated devices and distribute them to communities in need across NYC, NJ, and MA.",
            image: "/Programs/Programs/Recipient_Computers4People_Tote_Bag_Refurbished_Laptop_College_Bound.jpg",
            alt: 'Teacher holding donated a computer with green tote bag from Computers 4 People.'
        },
        {
            titlePart1:"Foundational",
            titlePart2: "Digital Skills",
            description: "We offer specialized digital courses and PC building classes to equip individuals with digital literacy.",
            image:"/Programs/Programs/Teenagers_Building_PCs_Refurbished.jpg",
            alt: 'Teenager volunteer refurbishing donated computers to provide them to people in need.'
        },
        {
            titlePart1:"Affordable",
            titlePart2: "Internet Access",
            description: "We assist people in finding affordable Internet programs that meet their needs.",
            image:"/Programs/Programs/Refurbished_Computers.jpg",
            alt: 'Refurbished computers with the logo of Computers 4 People '
        }
    ]
    const iconsData = [
        {
          title: "BECOME AN EWASTE DROP-OFF SITE",
          image: "../maps.png",
          alt: "E-Waste Drop-off Site",
          link: "/ewastedropoff"
        },
        {
          title: "SPONSOR DIGITAL ACCESS",
          image: "../handshake.png",
          alt: "Sponsor Digital Access",
          link: "/financialdonation"
        },
        {
          title: "VOLUNTEER",
          image: "../hands.png",
          alt: "Volunteer",
          link: "/volunteer"
        }
      ];
    
    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Programs/Programs/unlocking_access_to_the_digital_world.jpg',
                titlePart1: 'Uncover Possibilities',
                titlePart2: 'with Our Programs',
                description: 'Seize the opportunities at your fingertips with our programs—refurbished devices, affordable broadband, and essential digital skills courses  - are designed to help you become who you’re meant to be in the digital age.',
                links: [{text: 'Apply for a Computer', url: "/apply"}, {text: 'Enroll in a Digital Skills Class', url: "/dsclasses"}]
                }} />

            <div className='h-full py-20'>
                <div className='ml-32'>
                    <h2 className='text-7xl font-title'>Programs tailored to foster growth</h2>
                    <p className='text-2xl'>Our programs are designed to help you achieve full participation in the digital world</p>
                </div>
                <div>
                    <InfoCard cards={cards} />
                </div>
            </div>

            <Testimonial props={{
                title2: 'Your Chance to Master Technology can Be Today',
                desc2: 'Everyone, regardless of age, gender or background, can learn technology; take the first step',
                image: '../Programs/Programs/Computers4People_Community_Access_Refurbished_Donated_Computers.png',
                links: [{text:'Apply for a computer', url: "/apply"}, {text: 'Enroll in a Digital Class', url: "/dsclasses"}]
            }}/>
            <div className='h-full bg-cover p-20'>
                <div className=''>
                    <h2 className='text-7xl font-title'>How to Get Involved</h2>
                    <p className='text-2xl'>Be part of Bridging the Digital Digital Divide</p>
                </div>
            </div>
            <div className="my-5 p-5 mb-20">
  <IconCards cards={iconsData} />
</div>
        </div>
    )
}