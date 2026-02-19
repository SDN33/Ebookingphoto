import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Manifesto: React.FC = () => {
  const config = useSiteConfig();
  const manifesto = config.home.manifesto;

  return (
    <section className="w-full md:w-[100vw] lg:w-[100vw] min-h-screen md:h-screen shrink-0 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start gap-8 lg:gap-16 p-6 md:p-16 lg:p-20 bg-white snap-start relative overflow-hidden">
      {/* Large Typographic Block */}
      <div className="relative z-10 flex flex-col gap-2 md:gap-3 select-none mt-10 md:mt-0 lg:max-w-[64vw]">
        {manifesto.lines.map((line, index) => {
          const processed = line
            .replace(/S[’']UNISSENT\.?/g, (m) => `<span class="manifesto-impact">${m}</span>`);

          return (
            <motion.div 
              key={index}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="text-[clamp(1.45rem,2.7vw,3.7rem)] font-sans font-semibold tracking-[-0.02em] leading-[0.95] text-black whitespace-normal md:whitespace-nowrap"
              dangerouslySetInnerHTML={{ __html: processed }}
            />
          );
        })}
      </div>

      {/* Photo Block */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 justify-self-start lg:justify-self-end lg:self-end w-[180px] md:w-[260px] lg:w-[420px] max-w-[90vw] aspect-[4/3] overflow-hidden"
      >
        <img 
          src={manifesto.image.src} 
          alt={manifesto.image.alt} 
          className="w-full h-full object-contain grayscale"
        />
      </motion.div>

      {/* Background decoration */}
      <span className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 text-[8rem] md:text-[16rem] lg:text-[20rem] font-serif italic text-gray-50 opacity-50 -z-10 pointer-events-none">
        {manifesto.decoration}
      </span>
    </section>
  );
};

export default Manifesto;
