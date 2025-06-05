import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from '../components/header.jsx';
import Testimonial from "../components/testimonial.jsx";
export default function Programs() {
    const cards = [
        {
            titlePart1: "Distribution of",
            titlePart2: "Refurbished Devices",
            description: "We collect, professionally refurbish, and distribute donated devices to individuals and organizations in under-resourced communities across NYC, NJ, and MA. With the help of our partners, we've delivered thousands of computers to empower those in need.",
            image: "/Programs/distributioncomputer.jpg",
            alt: 'Teacher holding donated a computer with green tote bag from Computers 4 People.'
        },
        {
          titlePart1: "Affordable",
          titlePart2: "Internet Access",
          description: <p>We provide the most affordable internet access in the country through our new program, Shield. Shield ensures reliable access for education, work, and healthcare. Learn more <a className="text-c4p" href="/shield">here.</a></p>,
          image: "/Programs/acptent.jpg",
          alt: "Refurbished computers with the logo of Computers 4 People"
        },
        {
            titlePart1:"Foundational",
            titlePart2: "Digital Skills",
            description: "In partnership with non-profits, we hire local instructors to deliver digital skills training in multiple languages. These classes cover internet navigation, Google Workspace, and online safety, empowering participants with confidence for the digital age.",
            image:"/Programs/dsclasses.jpg",
            alt: 'Teenager volunteer refurbishing donated computers to provide them to people in need.'
        }
    ]
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
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Programs/Programs/unlocking_access_to_the_new_digital_world.jpg',
                titlePart1: 'Unlock Opportunities',
                titlePart2: 'with Our Programs',
                description: 'At Computers 4 People, our programs are tailored to bridge the digital divide and unlock new opportunities in underserved communities. Through refurbished devices, digital literacy education, and internet connectivity solutions, we make technology accessible for all.',
                links: [{text: 'Apply for a Computer', url: "/apply"}, {text: 'Digital Skills Classes', url: "/dsclasses"}]
                }} />

            <div className='h-full py-20'>
                <div className='ml-14'>
                    <h2 className='text-7xl font-subtitle'>Programs tailored to foster growth</h2>
                    <p className='text-2xl'>Our programs are designed to help you achieve full participation in the digital world</p>
                </div>
                <div>
                    <InfoCard cards={cards} />
                </div>
            </div>

            <Testimonial
  props={{
    title2: "How It Works",
    desc2: (
      <div className="text-lg md:text-lg leading-7 md:leading-8 lg:leading-7">
        For individuals, start by applying for a refurbished computer through our online application. Once approved, devices are provided through our partner organizations to ensure equitable access. <br/><br/>

        For Non-Profits, we offer opportunities to collaborate by bringing technology, training, and connectivity solutions to your community. Partners nominate recipients and host training sessions customized to meet the unique needs of their community.
      </div>
    ),
    image: "../partner/dvinekonektionevent.png",
    alt: `Computers 4 People distributing laptops at a partner organization`,
    links: [
      { text: "Apply for a Computer", url: "/apply" },
      { text: "Become a Non-Profit Partner", url: "/partner" },
    ],
  }}
/>

            <div className='h-full bg-cover p-20'>
                <div className=''>
                    <h2 className='text-7xl font-subtitle'>How to Get Involved</h2>
                    <p className='text-2xl'>Be part of Bridging the Digital Digital Divide</p>
                </div>
            </div>
            <div className="my-5 p-5 mb-20">
  <IconCards cards={iconsData} />
</div>
        </div>
    )
}