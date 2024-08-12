// import { Router, NavLink, Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { FaUsers, FaBars} from 'react-icons/fa';
// import { FaMagnifyingGlass } from 'react-icons/fa6';
// // import DropdownMenu from './dropdown';

// //import history from 'history';
// export default function Navbar() {
//     const [isMenuVisible, setMenuVisible] = useState(false);
//     const [dropdownContent, setDropdownContent] = useState([]);

//     const dropdownItems = {
//         Programs: ['Refurbished Devices', 'Digital Skills Courses', 'EWaste Recycling'],
//         About: ['Mission & History', 'Press & Media', 'Team', 'Careers'],
//         Get_Involved: ['Donate Today', 'Volunteer', 'Become a Drop-Off Site']
//     };

//     function handleMouseEnter(items) { 

//     let dropCont = null;

//     if (items === 'programs') {
//         dropCont =
//         <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
//             <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
//                 <li><Link to="/refurbished" className="hover:text-c4p">Refurbished Devices</Link></li>
//                 <li><Link to="/DSClasses" className="hover:text-c4p">Digital Skills Courses</Link></li>
//                 <li><Link to="/ewaste" className="hover:text-c4p">EWaste Recycling</Link></li>
//             </ul>
//             <div className='flex flex-col justify-between items-center'>
//                 <img src="nav/applyforcomputer.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
//                 <p className='text-center'>Fill out an application for a refurbished device.</p>
//                 <Link to="/refurbished" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Apply for a Computer</Link>
//             </div>
//         </div>
//     }
//         if (items === 'about') {
//             dropCont =
//             <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
//         <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
//             <li><Link to="/about" className="hover:text-c4p">Mission & History</Link></li>
//             <li><Link to="/press" className="hover:text-c4p">Press & Media</Link></li>
//             <li><Link to="/team" className="hover:text-c4p">Team</Link></li>
//             <li><Link to="/careers" className="hover:text-c4p">Careers</Link></li>
//         </ul>
//         <div className='flex flex-col justify-between items-center'>
//             <img src="nav/checkmark.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
//             <p className='text-center'>Check status, schedule a pickup or enroll in a class!</p>
//             <Link to="/login" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Create Account/Login</Link>
//         </div>
//     </div>
//     }
//         if (items === 'involved'){
//             dropCont = 
//             <div className='h-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
//         <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 md:border-r-2 border-black'>
//             <li><Link to="/about" className="hover:text-c4p">Donate Today</Link></li>
//             <li><Link to="/press" className="hover:text-c4p">Volunteer</Link></li>
//             <li><Link to="/team" className="hover:text-c4p">Become a Drop-Off Site</Link></li>
//         </ul>
//         <div className='flex flex-col justify-between items-center'>
//             <img src="nav/ewaste.png" alt="Promotional" className="h-20 w-20 object-cover rounded mb-2"/>
//             <p className='text-center'>Schedule a pickup to collect your unused electronics.</p>
//             <Link to="/ewaste" className='bg-c4p text-black px-5 py-2 rounded mt-2'>Donate your Ewaste</Link>
//         </div>
//     </div>
//     }
//         setDropdownContent(dropCont);
//         setMenuVisible(true)
//      };

//     const handleMouseLeave = () => { setMenuVisible(false) };
//     return (
//         <div className='fixed z-10 w-full bg-gradient-to-b from-black' onMouseLeave={handleMouseLeave}>
//         <div className="flex justify-between items-center h-16 px-5 md:px-10">
//             <Link to='/' className="flex-shrink-0">
//                 <img src='/c4plogo.png' className='h-10 w-auto' alt='C4P Logo'></img>
//             </Link>

//             <button onClick={() => setMenuVisible(!isMenuVisible)} className="md:hidden">
//                 <FaBars size={40} className='text-white'></FaBars>
//             </button>
//             <div className={`flex flex-col md:flex-row ${isMenuVisible ? 'block' : 'hidden'} md:flex items-center space-x-4 md:space-x-8`}>
//                 <Link onMouseEnter={() => handleMouseEnter('programs')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/programs'>Programs</Link>
//                 <Link onMouseEnter={() => handleMouseEnter('about')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/about'>About Us</Link>
//                 <Link onMouseEnter={() => handleMouseEnter('involved')} className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black' to='/financialcontribution'>Get Involved</Link>
//                 <Link className='bg-white text-black text-xl rounded flex items-center px-4 py-2 hover:bg-gray-300' to="/login">
//                     Log In
//                 </Link>
//             </div>
//         </div>
//         {isMenuVisible && (
//             <div className='absolute top-14 right-0 z-5 bg-white w-full md:w-auto rounded m-2 shadow-lg'>
//                 {dropdownContent}
//             </div>
//         )}
//     </div>
// );
// }

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

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
            <li><Link to="/impact" className="hover:text-c4p">Impact</Link></li>
            <li><Link to="/press" className="hover:text-c4p">Press & Media</Link></li>
            <li><Link to="/team" className="hover:text-c4p">Team</Link></li>
            <li><a href="https://computers4people.zohorecruit.com/jobs/Careers" className="hover:text-c4p">Careers</a></li>
            <li><Link to="/socialmedia" className="hover:text-c4p">Social Media</Link></li>
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
            <li><Link to="/financialdonation" className="hover:text-c4p">Donate Today</Link></li>
            <li><Link to="/volunteer" className="hover:text-c4p">Volunteer</Link></li>
            <li><Link to="/ewastedropoff" className="hover:text-c4p">Become a Drop-Off Site</Link></li>
            <li><Link to="/contact" className="hover:text-c4p">Contact Us</Link></li>
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
        <div className='fixed z-10 w-full bg-gradient-to-b from-black text-white'>
            <div className="flex justify-between items-center h-16 px-5 md:px-10">
                <Link to='/' className="flex-shrink-0">
                    <img src='/c4plogo.png' className='h-10 w-auto' alt='C4P Logo'></img>

                </Link>

                <button onClick={() => setMenuVisible(!isMenuVisible)} className="md:hidden">
                    <FaBars size={30} className='text-white'></FaBars>
                </button>
                <div className="hidden md:flex items-center space-x-4 md:space-x-8">
                    {menuItems.map(item => (
                        <div key={item.key} className="relative"
                            onMouseEnter={() => setActiveDropdown(item.key)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black'
                                to={item.path}
                            >
                                {item.name}
                            </Link>
                            {activeDropdown === item.key && (
                                <div className='absolute top-full left-0 bg-white text-black shadow-lg w-screen mt-2 z-20'>
                                    {renderDropdownContent(item.key)}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link className='bg-white text-black text-xl rounded flex items-center px-4 py-2 hover:bg-gray-300' to="/login">
                        Log In
                    </Link>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuVisible && (
                <div className='md:hidden bg-white text-black'>
                    {menuItems.map(item => (
                        <div key={item.key} className="border-t border-gray-200">
                            <button
                                onClick={() => toggleDropdown(item.key)}
                                className='w-full text-left px-4 py-2 flex justify-between items-center hover:bg-gray-100'
                            >

{/* this is another change */}
                                <span>{item.name}</span>
                                <span>{openDropdowns[item.key] ? '-' : '+'}</span>
                            </button>
                            {openDropdowns[item.key] && (
                                <div className='bg-gray-50 px-4 py-2'>
                                    {renderDropdownContent(item.key)}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="border-t border-gray-200">
                        <Link className='w-full block text-left px-4 py-2 hover:bg-gray-100' to="/login">
                            Log In
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

