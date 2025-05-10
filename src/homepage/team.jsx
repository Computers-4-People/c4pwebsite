import React from "react";
import PressCard from "../components/presscard";
import Header from "../components/header";
import TeamGrid from "../components/teamcard";

// Mission Control Team Members
const missionControlMembers = [
  {
    name: "Dylan Zajac",
    title: "Founder & Executive Director",
    photo: "DylanZajac.jpeg",
    link: "https://www.linkedin.com/in/dylanzajac/",
  },
  {
    name: "Bárbara Cristina De Souza Pinto",
    title: "Program Manager MA",
    photo: "Barbara.jpg",
    link: "https://www.linkedin.com/in/barbaraspinto/",
  },
  {
    name: "Devin Monserrate",
    title: "Program Manager NJ/NYC",
    photo: "DevinMonserrate.jpeg",
    link: "https://www.linkedin.com/in/devin-monserrate21/",
  },
  {
    name: "Hector Ramos",
    title: "Computer Donation Supervisor NJ/NYC",
    photo: "HectorRamos.jpeg",
    link: "",
  },
  {
    name: "Elmehdi Ghardi",
    title: "Ambassador MA (Logistics)",
    photo: "ElmehdiGhardi.jpeg",
    link: "https://www.linkedin.com/in/elmehdi-ghardi-6b73a1233/",
  },
  {
    name: "Arnold Ssemuyaga",
    title: "Ambassador MA (Tech)",
    photo: "ArnoldSsemuyaga.jpeg",
    link: "https://www.linkedin.com/in/arnold-ssemuyaga-012581264/",
  }
];

// Board of Directors Members
const teamMembers = [
  { 
    name: "Sally Bowman", 
    title: "President", 
    company: "Metro Flood Defense", 
    photo: "SallyBowman.jpeg",
    link: "https://www.linkedin.com/in/sally-bowman-4883a0ba/"
  },
  { 
    name: "Greg Camas", 
    title: "Treasurer", 
    photo: "GregCamas.jpeg", 
    link: "https://www.linkedin.com/in/gregcamas/" 
  },
  { 
    name: "Paul Zajac", 
    title: "Vice President", 
    company: "Invesco", 
    photo: "PaulZajac.jpeg",
    link: "https://www.linkedin.com/in/paul-zajac-b964495/"
  },
  { 
    name: "Andrew Prodromos", 
    title: "Board Member", 
    company: "Insight Partners", 
    photo: "AndrewProdromos.png",
    link: "https://www.linkedin.com/in/andrew-prodromos-583a254/"
  },
  { 
    name: "Jerome Abernathy", 
    title: "Board Member", 
    company: "Hoboken Public Library", 
    photo: "JeromeAbernathy.jpeg",
    link: "https://www.linkedin.com/in/jerome-abernathy-ph-d-5a5a79/" 
  },
  { 
    name: "David Neves", 
    title: "Board Member", 
    company: "PGIM", 
    photo: "DavidNeves.jpeg",
    link: "https://www.linkedin.com/in/david-neves-digital-marketing-executive/"
  },
  { 
    name: "Michele Schueli", 
    title: "Board Member", 
    company: "ARMYN Capital", 
    photo: "micheleschueli.jpeg",
    link: "https://www.linkedin.com/in/michele2992/"
  },
  { 
    name: "Joanne Oplustil", 
    title: "Board Member", 
    company: "CAMBA/CAMBA Housing Ventures", 
    photo: "joanneoplustil.png",
    link: "https://www.linkedin.com/in/joanne-oplustil-281966ab/"
  },
];

const pressItems1 = [
  {
      image: '/press/dylanforbes.png',
      title: 'Dylan Zajac, Forbes 30 Under 30',
      date: 'December 20, 2024',
      description: 'Forbes',
      link: 'https://www.forbes.com/profile/dylan-zajac/'
  },
  {
      image: '/press/entrepreneur.jpg',
      title: 'At Age 15, He Used Facebook Marketplace to Start a Side Hustle — Then It Became Something Much Bigger: Raised Over $1.6 Million',
      date: 'December 9, 2024',
      description: 'Entrepreneur',
      link: 'https://www.entrepreneur.com/starting-a-business/high-school-side-hustle-leads-to-over-16-million-raised/484045'
  },
  {
      image: '/press/kellyclarkson.jpeg',
      title: 'College Student Refurbishes Thousands of Old Computers',
      date: 'November 9, 2023',
      description: 'The Kelly Clarkson Show',
      link: 'https://www.youtube.com/watch?v=6IxUYncb8OE&t=281s'
  },
  {
      image: '/press/forbesteens.jpeg',
      title: 'Teens Teaming With Teens To Create A Better World',
      date: 'May 16, 2024',
      description: 'Forbes',
      link: 'https://www.forbes.com/sites/katevitasek/2024/05/16/teens-teaming-with-teens-to-create-a-better-world/'
  },
  {
      image: '/press/whiteboard.jpeg',
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
  const offset = 100;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export default function Team() {
  return (
    <div id="main-content" className="font-sans overflow-x-hidden">
      <Header
        props={{
          bgImage: "/team/teambackground.jpeg",
          titlePart1: "FIND OUT WHO ARE",
          titlePart2: "BEHIND THE SCENES",
          links: [
            { text: "Meet the Team", clickAction: () => handleScroll("team") },
            { text: "Meet the Board", clickAction: () => handleScroll("board") },
          ],
        }}
      />

      <div id="team" className="px-4 sm:px-6 md:px-10 lg:px-20 mt-20">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-subtitle uppercase">MISSION CONTROL</h2>
        <div className="mt-8">
          <TeamGrid teamMembers={missionControlMembers} />
        </div>
      </div>

      <div id="board" className="px-4 sm:px-6 md:px-10 lg:px-20 mt-20">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-subtitle uppercase">BOARD OF DIRECTORS</h2>
        <div className="mt-8">
          <TeamGrid teamMembers={teamMembers} />
        </div>
      </div>

      <div id="media-highlights" className="mt-20 px-4 sm:px-6 md:px-10">
        <h2 className="mt-20 mb-4 text-4xl sm:text-5xl lg:text-7xl font-subtitle text-gray">
          Explore our media highlights
        </h2>
        <p className="font-paragraph text-black text-lg sm:text-xl md:text-2xl mb-10">
          Discover how our work is making waves through news articles,
          interviews, and features across various media outlets.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-10 mb-40">
        <PressCard pressItems={pressItems1} />
      </div>
    </div>
  );
}
