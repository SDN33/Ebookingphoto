import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Manifesto: React.FC = () => {
  const config = useSiteConfig();
  const manifesto = config.home.manifesto;

  return (
    <section className="w-full md:w-[100vw] lg:w-[85vw] 2xl:w-[60vw] md:min-h-screen md:h-screen shrink-0 flex flex-col justify-center p-6 md:p-16 lg:p-24 bg-white snap-start relative isolate z-10 overflow-hidden">
      {/* Large Typographic Block */}
      <div className="relative z-20 flex flex-col gap-2 md:gap-4 select-none mt-10 md:mt-0 lg:max-w-[64vw]">
        {manifesto.lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
            className="text-4xl md:text-7xl lg:text-6xl font-sans font-semibold tracking-tighter leading-[0.9] text-black whitespace-normal md:whitespace-nowrap"
            dangerouslySetInnerHTML={{
              __html: line.replace(/S[’']UNISSENT\.?/g, '<span class="font-serif italic font-normal">S’UNISSENT.</span>')
            }}
          />
        ))}
      </div>

      {/* Small cropped image under text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-10 md:mt-14 w-24 sm:w-28 md:w-36 lg:w-40 aspect-[4/5] relative z-20 overflow-hidden"
      >
        <img
          src={manifesto.image.src}
          alt={manifesto.image.alt}
          className="w-full h-full object-cover grayscale"
          style={{ objectPosition: '50% 18%' }}
        />
      </motion.div>

      {/* Background decoration */}
      <span className="absolute top-1/2 right-10 -translate-y-1/2 text-[10rem] md:text-[20rem] font-serif italic text-gray-50 opacity-50 -z-10 pointer-events-none">
        {manifesto.decoration}
      </span>
    </section>
  );
};

export default Manifesto;
