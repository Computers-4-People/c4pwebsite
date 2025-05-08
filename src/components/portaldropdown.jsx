import React from 'react';
import PortalButton from './portalbutton';

const PortalDropdown = ({type}) => {
    return (
        <div className="w-full md:w-64 space-y-2">
            
            <div className="flex flex-col gap-2">
                <PortalButton type={type} page={"Champions"} onClick="/champions">Champion</PortalButton>
                <PortalButton type={type} page={"Computer Donations"} onClick="/portal">Computer Donations</PortalButton>
                <PortalButton type={type} page={"Financial Donations"} onClick="/financial">Financial Donations</PortalButton>
                <PortalButton type={type} page={"Volunteering"} onClick="/volunteering">Volunteering</PortalButton>
                <PortalButton type={type} page={"Contacts"} onClick="/applications">Computer Applications</PortalButton>
                <PortalButton type={type} page={"Recommenders"} onClick="/recommenders">Recommenders</PortalButton>
                <PortalButton type={type} page={"Hotspot Applications"} onClick="/hotspots">Hotspot Applications</PortalButton>
                <PortalButton type={type} page={"Internet Subscriptions"} onClick="/internet">Internet Subscriptions</PortalButton>
                <PortalButton type={type} page={"Grants"} onClick="/grants">Grants</PortalButton>
                <PortalButton type={type} page={"C4P Apps"} onClick="/apps">C4P Apps</PortalButton>
            </div>
        </div>
    );
};

export default PortalDropdown;