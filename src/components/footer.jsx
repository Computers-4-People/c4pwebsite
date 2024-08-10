import { Link } from "react-router-dom"
import {FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube} from 'react-icons/fa'
import {FaXTwitter} from 'react-icons/fa6'

export default function Footer () {
    return(
    // <div class="footer static bottom-0 w-full text-white bg-gray-900 grid grid-cols-4 h-96 p-10 text-justify">
    //     <div className='grid gap-5'>
    //         <div class='font-bold text-xl'>Computers 4 People</div>
    //         <div>About us</div>
    //         <div>Blog</div>
    //         <div>Help Center</div>
    //         <div>Press & Media</div>
    //         <div>Team</div>
    //     </div>
    //     <div className='grid gap-5'>
    //         <div  class='font-bold text-xl'> Programs & Initiatives</div> 
    //         <div>
    //             Refurbished Devices
    //         </div>
    //         <div>
    //             Digital Skills Classes
    //         </div>
    //         <div>
    //             PC Building Courses
    //         </div>
    //         <div>
    //             EWaste Recycling
    //         </div>
    //         <div>
    //             Become a Dropoff Site
    //         </div>
    //     </div>
    //     <div className='grid gaps-4'>
    //         <div  class='font-bold text-xl'>Support</div>
    //             <Link>
    //                 Contact Us
    //             </Link>
    //             <Link>
    //                 Donate a Device
    //             </Link>
    //             <Link>
    //                 <p>Volunteer</p>
    //             </Link>
    //             <Link>
    //                 <p>Careers</p>
    //             </Link>
    //             <Link>
    //                 <p>Make a Financial Contribution</p>
    //             </Link>
    //     </div>
    //     <div className='grid gaps-4'>
    //         <div  class='font-bold text-xl'>Policies</div>
    //             <div>
    //                 Privacy
    //             </div>
    //             <div>
    //                 Device Guarantee
    //             </div>
    //             <div>
    //                 Returns
    //             </div>
    //             <div>
    //                 Shipping
    //             </div>
    //         </div>
    //     </div>
    <div>
        <div style={{backgroundImage: `url(../hills.png)`}} ></div>
        <div class="footer static bottom-0 w-full text-white bg-gray-900 grid grid-cols-5 h-72 p-10 text-justify">
            <div className='grid gap-3'>
                <div class='font-bold text-xl'>Computers 4 People</div>
                <div>About us</div>
                <div>Blog</div>
                <div>Help Center</div>
                <div>Press & Media</div>
                <div>Team</div>
            </div>
            <div className='grid gap-3'>
                <div  class='font-bold text-xl'> Programs & Initiatives</div> 
                <div>
                    Refurbished Devices
                </div>
                <div>
                    Digital Skills Classes
                </div>
                <div>
                    PC Building Courses
                </div>
                <div>
                    EWaste Recycling
                </div>
                <div>
                    Become a Dropoff Site
                </div>
            </div>
            <div className='grid gaps-3'>
                <div  class='font-bold text-xl'>Support</div>
                    <Link>
                        Contact Us
                    </Link>
                    <Link>
                        Donate a Device
                    </Link>
                    <Link>
                        <p>Volunteer</p>
                    </Link>
                    <Link>
                        <p>Careers</p>
                    </Link>
                    <Link>
                        <p>Make a Financial Contribution</p>
                    </Link>
            </div>
            <div className='w-40 grid gaps-3 border-r-2'>
                <div  class='font-bold text-xl'>Policies</div>
                    <div>
                        Privacy
                    </div>
                    <div>
                        Device Guarantee
                    </div>
                    <div>
                        Returns
                    </div>
                    <div>
                        Shipping
                    </div>
            </div>
            <div className='justify-self-start border-left w-96 transform -translate-x-10'>
                <div>
                    <div className='w-5/6 text-center text-xl font-bold italic'>Join our Newsletter</div>
                    <div className='mt-2'>
                        <form className='relative'>
                            <input className='h-7 w-2/3 rounded' type="text" name="email" value=""/>
                            <input className='h-7 w-1/3 transform -translate-x-20 bg-[#0FE006] text-black rounded' type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
                <div className='row-start-2 text-xl mt-10 font-bold text-center w-5/6'>Follow Us</div>
                <div className='w-5/6 flex justify-around mt-2'>
                    <a href="https://www.facebook.com/Computers4People" className=''> <FaFacebook size={30} /></a>
                    <a href="https://www.instagram.com/computers4people/"> <FaInstagram size={30} /></a>
                    <a href="https://twitter.com/Computer4people"> <FaXTwitter size={30} /></a>   
                    <a href="https://www.linkedin.com/company/computers4people"> <FaLinkedin size={30} ></FaLinkedin></a>
                    <a href="https://www.tiktok.com/@computers4people"> <FaTiktok size={30} ></FaTiktok></a>
                    <a href="https://www.youtube.com/@Computers4People"> <FaYoutube size={30} ></FaYoutube></a>
                </div>
            </div>
        </div>
    </div>
    )
}