import React from "react";
import BackgroundImage from '../ewaste-bg.jpg'
import { Link } from "react-router-dom";

export default function Ewaste () {
    return (
        <div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${BackgroundImage}')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 font-family: ui-monospace text-6xl grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-1 mt-36 text-justify font-bold'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>TURN E-WASTE </p>
                        <p class='text-white col-span-2'>INTO OPPORTUNITIES</p>
                    </div>
                    <div className='mt-10 w-81 col-start-1 col-end-4 row-start-2 text-left text-white text-xl gap-3'>
                        <p>
                            Join us in tackling a staggering issue: every year, the US generates 6.9 million tons
                            of electronic waste. At Computers4People, we're on a mission to make a
                            difference. We collect unused devices, refurbishing what we can for communities
                            in need and responsibly recycle the rest, turning e-waste into new products for a
                            sustainable future.
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-cover h-screen'>
                <div>
                    <h2 className='text-3xl font-bold'>GIVING UNUSED ELECTRONICS A NEW LIFE</h2>
                    <p className='text-2xl'>Someone's disregard electronics can become a lifeline for others.</p>
                </div>
                <div>
                    
                </div>
            </div>
            <div className='bg-cover h-screen'>
                <h2 className='text-3xl font-bold'>EASY AND CONVENIENT ELECTRONICS DROP OFF SITES IN YOUR COMMUNITY</h2>
                <p className='text-justify'>
                    E-waste recycling can be challenging with limited centers and sometimes associated fees.
                    Computers4People provides a hassle-free, complimentary, service with convenient
                    drop-off points in NJ, NYC, and Massachusetts. Simply drop off your e-waste,
                    and we'll handle the rest for you.
                </p>
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
