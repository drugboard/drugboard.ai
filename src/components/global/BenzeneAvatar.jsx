"use client";

import React from 'react';

const BenzeneAvatar = ({ imageUrl = '/api/placeholder/200/200', size = "w-[80px] h-[80px]" }) => {

  // Using a smoother hexagon shape with rounded corners
  const roundedHexagon = `polygon(
    50% 2%, 
    90% 24%, 
    90% 76%, 
    50% 98%, 
    10% 76%, 
    10% 24%
  )`;

  return (
    <div className={`relative ${size} `}>
      {/* Main container with rounded corners */}
      <div className="w-full h-full rounded-2xl overflow-hidden">
        {/* Image container with hexagon clip */}
        <div 
          className="relative w-full h-full overflow-hidden rounded-2xl" 
          style={{
            clipPath: roundedHexagon
          }}
        >
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover overflow-hidden"
          />
        </div>

        {/* Border overlay with same clip-path */}
        <div 
          className="absolute inset-0 border-2 border-gray-700 rounded-2xl"
          style={{
            clipPath: roundedHexagon
          }}
        />
      </div>
    </div>
  );
};

export default BenzeneAvatar;