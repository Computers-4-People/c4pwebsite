import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const { bgImage, titlePart1, titlePart2, description, links } = props.props;

    // Function to determine the correct element for each link
    const renderLinkItem = (link, index) => {
        if (link.url && link.url.includes('.pdf')) {
            // Handle direct PDF links or external links
            return (
                <a 
                    key={index}
                    href={link.url}
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security measure for opening new tabs
                    className={`block w-full md:w-2/5 min-w-max md:inline-block text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </a>
            );
        } else if (link.url) {
            // Handle internal SPA links
            return (
                <Link 
                    key={index}
                    to={link.url}
                    className={`block w-full md:w-2/5 min-w-max md:inline-block text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 
                        ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </Link>
            );
        } else if (link.clickAction) {
            // Handle button actions
            return (
                <button
                    key={index}
                    onClick={link.clickAction}
                    className={`block w-full min-w-max md:w-2/5 min-w-auto md:inline-block text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 
                        ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </button>
            );
        }
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${bgImage}')`
            }}
            className="bg-cover min-h-max-content h-screen bg-center bg-fixed bg-no-repeat flex flex-col justify-end md:flex-row pb-10 md:items-center md:justify-start"
        >
            {/* <div className="px-4 sm:px-10 md:px-20 justify-items-stretch">
                <h1 className='col-start-1 md:col-end-6 font-title text-6xl md:text-6xl lg:text-9xl mb-4'>
                    <p className='text-c4p animate-fade-up'>{titlePart1}</p>
                    <p className='text-white animate-fade-up'>{titlePart2}</p>
                </h1>
                <div className="col-start-1 md:col-end-5 animate-fade-up">
                    <p className='text-white text-xl md:text-2xl mb-4'>{description}</p>
                    <div className='flex flex-row space-x-5'>
                        {links.map(renderLinkItem)}
                    </div>
                </div>
            </div> */}
            <div className="px-4 sm:px-10 md:px-20 justify-items-stretch">
    {/* Wrapper for h1 that controls the width */}
    <div className="inline-block">
        <h1 className='col-start-1 md:col-end-6 font-title text-6xl md:text-8xl 2xl:text-9xl mb-4'>
            <p className='text-c4p animate-fade-up'>{titlePart1}</p>
            <p className='text-white animate-fade-up'>{titlePart2}</p>
        </h1>
    </div>

    <div className="col-start-1 md:col-end-5 animate-fade-up" style={{ maxWidth: '70%' }}>
        <p className='text-white text-xl 2xl:text-2xl mb-4'>{description}</p>
        <div className='flex flex-row space-x-5'>
            {links.map(renderLinkItem)}
        </div>
    </div>
</div>
        </div>
    );
}
