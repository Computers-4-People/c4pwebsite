import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

export default function Hotspot() {
    const scrollToForm = () => {
        const formSection = document.getElementById("inquiry-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
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

    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/Contact Us/contactbackground.png',
                titlePart1: 'Unlocking Opportunities,',
                titlePart2: `ONE CONNECTION AT A TIME`,
                description: '',
                links: [{text: 'Apply for a Hotspot', clickAction: () => handleScroll("hotspot-form")}]
            }}/>
            <div style={{backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.3) 60%, transparent 100%),url('/refurbished/refurbishedbackground.png')`}} className=" bg-cover bg-fixed h-screen bg-center bg-no-repeat ">
                <div className='grid grid-cols-4 grid-rows-6 h-full pt-10'>
                    <iframe id="hotspot-form" aria-label='Hotspot Application' style={{height: '90vh'}} className='col-span-6 md:col-span-2 row-start-1 row-span-5 w-full' src='https://forms.zohopublic.com/Computers4People/form/Hotspot2024Draft/formperma/O4b84XQEgAkGoxlKQL-tCYDf1kqU4nzORnvem_gy55M'></iframe>

                </div>
            </div>
        </div>
    );
}
