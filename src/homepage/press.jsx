import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import Header from "../components/header";

export default function Press() {
    const pressItems1 = [
        {
            image: '/press/kellyclarkson.png',
            title: 'College Student Refurbishes Thousands of Old Computers',
            date: 'November 9, 2023',
            description: 'The Kelly Clarkson Show',
            link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
        },
        {
            image: '/press/forbesteens.png',
            title: 'Teens Teaming With Teens To Create A Better World',
            date: 'May 16, 2024',
            description: 'Forbes',
            link: 'https://www.forbes.com/sites/katevitasek/2024/05/16/teens-teaming-with-teens-to-create-a-better-world/'
        },
        {
            image: '/press/whiteboard.jpg',
            title: 'Babson student expands nonprofit that refurbishes computers',
            date: 'April 30, 2024',
            description: 'BostInno',
            link: 'https://www.bizjournals.com/boston/inno/stories/news/2024/04/30/baboon-computers4people-babson.html'
        },
        {
            image: '/press/comcastnewsmakers.png',
            title: 'A Nonprofit is Closing the Digital Divide and Reducing E-Waste',
            date: 'August 5, 2024',
            description: 'Comcast Newsmakers',
            link: 'https://comcastnewsmakers.com/Videos/2024/8/5/A-Nonprofit-is-Closing-the-Digital-Divide-and-Reducing-E-Waste'
        },
    ];

    const pressItems2 = [
        {
            image: '/press/Girls_Computers.png',
            title: 'Computers 4 People Receives Grant from Bank of America to Support their Digital Equity Programs',
            date: 'July 30, 2024',
            link: 'https://www.computers4people.org/uploads/5/4/8/7/54870129/final.c4p_bofa_grant_press_release_7.19.24.docx.pdf'
        },
        {
            image: '/press/Girls_Computers.png',
            title: 'Computers 4 People College-Bound Laptop Scholarship Donates 176 Laptops to Students',
            date: 'June 13, 2024',
            link: 'https://www.computers4people.org/uploads/5/4/8/7/54870129/final.c4p_bofa_grant_press_release_7.19.24.docx.pdf'
        },
        {
            image: '/press/Girls_Computers.png',
            title: 'Computers 4 People Officially Opens New Waltham, MA Office',
            date: 'April 30, 2024',
            link: 'https://www.computers4people.org/uploads/5/4/8/7/54870129/final.c4p_bofa_grant_press_release_7.19.24.docx.pdf'
        },
        {
            image: '/press/Girls_Computers.png',
            title: '​Computers 4 People Donates 220 Laptops to College-Bound Students',
            date: 'July 20, 2023',
            link: 'https://www.computers4people.org/uploads/5/4/8/7/54870129/final.c4p_bofa_grant_press_release_7.19.24.docx.pdf'
        },
    ];

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

    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/press/pressbackground.jpg',
                titlePart1: 'Discover Our Latest',
                titlePart2: 'Press & Media Highlights',
                description: 'See how Computers 4 People is making headlines and driving change and digital equity.',
                links: [{text: 'Access our press releases', clickAction: () => handleScroll("press-releases")}, {text: 'View media coverage', clickAction: () => handleScroll("media-highlights")}]
            }}/> 
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/press/pressbackground.jpg')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>DISCOVER OUR LATEST</p>
                        <p className='text-white animate-fade-up'>PRESS & MEDIA HIGHLIGHTS</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                            See how Computers 4 People is making headlines and driving change in digital equity.
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <button
                                onClick={() => handleScroll("press-releases")}
                                className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Access our press releases
                            </button>
                            <button
                                onClick={() => handleScroll("media-highlights")}
                                className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                            >
                                View media coverage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Explore our media highlights</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Discover how our work is making waves through news articles, interviews, and features across various media outlets.</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>
            <div id="press-releases" className="mt-40">
                <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Our Press Releases</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Discover our press releases featuring updates on new programs, fundraisers, grants and more.</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems2} />
            </div>
            <div className="mb-20 mx-20">
            <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Other Ways You can Contribute</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Explore these opportunities to foster digital equity</p>
            <IconCards />  {/* Use the IconCards component here */}
            </div>
        </div>
    );
}
