import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useImageMetrics } from '../hooks/useImageMetrics';

// Charge automatiquement toutes les images du dossier reportage
const imageModules = import.meta.glob('/public/portfolio/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true, as: 'url' });

const Reportage: React.FC = () => {
  const config = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const { onImageLoad, getMetrics } = useImageMetrics();

  // Generate images dynamically from folder
  const images = useMemo(() => {
    // Récupère tous les chemins d'images et les trie
    const imagePaths = Object.keys(imageModules).sort();
    
    return imagePaths.map((path, index) => {
      // Extrait le nom du fichier et crée un caption
      const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      const caption = filename.replace(/[-_]/g, ' ');
      
      return {
        id: index + 1,
        url: path.replace('/public', ''),
        caption: caption.charAt(0).toUpperCase() + caption.slice(1)
      };
    });
  }, []);

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
      {images.map((item, index) => {
        const imageMetrics = getMetrics(`reportage-${item.id}`, 4 / 3);
        const isVertical = imageMetrics.orientation === 'vertical';

        return (
        <div
          key={item.id}
          className="shrink-0 w-full md:w-auto flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 relative group"
        >
          <div
            className={`relative transition-all duration-700 ${
              isVertical ? 'h-[56vh] md:h-[78vh]' : 'h-[42vh] md:h-[62vh]'
            }`}
            style={{ aspectRatio: imageMetrics.ratio }}
          >
            <motion.img
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              src={item.url}
              alt={item.caption}
              onLoad={onImageLoad(`reportage-${item.id}`)}
              className="w-full h-full object-cover contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Caption */}
          <div className="mt-4 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100">
            <span className="font-sans text-xs font-bold tracking-widest">0{index + 1}</span>
            <span className="w-8 h-px bg-black/20" />
            <p className="font-serif italic text-lg">{item.caption}</p>
          </div>
        </div>
      )})}

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
