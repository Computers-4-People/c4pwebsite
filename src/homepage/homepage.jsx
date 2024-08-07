 import React from "react";
import BackgroundImage from '../background.jpg';
// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function Homepage() {
    console.log(BackgroundImage);
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    return (
        <div className='font-sans'>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${BackgroundImage}')`}} className=" bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat ">
                <div class="ml-20 grid grid-cols-6 grid-rows-6 justify-items-stretch">
                    <div className='col-start-1 col-end-4 row-start-2 text-justify font-title text-8xl'>
                        <p class='text-[#0FE006] col-span-2 object-fill mb-5'>TRANSFORM A LIFE </p>
                        <p class='text-white col-span-2'>WITH TECHNOLOGY</p>
                    </div>
                    {/* <div className='mt-10 w-81 grid grid-cols-2 col-start-1 col-end-4 row-start-4 text-center text-xl gap-3'>
                        <Link className="bg-[#0FE006] h-10 rounded">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white text-white h-10'> Discover our programs </Link>
                    </div> */}
                    <div className='mt-10 row-start-3 col-span-4 row-span-2 flex flex-row justify-items-start flex-wrap text-center text-2xl w-128'>
                        <Link className="bg-[#0FE006] h-10 mr-3 h-11 rounded pt-1.5 px-4">🤍 Donate your ewaste</Link>
                        <Link className='border-2 rounded border-white h-11 text-white h-10 pt-1.5 px-4'> Discover our programs </Link>
                    </div>
                </div>
            </div>
            <div className='bg-cover h-1/4 bg-gray-900 text-white p-40 text-9xl text-center table-auto align-middle'>
                <p>10,000,000 hours of connectivity provided</p>
            </div>
            <div className='bg-cover h-screen text-black'>
                <h2 className='m-14 mt-20 text-5xl font-bold'>Be Part of the Change</h2>
                <div className='m-11 flex justify-start'>
                    {/* <img src={`../donation.jpg`} className='m-4 w-64 rounded-2xl hover:grayscale transition duration-400' /> */}
                    {/* <div className='text-white group m-4 w-64 rounded-2xl bg-cover bg-center relative' style={{ backgroundImage: "url('../donation.jpg')" }}>
                        <div className='absolute h-full bg-black bottom-0 top-auto left-2 -mb-12 group-hover:mb-1 transition-all duration-1000 overflow-hidden'>
                           <h3>TEST</h3>
                           <p>testtestsetstestsetsetsetsets</p>
                        </div>
                    </div> */}
                    {/* <div className='text-white group m-4 w-64 rounded-2xl bg-cover bg-center relative' style={{ backgroundImage: "url('../donation.jpg')" }}>
                        <div className='absolute bottom-0 h-0 left-2 w-full group-hover:h-full duration-1000 overflow-hidden'>
                           <div className='row-start-6 group-hover:row-start-1'>
                           <h3 className='font-bold text-xl'><p>Starts</p> <p>With a Donation</p></h3>
                            <p>testtestsetstestsetsetsetsets</p>
                           </div>
                        </div>
                    </div> */}
                    <div className='text-white group m-4 w-64 rounded-2xl bg-cover bg-center relative bg-gray' style={{ backgroundImage: "url('../donation.jpg')" }}>
                        <div className='absolute bottom-0 duration-1000 overflow-hidden ml-5'>
                           {/* <div className='row-start-6 group-hover:row-start-1'> */}
                           <h3 className='font-bold text-xl font-bold uppercase'><p className='text-[#0FE006]'>Starts</p> <p>With a Donation</p></h3>
                            <p className='h-2 left-2 w-11/12 group-hover:h-32 border-t-4 duration-500 text-sm'>Individuals and organizations donate their computers, tablets, keyboards and other electronic devices.</p>
                           {/* </div> */}
                        </div>
                    </div>
            {/* <div className='text-white group m-4 w-64 rounded-2xl bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: "url('../donation.jpg')" }}>
            <h3 className='relative bottom-0 left-2 font-bold text-xl'>
                <p>Starts</p>
                <p>With a Donation</p>
            </h3>
            <div className='absolute bottom-0 left-2 w-full group-hover:-translate-y-full transition-transform duration-1000'>
                <p>testtestsetstestsetsetsetsets</p>
            </div>
        </div> */}
                    {/* <div className='text-white group m-4 w-64 rounded-2xl bg-cover bg-center relative' style={{ backgroundImage: "url('../donation.jpg')" }}>
                        <div className='h-full static left-2 bottom-2 '>
                           <h3 className=''>TEST</h3>
                           <p className='transform translate-y-full group-hover:translate-y-1/4 transition-all duration-1000 overflow-hidden'>testtestsetstestsetsetsetsets</p>
                        </div>
                    </div> */}
                    {/* absolute bottom-2 left-2 top-auto  group-hover:top-0 group-hover:bottom-auto  */}
                    {/* <div className='group m-4 w-64 text-white rounded-2xl bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: "url('../donation.jpg')" }}>
                        <div className='absolute bottom-2 left-2 group-hover:top-2 group-hover:left-2 group-hover:bottom-auto transition-all duration-1000 ease-in-out'>
                            TEST
                        </div>
                    </div> */}
                            {/* <div className='group m-4 w-64 h-64 rounded-2xl bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: "url('../donation.jpg')" }}>
            <div className='absolute top-auto bottom-2 left-2 transition-all duration-500 ease-in-out group-hover:top-2 group-hover:bottom-auto'>
                Donation
            </div>
        </div> */}
                    {/* <div className='group m-4 w-64 h-64 rounded-2xl bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: "url('../donation.jpg')" }}>
            <div className='absolute bottom-2 left-2 transition-all duration-500 ease-in-out group-hover:top-2 group-hover:left-2 group-hover:bottom-auto'>
                Donation
            </div>
        </div> */}
                    {/* <div className='group m-4 w-64 h-64 rounded-2xl bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: "url('../donation.jpg')" }}>
            <p className='text-white text-lg font-bold absolute inset-0 flex items-center justify-center group-hover:top-2 group-hover:left-2 transition-all duration-400'>Donation</p>
        </div> */}
                    <img src='../refurbishment.jpg' className='m-4 w-64 object-cover object-center static rounded-2xl hover:grayscale transition duration-400'></img>
                    <img src='../recipient.png' className='m-4 w-64 rounded-2xl hover:grayscale transition duration-400' />
                    <img src="../catalyst.jpg" className='m-4 w-64 rounded-2xl hover:grayscale transition duration-400'/>
                </div>
            </div>
            <div className='h-screen text-black'>
                <h2 className="ml-14 mb-20 text-5xl font-bold">Give Unused Tech a Second Chance</h2>
                <div className='grid grid-rows-6 grid-cols-6'>
                    <img src="../secondchance.png" className='col-span-3 row-span-3'/>
                    <div className='col-start-4 col-end-6 row-start-2 row-end-2 text-center text-2xl'>
                        <p>Thanks to the [refurbished] laptop I received from </p> <p>Computers 4 People; I can now create artwork</p> <p>every night when I get home!</p>
                        <p className='text-right'>-Mallika</p>
                        {/* <div className='flex justify-evenly text-xl'>
                            <Link className='bg-[#0FE006] rounded'>🤍 Donate your ewaste</Link>
                            <Link>Become a Partner</Link>

                        </div> */}
                    </div>
                    <div className='grid grid-cols-2 col-start-4 col-end-6 row-start-3 text-center text-xl gap-3'>
                            <Link className='bg-[#0FE006] rounded h-14 pr-3 pt-3'>🤍 Donate your ewaste</Link>
                            <Link className='border-2 border-black rounded h-14 pr-1 pt-3'>Become a Partner</Link>
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