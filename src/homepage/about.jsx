 import React, { useState, useEffect } from "react";
 import InfoCard from '../components/infocard.jsx';
 import IconCards from "../components/iconcards";
 import Header from "../components/header.jsx";
 import Testimonial from "../components/testimonial.jsx";
 import axios from 'axios';

// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function About() {
    const [stats, setStats] = useState({
        computersDonated: 5542,
        poundsRecycled: 69748
    });
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/stats`);
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Keep default values if fetch fails
            setLoading(false);
        }
    };
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    const cards = [
        {
            titlePart1: "Launched by a",
            titlePart2: "Teen Visionary",
            description: "In 2019, 15-year-old Dylan Zajac founded Computers 4 People to tackle the lack of access to technology in underserved communities, starting with just a handful of donated devices.",
            image: "../about/teen.jpg",
        },
        {
            titlePart1: "Closing the Digital",
            titlePart2: "Divide in NJ & NYC",
            description: "In 2021, Computers 4 People opened its first office in Hoboken, NJ. The organization’s mission to refurbish and redistribute devices quickly gained traction, serving hundreds of individuals in need.",
            image: "../about/njoffice.jpg",
        },
        {
            titlePart1: "Expanding with",
            titlePart2: "New Programs",
            description: "By 2023, the team had quadrupled in size and introduced digital skills training and mobile hotspot distribution, addressing critical barriers to digital access for communities.",
            image: "../about/newprograms.jpg",
        },
        {
            titlePart1: "Reaching New",
            titlePart2: "Communities",
            description: "In 2024, Computers 4 People began scaling to new states and picking up nationwide, extending its impact to underserved communities across the country while strengthening its mission to bridge the digital divide.",
            image: "/about/maoffice.jpg",
        },
        {
            titlePart1: "Today's",
            titlePart2: "Impact",
            description: "Today, Computers 4 People is a leader in the Northeast, providing access to technology, reducing e-waste, and championing digital access for thousands of individuals and families.",
            image: "/about/sustainability.jpg ",
        },
    ];
    
    
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
    return (
        <div  id="main-content" className='font-sans'>
            <Header props={{
                bgImage: '/about/background.jpeg',
                titlePart1: 'Unlocking the Digital',
                titlePart2: 'world. est. 2019',
                description: '',
                links: [{}]
                }} /> 
<div className='bg-cover bg-black p-16 text-white'>
  <p className='text-center text-sm text-gray-400 mb-4'>Stats are live</p>
  <ul className='flex flex-col md:flex-row justify-evenly text-center'>
    <li className='my-4 md:my-0 mx-5'>
      <div className='text-6xl mb-3'>
        {loading ? (
          <div className="inline-flex gap-2">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>•</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>•</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>•</span>
          </div>
        ) : stats.computersDonated.toLocaleString()}
      </div>
      <p className='text-3xl'>Computers Donated</p>
    </li>
    <li className='my-4 md:my-0 mx-5'>
      <div className='text-6xl mb-3'>
        {loading ? (
          <div className="inline-flex gap-2">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>•</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>•</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>•</span>
          </div>
        ) : stats.poundsRecycled.toLocaleString()}
      </div>
      <p className='text-3xl'>Pounds of e-waste Recycled</p>
    </li>
    <li className='my-4 md:my-0 mx-5'>
      <div className='text-6xl mb-3'>261</div>
      <p className='text-3xl'>Digital Skills Classes</p>
    </li>
  </ul>
</div>
            
            <Testimonial props={{
                title2: 'Our Vision',
                desc2: 'A world where everyone has equal access to technology and its opportunities.',
                image: '../about/our_vision.jpeg'
            }} />
            <Testimonial props={{
                title2: 'Our Mission',
                desc2: 'We unlock access to the digital world by refurbishing donated devices, teaching essential digital skills, and improving connectivity to bridge the digital divide and create opportunities for individuals and communities to thrive in the digital age.',
                image: '../about/missionstatement.png',
                side: 'right'
            }}/> 
            <div className='bg-cover text-black'>
                <h2 className='m-14 font-subtitle text-7xl'>Our History</h2>
                <InfoCard cards={cards}></InfoCard>
            </div>

            <div className="bg-cover mb-40">
                <div className="mx-20 md:grid grid-cols-3 md:grid-rows-2 gap-5">
                    <h2 className="col-span-4 text-7xl font-subtitle uppercase">How You Can Help</h2>
                    <p className="col-span-2 text-2xl">Discover How You Can Contribute to Digital Access in Your Community</p>
                </div>
                <div className="mt-10">
                    <IconCards cards={iconsData} />
                </div>
            </div>
        </div>
    )
}