import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState(location)
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // For desktop hover
    const [openDropdowns, setOpenDropdowns] = useState({}); // For mobile clicks
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);

        setMenuVisible(false)
        setOpenDropdowns({})
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };


    }, [location]);

    // Function to toggle dropdowns in mobile view
    const toggleDropdown = (key) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        setMenuVisible(false);
    };

    // Menu items definition
    const menuItems = [
        {
            name: 'Programs',
            path: '/programs',
            key: 'programs',
            dropdownContent: (
                <div className='h-full'>
                    <ul className='h-full flex flex-col justify-around text-l font-bold font-sans border-b-2 md:border-b-0 border-black'>
                        <Link to="/apply" className="hover:text-c4p" onClick={closeMobileMenu}>Apply for a Computer</Link>
                        <Link to="/DSClasses" className="hover:text-c4p" onClick={closeMobileMenu}>Digital Skills Courses</Link>
                        <Link to="/donate" className="hover:text-c4p" onClick={closeMobileMenu}>Donate Computers</Link>
                    </ul>
                </div>
            )
        },
        {
            name: 'About Us',
            path: '/about',
            key: 'about',
            dropdownContent: (
                <div className='h-full'>
                    <ul className='h-full flex flex-col justify-evenly text-l font-bold font-sans border-b-2 md:border-b-0 border-black'>
                        <Link to="/about" className="hover:text-c4p" onClick={closeMobileMenu}>Mission & History</Link>
                        <Link to="/press" className="hover:text-c4p" onClick={closeMobileMenu}>Press & Media</Link>
                        <Link to="/team/" className="hover:text-c4p" onClick={closeMobileMenu}>Team</Link>
                        {/* <Link to="/impact" className="hover:text-c4p" onClick={closeMobileMenu}>Impact</Link> */}
                        <Link to="/socialmedia" className="hover:text-c4p" onClick={closeMobileMenu}>Social Media</Link>
                        <Link to="https://careers.computers4people.org" className="hover:text-c4p" onClick={closeMobileMenu}>Careers</Link>
                    </ul>
                </div>
            )
        },
        {
            name: 'Get Involved',
            path: '/financialdonation',
            key: 'involved',
            dropdownContent: (
                <div className='h-full'>
                    <ul className='h-full flex flex-col justify-evenly text-l font-bold font-sans border-b-2 md:border-b-0 border-black'>
                        <Link to="/support" className="hover:text-c4p" onClick={closeMobileMenu}>Donate Today</Link>
                        <Link to="/volunteer" className="hover:text-c4p" onClick={closeMobileMenu}>Volunteer</Link>
                        <Link to="/partner" className="hover:text-c4p" onClick={closeMobileMenu}>Partner</Link>
                        <Link to="/ewastedropoff" className="hover:text-c4p" onClick={closeMobileMenu}>Drop-Off Site</Link>
                        <Link to="/contact" className="hover:text-c4p" onClick={closeMobileMenu}>Contact Us</Link>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <div className={`fixed z-50 w-full text-white ${scrollPosition > 750 ? 'bg-black opacity-80' : 'bg-gradient-to-b from-black'}`} onMouseLeave={() => setActiveDropdown(null)}>
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
                        >
                            <Link
                                className='px-3 py-2 rounded text-white text-xl hover:bg-c4p hover:text-black'
                                to={item.path}
                            >
                                {item.name}
                            </Link>
                            {activeDropdown === item.key && (
                                <div className='absolute left-0 pl-5 bg-white text-black shadow-lg mt-2 rounded transition-all duration-300' style={!!activeDropdown ? {height: '30vh', width: '20vw', visibility: "visible"} : {height: '10vh', width: '10vw', visibility: 'invisible'}}>
                                    {item.dropdownContent}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {isMenuVisible && (
                <div className='md:hidden bg-white text-black'>
                    {menuItems.map(item => (
                        <div key={item.key} className="border-t border-gray-200">
                            <button
                                onClick={() => toggleDropdown(item.key)}
                                className='w-full text-left px-4 py-2 flex justify-between items-center hover:bg-gray-100'
                            >
                                <span>{item.name}</span>
                                <span>{openDropdowns[item.key] ? '-' : '+'}</span>
                            </button>
                            {openDropdowns[item.key] && (
                                <div className='bg-gray-50 px-4 py-2'>
                                    {item.dropdownContent}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
