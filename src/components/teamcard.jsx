import React from 'react';

const TeamCard = ({ name, title, company, photo }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 mx-auto h-full flex flex-col">
            {/* Image Section */}
            <div className="w-full h-64 overflow-hidden flex-shrink-0">
                <img 
                    src={photo} 
                    alt={name} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Section */}
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                    <p className="text-gray-600 text-md">{title}</p>
                    {company && <p className="text-gray-500 text-sm mt-1">{company}</p>}
                </div>
            </div>
        </div>
    );
};

const TeamGrid = ({ teamMembers }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
            {teamMembers.map((member, index) => (
                <div className="h-full">
                    <TeamCard 
                        key={index} 
                        name={member.name} 
                        title={member.title} 
                        company={member.company} 
                        photo={member.photo} 
                    />
                </div>
            ))}
        </div>
    );
};

export default TeamGrid;
