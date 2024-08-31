import React from "react";
import PressCard from '../components/presscard';
import { Link } from "react-router-dom";

const TeamCard = ({ name, title, company, photo }) => {
    return (
        <div className="flex flex-col border-2 border-white p-4">
            <img src={photo} alt={name} className="w-full h-48 object-cover mb-4" />
            <div className="flex-1 bg-white p-4 border-t-4 border-white">
                <h3 className="font-bold">{name}</h3>
                <p>{title}</p>
                <p>{company}</p>
            </div>
        </div>
    );
};

const boardMembers = [
    { id: 1, name: 'Sally Bowman', title: 'President', company: 'Co-President and Co-Founder, Metro Flood Defense', photo: 'Sally Bowman.png' },
    { id: 2, name: 'Greg Camas', title: 'Treasurer', company: '', photo: 'Greg Camas.png' },
    { id: 3, name: 'Paul Zajac', title: 'Vice President', company: 'Head of Investment Technology, Invesco', photo: 'Paul Zajac.png' },
    { id: 4, name: 'Sonia Vashi', title: 'Board Member', company: '', photo: 'Sonia Vashi.png' },
    { id: 5, name: 'Andrew Prodromos', title: 'Board Member', company: 'Chief Compliance Officer, Insight Partners', photo: 'Andrew Prodromos.png' },
    { id: 6, name: 'Jerome Abernathy', title: 'Board Member', company: 'President, Hoboken Public Library', photo: 'Jerome Abernathy.JPG' },
    { id: 7, name: 'David Neves', title: 'Board Member', company: 'VP Global Digital Marketing, PGIM', photo: 'David Neves.JPG' }
];
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

export default function Team() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/team/teambackground.JPG')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>FIND OUT WHO ARE</p>
                        <p className='text-white animate-fade-up'>BEHIND THE SCENES</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                            Meet the exceptional individuals leading our mission and creating transformative change in their communities—see how you can be a part of this impactful journey!
                        </p>
                        <div className="flex flex-col md:flex-row">
                            <Link to="/refurbished" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                                Meet the Team
                            </Link>
                            <Link to="/dsclasses" className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto">
                                Meet the Board
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-20 mt-20">
                <h2 className="text-9xl font-title uppercase">MISSION CONTROL</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <img src="Dylan Zajac.png" className="w-auto h-auto object-contain" alt="Dylan Zajac" />
                    <img src="Nichool Castro.png" className="w-auto h-auto object-contain" alt="Nichool Castro" />
                    <img src="devin monserrate.png" className="w-auto h-auto object-contain" alt="Devin Monserrate" />
                    <img src="David Kieser.png" className="w-auto h-auto object-contain" alt="David Kieser" />
                </div>
            </div>
            <div className="px-20 mt-20">
                <h2 className="text-9xl font-title uppercase">BOARD OF DIRECTORS</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    {boardMembers.map(member => (
                        <TeamCard key={member.id} name={member.name} title={member.title} company={member.company} photo={member.photo} />
                    ))}
                </div>
            </div>
            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Explore our media highlights</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Discover how our work is making waves through news articles, interviews, and features across various media outlets.</p>
            </div>
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>
        </div>
        
    );
}