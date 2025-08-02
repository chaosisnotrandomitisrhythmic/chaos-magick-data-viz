import React from 'react';

const TOPYLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="photocopy-effect"
      >
        {/* Psychick Cross */}
        <g transform="translate(100, 100)">
          {/* Outer circle */}
          <circle r="90" stroke="black" strokeWidth="3" fill="none" />
          
          {/* Inner cross with equal arms */}
          <line x1="0" y1="-70" x2="0" y2="70" stroke="black" strokeWidth="8" />
          <line x1="-70" y1="0" x2="70" y2="0" stroke="black" strokeWidth="8" />
          
          {/* Center circle */}
          <circle r="15" stroke="black" strokeWidth="3" fill="black" />
          
          {/* Three dots forming triangle */}
          <circle cx="0" cy="-40" r="5" fill="black" />
          <circle cx="-35" cy="20" r="5" fill="black" />
          <circle cx="35" cy="20" r="5" fill="black" />
        </g>
      </svg>
      
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold tracking-widest">THEE TEMPLE OV</h1>
        <h1 className="text-2xl font-bold tracking-widest">PSYCHICK YOUTH</h1>
        <div className="mt-2 text-xs font-mono tracking-wider">
          <p>23 : NOTHING IS TRUE</p>
          <p>EVERYTHING IS PERMITTED</p>
        </div>
      </div>
    </div>
  );
};

export default TOPYLogo;