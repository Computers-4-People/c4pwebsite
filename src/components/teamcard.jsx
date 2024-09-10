import React from 'react';

const TeamCard = ({ name, title, company, photo }) => {
    return (
        <div className="flex flex-col border-2 border-white p-4">
            <img src={photo} alt={name} className="w-full h-48 object-cover mb-4" />
            <div className="flex-1 bg-white p-4 border-t-4 border-white">
                <h3 className="font-bold">{name}</h3>
                <p>{title}</p>
                <p>{company}</p>
            </div>
        </div>
    );
};

export default TeamCard;
