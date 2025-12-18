import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-sw-black">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Large Structure Lines */}
      <div className="absolute inset-0 flex justify-between px-[5vw] opacity-[0.08]">
        <div className="w-px h-full bg-white"></div>
        <div className="w-px h-full bg-white"></div>
        <div className="w-px h-full bg-white"></div>
        <div className="w-px h-full bg-white"></div>
      </div>

      {/* Horizontal Scan Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-sw-accent/20 blur-sm animate-scan opacity-20"></div>
    </div>
  );
};

export default GridBackground;