
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { PortfolioItem } from '../types';

interface DiagonalFeedProps {
  items: PortfolioItem[];
}

export const DiagonalFeed: React.FC<DiagonalFeedProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null); // Track opened folder
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  // Drag to scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

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

  // --- SCROLL RESET LOGIC ---
  // Resets the horizontal scroll position whenever a new folder is opened
  useEffect(() => {
      if (reelContainerRef.current) {
          reelContainerRef.current.scrollLeft = 0;
      }
  }, [expandedId]);

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

  // Handle Folder Interactions
  const toggleFolder = (id: number) => {
    if (expandedId === id) {
        setExpandedId(null);
    } else {
        // Only allow expanding the active item on desktop to preserve layout
        // On mobile, allow expanding any item
        if (!isMobile && id !== items[activeIndex].id) {
            return; 
        }
        setExpandedId(id);
    }
  };

  const closeFolder = (e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedId(null);
  };

  // Horizontal Scroll Handler (Vertical Wheel -> Horizontal Scroll) - Desktop Only
  useEffect(() => {
    // FIX: Check for null explicitly, because ID 0 is falsy in JS!
    if (expandedId === null || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default to stop browser history navigation or vertical document scroll
      e.preventDefault();
      
      const reel = reelContainerRef.current;
      if (reel) {
          // KEY FIX: Map the vertical scroll (deltaY) directly to horizontal scroll (scrollLeft)
          // We also include deltaX for users who actually have a horizontal scroll wheel/trackpad
          const scrollSpeed = 1.0; 
          const moveAmount = (e.deltaY + e.deltaX) * scrollSpeed;
          reel.scrollLeft += moveAmount;
      }
    };

    // Attach to window to capture scroll even if mouse is over the left static image or title
    // passive: false is required to use preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [expandedId, isMobile]);

  // Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!reelContainerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - reelContainerRef.current.offsetLeft;
    scrollLeftStart.current = reelContainerRef.current.scrollLeft;
    reelContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (reelContainerRef.current) reelContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (reelContainerRef.current) reelContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !reelContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - reelContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll-fast
    reelContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // Event Listeners for Custom Scroll (Desktop Only - Main Feed)
  useEffect(() => {
    if (isMobile || expandedId !== null) return; // Disable scroll jacking if mobile OR folder is open

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
  }, [goNext, goPrev, isMobile, expandedId]);

  // Helper to determine style based on relative position (Desktop Only)
  const getDesktopStyle = (offset: number) => {
    const isExpanded = expandedId !== null;
    let transform = '';
    let opacity = 0;
    let zIndex = 0;
    
    // Desktop Standard
    const BASE_WIDTH = isExpanded && offset === 0 ? '30vw' : '45vw'; // Shrink main image when expanded
    const BASE_HEIGHT = '100vh'; 

    if (offset === 0) {
      // Active
      if (isExpanded) {
        // Folder Open State: Stick to left
        transform = 'translate3d(0, 0, 0) scale(1)';
      } else {
        // Standard State
        transform = 'translate3d(0, 0, 0) scale(1)';
      }
      opacity = 1;
      zIndex = 30;
    } else if (offset === 1) {
      // Next
      transform = isExpanded ? 'translate3d(100vw, 35vh, 0) scale(0.75)' : 'translate3d(48vw, 35vh, 0) scale(0.75)'; // Fly away if expanded
      opacity = isExpanded ? 0 : 1;
      zIndex = 20;
    } else if (offset === 2) {
      // Future
      transform = isExpanded ? 'translate3d(100vw, 55vh, 0) scale(0.5)' : 'translate3d(85vw, 55vh, 0) scale(0.5)'; // Fly away
      opacity = isExpanded ? 0 : 1;
      zIndex = 10;
    } else if (offset < 0) {
      // Past
      transform = 'translate3d(-50vw, -20vh, 0) scale(1.1)';
      opacity = 0;
      zIndex = 0;
    } else {
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

  // --- MOBILE RENDER (Simple List + Fullscreen Overlay) ---
  if (isMobile) {
    const activeItem = expandedId !== null ? items.find(i => i.id === expandedId) : null;

    return (
      <>
        {/* MAIN LIST VIEW (Hidden/Inactive when folder is open) */}
        <div 
            className={`w-full h-full overflow-y-auto bg-[#fdfdfd] pt-28 pb-12 px-6 no-scrollbar transition-opacity duration-500 ${expandedId !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {items.map((item) => (
            <div key={item.id} className="mb-20 flex flex-col group">
              {/* Main Card */}
              <div 
                  className="w-full aspect-[3/4] overflow-hidden mb-6 bg-gray-100 relative cursor-pointer active:scale-95 transition-transform"
                  onClick={() => toggleFolder(item.id)}
              >
                  <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                  />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                       <span className="text-white text-xs uppercase tracking-widest border border-white px-4 py-2 bg-black/20 backdrop-blur-sm">
                           View Project
                       </span>
                   </div>
              </div>

              {/* Title Block */}
              <div className="flex flex-col items-start mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 border-l border-gray-300 pl-3">
                      {item.category}
                  </span>
                  <h2 className="text-3xl font-serif italic text-gray-900 leading-none">
                      {item.title}
                  </h2>
              </div>
            </div>
          ))}
        </div>

        {/* FULLSCREEN PROJECT OVERLAY */}
        {activeItem && (
            <div className="fixed inset-0 z-[60] bg-[#fdfdfd] overflow-y-auto no-scrollbar animate-[fadeIn_0.4s_ease-out]">
                 {/* Sticky Header Banner */}
                 <div className="sticky top-0 left-0 w-full bg-[#fdfdfd]/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Project Gallery</span>
                        <span className="text-lg font-serif italic text-slate-900 leading-none">{activeItem.title}</span>
                     </div>
                     <button 
                        onClick={() => setExpandedId(null)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors active:scale-90"
                     >
                        {/* X Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                 </div>

                 {/* Vertical Project Images Stack */}
                 <div className="p-6 flex flex-col gap-6 pb-20">
                     {/* Cover Image */}
                     <img src={activeItem.imageUrl} className="w-full h-auto object-cover rounded-sm shadow-sm" alt="Cover" />
                     
                     {/* Project Details */}
                     {activeItem.projectImages.map((img, idx) => (
                         <img key={idx} src={img} className="w-full h-auto object-cover rounded-sm shadow-sm" alt={`Detail ${idx}`} />
                     ))}
                     
                     <div className="pt-8 text-center">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-300">End of Project</span>
                     </div>
                 </div>
            </div>
        )}
      </>
    );
  }

  // --- DESKTOP RENDER (Diagonal Carousel) ---
  const activeItem = items[activeIndex];
  const isExpanded = expandedId !== null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#fdfdfd] overflow-hidden">
      {/* Render Diagonal Items */}
      {items.map((item, index) => {
        const offset = index - activeIndex;
        if (offset < -1 || offset > 3) return null;
        const style = getDesktopStyle(offset);
        const isActive = offset === 0;

        return (
          <div
            key={item.id}
            className={`absolute top-0 left-0 origin-top-left will-change-transform flex flex-col shadow-2xl ${isActive ? 'cursor-pointer' : ''}`}
            style={style}
            onClick={() => isActive && toggleFolder(item.id)}
          >
            {/* Image Container */}
            <div className="w-full h-full bg-gray-200 overflow-hidden relative group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{
                    // Reduce parallax effect when expanded to keep image stable
                    transform: isExpanded && isActive ? 'scale(1) translate(0,0)' : `scale(1.2) translate(${offset * -2}%, ${offset * -2}%)`,
                    transition: TRANSITION_CSS
                }}
              />
              
              {/* Overlay Content */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10 transition-opacity duration-500"
                style={{ opacity: (offset > 1 || (isExpanded && isActive)) ? 0 : 1 }}
              >
                 <span className="text-white/80 text-xs tracking-[0.2em] uppercase border-l-2 border-white/50 pl-3 mb-2">
                    {item.category}
                 </span>
                 <h2 className="text-white text-5xl font-serif italic">
                    {item.title}
                 </h2>
                 {isActive && !isExpanded && (
                     <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                         <span className="text-xs text-white uppercase tracking-widest border border-white/50 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                            Open Project
                         </span>
                     </div>
                 )}
              </div>
            </div>
          </div>
        );
      })}

      {/* PROJECT REEL (Horizontal Scroll) - Desktop Only */}
      <div 
        ref={reelContainerRef}
        className="absolute top-0 right-0 h-full flex items-center overflow-x-auto overflow-y-hidden z-40 transition-all duration-700 no-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
            width: '70vw',
            transform: isExpanded ? 'translateX(0)' : 'translateX(100%)',
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none'
        }}
      >
        <div className="flex h-[80vh] gap-4 pl-10 pr-20 items-center select-none">
             {/* Title Card in Reel */}
             <div className="min-w-[200px] h-full flex flex-col justify-center text-left pointer-events-none">
                <span className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-4">Project Gallery</span>
                <h2 className="text-4xl font-serif italic text-slate-900 mb-6">{activeItem.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                    Explore the full series of images from this collection. Drag or scroll horizontally to view more.
                </p>
             </div>

             {/* Images */}
             {activeItem.projectImages.map((imgUrl, idx) => (
                 <div key={idx} className="h-full aspect-[2/3] md:aspect-[3/4] lg:aspect-[4/5] relative shadow-lg overflow-hidden group flex-shrink-0 pointer-events-none">
                     <img src={imgUrl} className="w-full h-full object-cover" alt={`Project ${idx}`} />
                 </div>
             ))}

            {/* Spacer */}
            <div className="w-20 shrink-0"></div>
        </div>
      </div>

      {/* CLOSE BUTTON - Only visible when expanded */}
      <button 
        onClick={closeFolder}
        className="absolute top-1/2 left-[30vw] z-50 bg-white text-black p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
        style={{
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
            transform: isExpanded ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(0)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Description Text - Hide when expanded */}
      {items.map((item, index) => {
        const offset = index - activeIndex;
        if (offset !== 0) return null;

        return (
          <div
            key={`desc-${item.id}`}
            className="absolute top-32 right-12 max-w-md transition-all duration-500 delay-200 z-40 pointer-events-none"
            style={{ 
                opacity: isExpanded ? 0 : 1,
                transform: isExpanded ? 'translateY(-20px)' : 'translateY(0)'
            }}
          >
            <p className="text-gray-400 text-sm font-bold leading-relaxed text-right">
               Un project photo sur {item.category.toLowerCase()} {" "} <strong className="text-xl font-bold">.{index + 1}</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};
