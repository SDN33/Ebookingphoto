
import React, { useRef, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import GalleryItem from '../components/GalleryItem';
import Manifesto from '../components/Manifesto';
import Services from '../components/Services';
import { Photo } from '../types';
import { X } from 'lucide-react';

// Mock Data
const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/800/1200?random=1', title: 'Noir Étude', category: 'Mode', aspectRatio: 'portrait' },
  { id: '2', url: 'https://picsum.photos/1200/800?random=2', title: 'Silence Urbain', category: 'Architecture', aspectRatio: 'landscape' },
  { id: '3', url: 'https://picsum.photos/800/1200?random=3', title: 'La Muse', category: 'Portrait', aspectRatio: 'portrait' },
];

interface HomeProps {
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

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
          "Nous capturons le silence au milieu du chaos. Une narration visuelle composée de lumière, d'ombre et d'émotion brute."
        </p>
        <div className="h-px w-24 bg-black mt-10"></div>
        <p className="font-sans text-xs tracking-widest mt-4 uppercase">
          Défiler pour explorer
        </p>
      </div>

      {/* Section 3: Manifesto */}
      <Manifesto />

      {/* Section 4: Services */}
      <Services onNavigate={onNavigate} />

      {/* Section 5: Archive Gallery */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center bg-gray-50/50" id="journal">
         {/* Archive Label: Top Header on Mobile, Vertical Sidebar on Desktop */}
         <div className="w-full lg:w-40 h-20 lg:h-full flex items-center justify-center lg:justify-center border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 sticky top-0 lg:static z-20">
           <span className="lg:-rotate-90 text-xs tracking-widest uppercase text-gray-400 whitespace-nowrap">Archives 2023—2024</span>
         </div>
         
         {/* Gallery Items */}
         {PHOTOS.map((photo, index) => (
          <div key={photo.id} className="shrink-0 w-full lg:w-auto">
            <GalleryItem 
              photo={photo} 
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
              src="https://online.flippingbook.com/view/1041806480/"
              className="w-full h-full border-0"
              allowFullScreen
              title="Flipbook"
            />
          </div>
        </div>
      )}

      {/* Section 6: Mariages */}
      <div className="shrink-0 w-full lg:w-[70vw] h-[80vh] lg:h-full flex flex-col lg:flex-row bg-white relative" id="mariages">
        {/* Left side: Text content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-10 md:p-20">
          <div className="max-w-2xl">
            <span className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-6 block">Mariages</span>
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-black">
              MOMENTS
            </h2>
            <h2 className="font-serif italic text-4xl md:text-6xl font-light mb-8 text-gray-800">
              ÉTERNELS
            </h2>
            <div className="h-px w-24 bg-black mb-8"></div>
            <p className="font-serif italic text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
              Capturer l'émotion pure, l'intimité et la beauté de votre journée spéciale. 
              Une approche documentaire et artistique pour immortaliser chaque instant précieux.
            </p>
            <p className="font-sans text-sm tracking-wide text-gray-600">
              Reportage complet • Cérémonie • Réception • Shooting couple
            </p>
          </div>
        </div>

        {/* Right side: Image with button overlay */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative group overflow-hidden">
          <img 
            src="https://picsum.photos/800/1200?random=wedding"  
            alt="Mariage" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
          
          {/* Button overlay */}
          <a 
            href="https://ebookingphoto-mariage.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          >
            <button className="px-8 py-4 bg-white/80 hover:bg-white text-black font-sans text-sm tracking-widest uppercase border border-black/30 hover:border-black transition-all duration-300 opacity-70 group-hover:opacity-100">
              Découvrir
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
