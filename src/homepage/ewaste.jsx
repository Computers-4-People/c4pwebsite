import React from "react";
import { Link } from "react-router-dom";

export default function Ewaste () {
    return (
        <div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/about/serving-3-states.jpg')`}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                <div class="ml-32 h-full grid grid-cols-6 grid-rows-2 justify-items-stretch">
                    <div className='col-start-1 col-end-5 row-start-1 mt-36 self-end font-title text-9xl'>
                        <p class='text-c4p col-span-2 object-fill mb-5 uppercase'>Turn Electronic Waste</p>
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
            <div className='bg-cover h-screen'>
                <div>
                    <h2 className='text-3xl font-bold mt-10'>GIVING UNUSED ELECTRONICS A NEW LIFE</h2>
                    <p className='text-2xl'>Someone's disregard electronics can become a lifeline for others.</p>
                </div>
                <div>
                    <div className='m-11 flex justify-start h-96'>
                        <img src={`../refurbished/Images/donors.jpg`} className='m-4 w-56 rounded-2xl'/>
                        <img src='../refurbished/Images/ambasadors.jpg' className='m-4 w-56 object-cover object-center static rounded-2xl'></img>
                        <img src='../refurbished/Images/devices.JPG' className='m-4 w-56 rounded-2xl' />
                        <img src="../refurbished/Images/recipients.jpg" className='m-4 w-56 rounded-2xl'/>
                        <img src="../refurbished/Images/catalyst.png" className='m-4 w-56 rounded-2xl'/>
                    </div>      
                </div>
            </div>
            <div className='bg-cover h-screen'>
                <div className='grid grid-rows-6 grid-cols-6 mt-20'>
                <img src="../refurbished/Images/luis.png" alt="" className='col-span-3 row-start-1 row-span-2' />
                    <div className='col-span-2 mt-10'>
                        <h2 className='text-3xl font-bold'>EASY AND CONVENIENT ELECTRONICS DROP OFF SITES IN YOUR COMMUNITY</h2>
                        <p className='text-justify'>
                            E-waste recycling can be challenging with limited centers and sometimes associated fees.
                            Computers4People provides a hassle-free, complimentary, service with convenient
                            drop-off points in NJ, NYC, and Massachusetts. Simply drop off your e-waste,
                            and we'll handle the rest for you.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-cover h-screen">
                <div className="mx-20 grid grid-cols-3 grid-rows-2 gap-5">
                    <h2 className="col-span-2 text-6xl font-sans font-bold">Ways to Get Involved</h2>
                    <p className="col-span-2 text-3xl ml-2"> Explore these ways to cultivate digital equity</p>
                    <div className="mt-4 row-start-3 col-span-3 grid grid-cols-3 justify-items-stretch gap-28 h-80">
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10'src="../maps.png" />BECOME AN EWASTE DROP-OFF SITE</Link>
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className="mb-10" src="../handshake.png"></img>SPONSOR DIGITAL ACCESS</Link>
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10' src='../hands.png'></img>VOLUNTEER</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
