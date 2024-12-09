import React from 'react';

const HumanFaceBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <img 
        src='pic1.jpg'
        alt="Human Face Outline" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HumanFaceBackground;