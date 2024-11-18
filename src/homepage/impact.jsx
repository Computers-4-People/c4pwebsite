import React from "react";
import { Link } from "react-router-dom";
import PressCard from '../components/presscard';
import Header from "../components/header";
import Testimonial from '../components/testimonial';
import CountUp from 'react-countup';
import { 
    FaDesktop, 
    FaWifi, 
    FaChalkboardTeacher, 
    FaRecycle, 
    FaUsers, 
    FaBriefcase, 
    FaStethoscope, 
    FaBook,
    FaGraduationCap, 
    FaDollarSign, 
    FaHeartbeat, 
    FaProjectDiagram, 
    FaStore,
    FaUserShield, 
    FaHome, 
    FaUserAlt, 
    FaUserFriends, 
    FaWheelchair, 
    FaPeopleCarry, 
    FaUserGraduate, 
    FaHandsHelping, 
    FaCity 
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Impact() {
    const pressItems1 = [
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2023',
            link: '/impact/2023impactreport.pdf'
        },
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2022',
        },
        {
            image: '/impact/impactreportbook.png',
            title: 'Impact Report 2021',
        }
    ];

    const impactMetrics = [
        {
            icon: <FaDesktop className="text-5xl text-c4p" />,
            label: "Computers Donated",
            value: 3607
        },
        {
            icon: <FaWifi className="text-5xl text-c4p" />,
            label: "Internet Hours Donated",
            value: 2014800,
            suffix: "+",
            unit: "Hours"
        },
        {
            icon: <FaChalkboardTeacher className="text-5xl text-c4p" />,
            label: "Digital Skills Classes Taught",
            value: 215
        },
        {
            icon: <FaRecycle className="text-5xl text-c4p" />,
            label: "E-Waste Recycled",
            value: 55907,
            unit: "Pounds"
        },
    ];

    const impactOutcomes = [
        {
            icon: <FaBriefcase className="text-5xl text-c4p" />,
            label: "Jobs Secured",
            value: 500
        },
        {
            icon: <FaGraduationCap className="text-5xl text-c4p" />,
            label: "Students Accessed",
            value: 2000
        },
        {
            icon: <FaDollarSign className="text-5xl text-c4p" />,
            label: "Economic Mobility",
            value: 300
        },
        {
            icon: <FaHeartbeat className="text-5xl text-c4p" />,
            label: "Accessed Telehealth",
            value: 1000
        },
        {
            icon: <FaProjectDiagram className="text-5xl text-c4p" />,
            label: "Educational Programs",
            value: 1500,
            unit: "Hours"
        },
        {
            icon: <FaHandsHelping className="text-5xl text-c4p" />,
            label: "Non-Profit Partners",
            value: 400
        },
        {
            icon: <FaStore className="text-5xl text-c4p" />,
            label: "Businesses Supported",
            value: 100
        },
        {
            icon: <FaHandsHelping className="text-5xl text-c4p" />,
            label: "Volunteer Hours",
            value: 5000,
            unit: "Hours"
        },
    ];

    const populationsServed = [
        {
            name: "Low-Income Families",
            icon: <FaHome className="text-4xl text-c4p" />
        },
        {
            name: "Veterans",
            icon: <FaUserShield className="text-4xl text-c4p" />
        },
        {
            name: "Unhoused Individuals",
            icon: <FaCity className="text-4xl text-c4p" />
        },
        {
            name: "Job Seekers",
            icon: <FaBriefcase className="text-4xl text-c4p" />
        },
        {
            name: "Single Parents",
            icon: <FaUserFriends className="text-4xl text-c4p" />
        },
        {
            name: "People with Disabilities",
            icon: <FaWheelchair className="text-4xl text-c4p" />
        },
        {
            name: "Refugees and Immigrants",
            icon: <FaPeopleCarry className="text-4xl text-c4p" />
        },
        {
            name: "Youth and Students",
            icon: <FaUserGraduate className="text-4xl text-c4p" />
        },
        {
            name: "Nonprofit Organizations",
            icon: <FaHandsHelping className="text-4xl text-c4p" />
        },
        {
            name: "Rural Communities",
            icon: <FaHome className="text-4xl text-c4p" />
        },
    ];

    const testimonials = [
        {
            quote: "I am tremendously grateful for the laptop donation. This gift has allowed me to accelerate my work and production. Thanks Computers4People!",
            date: "17-Nov-2024"
        },
        {
            quote: "Thank you for my computer. I really appreciate it. It's working nicely and I'm making progress.",
            date: "15-Nov-2024"
        },
        {
            quote: "This computer is much needed. I am about to retire and my income is limited. It has been a great help.",
            date: "11-Nov-2024"
        },
        {
            quote: "I just wanted to say a huge thank you for donating the computer. It's been a game-changer for me!",
            date: "08-Nov-2024"
        },
        {
            quote: "These computers are used by refugees that our organization works with. It is their lifeline to jobs, English lessons, medical appointments, and more.",
            date: "07-Nov-2024"
        },
        {
            quote: "Thank you greatly for the computers, dear donors! They have been of great support for my digital learning.",
            date: "01-Nov-2024"
        },
        {
            quote: "I am really grateful I got the opportunity to have a free computer. It has been a tremendous help for my college assignments.",
            date: "14-Oct-2024"
        },
        {
            quote: "Thank you for sending me my computer. I appreciate it very much.",
            date: "30-Oct-2024"
        },
        {
            quote: "These computers are helping me a lot. I'm trying to learn technical skills, surf, watch videos, and more.",
            date: "09-Nov-2024"
        },
        {
            quote: "I really needed a laptop for college. This year has been rough, and the laptop came in clutch. Thanks!",
            date: "06-Oct-2024"
        }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

    const impactAreas = {
        labels: ['Job Obtaining', 'Telehealth', 'Education', 'Community Engagement'],
        datasets: [
            {
                label: 'Impact in Hours',
                data: [1200, 800, 1500, 600],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            {/* Header Section */}
            <Header props={{
                bgImage: '/impact/impactbackground.png',
                titlePart1: 'Learn About the',
                titlePart2: `Impact We've Made`,
                description: `Dive into our Impact Reports to see how we've driven positive change and made a difference in the communities we serve.`,
                links: [
                    { text: 'Support Our Work', url: "/support" }, 
                    { text: 'Read our 2023 Impact Report', url: "/impact/2023impactreport.pdf" }
                ], 
            }} />

            {/* Testimonial Section */}
            <Testimonial props={{
                title2: `With you, we're making big strides`,
                desc2:
                    <div className='space-y-10'>
                        <p>
                            Technology is crucial for education, jobs, and connectivity, but the digital divide remains. At Computers 4 People, we maximize the impact of your donations by tackling e-waste and promoting digital inclusion through transforming discarded tech into valuable resources.
                        </p>
                        <p>
                            With our partners' support, we've efficiently refurbished and distributed thousands of computers, bridging gaps and creating opportunities for individuals and families.
                        </p>
                        <p>
                            Explore our latest Impact Report to see the measurable results of your contributions.
                        </p>
                    </div>,
                image: '../impact/impactreportbook.png'
            }} />

            {/* Impact Metrics Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl text-center font-bold mb-12">Our Impact in Numbers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {impactMetrics.map((metric, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="mb-4">
                                    {metric.icon}
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    <CountUp end={metric.value} duration={5} separator="," /> {metric.unit || ''}
                                </h3>
                                <p className="text-gray-700 mt-2">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Outcomes Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl text-center font-bold mb-12">Impact Outcomes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {impactOutcomes.map((outcome, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="mb-4">
                                    {outcome.icon}
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    <CountUp end={outcome.value} duration={5} separator="," /> {outcome.unit || ''}
                                </h3>
                                <p className="text-gray-700 mt-2">{outcome.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl text-center font-bold mb-12">Who We Serve</h2>
                    <div className="flex flex-wrap justify-center">
                        {populationsServed.map((population, index) => (
                            <div
                                key={index}
                                className="m-4 p-6 bg-white shadow-md rounded-lg flex flex-col items-center space-y-4 w-64 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                            >
                                {population.icon}
                                <span className="text-lg font-medium text-center">{population.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl text-center font-bold mb-12">What People Are Saying</h2>
                    <div className="max-w-3xl mx-auto">
                        <Slider {...sliderSettings}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="px-4">
                                    <div className="bg-white p-8 rounded-lg shadow-lg">
                                        <p className="text-lg italic text-gray-700">"{testimonial.quote}"</p>
                                        <p className="text-right mt-4 text-sm text-gray-500">— Anonymous</p>
                                        <p className="text-right text-xs text-gray-400">{testimonial.date}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Impact Reports Section */}
            <div id="media-highlights" className="mt-20">
                <h2 className="ml-14 text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6">OUR IMPACT REPORTS</h2>
                <p className='ml-14 text-black text-xl md:text-2xl mb-10'>Check out our impact reports to see how your support has made a difference</p>
            </div>

            {/* PressCard Section */}
            <div className="container mx-auto px-4 py-16 relative">
                <PressCard pressItems={pressItems1} />
            </div>

            {/* Call to Action Section */}
            <div className='min-h-screen text-black mb-20'>
                {/* Heading */}
                <h2 className="ml-6 mb-10 text-7xl text-center font-title mt-40">Give Disregarded Tech a Chance to Improve Lives</h2>

                {/* Content Wrapper */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                    {/* Image on the Left */}
                    <div className='flex justify-center'>
                        <img src="/impact/recipient.png" alt='Recipient' className='animate-fade-right animate-once h-auto max-w-full md:max-w-md' loading="lazy" />
                    </div>

                    {/* Quote and Buttons on the Right */}
                    <div>
                        <div className='bg-contain bg-top bg-no-repeat mb-6 md:mr-40 ' style={{ backgroundImage: "url('../quotes.png')" }}>
                            <p className='p-4 pl-0'>
                                "Fantastic! My new computer runs smoothly with excellent RAM, something my old one couldn't do. No more crashes during big projects or layout designs! It’s truly made a difference, saving me time and frustration. Thanks Computers 4 People!"<br /><br />- Anonymous
                            </p>
                        </div>

                        {/* Updated Button Section */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link to="/donate" className='bg-c4p rounded h-12 px-6 py-2 w-full md:w-auto flex items-center justify-center hover:bg-c4p-hover hover:text-white text-center'>
                                Donate Your Device
                            </Link>
                            <Link to="/support" className='border-2 border-black rounded h-12 px-6 py-2 w-full md:w-auto flex items-center justify-center hover:bg-black hover:text-white text-center'>
                                Make a Financial Contribution
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
