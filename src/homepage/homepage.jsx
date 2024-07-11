import React from "react";
import BackgroundImage from '../background.jpg';
// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
export default function Homepage() {
    console.log(BackgroundImage);
    return (
        <div>
            <div style={{backgroundImage: `url('${BackgroundImage}')`}} className="bg-gradient-to-r from-indigo-500 to-transparent bg-cover h-screen bg-center bg-cover bg-relative bg-local bg-no-repeat">
                <div class="font-mono text-justify absolute inset-x-20 inset-y-80 center text-8xl flex-row">
                    <div class='text-green-800'>TRANSFORM A LIFE</div>
                    <div class='text-white'>WITH TECHNOLOGY</div>
                    <div text className="text-2xl">
                        <Link className="bg-green-500 rounded">🤍 Donate your ewaste</Link>
                        <Link> Discover our programs </Link>
                    </div>
                </div>
            </div>
            <div className='bg-cover h-1/4 bg-gray-900 text-white p-40 text-9xl text-center table-auto align-middle'>
                <p>10,000,000 hours of connectivity provided</p>
            </div>
            <div className='bg-cover h-screen text-black grid-rows-2'>
                <h2 className='m-14 mt-20 text-5xl font-bold'>Be Part of the Change</h2>
                <div className='m-11 flex justify-start'>
                    <img src={`../donation.jpg`} className='m-4 w-64 rounded-2xl'/>
                    <img src='../refurbishment.jpg' className='m-4 w-64 object-fit rounded-2xl'></img>
                </div>
            </div>
            <div className='h-screen text-black'>
                <h2>Give Unused Tech a Second Chance</h2>
                <p>Thanks to the [refurbished] laptop i received from Computers 4 People; I can now create artwork every night when I get home!</p>
                <p>-Mallika</p>
            </div>
        </div>
    )
}