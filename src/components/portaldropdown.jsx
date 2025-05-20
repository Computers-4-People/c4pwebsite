import React from 'react';
import PortalButton from './portalbutton';

const PortalDropdown = ({type}, {recordId}) => {
    return (
        <div className="w-full md:w-64 space-y-2">
            
            <div className="flex flex-col gap-2">
                <PortalButton type={type} page={"Champions"} onClick="/champions" recordId={recordId}>Champion</PortalButton>
                <PortalButton type={type} page={"Computer Donations"} onClick="/portal" recordId={recordId}>Computer Donations</PortalButton>
                <PortalButton type={type} page={"Contacts"} onClick="/applications" recordId={recordId}>Computer Applications</PortalButton>
            </div>
        </div>
    );
};

export default PortalDropdown;