import React from 'react';
import { motion } from 'framer-motion';

const Manifesto: React.FC = () => {
  return (
    <section className="w-full md:w-[100vw] lg:w-[85vw] mdmin-h-screen md:h-screen shrink-0 flex flex-col justify-center p-6 md:p-16 lg:p-24 bg-white snap-start relative overflow-hidden">
      
      {/* Large Typographic Block */}
      <div className="relative z-10 flex flex-col gap-2 md:gap-4 select-none mt-10 md:mt-0">
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-7xl lg:text-8xl font-sans font-semibold tracking-tighter leading-[0.9] text-black"
        >
          J'AIME LA COULEUR,
        </motion.div>
        
        <motion.div 
           initial={{ x: 100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
           className="text-4xl md:text-7xl lg:text-8xl font-sans font-semibold tracking-tighter leading-[0.9] text-black"
        >
          LA MÉLANGER, L'ÉTUDIER,
        </motion.div>

        <motion.div 
           initial={{ x: 100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="text-4xl md:text-7xl lg:text-8xl font-sans font-semibold tracking-tighter leading-[0.9] text-black"
        >
          LA COMPRENDRE, <span className="font-serif italic font-normal">L'ASSOCIER.</span>
        </motion.div>
      </div>

      {/* Small Blurred Image - Positioned relative to text as per reference */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-8 md:mt-16 w-32 md:w-64 aspect-[3/4] relative overflow-hidden"
      >
        <img 
          src="/gallery/culture/photo1.jpg" 
          alt="Abstract portrait" 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale"
        />
      </motion.div>

      {/* Background decoration */}
      <span className="absolute top-1/2 right-10 -translate-y-1/2 text-[10rem] md:text-[20rem] font-serif italic text-gray-50 opacity-50 -z-10 pointer-events-none">
        &
      </span>
    </section>
  );
};

export default Manifesto;