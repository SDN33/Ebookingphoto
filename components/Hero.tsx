import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Hero: React.FC = () => {
  const config = useSiteConfig();
  const hero = config.home.hero;
  const isEmbedVideo = !/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(hero.video.src);

  return (
    <section className="min-w-full h-[100dvh] w-screen lg:w-[100vw] flex flex-col lg:flex-row relative shrink-0 min-w-[320px]">
      
      {/* Left Text Side */}
      <div className="w-full lg:w-1/2 lg:h-[100%] mt-20 lg:mt-0 lg:h-full flex flex-col justify-end p-6 md:p-12 bg-white relative lg:order-1 min-w-0">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col leading-none w-full"
        >
          {/* Typography Mix - Matching Reference */}
          <h1 className="flex flex-col text-black w-full">
            <span 
              className="font-sans font-normal tracking-tight whitespace-nowrap"
              style={{ fontSize: 'clamp(1.7rem, 8vw, 70px)' }}
            >
              {hero.title.line1}
            </span>
            <span 
              className="font-serif italic font-light tracking-tight whitespace-nowrap"
              style={{ 
                fontSize: 'clamp(1.7rem, 8vw, 70px)',
                marginLeft: 'clamp(0.5rem, 3vw, 5rem)',
                marginTop: 'clamp(-0.25rem, -0.8vw, -1rem)'
              }}
            >
              {hero.title.line2}
            </span>
            <span 
              className="font-sans font-normal tracking-tight whitespace-nowrap"
              style={{ 
                fontSize: 'clamp(1.7rem, 8vw, 70px)',
                marginTop: 'clamp(-0.125rem, -0.4vw, -0.75rem)'
              }}
            >
              {hero.title.line3}
            </span>
            <span 
              className="font-serif italic font-light tracking-tight whitespace-nowrap"
              style={{ 
                fontSize: 'clamp(1.7rem, 8vw, 70px)',
                marginLeft: 'clamp(1rem, 3vw, 4rem)',
                marginTop: 'clamp(-0.25rem, -0.8vw, -1rem)'
              }}
            >
              <TypewriterText 
                words={hero.title.line4.words}
                className="font-serif italic font-light tracking-tight whitespace-nowrap"
                interval={2000}
              />
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Right Video Side */}
      <div className="w-full lg:w-1/2 h-[50%] lg:h-full p-4 relative overflow-hidden order-1 lg:order-2 flex-shrink-0">
        <motion.div 
          className="w-full h-full relative overflow-hidden"
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Grayscale overlay */}
          <div className="absolute inset-0 bg-black/10 z-10" />
          {isEmbedVideo ? (
            <iframe
              src={hero.video.src}
              title="Hero video"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 block w-full h-full object-cover grayscale contrast-125"
            />
          ) : (
            <video
              src={hero.video.src}
              autoPlay={hero.video.autoPlay}
              loop={hero.video.loop}
              muted={hero.video.muted}
              playsInline
              className="absolute inset-0 block w-full h-full object-cover grayscale contrast-125"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
