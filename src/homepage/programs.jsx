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
            image: "/programs/Programs/Recipient_Computers4People_Tote_Bag_Refurbished_Laptop_College_Bound.jpg"
        },
        {
            titlePart1:"Foundational",
            titlePart2: "Digital Skills",
            description: "We offer specialized digital courses and PC building classes to equip individuals with digital literacy.",
            image:"/programs/Programs/Teenagers_Building_PCs_Refurbished.jpg"
        },
        {
            titlePart1:"Affordable",
            titlePart2: "Internet Access",
            description: "We assist people in finding affordable Internet programs that meet their needs.",
            image:"/programs/Programs/Refurbished_Computers.jpg"
        }
    ]
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/programs/Programs/Unlocking_Access_To_The_Digital_World.JPG',
                titlePart1: 'Uncover Possibilities',
                titlePart2: 'with Our Programs',
                description: 'Seize the opportunities at your fingertips with our programs—refurbished devices, affordable broadband, and essential digital skills courses  - are designed to help you become who you’re meant to be in the digital age.',
                links: [{text: 'Apply for a Computer'}, {text: 'Enroll in a Digital Skills Class'}]
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
                image: '../Programs/programs/Computers4People_Community_Access_Refurbished_Donated_Computers.png',
                links: [{text:'Apply for a computer'}, {text: 'Enroll in a Digital Class'}]
            }}/>
            <div className='h-full bg-cover p-20'>
                <div className='mb-20'>
                    <h2 className='text-7xl font-title'>How to Get Involved</h2>
                    <p className='text-2xl'>Be part of Bridging the Digital Digital Divide</p>
                </div>
                <IconCards />
            </div>
        </div>
    )
}