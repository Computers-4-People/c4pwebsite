import React from "react";
import BackgroundImage from '../background.jpg'
import { Link } from "react-router-dom";

export default function Ewaste () {
    return (
        <div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${BackgroundImage}')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 font-family: ui-monospace font-bold text-6xl grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-3 text-justify'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>TRANSFORM A LIFE </p>
                        <p class='text-white col-span-2'>WITH TECHNOLOGY</p>
                    </div>
                    <div className='mt-10 w-81 grid grid-cols-2 col-start-1 col-end-4 row-start-4 text-center text-xl gap-3'>
                        <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link>
                    </div>
                </div>
            </div>
            <div className='bg-cover h-screen'>
                <h2>GIVING UNUSED ELECTRONICS A NEW LIFE</h2>
                <p>Someone's disregard electronics can become a lifeline for others.</p>
                <dv>

                </dv>
            </div>
            <div className='bg-cover h-screen'>
                <h2>EASY AND CONVENIENT ELECTRONICS DROP OFF SITES IN YOUR COMMUNITY</h2>
                <p>
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
