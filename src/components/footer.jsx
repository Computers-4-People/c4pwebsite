import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    return (
        <div className='relative'>
            <div className='transform translate-y-5'>
                <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="#000"
                        fillOpacity="1"
                        d="M0,224L48,208C96,192,192,160,288,149.3C384,139,480,149,576,170.7C672,192,768,224,864,245.3C960,267,1056,277,1152,272C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>

            </div>
            <div className="w-full overflow-x-hidden overflow-y-hidden bg-black text-white">
                {/* Background Image */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{ backgroundImage: `url(/Nav/checkmark.)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                {/* Footer Content */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 p-10 text-justify">
                    <div className='grid gap-3'>
                        <div className='font-bold text-xl'><Link to="/" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Computers 4 People</Link></div>
                        <div><Link to="/about" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</Link></div>
                        <div><Link to="/blog" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link></div>
                        <div><Link to="/team" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Team</Link></div>
                        <div><Link to="https://computers4people.zohodesk.com/portal/en/home" className="hover:text-c4p">Help Center</Link></div>
                        <div><Link to="/contact" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</Link></div>
                        <div><Link to="https://careers.computers4people.org" className="hover:text-c4p">Work @ C4P</Link></div>
                    </div>
                    <div className='grid gap-3'>
                        <div className='font-bold text-xl'><Link to="/programs" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Programs</Link></div>
                        <div><Link to="/refurbished" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Refurbished Devices</Link></div>
                        <div><Link to="/dsclasses" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Digital Skills Classes</Link></div>
                        <div><Link to="/dsclasses" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>PC Building Classes</Link></div>
                        <div><Link to="/ewastedropoff" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>E-Waste Dropoff</Link></div>
                        <div><Link to="/partner" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Non-Profit Parnter</Link></div>
                    </div>
                    <div className='grid gap-3'>
                        <div className='font-bold text-xl'><div><Link to="/ewaste" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Support</Link></div></div>
                        <div><Link to="/ewaste" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Donate E-Waste</Link></div>
                        <div><Link to="/financialdonation" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Donate Funding</Link></div>
                        <div><Link to="/volunteer" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Volunteer</Link></div>
                        <div><Link to="/events" className="hover:text-c4p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Events</Link></div>
                    </div>
                    <div className='grid gap-3 border-r-2 pr-4'>
                        <div className='font-bold text-xl'>Policies</div>
                        <div>Privacy</div>
                        <div>Device Guarantee</div>
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
                                    className="h-7 w-full rounded pr-16 pl-2"
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
        </div>
    );
}
