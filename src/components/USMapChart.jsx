import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State abbreviation to full name mapping
const stateNames = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
    "DC": "District of Columbia"
};

// Full name to abbreviation mapping (reverse)
const stateAbbreviations = Object.fromEntries(
    Object.entries(stateNames).map(([abbr, name]) => [name, abbr])
);

const USMapChart = ({ byState = [], recentDonations = [] }) => {
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Create a map of state data by full state name
    const stateDataMap = {};
    byState.forEach(stateData => {
        const stateName = stateData.state;
        // Try to match by full name first, then try as abbreviation
        if (stateName && stateName !== 'Unknown') {
            stateDataMap[stateName] = stateData;
            // Also map the abbreviation if we have the full name
            const abbr = stateAbbreviations[stateName];
            if (abbr) {
                stateDataMap[abbr] = stateData;
            }
        }
    });

    // Find max donations for color scaling
    const maxDonations = Math.max(...byState.map(s => s.computersDonated || 0), 1);

    // Get color based on donation count
    const getColor = (geo) => {
        const stateName = geo.properties.name;
        const stateData = stateDataMap[stateName];

        if (!stateData || stateData.computersDonated === 0) {
            return "#E5E7EB"; // Gray for no data
        }

        // Scale from light green to dark green based on donation count
        const intensity = (stateData.computersDonated / maxDonations);

        if (intensity > 0.7) return "#007029"; // Dark green
        if (intensity > 0.4) return "#00a33b"; // Medium green
        if (intensity > 0.2) return "#00d64e"; // Brand green
        return "#7ee89d"; // Light green
    };

    const handleMouseEnter = (geo, event) => {
        const stateName = geo.properties.name;
        const stateData = stateDataMap[stateName];

        if (stateData) {
            setTooltipContent(
                `${stateName}: ${stateData.computersDonated.toLocaleString()} computers (${stateData.companies} ${stateData.companies === 1 ? 'company' : 'companies'})`
            );
        } else {
            setTooltipContent(`${stateName}: No donations yet`);
        }

        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
        setTooltipContent("");
    };

    return (
        <div className="relative w-full">
            <ComposableMap
                projection="geoAlbersUsa"
                className="w-full h-auto"
                style={{ maxWidth: "100%", height: "auto" }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={getColor(geo)}
                                stroke="#FFFFFF"
                                strokeWidth={0.5}
                                onMouseEnter={(event) => handleMouseEnter(geo, event)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    default: { outline: "none" },
                                    hover: {
                                        fill: "#00280e",
                                        outline: "none",
                                        cursor: "pointer"
                                    },
                                    pressed: { outline: "none" }
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Show markers for recent donations if provided */}
                {recentDonations && recentDonations.length > 0 && recentDonations.map((donation, i) => (
                    donation.coordinates && (
                        <Marker key={i} coordinates={donation.coordinates}>
                            <circle r={4} fill="#FF6B6B" stroke="#fff" strokeWidth={1} />
                        </Marker>
                    )
                ))}
            </ComposableMap>

            {/* Tooltip */}
            {tooltipContent && (
                <div
                    className="fixed z-50 bg-black text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none"
                    style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y + 10}px`,
                        maxWidth: "250px"
                    }}
                >
                    {tooltipContent}
                </div>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-4 flex-wrap text-sm">
                <span className="text-gray-600 font-semibold">Computers Donated:</span>
                <div className="flex items-center gap-1">
                    <div className="w-6 h-4 rounded" style={{ backgroundColor: "#E5E7EB" }}></div>
                    <span className="text-gray-700">None</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-6 h-4 rounded" style={{ backgroundColor: "#7ee89d" }}></div>
                    <span className="text-gray-700">Low</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-6 h-4 rounded" style={{ backgroundColor: "#00d64e" }}></div>
                    <span className="text-gray-700">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-6 h-4 rounded" style={{ backgroundColor: "#00a33b" }}></div>
                    <span className="text-gray-700">High</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-6 h-4 rounded" style={{ backgroundColor: "#007029" }}></div>
                    <span className="text-gray-700">Very High</span>
                </div>
            </div>
        </div>
    );
};

export default USMapChart;
