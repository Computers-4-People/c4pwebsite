import React from 'react';
import PortalButton from './portalbutton';

const PortalDropdown = ({type, applicantType}) => {

    
    let name = "";

    if (applicantType === 'Computer Donations') {
        name = 'Computer Donations';
    } else if (applicantType === 'Contacts') {
        name = 'Computer Applications';
    }

    return (
        <div className="w-full md:w-64 space-y-2">
            
            <div className="flex flex-col gap-2">
                <PortalButton type={type} page={"Champions"} onClick="/champions">Champion</PortalButton>
                <PortalButton type={type} page={"Computer Donations"} onClick="/portal">{name}</PortalButton>
            </div>
        </div>
    );
};

export default PortalDropdown;