import { Link } from "react-router-dom"

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
    <div class="footer static bottom-0 w-full text-white bg-gray-900 grid grid-cols-5 h-96 p-10 text-justify">
        <div className='grid gap-5'>
            <div class='font-bold text-xl'>Computers 4 People</div>
            <div>About us</div>
            <div>Blog</div>
            <div>Help Center</div>
            <div>Press & Media</div>
            <div>Team</div>
        </div>
        <div className='grid gap-5'>
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
        <div className='grid gaps-4'>
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
        <div className='grid gaps-4'>
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
        <div>
            <div>Join our NewsLetter</div>
            <textarea name="" id=""></textarea>
            <div>Follow Us</div>
        </div>
    </div>
    )
}