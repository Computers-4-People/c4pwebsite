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

            <div className='h-full text-black'>
            <div className='grid grid-rows-2 grid-cols-6 relative'>
                <img src="../Programs/programs/Computers4People_Community_Access_Refurbished_Donated_Computers.png" className=' col-span-2 row-span-3 animate-fade-right animate-once' />
                <div className='z-10 col-start-3 col-end-6 row-start-1 self-end text-xl bg-contain bg-top bg-no-repeat px-12'>
                    <h3 className='text-5xl font-title'>Your Chance to Master Technology Can Be Today</h3>
                    <p className='text-2xl'>Everyone, regardless of age, gender or background, can learn technology; take the first step</p>
                </div>
        
                <div className='grid grid-cols-2 col-start-3 col-end-6 row-start-2 self-start mt-4 items-center text-center text-xl gap-3 z-20 px-12'>
                        <Link to="/ewaste" className='bg-c4p rounded h-12 pr-3 pt-2.5 hover:bg-c4p-hover hover:text-white'>Apply for a computer</Link>
                        <Link to="/partner" className='border-2 border-black rounded h-12 pr-1 pt-2.5 hover:bg-black hover:text-white'>Enroll in a digital class</Link>
                        </div>
                    </div>
            </div>
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