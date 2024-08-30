import React from "react";
import {Link} from 'react-router-dom';

export default function Testimonial(props) {
    // console.log(props);
    const {title1, desc1, title2, desc2, image, side, links} = props.props;
    // const imageOrganization = function() {
    //     let styling;
    //     if(side === 'right') {
    //         return 'col-start-2';
    //     } else {
    //         return 'col-start-1'
    //     }
    // }
    return(
        <div className='bg-cover font-sans px-4 mt-20 mb-20 sm:px-10 md:px-20 my-10'>
            {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-center h-full  lg:h-[40vh]'> */}
            <div className={`flex flex-col ${side === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center h-full`}>
                {/* Image Section */}
                <div className={`${side === 'right' ? 'lg:col-start-3' : 'lg:col-start-1'} h-full w-full`}   >
                    <img src={image} alt="" className='h-auto w-auto max-h-full max-w-full object-contain'/>
                </div>
                {/* Text Section */}
                <div className={`flex flex-col w-full row-start-1 lg:col-span-2 ${side === 'right' ? 'lg:col-start-1 pr-5' : 'lg:col-start-2'}`}>
                    <h2 className='text-4xl font-title md:text-4xl lg:text-5xl text-gray-800 font-bold uppercase mb-6'>
                        {title2}
                    </h2>
                    <p className='text-xl'>
                        {desc2}
                    </p>
                    <div className='mt-8 w-full flex flex-row space-x-4'>
                {
                    links && links.length > 0 && 
                        links.map(function (link, index){
                            console.log(link.clickAction)
                            if(!link.clickAction)
                            {
                                return(
                                <Link 
                                key={index}
                                to={`${link.url}`}
                                className={`block md:inline-block text-center text-xl animate-fade-up h-11 rounded-md pt-2 px-7 ${ index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white': 'border border-black text-black hover:bg-black hover:text-white'}`}
                            >
                                {link.text}   
                            </Link>
                                )
                            }
                            else {
                                // console.log(link.clickAction);
                                return(
                                <button
                                key={index}
                                onClick={link.clickAction}
                                className={`block md:inline-block text-center text-xl animate-fade-up h-11 rounded-md pt-2 px-7 ${ index % 2 === 0 ? 'bg-c4p hover:bg-c4p-hover hover:text-white': 'border border-black text-black hover:bg-white hover:text-black'}`}
                            >
                                {link.text}

                                </button>
                                )
                            }
                        }
                        
                    )
                }
                </div>
                </div>
            
            </div>
        </div>
    )
}