import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Printer, Share2, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: Monitor,
    title: 'Visualisation',
    subtitle: 'Instantanée',
    desc: 'Grâce à l\'écran du haut mesurant 65", vos invités voient en direct le résultat de leur photo avec une qualité cristalline.'
  },
  {
    icon: Printer,
    title: 'Impression',
    subtitle: 'Illimitée',
    desc: 'Notre totem EbookingPhoto propose l\'impression instantanée et illimitée des photos pour un souvenir tangible immédiat.'
  },
  {
    icon: Smartphone,
    title: 'Partage',
    subtitle: 'Immédiat',
    desc: 'Galerie en ligne dédiée. Les photos sont directement téléchargeables via QR Code ou AirDrop pour un partage instantané.'
  },
  {
    icon: Share2,
    title: 'Communication',
    subtitle: 'Visuelle',
    desc: 'Permettez à vos invités de partager leurs photos sur les réseaux sociaux avec votre branding et image de marque intégrés.'
  }
];

const AnimationTotem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  // Parallax for the big "LE TOTEM" text - only works on horizontal scroll
  const xTitle = useTransform(scrollXProgress, [0, 0.3], ["0%", "-50%"]);

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
      className="flex flex-col md:flex-row h-full w-full overflow-y-auto md:overflow-y-hidden md:overflow-x-auto no-scrollbar bg-black text-white"
    >
      {/* 1. Hero Section - The Monolith */}
      <div className="shrink-0 w-full md:w-screen h-[80vh] md:h-full flex relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2000&auto=format&fit=crop" 
            alt="Event Atmosphere" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-6 md:p-24 w-full md:w-2/3 mt-10 md:mt-0">
          <motion.div style={{ x: window.innerWidth > 768 ? xTitle : 0 }}>
            <h1 className="font-sans font-bold text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter">
              LE
            </h1>
            <h1 className="font-serif italic font-light text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter ml-12 md:ml-40 text-gray-300">
              TOTEM
            </h1>
          </motion.div>
          
          <div className="mt-8 md:mt-24 max-w-xl">
             <div className="w-12 h-1 bg-white mb-8" />
             <p className="font-sans text-base md:text-xl leading-relaxed text-gray-300">
               L'animation star de nos événements. Un Totem entièrement personnalisable pour refléter votre identité visuelle et offrir une expérience photo élégante, moderne et inoubliable.
             </p>
          </div>
        </div>
      </div>

      {/* 2. Concept / "Monolith" Visualization */}
      <div className="shrink-0 w-full md:w-[60vw] h-[80vh] md:h-full flex flex-col justify-center items-center bg-gray-900 relative border-l border-white/10">
         <span className="absolute top-10 left-10 font-sans text-xs tracking-[0.3em] text-gray-500 uppercase">
           Design & Spécifications
         </span>
         
         {/* Abstract representation of the Totem */}
         <div className="relative w-[30vh] h-[60vh] md:h-[70vh] bg-black border border-gray-800 shadow-2xl flex flex-col items-center p-4">
            <div className="w-full aspect-[9/16] bg-gray-800 animate-pulse mb-4 flex items-center justify-center">
              <span className="font-sans text-xs text-gray-600">Écran 65"</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white mt-auto mb-8" />
         </div>
         
         <div className="mt-8 text-center">
           <h3 className="font-sans text-2xl font-bold uppercase tracking-widest">EbookingPhoto</h3>
           <p className="font-serif italic text-gray-400 mt-2">Écran 65" — Personnalisable</p>
         </div>
      </div>

      {/* 3. Features Horizontal List */}
      <div className="shrink-0 flex flex-col md:flex-row h-auto md:h-full bg-black">
        {FEATURES.map((feature, index) => (
          <div 
            key={index} 
            className="w-full md:w-[40vw] h-[50vh] md:h-full border-l border-white/10 flex flex-col justify-between p-8 md:p-16 hover:bg-gray-900 transition-colors duration-500 group"
          >
            <div className="flex justify-between items-start">
              <span className="font-sans text-xs font-bold text-gray-600">0{index + 1}</span>
              <feature.icon className="w-8 h-8 md:w-12 md:h-12 text-gray-500 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
            </div>

            <div className="mt-auto">
              <h3 className="flex flex-col text-3xl md:text-5xl mb-4 md:mb-6">
                <span className="font-sans font-bold tracking-tight">{feature.title}</span>
                <span className="font-serif italic font-light text-gray-400 group-hover:text-white transition-colors duration-500">{feature.subtitle}</span>
              </h3>
              <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Call to Action */}
      <div className="shrink-0 w-full md:w-[50vw] h-[60vh] md:h-full flex flex-col justify-center items-center bg-white text-black relative">
        <h2 className="font-serif italic text-5xl md:text-7xl text-center px-4">
          Offrez une<br/>expérience
        </h2>
        <p className="mt-6 font-sans text-xs md:text-sm tracking-widest uppercase text-gray-500">
          Transformez vos événements
        </p>
        <button className="mt-12 px-12 py-4 border border-black hover:bg-black hover:text-white transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase">
          Réserver le Totem
        </button>
      </div>

    </div>
  );
};

export default AnimationTotem;