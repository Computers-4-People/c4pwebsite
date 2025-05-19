import React from "react";
import { Link } from "react-router-dom";
import DonationProgressBar from '../components/DonationProgressBar';
import Header from '../components/header';

const scrollToForm = () => {
    document.getElementById("donate-form").scrollIntoView({ behavior: "smooth" });
};

export default function Support() {
    return (
        <div id="main-content">
            <div className='font-sans'>
                <Header props={{
                    bgImage: '/Financial Contribution/Computers 4 People Fundraiser Recipient of Refurbished Computer Testimony.jpeg',
                    titlePart1: 'Take Action',
                    titlePart2: 'Become a Champion',
                    description: 'Every person deserves access to opportunities. Your donation helps provide essential tech access.',
                    links: [{ text: 'Donate Monetarily', clickAction: scrollToForm }, { text: 'Donate a Device', url: '/donate' }]
                }} />
            </div>
            <div className="bg-white text-black py-20 px-6 md:px-20 text-left max-w-5xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">A Note from Dylan Zajac</h2>
                <p className="text-md md:text-lg">
                    I started Computers 4 People when I was 15, just picking up old devices and fixing them in my bedroom. I couldn't stop thinking about how many people were missing out just because they didn’t have a computer.
                </p>
                <p className="text-md md:text-lg">
                    Since then, we’ve donated thousands of computers, delivered over a million hours of internet access, and reached people across New Jersey, New York City, and now Massachusetts.
                </p>
                <p className="text-md md:text-lg font-semibold italic">
                    Our goal is big: 1 million computers donated by 2030.
                </p>
                <p className="text-md md:text-lg">
                    We’re not just giving away devices. We’re building a model that funds itself, teaches skills, and creates opportunity. Your donation helps us grow something that lasts.
                </p>
                <p className="text-md md:text-lg">
                    I really believe tech can solve anything. Education, health, food, housing, jobs, even lonliness... it all starts with access.
                </p>
                <p className="text-md md:text-lg">
                    Thanks for being part of this.
                </p>
                <p className="text-md font-semibold">– Dylan Zajac, Founder & Executive Director</p>

                <div className="pt-8 border-t border-gray-300">
                    <h3 className="text-xl font-semibold mb-2">Prefer to donate by check?</h3>
                    <p className="text-md">
                        Make checks payable to <strong>Computers For People Inc.</strong><br />
                        Mail to:<br />
                        <strong>321 Newark St #32<br />Hoboken, NJ 07030</strong>
                    </p>
                </div>
            </div>
<DonationProgressBar />
            <div style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.jpeg')`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="bg-fixed">
                <iframe
                    scrolling="no"
                    aria-label='Donate Form'
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src='https://forms.zohopublic.com/Computers4People/form/DonateForm/formperma/-oOB6dH1UA3fpQV30XIgZNSyj7TFVh19ptZh_AebFWk'
                    id="donate-form"
                ></iframe>
            </div>
        </div>
    );
}
