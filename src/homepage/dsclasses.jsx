import React from "react";
import { Link } from "react-router-dom";

export default function DSClasses () {
    return (
        <div className='animate-fade-up animate-once animate-duration-500'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/homepage/background.jpeg')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 font-family: ui-monospace font-bold text-6xl grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-5 row-start-2 text-justify'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>ACQUIRE THE FOUNDATIONAL SKILLS</p>
                        <p class='text-white col-span-2'>NEEDED TO THRIVE DIGITALLY</p>
                    </div>
                    <div className='mt-10 w-81 grid grid-cols-2 col-start-1 col-end-4 row-start-4 text-center text-xl gap-3'>
                        <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link>
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
            <div className='bg-cover h-screen'
            ></div>
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
        </div>
    )
}