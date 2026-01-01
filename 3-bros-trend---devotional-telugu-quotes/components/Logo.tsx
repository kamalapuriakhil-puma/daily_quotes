
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-xl select-none">
        3 BROS
      </div>
      <div className="text-lg md:text-xl font-light tracking-[0.3em] text-white/90 uppercase mt-[-0.5rem] select-none">
        Trend
      </div>
      <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full mt-2 shadow-lg" />
    </div>
  );
};

export default Logo;
