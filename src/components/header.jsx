import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    const {bgImage, titlePart1, titlePart2, description, links} = props.props;

    // console.log(links);

    return (
        <div
        style={{
            backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('${bgImage}')`
        }}
        className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
    >
        <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
            <h1 className='col-start-1 md:col-end-6 font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                <p className='text-c4p animate-fade-up'>{titlePart1}</p>
                <p className='text-white animate-fade-up'>{titlePart2}</p>
            </h1>
            <div className="col-start-1 md:col-end-5 animate-fade-up">
                <p className='text-white text-xl md:text-2xl mb-4'>
                        {description}
                </p>
                {
                    links && links.length > 0 && 
                        links.map((link,index) => 
                        <Link 
                            key={index}
                            to={`${link.url}`}
                            className="block md:inline-block text-center text-xl animate-fade-up bg-c4p h-11 rounded-md pt-2 px-7 hover:bg-c4p-hover hover:text-white"
                        >
                            {link.text}   
                        </Link>
                    )
                }
            </div>
            </div>
        </div>
    )
}