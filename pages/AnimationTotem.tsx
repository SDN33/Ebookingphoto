import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Monitor, Printer, Share2, Smartphone, ArrowRight, Sparkles } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

const iconMap: { [key: string]: React.ElementType } = {
  Monitor,
  Printer,
  Share2,
  Smartphone
};

// --- Sub-Components ---

// 1. Hero Section
const SectionHero = () => {
  const config = useSiteConfig();
  const hero = config.animationTotem.hero;
  
  return (
    <div className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center overflow-hidden border-r border-white/10 bg-black">
      {/* Background Image with Parallax-like scale */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src={hero.backgroundImage} 
          alt="Atmosphere" 
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 p-8 md:p-24 flex flex-col justify-center h-full w-full max-w-7xl">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="font-sans font-bold text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter text-white mix-blend-difference"
          >
            {hero.title}
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 md:mt-24 max-w-lg border-l-2 border-white pl-6"
        >
          <p className="font-sans text-lg text-gray-300 leading-relaxed">
            {hero.description}
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 text-xs font-sans tracking-[0.2em] uppercase text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>{hero.scrollHint}</span>
        <div className="w-12 h-[1px] bg-gray-600" />
      </motion.div>
    </div>
  );
};

// 2. Showcase / Concept
const SectionShowcase = () => {
  const config = useSiteConfig();
  const showcase = config.animationTotem.showcase;
  
  return (
    <div className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center bg-zinc-950 border-r border-white/10 overflow-hidden">

      <div className="flex flex-col md:flex-row items-center w-full max-w-7xl px-8 gap-12 md:gap-24">
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
        <div className="flex flex-col gap-8 md:w-1/3">
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
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = iconMap[feature.icon] || Monitor;
  
  return (
    <div className="h-screen w-screen md:w-[45vw] flex-shrink-0 flex flex-col border-r border-white/10 relative overflow-hidden group">
      {/* Background Image that reveals on hover */}
      <div className="absolute inset-0 z-0">
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/40" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        <div className="flex justify-between items-start">
          <span className="font-serif text-6xl text-white/20 group-hover:text-white/40 transition-colors">0{index + 1}</span>
          <div className="p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mb-12 md:mb-0">
          <h4 className="flex flex-col text-4xl md:text-5xl mb-6">
            <span className="font-sans font-bold tracking-tight text-white">{feature.title}</span>
            <span className="font-serif italic font-light text-gray-300 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-2">{feature.subtitle}</span>
          </h4>
          <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-md group-hover:text-white transition-colors">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. CTA Section
const SectionCTA = () => {
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

const AnimationTotem: React.FC = () => {
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
      className="relative w-full h-[full] overflow-y-auto md:overflow-y-hidden md:overflow-x-auto no-scrollbar flex flex-col md:flex-row bg-black text-white"
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
      {config.animationTotem.features.map((feature, index) => (
        <div key={feature.id} className="shrink-0 w-full md:w-auto border-b md:border-b-0 border-white/10">
          <FeatureCard feature={feature} index={index} />
        </div>
      ))}

      {/* 4. CTA */}
      <div className="shrink-0 w-full md:w-auto">
        <SectionCTA />
      </div>

    </div>
  );
};

export default AnimationTotem;
