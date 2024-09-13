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
    const iconsData = [
        {
          title: "BECOME AN EWASTE DROP-OFF SITE",
          image: "../maps.png",
          alt: "E-Waste Drop-off Site",
          link: "/ewastedropoff"
        },
        {
          title: "SPONSOR DIGITAL ACCESS",
          image: "../handshake.png",
          alt: "Sponsor Digital Access",
          link: "/financialdonation"
        },
        {
          title: "VOLUNTEER",
          image: "../hands.png",
          alt: "Volunteer",
          link: "/volunteer"
        }
      ];
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/press/pressbackground.jpg',
                titlePart1: 'Discover Our Latest',
                titlePart2: 'Press & Media Highlights',
                description: 'See how Computers 4 People is making headlines and driving change and digital equity.',
                links: [{text: 'Access our press releases', clickAction: () => handleScroll("press-releases")}, {text: 'View media coverage', clickAction: () => handleScroll("media-highlights")}]
            }}/>

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
            </div>
            <div className="my-5 p-5 mt-20">
  <IconCards cards={iconsData} />
</div>
        </div>
    );
}
