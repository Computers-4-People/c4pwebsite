import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

const handleScroll = (id) => {
    const element = document.getElementById(id);
    const offset = 100;  // Adjust this value to leave space above the h1
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
};

export default function DSClasses() {
    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Programs/Digital Skills/Digital_Skills_Classes_Community_Access.jpeg',
                titlePart1: 'ACQUIRE THE FOUNDATIONAL',
                titlePart2: 'SKILLS TO THRIVE DIGITALLY',
                description: 'From foundational digital literacy courses for all ages to specialized PC building courses for teenagers and digital skills classes in Arabic, our curriculum caters to diverse learning needs.',
                links: [{text: 'Discover our Courses', clickAction: () => handleScroll("digital-classes")}]
            }}
            />

                <Testimonial props={{
                    title2: 'Collaborating with organizations to offer free digital skills classes to people in need',
                    desc2: `We collaborate with organizations like RiseBoro, Community Access, Jersey City Housing Authority, and the Hoboken Public Library to deliver digital literacy courses to under-resourced communities. Our classes are held across New York City and northern New Jersey. If your organization is interested in hosting a digital skills class, please reach out to us, we'd love to partner with you.`,
                    image: '../Programs/Digital Skills/Refurbished_Computers_Donation_Dylan_Zajac_ .jpeg',
                    alt: 'Recipient receiving refurbished, donated laptops.'
                }}/>
            <div className='h-full bg-cover px-20 pb-10 space-y-10'>
                <div id="digital-classes">
                    <h2 className='text-6xl font-subtitle '>Explore our current digital skills courses</h2>
                </div>
                <div className='shadow-xl rounded-xl grid grid-cols-6 grid-rows-1 gap-3' style={{}}>
                    <img src="../Programs/Digital Skills/Axel_Insternational_Volunteer_Refurbishing_Computers_Building_PC.jpeg" alt="Young adult building a pc from scratch."
                    className='object-scale-down h-full col-span-6 md:col-span-2 p-3' style={{}} />
                    <div className='col-span-6 md:col-start-3 md:col-span-3 text-xl space-y-5 text-justify m-5'>
                        <h3 className='text-4xl font-subtitle text-center'>PC Building Classes</h3>
                        <p>Computers 4 People's PC Building Classes offer teenagers an opportunity
                            to delve into the world of technology through a comprehensive and entirely
                            free 2-hour class.
                        </p>
                        <p>Students will be equipped with essential skills that will not only
                            broaden their horizons but also prepare them for a tech-driven future.
                        </p>
                        <p>For ages 13-18.</p>
                    </div>
                </div>

                <div className='shadow-xl rounded-xl grid grid-cols-6 grid-rows-1 gap-3'>
                    <img src="../Programs/Digital Skills/Digital_Literacy_Class_Community_Access_Computers_4 People.jpeg" alt="Digital Skills Instructor Explaining to Connect to Wifi  on a laptop" className='object-scale-down h-full col-span-6 md:col-span-2 p-3' />
                    <div className='col-span-6 md:col-start-3 md:col-span-3 text-xl space-y-5 text-justify m-5'>
                        <h3 className='text-4xl font-subtitle text-center'>Digital Skills/Literacy Classes</h3>
                        <p>Our classes teach the foundations of digital skills and literacy,
                            including hardware, software, email, Google Suite, and more.
                        </p>
                        <p>For all ages.</p>
                        <p>In-person instruction.</p>
                    </div>
                </div>
            </div>

            <div className='h-full text-black py-20 px-10'>
                <div className='grid grid-rows-1 grid-cols-6 relative'>
                        <div className='z-10 col-start-1 col-span-4 row-start-1 self-center text-xl bg-top bg-no-repeat pl-12'>
                            <h3 className='text-5xl font-subtitle'>A 3-month program to equip people with the skills needed to navigate the digital world</h3>
                            <p className='text-xl mt-5'>
                                Our foundational digital skills curriculum spans 14 weeks of in-person instruction.
                                Upon completion of the course, students receive a certificate and gain access to dozens of
                                resources that will help them continue their digital skills journey.
                            </p>
                        </div>
                        <img src="../Programs/Digital Skills/PC_Building_Classes_Teenager_Course_Completion.jpeg" className='col-start-5 col-span-2 row-span-3 animate-fade-right animate-once' alt='Teenagers smiling and holding a refurbished desktop'/>
                    </div>
             </div>
             {/* <div className='h-full'> */}
                {/* <div className='grid grid-rows-1 grid-cols-6 px-20'>
                    <img src="../Programs/Digital Skills/Digital_Literacy_Classes_Footer.jpeg" alt="" 
                    className='col-span-2'/>
                    <div className='col-span-4 flex flex-col justify-center text-xl space-y-5'>
                        <h2 className='text-7xl font-subtitle'>Watch our latest videos and tutorials on youtube</h2>
                        <p>Check out our YouTube channel for digital skills classes, tutorials, and more!</p>
                        <a href="https://youtube.com/@computers4people?feature=shared"
                        className='border-2 rounded text-center border-black w-1/3'>Learn More</a>
                    </div>
                </div> */}
             {/* </div> */}
        </div>
    )
}