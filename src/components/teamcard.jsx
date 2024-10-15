import React from 'react';

const TeamCard = ({ name, title, company, photo, link }) => {
    // Handle the card's structure and make it clickable if a link is provided.
    const Wrapper = link ? 'a' : 'div';  // Use <a> if a link is provided, otherwise <div>

    return (
        <Wrapper
            href={link || '#'}
            target={link ? '_blank' : undefined}
            rel={link ? 'noopener noreferrer' : undefined}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 mx-auto h-full flex flex-col cursor-pointer"
        >
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
        </Wrapper>
    );
};

const TeamGrid = ({ teamMembers }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
            {teamMembers.map((member, index) => (
                <TeamCard 
                    key={index}
                    name={member.name}
                    title={member.title}
                    company={member.company}
                    photo={member.photo}
                    link={member.link}  // Pass the link for clickability
                />
            ))}
        </div>
    );
};

export default TeamGrid;
