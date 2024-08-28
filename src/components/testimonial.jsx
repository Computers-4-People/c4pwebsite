import React from "react";

export default function Testimonial(props) {
    // console.log(props);
    const {title1, desc1, title2, desc2, image, side} = props.props;
    // const imageOrganization = function() {
    //     let styling;
    //     if(side === 'right') {
    //         return 'col-start-2';
    //     } else {
    //         return 'col-start-1'
    //     }
    // }
    return(
            <div className='bg-cover font-sans px-4 mt-20 mb-20 sm:px-10 md:px-20 py-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-10 items-center'>
                    {/* Image Section */}
                    <div className={`bg-black col-start-2`}>
                        <img src={image} alt="" className='object-contain' />
                    </div>
                    {/* Text Section */}
                    <div className={` flex-col row-start-1`}>
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