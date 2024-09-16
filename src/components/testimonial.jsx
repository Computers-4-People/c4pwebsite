import React from "react";
import { Link } from 'react-router-dom';

export default function Testimonial(props) {
    const { title1, desc1, title2, desc2, image, side, links } = props.props;

    return (
        <div className='bg-cover min-h-max font-sans px-4 mt-20 mb-20 sm:px-10 md:px-20 my-10'>
            <div className={`flex flex-col ${side === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center h-full`}>
                {/* Image Section */}
                <div className={`w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0`}>
                    <img 
                        src={image} 
                        alt="" 
                        className='max-h-64 max-w-full object-contain lg:max-h-full' // Scales image for mobile
                    />
                </div>

                {/* Text Section */}
                <div className={`flex flex-col w-full lg:w-1/2 items-center lg:items-start text-center lg:text-left`}>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-title font-bold uppercase mb-4 text-gray-800'>
                        {title2}
                    </h2>
                    <p className='text-lg md:text-xl mb-6'>
                        {desc2}
                    </p>

                    {/* Links Section */}
                    <div className='mt-4 w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 justify-center lg:justify-start'>
                        {links && links.length > 0 && links.map((link, index) => (
                            link.clickAction ? (
                                <button
                                    key={index}
                                    onClick={link.clickAction}
                                    className={`block w-full lg:w-auto text-center text-xl animate-fade-up h-11 rounded-md py-2 px-7 ${
                                        index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover text-white' : 'border border-black text-black hover:bg-black hover:text-white'
                                    }`}
                                >
                                    {link.text}
                                </button>
                            ) : (
                                <Link
                                    key={index}
                                    to={link.url}
                                    className={`block w-full lg:w-auto text-center text-xl animate-fade-up h-11 rounded-md py-2 px-7 ${
                                        index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover text-white' : 'border border-black text-black hover:bg-black hover:text-white'
                                    }`}
                                >
                                    {link.text}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
