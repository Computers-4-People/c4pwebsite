import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PortalDropdown from '../components/portaldropdown';

function Champions() {
    const championResp = JSON.parse(sessionStorage.getItem('championResp')) || [];
    
    console.log(championResp);


    const [userData, setUserData] = useState({
        firstName: '' || championResp.First_Name,    
        lastName: '' || championResp.Last_Name,
        title: '' || championResp.title,
        email: '' || championResp.Email,
        phone: '' || championResp.Phone_1,
        address: '' || championResp.Address,
        aptSuiteUnit: '' || championResp.aptSuiteUnit,
        city: '' || championResp.City,
        stateRegion: '' || championResp.State,
        country: '' || championResp.Country,
        roles: [] 
    });

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/portal?recordId=${championResp.id}`);
    };

    console.log(userData);

    return (
        
      <div className="flex flex-col min-h-screen">
      

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full mt-20">
        {/* Welcome Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-black">Welcome back, {userData.firstName}</h1>
          <p className="text-gray-700">We created this portal specifically for you.</p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-2">
          <div>
          <PortalDropdown className="flex-shrink-0" type={"Champions"} recordId={championResp.id}/>
          </div>
          </div>

          



          {/* Center Profile Section */}
          <div className="flex-grow bg-green-50 p-6 rounded-lg relative">
            <div className="flex flex-col items-center mb-8">
              {/* Profile image with notification dot */}
              <div className="relative mb-4">
                <div className="w-36 h-36 bg-green-400 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Simple avatar illustration */}
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="200" height="200" fill="#8CE99A" />
                      <path
                        d="M100 120C83 120 70 100 70 80C70 60 83 50 100 50C117 50 130 60 130 80C130 100 117 120 100 120Z"
                        fill="#5F3DC4"
                      />
                      <path d="M100 130C120 130 140 140 140 160H60C60 140 80 130 100 130Z" fill="#5F3DC4" />
                      <path
                        d="M100 120C90 120 80 110 80 95C80 80 90 70 100 70C110 70 120 80 120 95C120 110 110 120 100 120Z"
                        fill="5F3DC4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-1">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600">{userData.roles.join(", ")}</p>

              {/* Notification dots */}
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">First Name:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">{userData.firstName}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Address:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center text-xs">{userData.address || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Last Name:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">{userData.lastName}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Apt/Suite/Unit:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">
                    {userData.aptSuiteUnit || ""}
                  </div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Title:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">{userData.title || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">City:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">{userData.city || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Email:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center text-[9px]">{userData.email || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">State/Region:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">
                    {userData.stateRegion || ""}
                  </div>
                  <button className="text-gray-600">
                   
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Phone:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center text-xs">{userData.phone || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Country:</span>
                <div className="flex items-center">
                  <div className="bg-green-300 px-4 py-1 rounded mr-2 w-40 text-center">{userData.country || ""}</div>
                  <button className="text-gray-600">
                    
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium mb-2">We thought you may be interested...</h3>
              <div className="bg-gray-100 h-32 rounded-lg mb-4"></div>
              <div className="bg-gray-100 h-32 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>

      

    </div>
    );
}

export default Champions;