import { Link } from "react-router-dom"

export default function Footer () {
    return(<div class="absolute bottom-0 w-full text-white bg-gray-900 flex justify-between">
        <div>
            <div class='font-bold text-l'>Computers 4 People</div>
            <div>About us</div>
            <div>Blog</div>
            <div>Help Center</div>
            <div>Press & Media</div>
            <div>Team</div>
        </div>
        <div>
            <div  class='font-bold text-l'> Programs & Initiatives</div> 
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
        <div>
            <div  class='font-bold text-l'>Support</div>
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
        <div>
            <div  class='font-bold text-l'>Policies</div>
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
        </div>
    )
}