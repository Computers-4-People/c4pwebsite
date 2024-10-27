import React from 'react';

function ProgressBar({ status }) {
    const stages = [
        { label: "Application Submitted", zohoStatus: "Applicants No Recommendation" },
        { label: "Recommendation Received", zohoStatus: "" },
        { label: "Pending Review", zohoStatus: "Applicants to approve" },
        { label: "Application Denied", zohoStatus: "Denied Applicant" },
        { label: "Application Approved", zohoStatus: "Approved Applicants" },
        { label: "Delivered", zohoStatus: "Client" }
    ];

    const stageIndex = stages.findIndex(stage => stage.zohoStatus === status);
    const highlightColor = status === "Denied Applicant" ? 'bg-red-500' : 'bg-c4p';

    return (
        <div className="flex justify-between mt-4 w-full max-w-4xl mx-auto space-x-1">
            {stages.map((stage, index) => (
                <div
                    key={index}
                    className={`flex-1 flex flex-col items-center justify-center text-center text-[10px] lg:text-[12px] font-semibold py-1
                        ${index <= stageIndex ? `${highlightColor} text-white` : 'bg-gray-200 text-gray-600'}
                        ${index === stageIndex ? 'scale-105 shadow-lg border border-black' : ''}`
                    }
                    style={{
                        transition: 'transform 0.3s ease',
                        padding: '2px 4px',
                        minWidth: 'auto',
                    }}
                >
                    <span className="leading-tight">{stage.label}</span>
                </div>
            ))}
        </div>
    );
}

export default ProgressBar;
