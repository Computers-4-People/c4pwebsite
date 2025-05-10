import React from 'react';

const TeamCard = ({ name, title, company, photo, link }) => {
    const Wrapper = link ? 'a' : 'div';

    return (
        <Wrapper
            href={link || '#'}
            target={link ? '_blank' : undefined}
            rel={link ? 'noopener noreferrer' : undefined}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 cursor-pointer flex flex-col h-[350px]" // Adjust total height as needed
        >
            {/* Larger Image Section */}
            <div className="w-full h-60 overflow-hidden">
                <img 
                    src={photo} 
                    alt={name} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Section */}
            <div className="p-4 text-center flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                    <p className="text-gray-600 text-sm">{title}</p>
                    {company && <p className="text-gray-500 text-xs mt-1">{company}</p>}
                </div>
            </div>
        </Wrapper>
    );
};

const TeamGrid = ({ teamMembers }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8">
            {teamMembers.map((member, index) => (
                <TeamCard 
                    key={index}
                    name={member.name}
                    title={member.title}
                    company={member.company}
                    photo={member.photo}
                    link={member.link}
                />
            ))}
        </div>
    );
};

export default TeamGrid;
