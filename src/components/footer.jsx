import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    return (
        <div className="relative overflow-x-hidden overflow-y-hidden bg-black text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-50"
                style={{backgroundImage: `url(/Nav/checkmark.)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>

            {/* Footer Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 p-10 text-justify">
                <div className='grid gap-3'>
                    <div className='font-bold text-xl'>Computers 4 People</div>
                    <div>About us</div>
                    <div>Blog</div>
                    <div><a href="https://computers4people.zohodesk.com/portal/en/home">Help Center</a></div>
                    <div>Press & Media</div>
                    <div>Team</div>
                </div>
                <div className='grid gap-3'>
                    <div className='font-bold text-xl'>Programs & Initiatives</div>
                    <div>Refurbished Devices</div>
                    <div>Digital Skills Classes</div>
                    <div>PC Building Courses</div>
                    <div>EWaste Recycling</div>
                    <div>Become a Dropoff Site</div>
                </div>
                <div className='grid gap-3'>
                    <div className='font-bold text-xl'>Support</div>
                    <Link>Contact Us</Link>
                    <Link>Donate a Device</Link>
                    <Link>Volunteer</Link>
                    <Link>Careers</Link>
                    <Link>Make a Financial Contribution</Link>
                </div>
                <div className='grid gap-3 border-r-2 pr-4'>
                    <div className='font-bold text-xl'>Policies</div>
                    <div>Privacy</div>
                    <div>Device Guarantee</div>
                    <div>Returns</div>
                    <div>Shipping</div>
                </div>
                <div className='flex flex-col items-start'>
                    <div className='w-full text-center text-xl font-bold italic'>Join our Newsletter</div>
                    <div className='mt-2 w-full'>
                        {/* <form className='relative md:ml-5'>
                            <input className='h-7 w-2/3 rounded' type="text" name="email" placeholder="Your email" />
                            <input className='h-7 w-1/3 transform -translate-x-2 bg-c4p text-black rounded' type="submit" value="Submit" />
                        </form> */}
                        <form className="relative md:ml-5">
    <input 
        className="h-7 w-full rounded pr-16" 
        type="text" 
        name="email" 
        placeholder="Your email" 
    />
    <input 
        className="h-7 w-1/3 md:w-1/2 lg:w-1/4 absolute right-0 top-0 bg-c4p text-black rounded" 
        type="submit" 
        value="Submit" 
    />
</form>
                    </div>
                    <div className='text-xl mt-10 font-bold text-center w-full'>Follow Us</div>
                    <div className='w-full flex justify-around mt-2'>
                        <a href="https://www.facebook.com/Computers4People"><FaFacebook size={30} /></a>
                        <a href="https://www.instagram.com/computers4people/"><FaInstagram size={30} /></a>
                        <a href="https://twitter.com/Computer4people"><FaXTwitter size={30} /></a>
                        <a href="https://www.linkedin.com/company/computers4people"><FaLinkedin size={30} /></a>
                        <a href="https://www.tiktok.com/@computers4people"><FaTiktok size={30} /></a>
                        <a href="https://www.youtube.com/@Computers4People"><FaYoutube size={30} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
