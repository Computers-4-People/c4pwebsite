 import React from "react";
 import InfoCard from '../components/infocard.jsx'

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
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/about/background.jpg')`}} className=" bg-cover h-screen bg-center bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 h-full grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-3 text-justify font-title text-8xl uppercase'>
                        <p class='text-c4p col-span-2 object-fill mb-5'>Unlocking the digital</p>
                        <p class='text-white col-span-2'>world. est. 2019</p>
                    </div>
                    {/* <div className='mt-10 w-81 grid grid-cols-2 col-start-1 col-end-4 row-start-4 text-center text-xl gap-3'>
                        <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link>
                    </div> */}
                </div>
            </div>
            <div className='bg-cover bg-black p-16 text-white'>
                <ul className='flex flex-row justify-evenly text-center flex-wrap'>
                    <li><div className='text-6xl mb-3'>2,196</div><p className='text-3xl'>Computers Donated</p></li>
                    <li><div className='text-6xl mb-3'>46,538</div><p className='text-3xl'>Pounds of Ewaste Recycled</p></li>
                    <li><div className='text-6xl mb-3'>1,489,200</div><p className='text-3xl'>Hours of Internet Donated</p></li>
                    <li><div className='text-6xl mb-3'>156</div><p className='text-3xl'>Digital Skills Classes</p></li>
                </ul>
            </div>
            <div className='bg-cover h-screen font-sans'>
                <div className='grid grid-rows-1 grid-cols-6 mt-20 align-items-center'>
                {/* <div className='flex flex-row'> */}
                <img src="../about/our_vision.png" alt="" className='col-span-3 row-start-1 row-span-2' />
                    <div className='col-span-2 row-start-1 flex flex-col  justify-center ml-10 mb-14'>
                        <h2 className='text-6xl font-bold uppercase'>Our Vision</h2>
                        <p className='text-4xl text-justify leading-10 mt-6'>
                            A digitally inclusive world where technology bridges divides and a future where every person, 
                            regardless of their background or resources,
                             has equal and meaningful access to the digital world
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-cover h-screen text-black'>
                
                <InfoCard cards={cards}></InfoCard>
            </div>

            <div className='h-screen text-black'>
                <h2 className="ml-14 mb-20 text-5xl font-bold">Give Unused Tech a Second Chance</h2>
                <div className='grid grid-rows-6 grid-cols-6 relative'>
                    <img src="../secondchance.png" className='col-span-3 row-span-3'/>
                <div className='absolute inset-0 col-start-4 col-end-6 row-start-1 row-end-4 bg-contain bg-top bg-no-repeat' style={{ backgroundImage: "url('../quotes.png')" }} />
                    <div className='z-10 col-start-4 col-end-6 row-start-2 row-end-2 text-center text-xl bg-contain bg-top bg-no-repeat'>
                        <p >Thanks to the [refurbished] laptop I received from Computers 4 People; I can now create artwork every night when I get home!</p>
                        <p className='text-right italic'>-Mallika</p>
                    </div>
                    <div className='grid grid-cols-2 col-start-4 col-end-6 row-start-3 items-center text-center text-xl gap-3'>
                            <Link className='bg-[#0FE006] rounded h-12 pr-3 pt-2.5'>🤍 Donate your ewaste</Link>
                            <Link className='border-2 border-black rounded h-12 pr-1 pt-2.5'>Become a Partner</Link>
                    </div>
                </div>
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
            <div className='bg-cover'>
                <Carosel></Carosel>
            </div>
        </div>
    )
}