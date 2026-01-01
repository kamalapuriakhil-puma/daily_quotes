
import React, { useState, useEffect } from 'react';
import { TEMPLE_IMAGES } from '../constants';

const BackgroundSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEMPLE_IMAGES.length);
    }, 8000); // Change image every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {TEMPLE_IMAGES.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* 
              Refined Ken Burns Effect:
              - Slower, more subtle zoom (1.07 instead of 1.1)
              - Minimal translation for a focused look
              - Increased duration for a smoother drift
            */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[15000ms] ease-out ${
                  isActive ? 'scale-105 translate-x-1 translate-y-1' : 'scale-100 translate-x-0 translate-y-0'
              }`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
            {/* Sophisticated Overlay for Depth and Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-black/10 backdrop-brightness-90" />
          </div>
        );
      })}
    </div>
  );
};

export default BackgroundSlider;
