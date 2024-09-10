import React from "react";
import PressCard from '../components/presscard';
import Header from "../components/header";
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

export default function Team() {
    return (
        <div>
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/team/teambackground.JPG',
                titlePart1: 'FIND OUT WHO ARE',
                titlePart2: 'BEHIND THE SCENES',
                description: ' Meet the exceptional individuals leading our mission and creating transformative change in their communities—see how you can be a part of this impactful journey!',
                links: [{text: 'Meet the Team', clickAction: () => handleScroll("team")}, {text: 'Meet the Board', clickAction: () => handleScroll("board")}]
            }}/></div>
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