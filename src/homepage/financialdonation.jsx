 import React from "react";
// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function Financialdonation() {
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    return (
        <div className='font-sans'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpg')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="flex flex-col justify-center h-full w-1/2 space-y-5 p-14">
                    <div className='col-start-1 col-end-4 row-start-2 font-title text-8xl'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>Take Action</p>
                        <p class='text-white col-span-2'>Become a Champion</p>
                    </div>
                    <p className='text-white text-lg'>Every person deserves equitable access to opportunities. Your 
                        donation helps provide essential tech access and make a
                        difference for those in need.
                    </p>
                    <div className='mt-10 row-start-3 col-span-4 row-span-2 flex flex-row justify-items-start flex-wrap text-center text-xl w-128'>
                        <Link className="bg-[#0FE006] h-10 mr-3 h-11 rounded-md pt-2 px-5">Donate Monetarily</Link>
                        <Link className='border-2 rounded-md border-white h-11 text-white h-10 pt-1.5 px-5'>Donate a Device</Link>
                    </div>
                </div>
            </div>
            <div className='h-full text-black py-20 px-10'>
                <div className='grid grid-rows-1 grid-cols-6 relative px-20'>
                        <div className='col-span-4 flex flex-col justify-center space-y-10 my-10'>
                            <h2 className='text-5xl font-title'>Computers 4 People is transforming lives through technology every day</h2>
                            <p className='text-xl mt-5'>
                                By providing the tools needed to unlock countless opportunities, Computers 4 People
                                is changing the course of thosuands of lives.
                            </p>
                            <p className='text-xl'>
                                Discover the impact we've made.
                            </p>
                            <Link className='text-xl bg-c4p hover:bg-c4p-hover w-1/4 py-2 px-8 rounded text-center'>Learn More</Link>
                        </div>
                        <img src="../Financial Contribution/Computers 4 People Recipient with Refurbished Laptop.png" className='col-start-5 col-span-2 row-span-3 animate-fade-right animate-once' />
                    </div>
             </div>
        </div>
    )
}