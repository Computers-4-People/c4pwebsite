import React from "react";
import { Link } from "react-router-dom";
export default function Contact() {
    return (
        <div className='font-sans overflow-x-hidden'>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%),url('/contact us/contactbackground.png')`
                }}
                className="bg-cover h-screen bg-center bg-fixed bg-no-repeat flex items-center justify-center"
            >
                <div className="px-4 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-6 grid-rows-auto justify-items-stretch">
                    <h1 className='col-start-1 md:col-end-4 text-left font-title text-6xl md:text-6xl lg:text-8xl mb-4'>
                        <p className='text-c4p animate-fade-up'>CONTACT US</p>
                        <p className='text-white animate-fade-up'>WERE HERE TO ASSIST YOU</p>
                    </h1>
                    <div className="col-start-1 md:col-end-4 animate-fade-up">
                        <p className='text-white text-left text-xl md:text-2xl mb-4'>Hours: Monday - Friday 9a.m. to 5 p.m. EST<br/><br/>Visit our Help Center for instant answers or reach out to us for further assistance</p>
                        <div className="flex flex-col md:flex-row">
                                <Link to="/refurbished" className="flex items-center justify-center text-center text-xl bg-c4p h-11 rounded-md px-7 hover:bg-c4p-hover hover:text-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                            >
                                Contact our team
                            </Link>
                            <Link
                               to="https://computers4people.zohodesk.com/portal/en/home"
                                className="flex items-center justify-center text-center text-xl border-2 rounded-md border-white h-11 text-white px-7 hover:bg-white hover:text-black w-full md:w-auto"
                            >
                                Visit our Help Center
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20 min-h-screen flex justify-center items-center">
    <iframe 
        aria-label='Inquiries Form' 
        className="w-full h-full border-0" 
        src='https://forms.zohopublic.com/Computers4People/form/ACPInquiry/formperma/Dx57tdHHrUQhpvkiUzWtSDiDNVj72PaVd3nJdw6C7tM'
        style={{ minHeight: '185vh', height: '100%', width: '100%' }}
    >
    </iframe>
</div>


        </div>
    )
}