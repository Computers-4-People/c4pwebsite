import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const { bgImage, titlePart1, titlePart2, description, links, logos } = props.props;

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
            className="header-container md:bg-cover min-h-screen flex flex-col justify-end md:flex-row pb-10 items-center md:items-center md:justify-start"
            style={{
                backgroundImage: `${ window.innerWidth > 720 ? `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), url('${bgImage}')`:`linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), url('${bgImage}')`}`,
                backgroundSize: window.innerWidth > 720 ? 'cover' : 'cover', // Keep cover for both
                backgroundPosition: window.innerWidth > 720 ? 'center right' : 'center right', // Position more precisely for each view
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: window.innerWidth > 720 ? 'fixed' : 'scroll' // Fixed on desktop, scroll on mobile
            }}
        >
            <div className="px-10 mb-14 md:mb-0 md:px-20">
                <div className="inline-block">
                    <h1 className='font-title text-7xl md:text-8xl 2xl:text-9xl mb-4'>
                        <p className='text-c4p animate-fade-up'>{titlePart1}</p>
                        <p className='text-white animate-fade-up'>{titlePart2}</p>
                    </h1>
                </div>
                <div className="animate-fade-up">
                    <p className='font-paragraph text-white text-xl 2xl:text-2xl mb-4 md:w-3/4'>{description}</p>
                    <div className='font-subtitle flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0 md:w-1/2'>
                        {links.map(renderLinkItem)}
                    </div>
                </div>
            </div>

            {/* Optional Bottom Right Section */}
            {logos && (
                <div className="md:absolute md:bottom-4 md:right-4 text-right mt-6 md:mt-0">
                    <div className="flex justify-end space-x-4">
                        {logos.map((logo, index) => (
                            <img 
                                key={index} 
                                src={logo} 
                                alt={`Partner Logo ${index + 1}`} 
                                className="h-14 md:h-24" // Updated className for responsive sizing
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile-specific styles to handle background scaling */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .header-container {
                        background-size: contain; /* Ensure the whole image is visible */
                        background-position: center top; /* Align the image better on mobile */
                        background-attachment: scroll; /* Remove fixed background for smoother mobile scrolling */
                    }
                }
            `}</style>
        </div>
    );
}
