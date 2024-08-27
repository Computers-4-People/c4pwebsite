import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import IconCards from '../components/iconcards';
import InfoCard from "../components/infocard";
// import FrameWrapper from "../components/frameWrapper";
import Header from '../components/header';
import Testimonial from '../components/testimonial';

export default function Refurbished() {
    const cardsData = [
        {
          titlePart1: "Donors",
          titlePart2: "Schedule A Pickup",
          description: "Individuals and companies donate their devices to us and we partner with local organizations to redistribute them to the community.",
          image: "../refurbished/donors.jpg"
        },
        {
            titlePart1: "Individuals & Orgs",
            titlePart2: "Apply for a Device",
            description: "Individuals and companies donate their devices to us and we partner with local organizations to redistribute them to the community.",
            image: "../refurbished/ambasadors.jpg"
        },
        {
            titlePart1: "Devices",
            titlePart2: "Undergoes Refurbishing",
            description: "Computers 4 People refurbishes and cleans computers thoroughly to optimal condition.",
            image: "../refurbished/devices.jpg"
        },
        {
            titlePart1: "Recipients",
            titlePart2: "Recieve Devices",
            description: "Recipient receives an email when the computer is delivered to the sponsoring organization.",
            image: "../refurbished/recipients.jpg"
        },
        {
            titlePart1: "A Catalyst",
            titlePart2: "of Change Begins",
            description: "Computers 4 People follows up via email to see how the computer is enabling opportunities and gather feedback.",
            image: "../refurbished/catalyst.png"
        }
      ];
    return (
        <div className='font-sans overflow-x-hidden'>
            {/* <Header props={{
                bgImage: '/refurbished/refurbishedbackground.png',

                }}/> */}
        <div style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/refurbished/refurbishedbackground.png')`,
                height: '130vh'
            }}
            // className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            className="bg-cover h-screen bg-center bg-fixed bg-no-repeat"

        >
            {/* grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch */}
            <div className="px-4 sm:px-10 md:px-20 flex flex-col justify-center items-start h-full">
                <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                    <p className='text-c4p animate-fade-up'>UNLOCKING OPPORTUNITIES,</p>
                    <p className='text-white animate-fade-up'>ONE COMPUTER AT A TIME</p>
                </h1>
                <div className="col-start-1 md:col-end-4 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>
                       Computers 4 People works tirelessly to refurbish and deliver donated devices to those in need. Complete our 10-min application today!
                    </p>
                    <div className="flex flex-col md:flex-row">
                        <a href="" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto">Apply for a device</a>
                    </div>
                </div>
                {/* <FrameWrapper html={<iframe className='h-3/4 w-3/4'aria-label='Apply For Computers!' src='https://forms.zohopublic.com/Computers4People/form/ApplyForComputersTest/formperma/1-e5fhfxicw0ikW84mZKvSd_KU1E6onhRlxWy3W6Zyc'></iframe> */}
{/* }> */}
                    <iframe className='h-3/4 w-3/4'aria-label='Apply For Computers!' src='https://forms.zohopublic.com/Computers4People/form/ApplyForComputersTest/formperma/1-e5fhfxicw0ikW84mZKvSd_KU1E6onhRlxWy3W6Zyc'></iframe>
                {/* </FrameWrapper> */}

            </div>
            {/* <iframe aria-label='Apply For Computers!' frameborder="0" style={{height:'100%',width:'99%',border:'none'}} src='https://forms.zohopublic.com/Computers4People/form/ApplyForComputersTest/formperma/1-e5fhfxicw0ikW84mZKvSd_KU1E6onhRlxWy3W6Zyc'></iframe> */}
        </div>
        <Testimonial props={{
            title: 'Supporting Underserved Communities with Free Computers',
            description: <p className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7'>
            <a className="text-c4p" href="https://www.pewresearch.org/short-reads/2021/06/22/digital-divide-persists-even-as-americans-with-lower-incomes-make-gains-in-tech-adoption/">Forty-one percent of adults with lower incomes do not own a desktop or laptop computer</a>, limiting their access to economic, educational, and social opportunities. Computers 4 People provide refurbished laptops, desktops, all-in-one and tablets at no cost to individuals and organizations in need to help people grasp the resources at their disposal.
            </p>,
            image: '../refurbished/recipient.jpg',
            side: 'left'
            }}/> 
        <div className='bg-cover font-sans justify-evenly px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../refurbished/recipient.jpg" alt="" className='h-auto w-auto md:max-w-full md:ml-60' />
                </div>
                {/* Text Section */}
                <div className='flex flex-col justify-center'>
                    <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                    Supporting Underserved Communities<br/> with Free Computers
                    </h2>
                    <p className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7'>
                    <a className="text-c4p" href="https://www.pewresearch.org/short-reads/2021/06/22/digital-divide-persists-even-as-americans-with-lower-incomes-make-gains-in-tech-adoption/">Forty-one percent of adults with lower incomes do not own a desktop or laptop computer</a>, limiting their access to economic, educational, and social opportunities. Computers 4 People provide refurbished laptops, desktops, all-in-one and tablets at no cost to individuals and organizations in need to help people grasp the resources at their disposal.
                    </p>
                </div>
            </div>
        </div>
        <div className='bg-cover font-sans justify-evenly px-4 mt-40 mb-20 sm:px-10 md:px-20 py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {/* Text Section */}
                <div className='flex flex-col text-left md:ml-20'>
                <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                Our devices come from<br/> generous donors
                    </h2>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                    Our devices come from individuals and organizations who generously provide their unused equipment to us. Each device undergoes a meticulous refurbishing and data wiping process to be in optimal condition before being matched to a recipient. Due to our reliance on donated devices, there may be a waiting period for computer applicants.</p>
                </div>
                {/* Image Section */}
                <div className='flex justify-center'>
                    <img src="../refurbished/luis.png" alt="" className='h-auto md:max-w-full md:mr-40' />
                </div>
                <div className='flex flex-col text-left md:ml-20 mt-40'>
                <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                Giving Devices a Second Chance
                    </h2>
                    <p className='text-lg md:text-xl leading-7 md:leading-8 lg:leading-10'>
                    Each device has a unique story before reaching its new home.</p>
                </div>
            </div>
            <div>
                <InfoCard cards={cardsData}/>
            </div>
            </div>
        </div>
        )
    }