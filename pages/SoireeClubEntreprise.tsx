import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Users, Star, Camera } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

const iconMap: { [key: string]: React.ElementType } = {
  Trophy,
  Users,
  Star,
  Camera
};

const EVENTS = [
  {
    title: 'Clubs Sportifs',
    subtitle: 'Victoires & Galas',
    desc: 'Immortalisez les moments forts de votre saison. Des matchs décisifs aux soirées de gala, nous capturons l\'esprit d\'équipe et la passion qui animent votre club.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?q=80&w=2000&auto=format&fit=crop', // Sports team huddle / celebration
    icon: Trophy
  },
  {
    title: 'Événements Pro',
    subtitle: 'Soirées d\'Entreprise',
    desc: 'Valorisez votre image de marque lors de vos séminaires, lancements de produits ou fêtes de fin d\'année. Une couverture professionnelle pour une communication impactante.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop', // Corporate party / gala
    icon: Users
  }
];

interface SoireeClubEntrepriseProps {
  onNavigate: (path: string) => void;
}

const SoireeClubEntreprise: React.FC<SoireeClubEntrepriseProps> = ({ onNavigate }) => {
  const config = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const titleX = useTransform(scrollXProgress, [0, 0.2], ["0%", "20%"]);

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
      className="flex flex-col md:flex-row h-full w-full overflow-y-auto overflow-x-hidden md:overflow-y-hidden md:overflow-x-auto no-scrollbar bg-white text-black"
    >
      {/* 1. Intro / Title Section */}
      <div className="shrink-0 w-full md:w-[60vw] h-[80vh] md:h-full flex flex-col justify-center pl-6 pr-8 md:pl-24 md:pr-36 lg:pr-44 bg-gray-50 relative overflow-hidden pt-24 md:pt-0">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/logo2.png"
            alt=""
            aria-hidden="true"
            className="absolute top-8 right-[-3rem] md:right-[-7rem] lg:right-[-10rem] w-[24rem] md:w-[36rem] lg:w-[44rem] max-w-[68vw] opacity-[0.11] select-none"
          />
        </div>

        <motion.div style={{ x: window.innerWidth > 768 ? titleX : 0 }} className="z-10 relative max-w-[88%] md:max-w-[82%] lg:max-w-[78%]">
          <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 mb-6 block">
            {config.soireeClubEntreprise.intro.category}
          </span>
          <h1 className="font-sans font-bold text-5xl md:text-8xl tracking-tighter leading-none text-black mb-2">
            {config.soireeClubEntreprise.intro.title.line1}
          </h1>
          <h1 className="font-serif italic font-light text-5xl md:text-8xl tracking-tighter leading-none text-gray-800">
            {config.soireeClubEntreprise.intro.title.line2}
          </h1>
          <p className="mt-8 font-sans text-sm md:text-base leading-relaxed max-w-md text-gray-600 border-l-2 border-black pl-6">
            {config.soireeClubEntreprise.intro.description}
          </p>
        </motion.div>
      </div>

      {/* 2. Dual Offerings: Sports & Corporate */}
      {config.soireeClubEntreprise.events.map((event, idx) => {
        const IconComponent = iconMap[event.icon] || Users;
        return (
        <div
          key={idx}
          className="shrink-0 w-full md:w-auto h-[70vh] md:h-full relative group overflow-hidden border-t md:border-t-0 md:border-l border-white"
          style={{ aspectRatio: 1134 / 1102 }}
        >
          <div className="absolute inset-0 z-0">
             <img 
               src={event.image} 
               alt={event.title}
               className="w-full h-full object-cover transition-[filter] duration-700 grayscale-0 group-hover:grayscale"
              />
             <div className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 text-white">
             <div className="mb-auto pt-6 md:pt-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 transform md:-translate-y-4 md:group-hover:translate-y-0">
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 mb-4 text-white" />
             </div>
             
             <h2 className="font-sans font-bold text-4xl md:text-6xl tracking-tight mb-2">{event.title}</h2>
             <h3 className="font-serif italic text-2xl md:text-3xl text-gray-300 mb-6">{event.subtitle}</h3>
             <p className="font-sans text-sm leading-relaxed max-w-sm opacity-90 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
               {event.description}
             </p>
          </div>
        </div>
        );
      })}

      {/* 3. Features List */}
      <div className="shrink-0 w-full md:w-[40vw] h-auto md:h-full bg-black text-white flex flex-col justify-center p-8 md:p-20">
         <h3 className="font-serif italic text-3xl md:text-4xl mb-8 md:mb-12 text-gray-200 mt-10 md:mt-0">{config.soireeClubEntreprise.services.title}</h3>
         
         <div className="flex flex-col gap-8">
            {config.soireeClubEntreprise.services.items.map((service, idx) => {
              const ServiceIcon = iconMap[service.icon] || Camera;
              return (
                <div key={idx} className="flex gap-6 items-start">
                  <ServiceIcon className="w-6 h-6 mt-1 text-gray-400 shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold tracking-widest uppercase text-sm mb-2">{service.title}</h4>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                </div>
              );
            })}
         </div>

         <button
            onClick={() => onNavigate('/contact')}
            className="mt-16 mb-10 md:mb-0 border border-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors self-start"
         >
            {config.soireeClubEntreprise.services.cta.label}
         </button>
      </div>

    </div>
  );
};

export default SoireeClubEntreprise;
