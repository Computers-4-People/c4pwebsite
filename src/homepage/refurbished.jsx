import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from '../background.jpg';

export default function Refurbished() {
    return (
        <div>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${BackgroundImage}')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 font-family: ui-monospace font-bold text-6xl grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-2 text-justify'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>UNLOCKING</p>
                        <p class='text-white col-span-2'>DIGITAL OPPORTUNITIES</p>
                    </div>
                    <div className='mt-10 w-81 grid grid-cols-2 col-start-1 row-start-3 col-end-4 text-center text-sm text-white gap-3'>
                        {/* <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link> */}
                            Millions cannot fully participate in the digital age because they do not own a device.
                            Computers4People works tirelessly to refurbish donated computers and tablets to give
                            to those in need, ensuring equitable digital access for everyone.
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    Supporing Underserved Communities with free computers
                </h2>
                <p>Forty-one percent of adults with lower incomes do not own a desktop or laptop computer,
                    limiting their access to economic, educational, and social opportunities.
                    Computers4People provides refurbished laptops, desktops, all-in-ones, and tablets at
                    no cost to individuals and organizations in need to help people grasp the resources
                    at their disposal.
                </p>
            </div>
            <div>
                <h2>Our Devices come from Generous Donors</h2>
                <p>Our devices come from individuals and organizations who generously
                    provide their unused equipment to us. Each device undergoes a meticulous
                    refurbishing and data wiping process to be in optimal condition before being
                    matched to a recipient. Due to our reliance on donated devices, there may be
                    a waiting period for computer applicants.
                </p>
            </div>
            <div>
                <h2>Giving Devices a Second Chance</h2>
                <p>Each device has a unique story before reaching its new home.</p>
                <div>

                </div>
            </div>
            <div>
                <h2>About our devices</h2>
                <p>Our computers and tablets are digital tools in an optimal condition.</p>
                <div className="mt-4 row-start-3 col-span-3 grid grid-cols-3 justify-items-stretch gap-28 h-80">
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10'src="../maps.png" />BECOME AN EWASTE DROP-OFF SITE</Link>
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className="mb-10" src="../handshake.png"></img>SPONSOR DIGITAL ACCESS</Link>
                        <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"> <img className='mb-10' src='../hands.png'></img>VOLUNTEER</Link>
                    </div>
            </div>
            
        </div>
    )
}