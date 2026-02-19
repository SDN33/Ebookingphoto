
import React, { useRef, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import GalleryItem from '../components/GalleryItem';
import Manifesto from '../components/Manifesto';
import Services from '../components/Services';
import { Photo } from '../types';
import { X } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useImageMetrics } from '../hooks/useImageMetrics';

interface HomeProps {
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const config = useSiteConfig();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const { onImageLoad, getMetrics } = useImageMetrics();
  const mariageImageMetrics = getMetrics('home-mariage-image', 3 / 4);

  // Horizontal Scroll on Desktop via Wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      if (window.innerWidth > 1024) {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY + evt.deltaX;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isFlipbookOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFlipbookOpen]);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex flex-col lg:flex-row h-full w-full overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto no-scrollbar"
    >
      {/* Section 1: Hero */}
      <div className="shrink-0" id="top">
        <Hero />
      </div>

      {/* Section 2: Intro */}
      <div className="shrink-0 w-full lg:w-[50vw] h-[40vh] lg:h-full flex flex-col justify-end items-start p-10 md:p-20 bg-white" id="about">
        <p className="font-serif italic text-2xl md:text-4xl leading-relaxed text-gray-800 max-w-2xl">
          "{config.home.intro.quote}"
        </p>
        <div className="h-px w-24 bg-black mt-10"></div>
        <p className="font-sans text-xs tracking-widest mt-4 uppercase">
          {config.home.intro.scrollHint}
        </p>
      </div>

      {/* Section 3: Manifesto */}
      <Manifesto />

      {/* Section 4: Services */}
      <Services onNavigate={onNavigate} />

      {/* Section 5: Archive Gallery */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center bg-gray-50/50" id="journal">
         {/* Archive Label: Top Header on Mobile, Vertical Sidebar on Desktop */}
         <div className="w-full lg:w-40 h-20 lg:h-full flex items-center justify-center lg:justify-center border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 static lg:static z-20">
           <span className="lg:-rotate-90 text-xs tracking-widest uppercase text-gray-400 whitespace-nowrap">{config.home.gallery.label}</span>
         </div>
         
         {/* Gallery Items */}
         {config.home.gallery.photos.map((photo, index) => (
           <div key={photo.id} className="shrink-0 w-full lg:w-auto">
             <GalleryItem 
               photo={photo as Photo} 
               index={index} 
               onClick={() => setIsFlipbookOpen(true)}
             />
           </div>
         ))}
      </div>

      {/* Flipbook Modal */}
      {isFlipbookOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsFlipbookOpen(false)}
        >
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFlipbookOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              <X size={24} className="text-black" />
            </button>
            <iframe
              src={config.home.flipbook.url}
              className="w-full h-full border-0"
              allowFullScreen
              title="Flipbook"
            />
          </div>
        </div>
      )}

      {/* Section 6: Mariages */}
      <div className="shrink-0 w-full lg:w-[100vw] mt-20 md:mt-0 lg:h-full flex flex-col lg:flex-row bg-white relative" id="mariages">
        {/* Left side: Text content */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center items-start p-10 md:p-20">
          <div className="max-w-7xl">
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-black">
              {config.home.mariage.title.line1}
            </h2>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light mb-8 text-gray-800">
             {config.home.mariage.title.line2} <strong className="font-bold">{config.home.mariage.title.line3}</strong> 
            </h2>
            <div className="h-px w-24 bg-black mb-8"></div>
            <p className="font-serif italic text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
              {config.home.mariage.description}
            </p>
          </div>
        </div>

        {/* Right side: Image with button overlay */}
        <div
          className="w-auto h-[50vh] lg:h-full max-w-[92vw] lg:max-w-[40vw] relative group overflow-hidden mx-auto lg:mx-0"
          style={{ aspectRatio: mariageImageMetrics.ratio }}
        >
          <img 
            src={config.home.mariage.image.src}  
            alt={config.home.mariage.image.alt} 
            onLoad={onImageLoad('home-mariage-image')}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
          
          {/* Button overlay */}
          <a 
            href={config.home.mariage.link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          >
            <button className="px-8 py-4 bg-white/80 hover:bg-white text-black font-sans text-sm tracking-widest uppercase border border-black/30 hover:border-black transition-all duration-300 opacity-70 group-hover:opacity-100">
              {config.home.mariage.link.label}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
