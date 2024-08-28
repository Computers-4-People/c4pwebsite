import React from "react";

export default function Testimonial(props) {
    console.log(props);
    const {title1, desc1, title2, desc2, image, side} = props.props;

    return(
            <div className='bg-cover font-sans justify-evenly px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                    {/* Image Section */}
                    <div className='flex justify-center'>
                        <img src={image} alt="" className='object-contain h-3/4 w-3/4' />
                    </div>
                    {/* Text Section */}
                    <div className='flex flex-col justify-center'>
                        <h2 className='text-2xl font-title md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                            {title2}
                        </h2>
                        <p>
                            {desc2}
                        </p>
                </div>
            </div>
        </div>
    )
}