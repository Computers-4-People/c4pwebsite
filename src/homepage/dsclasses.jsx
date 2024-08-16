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
        
                </div>
                </div>
            </div>

            <div className='h-full bg-cover px-20 pb-10 space-y-10'>
                <h2>Explore our current digital skills courses</h2>
                <p>Click to learn more about each course's curriculum and eligibility</p>
                <div className='shadow-2xl rounded-xl grid grid-cols-6 grid-rows-1 gap-3' style={{}}>
                    <img src="../Programs/Digital Skills/Axel_Insternational_Volunteer_Refurbishing_Computers_Building_PC.jpg" alt=""
                    className='object-scale-down h-full col-span-6 md:col-span-2 p-3' style={{}} />
                    <div className='col-span-6 md:col-start-3 md:col-span-3 text-xl space-y-5 text-justify m-5'>
                        <h3 className='text-4xl font-bold text-center'>PC Building Classes</h3>
                        <p>Computers 4 People's PC Building Classes offer teenagers an opportunity
                            to delve into the world of technology through a comprehensive and entirely
                            free 2-hour class.
                        </p>
                        <p>Students will be equipped with essential skills that will not only
                            broaden their horizons but also prepare them for a tech-driven future.
                        </p>
                        <p>For ages 13-18</p>
                    </div>
                </div>

                <div className='shadow-2xl rounded-xl grid grid-cols-6 grid-rows-1 gap-3'>
                    <img src="../Programs/Digital Skills/Digital_Literacy_Class_Community_Access_Computers_4 People.jpg" alt="" className='object-scale-down h-full col-span-6 md:col-span-2 p-3' />
                    <div className='col-span-6 md:col-start-3 md:col-span-3 text-xl space-y-5 text-justify m-5'>
                        <h3 className='text-4xl font-bold text-center'>Digital Skills/Literacy Classes</h3>
                        <p>Our classes teach the foundations of digital skills and literacy,
                            including hardware, software, email, Google Suite, and more.
                        </p>
                        <p>For all ages.</p>
                        <p>In-person instruction.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}