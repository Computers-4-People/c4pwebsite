 import React from "react";
 import InfoCard from '../components/infocard.jsx';
 import Header from "../components/header.jsx";
 import Testimonial from "../components/testimonial.jsx";

// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function About() {
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    const cards = [
        {
            titlePart1: "Founded by",
            titlePart2: "A 15-year-old",
            description: "In 2019, Dylan Zajac founded Computers 4 People after witnessing the lack of acess to technology in under-resourced communities",
            image: "../about/15-year-old.jpg"
        },
        {
            titlePart1: "To Bridge the Digital",
            titlePart2: "Gap across NJ & NYC",
            description: "In 2021, Computers 4 People opened its first office in Hoboken, NJ, and continued its first program: refurbishing and redistributing donated devices to people in need.",
            image: "../about/digital-gap.jpg"
        },
        {
            titlePart1:"Through Various",
            titlePart2:"Digital Programs",
            description:"In 2023, Computers 4 People team quadrupled and the organization added two more programs-digital skills classes and internet access-to better serve the communitiy's needs",
            image:"../about/digital-programs.jpg"
        },
        {
            titlePart1:"Computers 4 People",
            titlePart2:"is Serving 3 States",
            description:"In 2024, Computers 4 People opened a second office in Waltham, MA. This expansion allows us to bring our programs to underserved communities throughout the Bay State.",
            image:"serving-3-states.jpg"
        },
        {
            titlePart1:"A Leading Force",
            titlePart2:"in the Northeast",
            description:"With significant advancements in digital equity and e-waste management, Computers 4 People has become a prominent advocate for tech access in the northeastern US.",
            image:"leading-force.jpg"
        }
    ]
    return (
        <div className='font-sans'>
            <Header props={{
                bgImage: '/about/background.jpg',
                titlePart1: 'Unlocking the Digital',
                titlePart2: 'world. est. 2019',
                description: ''
                }} /> 
            <div className='bg-cover bg-black p-16 text-white'>
                <ul className='flex flex-row justify-evenly text-center flex-wrap'>
                    <li><div className='text-6xl mb-3'>2,196</div><p className='text-3xl'>Computers Donated</p></li>
                    <li><div className='text-6xl mb-3'>46,538</div><p className='text-3xl'>Pounds of Ewaste Recycled</p></li>
                    <li><div className='text-6xl mb-3'>1,489,200</div><p className='text-3xl'>Hours of Internet Donated</p></li>
                    <li><div className='text-6xl mb-3'>156</div><p className='text-3xl'>Digital Skills Classes</p></li>
                </ul>
            </div>
            
            <Testimonial props={{
                title2: 'Our Vision',
                desc2: 'A digitally inclusive world where technology bridges divides and a future where every person, regardless of their background or resources, has equal and meaningful access to the digital world',
                image: '../about/our_vision.png'
            }} />
            <Testimonial props={{
                title2: 'Our Mission',
                desc2: 'To bridge the digital divide by repurosing e-waste into educational tools, ensuring equal access to technology for all.',
                image: '../about/our_mission.png',
                side: 'right'
            }}/> 
            <div className='bg-cover text-black'>
                <h2 className='m-14 text-5xl'>Our History</h2>
                <InfoCard cards={cards}></InfoCard>
            </div>

            <div className="bg-cover h-screen">
                <div className="mx-20 grid grid-cols-3 grid-rows-2 gap-5">
                    <h2 className="col-span-2 text-9xl font-title uppercase">How You Can Help</h2>
                    <p className="col-span-2 text-4xl ml-2">Discover How You Can Contribute to Digital Equity in Your Community</p>
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