import { Router, NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DropdownMenu from './dropdown';

//import history from 'history';
export default function Navbar() {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMouseEnter = () => { setMenuVisible(true) };
    const handleMouseLeave = () => { setMenuVisible(false) };

    return (
        <div>
            <div class="bg-gray-900">
                {/* <NavLink to={"/apply"}>Apply For A Computer </NavLink> */}
                {/* <div> Computers4People </div> */}
                    <div class='flex justify-end items-center space-x-20 h-20'>
                    <img src='c4plogo.png' class='position absolute left-0 h-20'></img>
                        <Link onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/apply'>Programs</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/programs'>About us</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/volunteer'>Get Involved</Link>
                    </div>
            </div>
            <div class='relative right-0 text: green-500 bg:green-500 rounded flex justify-evenly border:gray-900'  >
            {isMenuVisible && <DropdownMenu/>}
            </div>
        </div>
    )
}