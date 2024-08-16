import React from "react";

export default function Refurbished() {
    const scrollToForm = () => {
        document.getElementById("partnership-form").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/Become a Partner/partnerbackgroundPNG.PNG')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
                className="flex items-center justify-center"
            >
                <div className="mb-40 px-4 sm:px-10 md:px-20 w-full">
                    <div className="max-w-4xl mx-auto">
                        <h1 className='mt-40 text-left font-title text-6xl md:text-6xl lg:text-8xl mb-8 leading-tight'>
                            <span className='block text-c4p animate-fade-up'>DRIVE POSITIVE IMPACT</span>
                            <span className='block text-white animate-fade-up'>BECOME A PARTNER</span>
                        </h1>
                        <div className="animate-fade-up">
                            <p className='text-white text-xl md:text-2xl mb-8 leading-relaxed'>
                                Join a network of 300+ non-profit partners that are tackling pressing community needs, uplifting people, and building bridges to lasting change worldwide.
                            </p>
                            <div className="flex flex-col md:flex-row">
                                <button onClick={scrollToForm} className="flex items-center justify-center text-center text-xl bg-c4p h-12 rounded-md px-8 hover:bg-c4p-hover hover:text-white w-full md:w-auto">
                                    Become a Partner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div id="partnership-form">
                <iframe
                    aria-label='Partnership Application'
                    className="w-full h-full border-0"
                    src='https://forms.zohopublic.com/Computers4People/form/PartnershipApplication/formperma/LXC_W4X5dA-gXn0sMyqsRIwqPg4y0DRmqPqziLpD__Y'
                    style={{ minHeight: '185vh', height: '100%', width: '100%' }}
                >
                </iframe>
            </div>

            {/* Why Join Us Section */}
            <div className='bg-cover font-sans justify-evenly px-4 mb-20 sm:px-10 md:px-20 py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                    {/* Image Section */}
                    <div className='flex justify-center md:justify-end'>
                        <img src="../Become a Partner/partnerphoto.png" alt="" className='h-auto w-auto max-w-xs md:max-w-md' />
                    </div>
                    {/* Text Section */}
                    <div className='flex flex-col justify-center'>
                        <h2 className='text-2xl md:text-4xl lg:text-4xl text-gray-800 font-bold uppercase mb-6'>
                            WHY JOIN US AS A PARTNER?
                        </h2>
                        <ul className='text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 list-disc list-inside'>
                            <li>Bring Technology to Your Community: Help us provide computers to individuals in need.</li>
                            <li>Host Digital Skills Classes: Collaborate with us to offer essential tech education.</li>
                            <li>Innovative Partnerships: Join forces on creative solutions to enhance digital equity and impact.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
