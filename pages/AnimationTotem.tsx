import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Monitor, Printer, Share2, Smartphone, ArrowRight, Sparkles } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useImageMetrics } from '../hooks/useImageMetrics';

const iconMap: { [key: string]: React.ElementType } = {
  Monitor,
  Printer,
  Share2,
  Smartphone
};

interface AnimationTotemProps {
  onNavigate: (path: string) => void;
}

// --- Sub-Components ---

// 1. Hero Section (même style que Club & Corporate)
const SectionHero = () => {
  const config = useSiteConfig();
  const hero = config.animationTotem.hero;
  
  return (
    <div className="relative shrink-0 w-full md:w-[60vw] h-[80vh] md:h-full flex flex-col justify-center overflow-hidden border-r border-gray-200 bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/logo2.png"
          alt=""
          aria-hidden="true"
          className="absolute top-8 right-[-3rem] md:right-[-7rem] lg:right-[-10rem] w-[24rem] md:w-[36rem] lg:w-[44rem] max-w-[68vw] opacity-[0.11] select-none"
        />
      </div>

      <div className="relative z-10 p-6 md:p-24 pt-24 md:pt-0">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 mb-6 block">
            {hero.category}
          </span>
          <h1 className="font-sans font-bold text-5xl md:text-8xl tracking-tighter leading-none text-black mb-2">
            {hero.title.line1}
          </h1>
          <h1 className="font-serif italic font-light text-5xl md:text-8xl tracking-tighter leading-none text-gray-800">
            {hero.title.line2}
          </h1>
          <p className="mt-8 font-sans text-sm md:text-base leading-relaxed max-w-md text-gray-600 border-l-2 border-black pl-6">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// 2. Showcase / Concept
const SectionShowcase = () => {
  const config = useSiteConfig();
  const showcase = config.animationTotem.showcase;
  
  return (
    <div className="relative min-h-screen md:h-screen w-full md:w-screen flex-shrink-0 flex items-start md:items-center justify-center bg-zinc-950 border-r border-white/10 overflow-visible md:overflow-hidden text-white py-24 pb-36 md:py-0">

      <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-7xl px-8 gap-12 md:gap-24">
        {/* Abstract Product Visualization */}
        <div className="relative group">
           <div className="absolute inset-0 bg-white blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
           <motion.div 
             className="relative z-10 w-[50vw] md:w-[20vw] h-auto mt-32 md:mt-0 shadow-2xl flex flex-col items-center"
             whileHover={{ scale: 1.02 }}
             transition={{ duration: 0.5 }}
           >
              <img 
                src={showcase.image.src} 
                alt={showcase.image.alt} 
                className="w-full h-auto border border-gray-800"
              />
           </motion.div>
        </div>

        {/* Specs Text */}
        <div className="flex flex-col gap-8 md:w-1/3 pb-16 md:pb-0">
          <h3 className="font-serif text-4xl md:text-5xl text-white">
            <span className="italic text-gray-400">{showcase.title.line1}</span> {showcase.title.line2}
          </h3>
          <p className="font-sans text-gray-300 leading-relaxed">
             {showcase.description}
          </p>
          <ul className="space-y-4 font-sans text-sm text-gray-300">
            {showcase.specs.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-4 border-b border-gray-800 pb-2">
                <span className="w-2 h-2 bg-white rounded-full" /> {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 3. Feature Card Component
interface FeatureCardProps {
  feature: {
    id: number;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const IconComponent = iconMap[feature.icon] || Monitor;
  const { onImageLoad, getMetrics } = useImageMetrics();
  const imageMetrics = getMetrics(`animation-feature-${feature.id}`, 4 / 3);
  const isQrCodeCard = feature.id === 2;
  
  return (
    <div
      className="h-[75vh] md:h-screen w-auto max-w-[94vw] md:max-w-none flex-shrink-0 flex flex-col border-r border-white/10 relative overflow-hidden group text-white mx-auto md:mx-0"
      style={{ aspectRatio: imageMetrics.ratio }}
    >
      {/* Background Image that reveals on hover */}
      <div className="absolute inset-0 z-0">
        <img 
          src={feature.image} 
          alt={feature.title} 
          onLoad={onImageLoad(`animation-feature-${feature.id}`)}
          className={`w-full h-full object-cover opacity-100 transition-[filter] duration-700 ease-out ${
            isQrCodeCard ? 'object-[50%_62%] md:object-[50%_44%]' : ''
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        <div className="flex justify-end items-start">
          <div className="p-4 rounded-full border border-white bg-transparent backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black" strokeWidth={1.5} />
          </div>
        </div>

        <div className={`mb-12 md:mb-0 ${isQrCodeCard ? 'absolute bottom-8 md:bottom-12 left-8 md:left-16 right-8 md:right-16' : ''}`}>
          <h4 className={`flex flex-col mb-6 ${isQrCodeCard ? 'text-3xl md:text-5xl leading-[0.95]' : 'text-4xl md:text-5xl'}`}>
            <span className={`font-sans font-bold tracking-tight ${isQrCodeCard ? 'text-black' : 'text-white'}`}>{feature.title}</span>
            <span className={`font-serif italic font-light ${isQrCodeCard ? 'text-black' : 'text-white'}`}>{feature.subtitle}</span>
          </h4>
          <p className={`font-sans text-sm md:text-base leading-relaxed ${isQrCodeCard ? 'text-black max-w-sm' : 'text-white max-w-md'}`}>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. CTA Section
interface SectionCTAProps {
  onNavigate: (path: string) => void;
}

const SectionCTA: React.FC<SectionCTAProps> = ({ onNavigate }) => {
  const config = useSiteConfig();
  const cta = config.animationTotem.cta;
  
  return (
    <div className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center bg-white text-black overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ backgroundSize: "100%" }}
        whileInView={{ backgroundSize: "110%" }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500 mb-8"
        >
          {cta.subtitle}
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-serif italic text-6xl md:text-8xl mb-8 leading-tight"
        >
          {cta.title.line1}<br/>{cta.title.line2}
        </motion.h2>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('/contact')}
          className="group relative inline-flex items-center gap-4 px-12 py-6 bg-black text-white overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 font-sans text-sm tracking-[0.2em] uppercase font-bold">{cta.button.label}</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gray-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>
    </div>
  );
};

// --- Main Component ---

const AnimationTotem: React.FC<AnimationTotemProps> = ({ onNavigate }) => {
  const config = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll Handler for Desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only apply on desktop
      if (window.innerWidth >= 768) {
        // Prevent default vertical scroll
        e.preventDefault();
        // Translate vertical delta to horizontal scroll
        container.scrollLeft += e.deltaY + e.deltaX;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden md:overflow-y-hidden md:overflow-x-auto no-scrollbar flex flex-col md:flex-row bg-white text-black"
    >
      {/* 
        Horizontal Layout for Desktop (flex-row)
        Vertical Layout for Mobile (flex-col) 
      */}
      
      {/* 1. Hero */}
      <div className="shrink-0 w-full md:w-auto">
        <SectionHero />
      </div>

      {/* 2. Showcase */}
      <div className="shrink-0 w-full md:w-auto">
        <SectionShowcase />
      </div>

      {/* 3. Features Horizontal List */}
      {config.animationTotem.features.map((feature) => (
        <div key={feature.id} className="shrink-0 w-full md:w-auto border-b md:border-b-0 border-white/10">
          <FeatureCard feature={feature} />
        </div>
      ))}

      {/* 4. CTA */}
      <div className="shrink-0 w-full md:w-auto">
        <SectionCTA onNavigate={onNavigate} />
      </div>

    </div>
  );
};

export default AnimationTotem;
