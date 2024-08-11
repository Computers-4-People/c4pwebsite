import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
export default function Press() {
        const pressItems = [
            {
                image: '/press/kellyclarkson.png',
                title: 'College Student Refurbishes Thousands of Old Computers',
                date: 'November 9, 2023',
                description: 'College student refurbishes thousands of old computers for people in need.',
                link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
            },
            {
                image: '/press/kellyclarkson.png',
                title: 'College Student Refurbishes Thousands of Old Computers',
                date: 'November 9, 2023',
                description: 'College student refurbishes thousands of old computers for people in need.',
                link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
            },
            {
                image: '/press/kellyclarkson.png',
                title: 'College Student Refurbishes Thousands of Old Computers',
                date: 'November 9, 2023',
                description: 'College student refurbishes thousands of old computers for people in need.',
                link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
            },
            {
                image: '/press/kellyclarkson.png',
                title: 'College Student Refurbishes Thousands of Old Computers',
                date: 'November 9, 2023',
                description: 'College student refurbishes thousands of old computers for people in need.',
                link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
            }
        ];    
    return (
        <div className='font-sans overflow-x-hidden'>
        <div
            style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/press/pressbackground.jpg')`
            }}
            className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
        >
            <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                    <p className='text-c4p animate-fade-up'>DISCOVER OUR LATEST</p>
                    <p className='text-white animate-fade-up'>PRESS & MEDIA HIGHLIGHTS</p>
                </h1>
                <div className="col-start-1 md:col-end-4 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>
                        See how Computers 4 People is making headlines and driving change in digital equity.
                    </p>
                    <div className="flex flex-col md:flex-row">
                        <a href="https://charityquest.io/" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Access our press releases</a>
                        <Link 
                            to="/contact" 
                            className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                        >
                            View media coverage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-20">
            <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Explore our media highlights</h2>
            <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Discover how our work is making waves through news articles, interviews, and features across various media outlets.</p>
        </div>
        <div className="mt-60">
            <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Our Press Releases</h2>
            <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Discover our press releases featuring updates on new programs, fundraisers, grants and more.</p>
        </div>
            <div className="container mx-auto px-4 py-16">
                <PressCard pressItems={pressItems} />
            </div>
        </div>
        );
}
