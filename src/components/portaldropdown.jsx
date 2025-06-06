import React from 'react';
import PortalButton from './portalbutton';

const PortalDropdown = ({type, applicantType}) => {
    console.log(applicantType, type);

    /// ??? ;0  
    
    let name = "";
    let page = "";
   // let applicantType = "";

    if (applicantType === 'Computer Donations') {
        name = 'Computer Donations';
        page = 'Computer Donations';
    } else if (applicantType === 'Contacts') {
        name = 'Computer Applications'; 
        page = 'Contacts';
       // applicantType = 'Contacts';

    }
    console.log(name, page);

    



    return (
        <div className="w-full md:w-64 space-y-2">
            
            <div className="flex flex-col gap-2">
                <PortalButton type={type} page={"Champions"} onClick="/champions">Champion</PortalButton>
                <PortalButton type={type} page={page} onClick="/portal">{name}</PortalButton>
            </div>
        </div>
    );
};

export default PortalDropdown;