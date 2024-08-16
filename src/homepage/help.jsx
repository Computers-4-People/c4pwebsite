 import React from "react";
 import InfoCard from "../components/infocard";

// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function Help() {
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    const cards = [
        {
            titlePart1: 'Getting Started',
            titlePart2: '',
            description: 'Find guides on setting up your device, troubleshooting issues, and maximizing your tech.',
            image: ''
        },
        {
            titlePart1: 'Donations',
            titlePart2: '',
            description: 'Find articles on donating devices, scheduling pickups, requesting a tax receipt and more.',
            image: ''
        },
        {
            titlePart1: 'Digital Skills',
            titlePart2: '',
            description: 'Find answers to all your questions about digital skills and literacy classes, from enrollment to benefits',
            image: ''
        },
        {
            titlePart1: 'Tech Recycling',
            titlePart2: '',
            description: 'Learn how we recycle tech, dispose of devices properly, and handle donations.'
        }
    ]
    return (
        <div className='font-sans'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/homepage/background.jpeg')`}} 
            className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat flex flex-col justify-center">
                <div class="flex place-content-center">
                    <div className='text-center font-title text-8xl '>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>Computers4People</p>
                        <p class='text-white col-span-2'>Help Center</p>
                    </div>
                </div>
            </div>
            <div>
                <InfoCard cards={cards}/>
            </div>
        </div>
    )
}