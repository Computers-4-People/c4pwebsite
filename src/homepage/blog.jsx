import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
export default function Volunteer() {
    const pressItems1 = [
        {
            image: '/blog/blogstock.png',
            title: '5 Ways to Improve Your Slow Internet Connection',
            description: 'Struggling with slow internet? Try these simple tricks to fix it in seconds',
            link: ''
        },
        {
            image: '/blog/blogstock.png',
            title: '5 Ways to Improve Your Slow Internet Connection',
            description: 'Struggling with slow internet? Try these simple tricks to fix it in seconds',
            link: ''
        },
        {
            image: '/blog/blogstock.png',
            title: '5 Ways to Improve Your Slow Internet Connection',
            description: 'Struggling with slow internet? Try these simple tricks to fix it in seconds',
            link: ''
        },
        {
            image: '/blog/blogstock.png',
            title: '5 Ways to Improve Your Slow Internet Connection',
            description: 'Struggling with slow internet? Try these simple tricks to fix it in seconds',
            link: ''
        },
    ];
    return (
        <div  id="main-content" className='font-sans overflow-x-hidden'>
        <div
            style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/blog/blogbackground.png')`
            }}
            className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
        >
            <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                    <p className='text-c4p animate-fade-up'>5 WAYS TO IMPROVE</p>
                    <p className='text-white animate-fade-up'>YOUR INTERNET CONNECTION</p>
                </h1>
                <div className="col-start-1 md:col-end-4 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>
                       Struggling with slow internet? Try these simple tricks to fix it in seconds.
                        </p>
                    <div className="flex flex-col md:flex-row">
                        <Link to="/" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Continue Reading</Link>
                    </div>
                </div>
            </div>
        </div>
        <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">EXPLORE OUR EXPERT TIPS AND GUIDES</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Explore articles covering everything from practical guides to the latest digital equity news.</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>
        <div className='bg-cover font-sans justify-evenly px-4 mt-60 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Text Section */}
                <div className='flex flex-col text-left md:ml-20 mt-20'>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">Watch Our Latest Videos and tutorials on YouTube</h2>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>Check out our YouTube channel for digital skills classes, tutorials, and more—Computers 4 People On YouTube is an extension of our blog for deeper insights and practical tips. </p>
                    <div className="flex flex-col md:flex-row mt-10">
                        <Link to="https://www.youtube.com/@Computers4People" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Computers 4 People On YouTube</Link>
                    </div>
                </div>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../blog/blogphoto.png" alt="" className='w-full h-auto md:max-w-md' />
                </div>
            </div>
        </div>
        </div>
        )
    }