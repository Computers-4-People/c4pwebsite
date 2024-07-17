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
        </div>
    )
}