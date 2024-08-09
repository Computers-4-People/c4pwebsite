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
    function handleMouseEnter(items) { 
        let dropCont;
        if (items[0] === 'Refurbished Devices'){
            dropCont = 
            <div className='w-96 h-48 p-5'>
                <ul className='h-full w-1/2 flex flex-col justify-between text-l font-bold font-sans border-r-2 border-black '>
                    <li>Refurbished Devices</li>
                    <li>Digital Skills Courses</li>
                    <li>Ewaste Recycling</li>
                </ul>
            </div>
        }; 

        setDropdownContent(dropCont);
        setMenuVisible(true)
     };
    const handleMouseLeave = () => { setMenuVisible(false) };

    return (
        <div onMouseLeave={handleMouseLeave}>
            <div className="bg-gray-900">
                {/* <NavLink to={"/apply"}>Apply For A Computer </NavLink> */}
                {/* <div> Computers4People </div> */}
                    <div class='flex justify-end items-center space-x-20 h-20'>
                    <img src='c4plogo.png' className='position absolute ml-3 h-1/12 w-1/5 mt-3 left-0 h-20'></img>
                        <Link onMouseEnter={() => handleMouseEnter(dropdownItems['Programs'])} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/apply'>Programs</Link>
                        <Link onMouseEnter={() => handleMouseEnter(dropdownItems['About'])} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/programs'>About us</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/volunteer'>Get Involved</Link>
                    </div>
            </div>
            <div class='absolute right-0 z-5'>
            {/* {isMenuVisible && <DropdownMenu/>} */}
            {/* text-bold flex flex-col w-96  */}
            {isMenuVisible && (<div onMouseEnter={() => setMenuVisible(true)} className='bg-white rounded m-2 mr-40'> 
                {/* {dropdownContent.map((item) => (<Link className='m-2 ml-10 w-40'>{item}</Link>))} */}
                {dropdownContent}
            </div>)}
            </div>
        </div>
    )
}