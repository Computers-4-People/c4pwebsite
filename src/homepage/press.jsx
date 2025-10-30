import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import Header from "../components/header";
import ImageMarquee from "../components/imagemarquee";

export default function Press() {
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

    const pressItems2 = [
        {
            image: '/press/shieldsnap.png ',
            title: 'Amid Federal Shutdown, This Nonprofit is Offering Free Internet for SNAP Recipients Nationwide',
            date: 'Oct 30, 2025',
            link: 'https://www.prnewswire.com/news-releases/amid-federal-shutdown-this-nonprofit-is-offering-free-internet-for-snap-recipients-nationwide-302600493.html?tc=eml_cleartime'
        },
        {
            image: '/press/shield5g.png ',
            title: 'Mission Telecom, Computers 4 People Partner on Low-Cost Hotspot, Access',
            date: 'June 5, 2025',
            link: 'https://www.telecompetitor.com/mission-telecom-computers-4-people-partner-on-low-cost-hotspot-access/'
        },
        {
            image: '/press/C4P Nationwide Dropoff.png ',
            title: 'Computers 4 People Launches Nationwide Device Donation Program',
            date: 'April 22, 2025',
            link: '/press/Nationwide Laptop Donation Program - Press Release.pdf'
        },
        {
            image: '/press/IMG_9672.jpeg',
            title: 'Computers 4 People has partnered with Dvine Konektion and 123 Recycling to distribute  150 refurbished computers to families in West New York, NJ',
            date: 'November 5, 2024',
            link: '/press/recyclingtechgivinghope.pdf'
        },
        {
            image: '/press/bofapr.jpeg',
            title: 'Computers 4 People Receives Grant from Bank of America to Support their Digital Equity Programs',
            date: 'July 30, 2024',
            link: '/press/c4pbofapr2024.pdf'
        },
        {
            image: '/press/collegebound2024.jpeg',
            title: 'Computers 4 People College-Bound Laptop Scholarship Donates 176 Laptops to Students',
            date: 'June 13, 2024',
            link: '/press/collegebound2024.pdf'
        },
        {
            image: '/press/mayorofwaltham.jpeg',
            title: 'Computers 4 People Officially Opens New Waltham, MA Office',
            date: 'April 30, 2024',
            link: '/press/maofficelaunchpr.pdf'
        },
        {
            image: '/press/collegebound2023pr.jpeg',
            title: '​Computers 4 People Donates 220 Laptops to College-Bound Students',
            date: 'July 20, 2023',
            link: '/press/collegeboundpr2023.pdf'
        },
        {
            image: '/press/collegebound2023.jpeg',
            title: 'College-Bound Laptop Scholarship 2023',
            date: 'November 20, 2022',
            link: '/press/collegebound2023prapp.pdf'
        },
        {
            image: '/press/collegebound2022.jpg',
            title: 'Computers 4 People is sending 110 students to college this fall with one less major expense.',
            date: 'July 20, 2022',
            link: '/press/collegebound2022.pdf'
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
            title: "Fund Digital Access",
            image: "../Homepage/funddigitalaccess.jpg",
            alt: "Sponsor Digital Access",
            link: "/support"
          },
          {
            title: "Donate Computers",
            image: "../Homepage/donatecomputersicon.jpg",
            alt: "Donate your computers today",
            link: "/donate"
          },
          {
            title: "Volunteer",
            image: "../Homepage/volunteericon.jpg",
            alt: "Volunteer",
            link: "/volunteer"
          }
      ];
      const partnerLogos = [
        { src: "../logos/insidernj.png", alt: "Insider NJ" },
        { src: "../logos/forbes.png", alt: "Forbes" },
        { src: "../logos/abc7.png", alt: "ABC 7" },
        { src: "../logos/yahoonews.png", alt: "Yahoo News" },
        { src: "../logos/nbc.png", alt: "NBC" },
        { src: "../logos/hobokengirl.png", alt: "Hoboken Girl" },
        { src: "../logos/patch.png", alt: "Patch" },
        { src: "../logos/kellyclarksonshow.png", alt: "Kelly Clarkson Show" },
        { src: "../logos/benzinga.png", alt: "Benzinga" },
        { src: "../logos/roinj.png", alt: "ROI-NJ" },
        { src: "../logos/entrepreneur.png", alt: "Entrepreneur" },
        { src: "../logos/hudsonreporter.png", alt: "Hudson Reporter" },
        { src: "../logos/msn.png", alt: "MSN" },
        { src: "../logos/tapinto.png", alt: "TapInto" },
        { src: "../logos/bloomberg.png", alt: "Bloomberg" },
        { src: "../logos/news12.png", alt: "News 12" },
        { src: "../logos/jewishstandard.png", alt: "Jewish Standard" },
        { src: "../logos/aol.png", alt: "AOL" },
        { src: "../logos/hudsoncounty.png", alt: "Hudson County" },
        { src: "../logos/biztech.png", alt: "BizTech" },
        { src: "../logos/fox.png", alt: "Fox" },
        { src: "../logos/69wfmz.png", alt: "69 WFMZ" },
        { src: "../logos/broadwayworld.png", alt: "Broadway World" },
        { src: "../logos/bbj.png", alt: "BBJ" },
        { src: "../logos/eagletribune.png", alt: "Eagle Tribune" },
        { src: "../logos/govtech.png", alt: "GovTech" },
        { src: "../logos/njdigest.png", alt: "NJ Digest" },
        { src: "../logos/poetsandquants.png", alt: "Poets and Quants" },
        { src: "../logos/intheknow.png", alt: "In The Know" },
        { src: "../logos/njcom.png", alt: "NJ.com" },
        { src: "../logos/pbsnews.png", alt: "PBS News" },
        { src: "../logos/babsonthought.png", alt: "Babson Thought" }
      ];
      
    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/press/pressbackground.jpeg',
                titlePart1: 'Discover Our Latest',
                titlePart2: 'Press & Media Highlights',
                description: 'From local stories to national headlines, see how Computers 4 People is empowering individuals with technology and creating opportunities through digital access.',
                links: [{text: 'View media coverage', clickAction: () => handleScroll("media-highlights")}, {text: 'Access our press releases', clickAction: () => handleScroll("press-releases")}]
            }}/>
             <div className="m-10"><ImageMarquee
                     images={partnerLogos}
                     title="You May Have Seen Us..."
                   />
                   </div>

            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 mt-20 mb-4 text-7xl font-subtitle text-gray">Explore our media highlights</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Discover how our work is making waves through news articles, interviews, and features across various media outlets.</p>
            </div>
            <div className="container mx-auto px-4 relative">
                <PressCard pressItems={pressItems1} />
            </div>
            <div id="press-releases" className="">
                <h2 className="ml-14  mb-4 text-7xl font-subtitle text-gray">Our Press Releases</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Discover our press releases featuring updates on new programs, fundraisers, grants and more.</p>
            </div>
            <div className="container mx-auto px-4 relative">
                <PressCard pressItems={pressItems2} />
            </div>
            <div className="mb-20 ">
            <h2 className="ml-14 mb-4 text-7xl font-subtitle text-gray">Other Ways You can Contribute</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-20'>Explore these opportunities to foster digital equity</p>
            </div>
            <div className="my-5 p-5 mb-20">
  <IconCards cards={iconsData} />
    </div>
    </div>
    );
}
