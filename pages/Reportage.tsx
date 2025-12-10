import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Reportage: React.FC = () => {
  const config = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);

  // Manual horizontal scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      if (window.innerWidth > 768) {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY + evt.deltaX;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-y-hidden md:overflow-x-auto no-scrollbar bg-gray-50"
    >
      {/* Intro Section */}
      <div className="shrink-0 w-full md:w-[50vw] h-auto md:h-full flex flex-col justify-center p-6 md:p-24 bg-white z-10 pt-24 md:pt-0 pb-12">
        <span className="font-sans text-xs tracking-[0.3em] uppercase mb-6 text-gray-400">
          {config.reportage.intro.category}
        </span>
        <h1 className="text-5xl md:text-6xl 2xl:text-8xl font-sans font-bold tracking-tighter leading-none mb-2">
          {config.reportage.intro.title.line1}
        </h1>
        <h1 className="text-5xl md:text-6xl 2xl:text-8xl font-serif italic font-light leading-none text-gray-400 mb-4 md:mb-6">
          {config.reportage.intro.title.line2}
        </h1>
        <p className="mt-4 font-sans text-sm md:text-base leading-relaxed max-w-md text-gray-600 border-l-2 border-black pl-6">
         {config.reportage.intro.description}
        </p>
      </div>

      {/* Gallery Flow */}
      {config.reportage.stories.map((item, index) => (
        <div 
          key={item.id} 
          className={`shrink-0 flex flex-col justify-center px-4 md:px-12 py-8 md:py-0 relative group
            ${item.layout === 'full' ? 'w-full md:w-[60vw]' : 
              item.layout === 'wide' ? 'w-full md:w-[70vw]' : 'w-full md:w-[40vw]'}`}
        >
          {/* Layout Variations */}
          <div className={`relative overflow-hidden bg-gray-200 transition-all duration-700
            ${item.layout === 'full' ? 'h-[50vh] md:h-[85vh] w-full' : 
              item.layout === 'wide' ? 'h-[40vh] md:h-[60vh] w-full' :
              item.layout === 'small-top' ? 'h-[40vh] w-full self-start md:mt-20' :
              item.layout === 'small-bottom' ? 'h-[40vh] w-full self-end md:mb-20' :
              'h-[40vh] md:h-[50vh] w-full'}`}
          >
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Caption */}
          <div className={`mt-4 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100
             ${item.layout === 'small-bottom' ? 'md:absolute md:top-10 md:left-12' : ''}
          `}>
            <span className="font-sans text-xs font-bold tracking-widest">0{index + 1}</span>
            <span className="w-8 h-px bg-black/20" />
            <p className="font-serif italic text-lg">{item.caption}</p>
          </div>
        </div>
      ))}

      {/* End Spacer */}
      <div className="shrink-0 h-20 md:h-full md:w-[20vw] bg-gray-50 flex items-center justify-center">
        <span className="md:vertical-rl font-sans text-xs tracking-widest text-gray-300 uppercase md:rotate-180 md:writing-mode-vertical">
          {config.reportage.endLabel}
        </span>
      </div>
    </div>
  );
};

export default Reportage;