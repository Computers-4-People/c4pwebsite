import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const { bgImage, titlePart1, titlePart2, description, links, logos } = props.props;

    const renderLinkItem = (link, index) => {
        if (link.url && link.url.includes('.pdf')) {
            return (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block flex items-center justify-center w-full sm:w-1/2 md:w-2/5 max-w-full text-center text-sm sm:text-lg md:text-xl animate-fade-up h-11 rounded-md px-4 sm:px-6 md:px-7 
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
                    className={`block flex items-center justify-center w-full sm:w-1/2 md:w-2/5 max-w-full text-center text-sm sm:text-lg md:text-xl animate-fade-up h-11 rounded-md px-4 sm:px-6 md:px-7 
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
                    className={`block flex items-center justify-center w-full sm:w-1/2 md:w-2/5 max-w-full text-center text-sm sm:text-lg md:text-xl animate-fade-up h-11 rounded-md px-4 sm:px-6 md:px-7 
                    ${index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white' : 'border border-white text-white hover:bg-white hover:text-black'}`}
                >
                    {link.text}
                </button>
            );
        }
    };

    return (
        <div
            className="header-container bg-cover bg-no-repeat min-h-screen w-full flex flex-col justify-end items-center md:flex-row pb-10 md:items-center md:justify-start"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%), url('${bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center center", // Default to center
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "scroll" // Prevents fixed background issues on mobile
            }}
        >
            <div className="px-6 sm:px-10 md:px-20 w-full">
                <div className="inline-block">
                    <h1 className="font-title text-5xl sm:text-6xl md:text-8xl 2xl:text-9xl mb-4 text-center md:text-left">
                        <p className="text-c4p animate-fade-up">{titlePart1}</p>
                        <p className="text-white animate-fade-up">{titlePart2}</p>
                    </h1>
                </div>
                <div className="animate-fade-up">
                    <p className="font-paragraph text-white text-lg sm:text-xl 2xl:text-2xl mb-4 md:w-3/4 text-center md:text-left">{description}</p>
                    <div className="font-subtitle flex flex-col gap-3 sm:flex-row sm:gap-5 md:w-3/4">
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
                                className="h-10 sm:h-14 md:h-20 lg:h-24 w-auto" 
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile-Specific Background Fix */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .header-container {
                        background-size: cover;
                        background-position: right; /* Right-align the background on mobile */
                        background-attachment: scroll;
                    }
                }
            `}</style>
        </div>
    );
}
