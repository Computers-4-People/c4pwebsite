import React from "react";
import { Link } from "react-router-dom";
export default function DSClasses() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/Programs/Digital Skills/Digital_Skills_Classes_Community_Access.jpg')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>ACQUIRE THE FOUNDATIONAL</p>
                        <p className='text-white animate-fade-up'>SKILLS TO THRIVE DIGITALLY</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                        From foundational digital literacy courses for all ages to specialized PC building courses for teenagers and digital skills classes in Arabic, our curriculum caters to diverse learning needs.
                        </p>
                        <Link 
                            to="/ewaste" 
                            className="block md:inline-block text-center text-xl animate-fade-up bg-c4p h-11 rounded-md pt-2 px-7 hover:bg-c4p-hover hover:text-white"
                        >
                            Discover our courses
                        </Link>
                    </div>
                </div>
                
            </div>
            <div>
            <div className='h-full text-black py-20'>
            <div className='grid grid-rows-2 grid-cols-6 relative'>
                <img src="../Programs/Digital Skills/Refurbished_Computers_Donation_Dylan_Zajac_.png" className=' col-span-2 row-span-3 animate-fade-right animate-once' />
                <div className='z-10 col-start-3 col-span-4 row-start-1 self-end text-xl bg-top bg-no-repeat pl-12'>
                    <h3 className='text-5xl font-title'>Collaborating with organizations to offer free digital skills classes to people in need</h3>
                    <p className='text-2xl'>We collaborate with organizations like RiseBoro, Community Access, Jersey City Housing Authority, and the Hoboken Public Library to deliver
                        digital literacy courses to under-resourced communities. Our classes are held across New York City and northern New Jersey. If your organization is interested in
                        hosting a digital skills class, please reach out to us-we'd love to partner with you.
                    </p>
                </div>
        
                <div className='grid grid-cols-2 col-start-3 col-end-6 row-start-2 self-start mt-4 items-center text-center text-xl gap-3 z-20 px-12'>
                        <Link to="/ewaste" className='bg-c4p rounded h-12 pr-3 pt-2.5 hover:bg-c4p-hover hover:text-white'>Apply for a computer</Link>
                        <Link to="/partner" className='border-2 border-black rounded h-12 pr-1 pt-2.5 hover:bg-black hover:text-white'>Enroll in a digital class</Link>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}