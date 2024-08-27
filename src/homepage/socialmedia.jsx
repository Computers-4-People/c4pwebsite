import React from "react";
import { Link } from "react-router-dom";
import { InstagramEmbed } from 'react-social-media-embed';
import { LinkedInEmbed } from 'react-social-media-embed';
import { TikTokEmbed } from 'react-social-media-embed';
import { XEmbed } from 'react-social-media-embed';
import { YouTubeEmbed } from 'react-social-media-embed';
import Header from "../components/header";

export default function SocialMedia() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/socialmedia/socialmediabackground.png',
                titlePart1: 'Follow our Journey.',
                titlePart2: 'Become part of it.',
                description: 'Follow us on social media and become part of our journey by sharing photos and stories about how you’re involved with Computers 4 People.',
                links: [{text: 'Look at our latest posts'}]
            }}/> 
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/socialmedia/socialmediabackground.png')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-justify font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>FOLLOW OUR JOURNEY.</p>
                        <p className='text-white animate-fade-up'>BECOME PART OF IT.</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-xl md:text-2xl mb-4'>
                            Follow us on social media and become part of our journey by sharing photos and stories about how you’re involved with Computers 4 People.
                        </p>
                        <Link 
                            to="/ewaste" 
                            className="block md:inline-block text-center text-xl animate-fade-up bg-c4p h-11 rounded-md pt-2 px-7 hover:bg-c4p-hover hover:text-white"
                        >
                            Look at our latest posts
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="ml-14 mt-20 mb-20 text-6xl font-bold text-gray">Social Media Live Feed</h2>
            </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-evenly w-full mb-20">
                <div className="flex justify-center w-full md:w-auto mb-4">
                    <LinkedInEmbed 
                    url="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7226766554380537856"
                    postUrlurl="https://www.linkedin.com/posts/computers4people_one-laptop-at-a-time-comcast-activity-7226766570209841152-I_yv?utm_source=share&utm_medium=member_desktop" width={328} height={850}/>
                </div>
                <div className="flex justify-center w-full md:w-auto mb-4">
                    <InstagramEmbed url="https://www.instagram.com/p/C-bMhOYxag1/?utm_source=ig_web_button_share_sheet" width={328} height={480} />
                </div>
                <div className="flex justify-center w-full md:w-auto mb-4">
                    <TikTokEmbed url="https://www.tiktok.com/@computers4people/video/7401285659261930795?is_from_webapp=1&sender_device=pc&web_id=7336429628901197355" width={328} height={750} />
                </div>
                <div className="flex justify-center w-full md:w-auto mb-4">
                    <XEmbed url="https://twitter.com/Computer4People/status/1822052436359389491" width={328} height={530}/>
                </div>
                <div className="flex justify-center w-full md:w-auto">
                    <YouTubeEmbed url="https://youtube.com/shorts/UgVjZojHc64?si=DTTRAGiFNTkMcs8u" width={328} height={585}/>
                </div>
                </div>
        </div>
    )
}