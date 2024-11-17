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
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{
                bgImage: '/socialmedia/socialmediabackground.jpeg',
                titlePart1: 'Follow our Journey.',
                titlePart2: 'Become part of it.',
                description: 'Follow us on social media and become part of our journey by sharing photos and stories about how you’re involved with Computers 4 People.',
                links: [{text: 'Look at our latest posts'}]
            }}/> 
            <div>
                <h2 className="ml-14 mt-20 mb-20 text-7xl font-title text-gray">Social Media Live Feed</h2>
            </div>
                <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-evenly w-full mb-20">
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