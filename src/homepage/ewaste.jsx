import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
export default function Ewaste () {
    const cards = [
        {
            titlePart1: "Donors",
            titlePart2: "Arrange a Pickup",
            description: "Complimentary e-waste pickup available for a minimum of 10 devices, covering all electronic computing items - except appliances - in ",
            image: "/E-waste/arrange-a-pickup.jpg"
        },
        {
            titlePart1: "Ambassadors Provide",
            titlePart2: "Simple Device Pickup",
            description: "Ambassadors transport electronic waste to the refurbishing center, where they are catagorized into donatable and non-donatable devices",
            image: "/E-waste/simple-device-pickup.jpg"
        },
        {
            titlePart1: "Donatable Devices",
            titlePart2: "are Refurbished & Clean",
            description: "Donatable devices undergo refurbishment to ensure optimal condition, including data wiping certified by NIST 800-88. Tax-recepits provided via email.",
            image: "/E-waste/donatable-devices.jpg"
        },
        {
            titlePart1: "Non-Donatable Devices",
            titlePart2: "Are Properly Recycled",
            description: "Non-donatable devices are properly recycled and disposed of with materials that can be reused and transformed into items such as cans and bottles.",
            image: ""
        },
        {
            titlePart1: "Recipients",
            titlePart2: "Obtain Computers",
            description: "Refurbished devices are matched with individuals and organizations in need, fostering digital equity in under-resourced communities.",
            image: "/E-waste/recipients.jpg"
        }
    ]
    
    const embed = <iframe aria-label='Donate Computers Today!' frameborder="0" style="height:500px;width:99%;border:none;" src='https://forms.zohopublic.com/Computers4People/form/ComputerDOnation/formperma/XJZv3iw51lSwx3q5uk__jm80Prad8oAU6C7DYZdtWH8'></iframe>
    
    return (
        <div className='font-sans mb-20'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/about/serving-3-states.jpg')`}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                <div class="ml-32 h-full grid grid-cols-6 grid-rows-2 justify-items-stretch">
                    <div className='col-start-1 col-end-5 row-start-1 mt-36 self-end font-title text-9xl'>
                        <p class='text-c4p col-span-2 object-fill mb-5 uppercase'>Turn E-Waste</p>
                        <p class='text-white col-span-2 uppercase'>Into Opportunities</p>
                    </div>
                    <div className='mt-10 w-81 col-start-1 col-end-4 row-start-2 text-left text-white text-2xl'>
                        <p className='mb-10'>
                            We're on a mission to collect unused devices,
                            refurbishing what we can for communities and responsibly recycling the rest.
                        </p>
                        <p className='mb-20'> We're turning e-waste into tools for a sustainable future. </p>
                        <Link className='bg-c4p text-black text-3xl rounded p-3 pr-5 hover:bg-c4p-hover'>Schedule an electronic pickup</Link>
                    </div>
                </div>
            </div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/ewastedropoff/ewaste-bg.jpg')`}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                {/* <div class="ml-32 h-full grid grid-cols-2 grid-rows-2 justify-items-stretch"> */}
                <div className='grid grid-cols-4 grid-rows-6 h-full pt-10'>
                    {/* <div className='col-start-1 col-end-5 row-start-1 mt-36 self-end font-title text-9xl'>
                        <p class='text-c4p col-span-2 object-fill mb-5 uppercase'>Turn Electronic Waste</p>
                        <p class='text-white col-span-2 uppercase'>Into Opportunities</p>
                    </div>
                    <div className='mt-10 w-81 col-start-1 col-end-4 row-start-2 text-left text-white text-2xl'>
                        <p className='mb-10'>
                            6.9 million tons of electronic waste is generated each year in the US. 
                            Computers 4 People collects unused electronic devices and properly recycles or disposes of e-waste. 
                            Devices that can be refurbished are given back to communities in need, while materials - from non-donatable devices - 
                            like metal are recycled into new products and processed for reuse.
                        </p>
                        <p className='mb-20'> We're turning e-waste into tools for a sustainable future. </p>
                        <Link className='bg-c4p text-black text-3xl rounded p-3 pr-5 hover:bg-c4p-hover'>Schedule an electronic pickup</Link>
                    </div> */}
                    {/* <iframe aria-label='Donate Computers Today!' frameborder="0" style={{height:'100%', width:'99%'}} src='https://forms.zohopublic.com/Computers4People/form/ComputerDOnation/formperma/XJZv3iw51lSwx3q5uk__jm80Prad8oAU6C7DYZdtWH8'></iframe> */}
                    <iframe aria-label='Donate Computers Today!' style={{height: '90vh'}} className='col-span-6 md:col-span-2 row-start-1 row-span-5 w-full' src='https://forms.zohopublic.com/Computers4People/form/ComputerDOnation/formperma/XJZv3iw51lSwx3q5uk__jm80Prad8oAU6C7DYZdtWH8'></iframe>

                </div>
            </div>
            <div className='bg-cover p-10'>
                <div className='pl-14'>
                    <h2 className='text-7xl font-title mt-10'>GIVING UNUSED ELECTRONICS A NEW LIFE</h2>
                    <p className='text-3xl mt-5'>Someone's disregard electronics can become a lifeline for others.</p>
                </div>
                <div>
                    <InfoCard cards={cards}></InfoCard>
                </div>
            </div>
            <div className='bg-cover max-h-screen' style={{height:'60vh'}}>
                <div className='grid grid-rows-3 grid-cols-6 mt-20'>
                <img src="/refurbished/luis.png" alt="" className='col-span-3 row-start-1 row-span-2 justify-self-start pr-20' />
                    <div className='col-span-2 mt-10'>
                        <h2 className='text-5xl md:text-7xl font-title'>EASY AND CONVENIENT ELECTRONICS DROP OFF SITES IN YOUR COMMUNITY</h2>
                        <div className='text-xl md:text-2xl'>
                            <p className='my-5'>
                                Computers 4 People provices a hassle-free, complimentary services with
                                convenient drop-off points in NJ, NYC, and Massachusetts. Simply drop off
                                your e-waste, and we'll handle the rest for you.
                            </p>
                            <p>Tax receipts are provided upon request.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-cover mt-10" style={{height: "100vh"}}>
                <div className="mx-20 grid grid-cols-3 grid-rows-2 h-full">
                    <div className='self-center col-span-2'>
                        <h2 className="col-span-2 text-6xl font-sans font-bold mb-10">Ways to Get Involved</h2>
                        <p className="col-span-2 text-3xl ml-2"> Explore these ways to cultivate digital equity</p>
                    </div>
                    <div className='col-span-3'>
                        <IconCards className='mt-4 row-start-2 col-span-3' />
                    </div>
                </div>
            </div>
        </div>
    )
}
