import React from "react";
import Header from "../components/header.jsx";
import Testimonial from "../components/testimonial.jsx";

export default function PepperFest() {
    const desc = 
    <div className='space-y-10'> 
        <div><h3 className='font-title text-2xl'>Date/Time:</h3><p>October 5th | Festival Starts at 1PM | Competition starts at 3PM</p> </div>
        <div><h3 className='font-title text-2xl'>Contest Chili Peppers Include:</h3> <p>Carolina Reaper, Ghost Pepper, Dragon's Breath.</p></div>
        <div><h3 className='font-title text-2xl'>How it works</h3> <p>There will be 20 rounds, each round contestants will nead to eat and swallow an
            entire pepper without drinking water/milk. Chili Peppers will increase in heat each round. The last
            standing contestant wins!
        </p></div>
        <p className='italic'>*Only 30 Contestant Tickets available</p>
    </div>
    return(
    <div>
    <Header props={
        {
            bgImage: '../Pepper Fest/Pepper Eating Contest Participant Chili Pepper Fest.png',
            titlePart1: <div><span className='text-red-700'>Spice Up</span> the End of Summer</div>,
            titlePart2: 'at the Hoboken PepperFest',
            description: `Don't miss out on the ultimate spicy showdown! Join 300+ people for a thrilling festival, pepper-eating competition, and more! Be part of this fundraiser supporting Computers 4 People's programs`,
            links: [{text: 'Buy Tickets'}]
        }
    }/>
    <div className='bg-cover bg-red-700 flex flex-row justify-around text-white text-center p-5'>
        <div><p className='text-4xl font-black'>5th October</p><p className='text-xl'>2024</p></div>
        <div><p className='text-4xl font-black'>1 PM-5 PM</p> <p>EST</p></div>
        <div><p className='text-4xl font-black'>524 Willow Ave</p><p>Hoboken, NJ 07030</p></div>
    </div>
    <div>
        <Testimonial props={{
            title: 'Show your spice tolerance: Enter the ultimate pepper-eating competition!',
            description: desc,
            image: '../Pepper Fest/Pepper Fest Participants Trying Chili Pepper.png'
        }}/>
    </div>
    </div> 
    )
}