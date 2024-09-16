import React from "react";
import PressCard from '../components/presscard';
import Header from "../components/header";
import TeamGrid from '../components/teamcard';

const teamMembers = [
    {name: 'Sally Bowman', title: 'President', company: 'Metro Flood Defense', photo: 'Sally Bowman.png' },
    {name: 'Greg Camas', title: 'Treasurer', company: '', photo: 'Greg Camas.png' },
    {name: 'Paul Zajac', title: 'Vice President', company: 'Invesco', photo: 'Paul Zajac.png' },    
    {name: 'Andrew Prodromos', title: 'Board Member', company: 'Insight Partners', photo: 'Andrew Prodromos.png' },
    {name: 'Jerome Abernathy', title: 'Board Member', company: 'Hoboken Public Library', photo: 'Jerome Abernathy.png' },
    {name: 'David Neves', title: 'Board Member', company: 'PGIM', photo: 'David Neves.png' }
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
        image: '/press/forbesteens.PNG',
        title: 'Teens Teaming With Teens To Create A Better World',
        date: 'May 16, 2024',
        description: 'Forbes',
        link: 'https://www.forbes.com/sites/katevitasek/2024/05/16/teens-teaming-with-teens-to-create-a-better-world/'
    },
    {
        image: '/press/whiteboard.JPG',
        title: 'Babson student expands nonprofit that refurbishes computers',
        date: 'April 30, 2024',
        description: 'BostInno',
        link: 'https://www.bizjournals.com/boston/inno/stories/news/2024/04/30/baboon-computers4people-babson.html'
    },
    {
        image: '/press/comcastnewsmakers.PNG',
        title: 'A Nonprofit is Closing the Digital Divide and Reducing E-Waste',
        date: 'August 5, 2024',
        description: 'Comcast Newsmakers',
        link: 'https://comcastnewsmakers.com/Videos/2024/8/5/A-Nonprofit-is-Closing-the-Digital-Divide-and-Reducing-E-Waste'
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

export default function Team() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/team/teambackground.JPG',
                titlePart1: 'FIND OUT WHO ARE',
                titlePart2: 'BEHIND THE SCENES',
                description: 'Meet the exceptional individuals leading our mission and creating transformative change in their communities—see how you can be a part of this impactful journey!',
                links: [
                    {text: 'Meet the Team', clickAction: () => handleScroll("team")}, 
                    {text: 'Meet the Board', clickAction: () => handleScroll("board")}
                ]
            }} />

            <div id="team" className="px-20 mt-20">
                <h2 className="text-9xl font-title uppercase">MISSION CONTROL</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <img src="Dylan Zajac.png" className="w-auto h-auto object-contain" alt="Dylan Zajac" />
                    <img src="Nichool Castro.png" className="w-auto h-auto object-contain" alt="Nichool Castro" />
                    <img src="devin monserrate.png" className="w-auto h-auto object-contain" alt="Devin Monserrate" />
                    <img src="David Kieser.png" className="w-auto h-auto object-contain" alt="David Kieser" />
                </div>
            </div>

            <div id="board" className="px-20 mt-20">
                <h2 className="text-9xl font-title uppercase">BOARD OF DIRECTORS</h2>
                <div className="container mx-auto">
      <TeamGrid teamMembers={teamMembers} />
    </div>
            </div>

            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 mt-20 mb-4 text-6xl font-bold text-gray">Explore our media highlights</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Discover how our work is making waves through news articles, interviews, and features across various media outlets.</p>
            </div>

            <div className="mb-40">
                <PressCard pressItems={pressItems1} />
            </div>
        </div>
    );
}
