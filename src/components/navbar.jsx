import { Router, NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import DropdownMenu from './dropdown';

//import history from 'history';
export default function Navbar() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState([]);

    const dropdownItems = {
        Programs: ['Refurbished Devices', 'Digital Skills Courses', 'E-Waste Recycling'],
        About: ['Our Story', 'Mission', 'Vision', 'Values'],
        Get_Involved: ['Make a financial contribution', 'Volunteer', 'Become a Drop-Off Site']
    };
    const handleMouseEnter = (items) => { 
        setDropdownContent(items);
        setMenuVisible(true)
     };
    const handleMouseLeave = () => { setMenuVisible(false) };

    return (
        <div>
            <div className="bg-gray-900">
                {/* <NavLink to={"/apply"}>Apply For A Computer </NavLink> */}
                {/* <div> Computers4People </div> */}
                    <div class='flex justify-end items-center space-x-20 h-20'>
                    <img src='c4plogo.png' class='position absolute left-0 h-20'></img>
                        <Link onMouseEnter={() => handleMouseEnter(dropdownItems['Programs'])} onMouseLeave={handleMouseLeave} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/apply'>Programs</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/programs'>About us</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/volunteer'>Get Involved</Link>
                    </div>
            </div>
            <div class='absolute right-0 z-5'>
            {/* {isMenuVisible && <DropdownMenu/>} */}
            {isMenuVisible && (<div onMouseEnter={() => setMenuVisible(true)} className='bg-white rounded m-2 text-bold flex flex-col w-96 mr-20'> 
                {dropdownContent.map((item) => (<Link className='m-2 ml-10 w-40'>{item}</Link>))}
            </div>)}
            </div>
        </div>
    )
}