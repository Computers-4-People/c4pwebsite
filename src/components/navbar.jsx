import { Router, NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUser} from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
// import DropdownMenu from './dropdown';

//import history from 'history';
export default function Navbar() {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState([]);

    const dropdownItems = {
        Programs: ['Refurbished Devices', 'Digital Skills Courses', 'EWaste Recycling'],
        About: ['Mission & History', 'Press & Media', 'Team', 'Careers'],
        Get_Involved: ['Donate Today', 'Volunteer', 'Become a Drop-Off Site']
    };
    function handleMouseEnter(items) { 
        let dropCont;
    if (items === 'programs') {
    dropCont =
    <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
            <li><Link to="/refurbished" className="hover:text-c4p">Refurbished Devices</Link></li>
            <li><Link to="/DSClasses" className="hover:text-c4p">Digital Skills Courses</Link></li>
            <li><Link to="/ewaste" className="hover:text-c4p">EWaste Recycling</Link></li>
        </ul>
        <div className='flex flex-col justify-between items-center'>
            <img src="nav/applyforcomputer.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
            <p className='text-center'>Fill out an application for a refurbished device.</p>
            <Link to="/refurbished" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Apply for a Computer</Link>
        </div>
    </div>
}
        if (items === 'about') {
            dropCont =
            <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
            <li><Link to="/about" className="hover:text-c4p">Mission & History</Link></li>
            <li><Link to="/press" className="hover:text-c4p">Press & Media</Link></li>
            <li><Link to="/team" className="hover:text-c4p">Team</Link></li>
            <li><Link to="/careers" className="hover:text-c4p">Careers</Link></li>
        </ul>
        <div className='flex flex-col justify-between items-center'>
            <img src="nav/checkmark.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
            <p className='text-center'>Check status, schedule a pickup or enroll in a class!</p>
            <Link to="/login" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Create Account/Login</Link>
        </div>
    </div>
}
        if (items === 'involved'){
            dropCont = 
            <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
            <li><Link to="/about" className="hover:text-c4p">Donate Today</Link></li>
            <li><Link to="/press" className="hover:text-c4p">Volunteer</Link></li>
            <li><Link to="/team" className="hover:text-c4p">Become a Drop-Off Site</Link></li>
        </ul>
        <div className='flex flex-col justify-between items-center'>
            <img src="nav/ewaste.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
            <p className='text-center'>Schedule a pickup to collect your unused electronics.</p>
            <Link to="/ewaste" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Donate your Ewaste</Link>
        </div>
    </div>
    }
        setDropdownContent(dropCont);
        setMenuVisible(true)
     };
    const handleMouseLeave = () => { setMenuVisible(false) };

    return (
        <div className='fixed z-10 w-full bg-gradient-to-b from-black' onMouseLeave={handleMouseLeave}>
        <div className="flex justify-between items-center h-16 px-5 md:px-10">
            <Link to='/' className="flex-shrink-0">
                <img src='/c4plogo.png' className='h-10 w-auto' alt='C4P Logo'></img>
            </Link>
            <div className="flex flex-wrap items-center space-x-4 md:space-x-8">
                <Link onMouseEnter={() => handleMouseEnter('programs')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/programs'>Programs</Link>
                <Link onMouseEnter={() => handleMouseEnter('about')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/about'>About Us</Link>
                <Link onMouseEnter={() => handleMouseEnter('involved')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/financialcontribution'>Get Involved</Link>
                <Link className='bg-white text-black text-xl rounded flex items-center px-4 py-2 hover:bg-gray-300' to="/login">
                    <FaUser size={20} className='mr-2' />
                    Log In
                </Link>
            </div>
        </div>
        {isMenuVisible && (
            <div className='absolute top-14 right-0 z-5 bg-white w-full md:w-auto rounded m-2 shadow-lg'>
                {dropdownContent}
            </div>
        )}
    </div>
);
}