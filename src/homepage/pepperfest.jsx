import React from "react";
import Header from "../components/header.jsx";

export default function PepperFest() {
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
    </div> 
    )
}