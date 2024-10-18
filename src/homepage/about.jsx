 import React from "react";
 import InfoCard from '../components/infocard.jsx';
 import IconCards from "../components/iconcards";
 import Header from "../components/header.jsx";
 import Testimonial from "../components/testimonial.jsx";

// import donation from '../donation.jpg';
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
export default function About() {
    //  absolute inset-x-20 inset-y-80 center
    //  p-60 pl-10 text-6xl font-bold flex-row
    // "text-2xl my-10 grid grid-cols-2 gap-4 rows-start-5"
    //'grid grid-cols-2 mb-4 col-span-4 rows-span-4'
    const cards = [
        {
            titlePart1: "Founded by",
            titlePart2: "A Teen Entrepreneur",
            description: "In 2019, at the age of 15, Dylan Zajac launched Computers 4 People, inspired by the lack of access to technology in underserved communities.",
            image: "../about/15-year-old.jpg"
        },
        {
            titlePart1: "To Bridge the Digital",
            titlePart2: "Gap across NJ & NYC",
            description: "In 2021, Computers 4 People opened its first office in Hoboken, NJ, and continued its first program: refurbishing and redistributing donated devices to people in need.",
            image: "../about/digital-gap.jpg"
        },
        {
            titlePart1:"Through Various",
            titlePart2:"Digital Programs",
            description:"In 2023, Computers 4 People team quadrupled and the organization added two more programs-digital skills classes and internet access-to better serve the communitiy's needs",
            image:"../about/digital-programs.jpg"
        },
        {
            titlePart1:"Computers 4 People",
            titlePart2:"is Serving 3 States",
            description:"In 2024, Computers 4 People opened a second office in Waltham, MA. This expansion allows us to bring our programs to underserved communities throughout the Bay State.",
            image:"/about/serving-3-states.jpg"
        },
        {
            titlePart1:"A Leading Force",
            titlePart2:"in the Northeast",
            description:"With significant advancements in digital equity and e-waste management, Computers 4 People has become a prominent advocate for tech access in the northeastern US.",
            image:"/about/leading-force.jpg"
        }
    ]
    
  const iconsData = [
    {
      title: "Become an Electronics Drop-off Site",
      image: "../maps.png",
      alt: "E-Waste Drop-off Site",
      link: "/ewastedropoff"
    },
    {
      title: "Sponsor Digital Access",
      image: "../handshake.png",
      alt: "Sponsor Digital Access",
      link: "/financialdonation"
    },
    {
      title: "Volunteer",
      image: "../hands.png",
      alt: "Volunteer",
      link: "/volunteer"
    }
  ];
    return (
        <div  id="main-content" className='font-sans'>
            <Header props={{
                bgImage: '/about/background.jpg',
                titlePart1: 'Unlocking the Digital',
                titlePart2: 'world. est. 2019',
                description: '',
                links: [{}]
                }} /> 
<div className='bg-cover bg-black p-16 text-white'>
  <ul className='flex flex-col md:flex-row justify-evenly text-center'>
    <li className='my-4 md:my-0 mx-5'><div className='text-6xl mb-3'>3,272</div><p className='text-3xl'>Computers Donated</p></li>
    <li className='my-4 md:my-0 mx-5'><div className='text-6xl mb-3'>46,538</div><p className='text-3xl'>Pounds of e-waste Recycled</p></li>
    <li className='my-4 md:my-0 mx-5'><div className='text-6xl mb-3'>213</div><p className='text-3xl'>Digital Skills Classes</p></li>
  </ul>
</div>
            
            <Testimonial props={{
                title2: 'Our Vision',
                desc2: 'A world where everyone has equal access to technology and its opportunities.',
                image: '../about/our_vision.png'
            }} />
            <Testimonial props={{
                title2: 'Our Mission',
                desc2: 'Unlock Access to the Digital World.',
                image: '../about/our_mission.png',
                side: 'right'
            }}/> 
            <div className='bg-cover text-black'>
                <h2 className='m-14 text-5xl'>Our History</h2>
                <InfoCard cards={cards}></InfoCard>
            </div>

            <div className="bg-cover mb-40 mt-10">
                <div className="mx-20 md:grid grid-cols-3 md:grid-rows-2 gap-5">
                    <h2 className="col-span-4 text-9xl font-title uppercase">How You Can Help</h2>
                    <p className="col-span-2 text-4xl ml-2">Discover How You Can Contribute to Digital Equity in Your Community</p>
                </div>
                <div className="mt-10">
                    <IconCards cards={iconsData} />
                    </div>
            </div>
        </div>
    )
}