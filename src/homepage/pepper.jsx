import React from "react";
import Header from "../components/header.jsx";
import Testimonial from "../components/testimonial.jsx";

export default function Pepper() {
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
    <div id="main-content" >
    <Header props={
        {
            bgImage: '../pepper/pepperfestbackground.jpg',
            titlePart1: <div><span className='text-[#D10000]'>Spice Up</span> the End of Summer</div>,
            titlePart2: 'at the Hoboken PepperFest',
            description: `Don't miss out on the ultimate spicy showdown! Join 300+ people for a thrilling festival, pepper-eating competition, and more! Be part of this fundraiser supporting Computers 4 People's programs`,
            links: [{text: 'Buy Tickets', url:'https://www.zeffy.com/en-US/ticketing/ebfce008-e36e-4da1-b9c0-a76b1ee5481f'}]
        }
    }/>
    <div className='bg-cover bg-[#D10000] flex flex-row justify-around text-white text-center p-5'>
        <div><p className='text-4xl font-black'>5th October</p><p className='text-xl'>2024</p></div>
        <div><p className='text-4xl font-black'>1 PM-5 PM</p> <p>EST</p></div>
        <div><p className='text-4xl font-black'>524 Willow Ave</p><p>Hoboken, NJ 07030</p></div>
    </div>
    <Testimonial props={{
                title2: 'Show your spice tolerance: Enter the ultimate pepper-eating competition!',
                desc2: 
                <ul className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 list-disc list-inside'>
                    <li>DATE/TIME: October 5th | Festival starts at 1PM | Competition starts at 3PM</li>
                    <li>CONTEST CHILI PEPPERS INCLUDE: Carolina Reaper, Ghost Pepper, Dragon’s Breath.</li>
                    <li>HOW IT WORKS: There will be up to 20 rounds, each round contestants will need to eat and swallow an entire chili pepper without drinking water/milk. Chili peppers will increase in heat each round. The last standing contestant wins! Only 30 Contestant Tickets available.</li>
                </ul>,
                image: '../pepper/Pepper Fest Participants Trying Chili Pepper.png'
            }} />
    <div class='bg-c4p bg-cover overflow-x-scroll flex flex-row justify-evenly p-5' style={{height: '30vh'}}>
        <div className='flex flex-row justify-end px-10 items-center border-r-2  md:w-full'><img src="../pepper/trophy icon.png" className='h-full' alt="" /> <p className='font-title text-9xl'>Prizes</p></div>
        <img src="../pepper/Pepper Fest Prizes.png" className='object-contain h-full md:w-full' alt=""/>
    </div>
    <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '430vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    className="pt-20"
    scrolling="no"
    aria-label='Checkin Form'
    style={{ width: '90%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://secure.givelively.org/donate/computers-for-people/computers-4-people-fundraiser-2024?ref=sd_widget'
    id="financialdonation"
 ></iframe>
</div>
    </div> 
    )
}