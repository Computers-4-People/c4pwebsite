import React from "react";
import Header from "../components/header.jsx";
import { Link } from "react-router-dom";
export default function Programs() {
    return (
        <div className='font-sans'>
            <Header props={{
                bgImage: '/404page/404background.png',
                titlePart1: '404 Page Not Found',
                titlePart2: '',
                description: 'Tech can be a little confusing, but don’t worry, we’ve got your back. Need help?',
                links: [{text:"Back to Home", url:"/"}]
                }} /> 
       </div>
    )
}