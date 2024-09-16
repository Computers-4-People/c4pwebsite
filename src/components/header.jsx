import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const { bgImage, titlePart1, titlePart2, description, links } = props.props;

    // Function to determine the correct element for each link
    const renderLinkItem = (link, index) => {
        if (link.url && link.url.includes('.pdf')) {
            return (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block flex items-center w-full md:w-2/5 min-w-max text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 
                    ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </a>
            );
        } else if (link.url) {
            return (
                <Link 
                    key={index}
                    to={link.url}
                    className={`block flex justify-center items-center w-full md:w-2/5 min-w-max text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 
                    ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </Link>
            );
        } else if (link.clickAction) {
            return (
                <button
                    key={index}
                    onClick={link.clickAction}
                    className={`block flex justify-center items-center w-full min-w-max md:w-2/5 min-w-auto text-center md:text-xl animate-fade-up h-11 rounded-md md:px-7 
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
                backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${bgImage}')`,
                backgroundSize: 'cover', // Default for desktop
                backgroundPosition: 'center right', // Adjusted for better alignment in mobile view
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
            className="min-h-max-content h-screen flex flex-col justify-end md:flex-row pb-10 items-center md:items-center md:justify-start"
        >
            <div className="px-10 mb-14 md:mb-0 md:px-20">
                <div className="inline-block">
                    <h1 className='font-title text-7xl md:text-8xl 2xl:text-9xl mb-4'>
                        <p className='text-c4p animate-fade-up'>{titlePart1}</p>
                        <p className='text-white animate-fade-up'>{titlePart2}</p>
                    </h1>
                </div>
                <div className="animate-fade-up">
                    <p className='text-white text-xl 2xl:text-2xl mb-4'>{description}</p>
                    <div className='flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0 md:w-1/2'>
                        {links.map(renderLinkItem)}
                    </div>
                </div>
            </div>

            {/* Mobile-specific styles to handle background scaling */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style] {
                        background-size: contain; /* Avoid zooming in on mobile */
                        background-position: center top; /* Adjust position on mobile */
                        background-attachment: scroll; /* Disable fixed attachment on mobile for better behavior */
                    }
                }
            `}</style>
        </div>
    );
}
