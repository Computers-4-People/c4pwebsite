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
        Programs: ['Refurbished Devices', 'Digital Skills Courses', 'E-Waste Recycling'],
        About: ['Our Story', 'Mission', 'Vision', 'Values'],
        Get_Involved: ['Make a financial contribution', 'Volunteer', 'Become a Drop-Off Site']
    };
    function handleMouseEnter(items) { 
        let dropCont;
        if (items[0] === 'Refurbished Devices'){
            dropCont = 
            <div className='w- h-48 p-5 grid grid-cols-2 justify-end'>
                <ul className='h-full flex flex-col justify-between text-l font-bold font-sans border-r-2 border-black '>
                    <li>Refurbished Devices</li>
                    <li>Digital Skills Courses</li>
                    <li>Ewaste Recycling</li>
                </ul>
                <div className='px-5 self-end'>
                    <p className=''>Fill out an application for a refurbished device.</p>
                    <Link></Link>
                </div>
            </div>
        }
        if (items[0] === 'Our Story') {
            dropCont=
            <div className='h-48 p-5 grid gap-5 grid-cols-5' style={{width: '50vw'}}>
                    <div>
                        <ul className='h-full flex flex-col justify-between'>
                            <li>Mission & History</li>
                            <li>Our Story</li>
                            <li>Mission</li>
                            <li>Vision</li>
                            <li>Values</li>
                        </ul>
                    </div>
                    <div>
                    <ul className='h-full flex flex-col justify-between'>
                        <li>Press & Media</li>
                        <li>Team Members</li>
                        <li>Board Members</li>
                        <li>Headquarters</li>
                        <li>Massachusetts</li>
                    </ul>
                </div>
                <div className='font-bold border-r-2'>Careers</div>
                <div className='col-span-2 flex flex-col justify-end p-2 pb-4'>
                    <p className='mx-10 text-center text-l'>Check status, schedule a pickup or enroll in a class!</p>
                    <span className= 'mx-5 inline-block flex justify-center'><Link className='bg-green-500 px-2 rounded text-xl'>Create Account/Login</Link></span>
                </div>
            </div>
            if (items[0] === 'Make a financial contribution'){
                
            }
        } 

        setDropdownContent(dropCont);
        setMenuVisible(true)
     };
    const handleMouseLeave = () => { setMenuVisible(false) };

    return (
        <div className='fixed z-10 w-full"'onMouseLeave={handleMouseLeave}>
            <div className="bg-gray-900 fixed z-10 w-full">
                {/* <NavLink to={"/apply"}>Apply For A Computer </NavLink> */}
                {/* <div> Computers4People </div> */}
                <img src='c4plogo.png' className='fixed ml-3 mt-3 left-0 h-20' />
                    <div class='flex justify-end items-center relative space-x-20 h-20 mr-10'>
                    {/* <img src='c4plogo.png' className='position absolute ml-3 mt-3 left-0 h-20' /> */}
                        <Link onMouseEnter={() => handleMouseEnter(dropdownItems['Programs'])} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/apply'>Programs</Link>
                        <Link onMouseEnter={() => handleMouseEnter(dropdownItems['About'])} class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/programs'>About us</Link>
                        <Link class='m-1 px-2 rounded text-white text-xl hover:bg-[#0FE006] hover:text-black'to='/volunteer'>Get Involved</Link>
                        <Link className='bg-white text-xl rounded grid grid-cols-2 justify-items-center pr-5'> <FaUser size={20} className='mt-1'/>  Log In</Link>
                    </div>
                    
            </div>
            <div class='fixed top-20 right-0 z-5'>
            {/* {isMenuVisible && <DropdownMenu/>} */}
            {/* text-bold flex flex-col w-96  */}
            {isMenuVisible && (<div onMouseEnter={() => setMenuVisible(true)} className='bg-white w-auto rounded m-2'> 
                {/* {dropdownContent.map((item) => (<Link className='m-2 ml-10 w-40'>{item}</Link>))} */}
                {dropdownContent}
            </div>)}
            </div>
        </div>
    )
}