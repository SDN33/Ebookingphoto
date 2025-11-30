import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PortfolioItem } from '../types';

interface DiagonalFeedProps {
  items: PortfolioItem[];
}

export const DiagonalFeed: React.FC<DiagonalFeedProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Configuration for the "Snap" feel
  const COOLDOWN = 600; // ms between scrolls
  
  // Transition styles
  const TRANSITION_CSS = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = useCallback(() => {
    if (activeIndex < items.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex, items.length]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  }, [activeIndex]);

  // Event Listeners for Custom Scroll (Desktop Only)
  useEffect(() => {
    if (isMobile) return; // Do not hijack scroll on mobile

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN) return;

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) goNext();
        else goPrev();
        lastScrollTime.current = now;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const now = Date.now();
      
      if (now - lastScrollTime.current < COOLDOWN) return;

      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev, isMobile]);

  // Helper to determine style based on relative position (Desktop Only)
  const getDesktopStyle = (offset: number) => {
    let transform = '';
    let opacity = 0;
    let zIndex = 0;
    
    // Desktop: Left column is 45vw wide
    const BASE_WIDTH = '45vw';
    const BASE_HEIGHT = '100vh'; 

    if (offset === 0) {
      // Active: Left Side, Full Size
      transform = 'translate3d(0, 0, 0) scale(1)';
      opacity = 1;
      zIndex = 30;
    } else if (offset === 1) {
      // Next: Middle, 75% Scale
      transform = 'translate3d(48vw, 35vh, 0) scale(0.75)';
      opacity = 1;
      zIndex = 20;
    } else if (offset === 2) {
      // Future: Right, 50% Scale
      transform = 'translate3d(85vw, 55vh, 0) scale(0.5)';
      opacity = 1;
      zIndex = 10;
    } else if (offset < 0) {
      // Past: Exiting Top Left
      transform = 'translate3d(-50vw, -20vh, 0) scale(1.1)';
      opacity = 0;
      zIndex = 0;
    } else {
      // Far Future: Waiting Bottom Right
      transform = 'translate3d(120vw, 100vh, 0) scale(0.4)';
      opacity = 0;
      zIndex = 0;
    }

    return {
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      transform,
      opacity,
      zIndex,
      transition: TRANSITION_CSS,
    };
  };

  // --- MOBILE RENDER (Simple Gallery) ---
  if (isMobile) {
    return (
      <div className="w-full h-full overflow-y-auto bg-[#fdfdfd] pt-28 pb-12 px-6">
        {items.map((item) => (
          <div key={item.id} className="mb-20 flex flex-col group">
            <div className="w-full aspect-[3/4] overflow-hidden mb-6 bg-gray-100 relative">
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 border-l border-gray-300 pl-3">
                    {item.category}
                </span>
                <h2 className="text-3xl font-serif italic text-gray-900 leading-none">
                    {item.title}
                </h2>
            </div>
          </div>
        ))}
         {/* Footer spacer */}
         <div className="h-10 flex items-center justify-center text-xs text-gray-300 uppercase tracking-widest">
            End of Gallery
         </div>
      </div>
    );
  }

  // --- DESKTOP RENDER (Diagonal Carousel) ---
  return (
    <div className="fixed inset-0 w-full h-full bg-[#fdfdfd] overflow-hidden">
      {/* Render Items */}
      {items.map((item, index) => {
        const offset = index - activeIndex;
        // Optimization: Only render items relevant to the animation
        if (offset < -1 || offset > 3) return null;

        const style = getDesktopStyle(offset);

        return (
          <div
            key={item.id}
            className="absolute top-0 left-0 origin-top-left will-change-transform flex flex-col shadow-2xl"
            style={style}
          >
            {/* Image Container */}
            <div className="w-full h-full bg-gray-200 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{
                    // Counter-scale parallax effect inside the image
                    transform: `scale(1.2) translate(${offset * -2}%, ${offset * -2}%)`,
                    transition: TRANSITION_CSS
                }}
              />
              
              {/* Overlay Content - Only visible when Active (0) or Next (1) */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10 transition-opacity duration-500"
                style={{ opacity: offset > 1 ? 0 : 1 }}
              >
                 <span className="text-white/80 text-xs tracking-[0.2em] uppercase border-l-2 border-white/50 pl-3 mb-2">
                    {item.category}
                 </span>
                 <h2 className="text-white text-5xl font-serif italic">
                    {item.title}
                 </h2>
              </div>
            </div>
          </div>
        );
      })}

      {/* Description Text - Positioned top right */}
      {items.map((item, index) => {
        const offset = index - activeIndex;
        if (offset !== 0) return null;

        return (
          <div
            key={`desc-${item.id}`}
            className="absolute top-32 right-12 max-w-md transition-all duration-700 delay-200 z-40 pointer-events-none"
            style={{ 
                opacity: 1,
                transform: 'translateY(0)'
            }}
          >
            <p className="text-gray-400 text-sm leading-relaxed font-light text-right">
               A stunning example of {item.category.toLowerCase()} photography. <br/>
               {index + 1}/{items.length}
            </p>
          </div>
        );
      })}
    </div>
  );
};