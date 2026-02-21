import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
  lastLineText?: string;
  mode?: 'intro' | 'transition'; // 'intro' = full sequence, 'transition' = fast single text
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ 
  onComplete, 
  lastLineText = "EVENEMENTIEL", 
  mode = 'intro' 
}) => {
  const [slideOut, setSlideOut] = useState(false);
  // Initialize directly with window width to ensure correct 'initial' animation prop on mount
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    // No need to call checkMobile() here as we initialized state correctly, 
    // but keeping the listener is good for resizing.
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Timing configuration
    const isIntro = mode === 'intro';
    const totalDuration = isIntro ? 3000 : 1200; // 5s for intro, 1.2s for transition

    const timer = setTimeout(() => {
      setSlideOut(true);
      setTimeout(onComplete, 800); // Wait for slide animation (0.8s)
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [onComplete, mode]);

  // Animation Variants
  const getInitial = () => {
    if (mode === 'transition') {
      if (isMobile) return { y: '-100%', x: 0 }; // Mobile: Start from Top
      return { x: '100%', y: 0 }; // Desktop: Start from Right
    }
    return { x: 0, y: 0 }; // Intro mode starts in place
  };

  const getAnimate = () => {
    if (slideOut) {
      if (isMobile) return { y: '100%', x: 0 }; // Mobile: Slide to Bottom
      return { x: '-100%', y: 0 }; // Desktop: Slide to Left
    }
    return { x: 0, y: 0 }; // Center
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col lg:flex-row pointer-events-none"
      initial={getInitial()}
      animate={getAnimate()}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Left Text Side - Mirroring Hero Layout */}
      <div className={`w-full lg:w-1/2 h-full flex flex-col ${isMobile && mode === 'transition' ? 'justify-end pb-20 pl-6' : 'justify-center lg:justify-end p-6 md:p-12'} relative`}>
        <div className="flex flex-col leading-none w-full text-white">
          
          {mode === 'intro' ? (
            // FULL INTRO SEQUENCE
            <>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="font-sans font-normal tracking-tight whitespace-nowrap block"
                style={{ fontSize: 'clamp(1.7rem, 8vw, 5rem)' }}
              >
                EBOOKINGPHOTO
              </motion.span>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                className="font-serif italic font-light tracking-tight whitespace-nowrap block"
                style={{ 
                  fontSize: 'clamp(1.7rem, 8vw, 5rem)',
                  marginLeft: 'clamp(0.5rem, 3vw, 5rem)',
                  marginTop: 'clamp(-0.25rem, -0.8vw, -1rem)'
                }}
              >
                STUDIO
              </motion.span>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="font-sans font-normal tracking-tight whitespace-nowrap block"
                style={{ 
                  fontSize: 'clamp(1.7rem, 8vw, 5rem)',
                  marginTop: 'clamp(-0.125rem, -0.4vw, -0.75rem)'
                }}
              >
                PHOTOGRAPHE
              </motion.span>

              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
                className="font-serif italic font-light tracking-tight whitespace-nowrap block"
                style={{ 
                  fontSize: 'clamp(1.7rem, 8vw, 5rem)',
                  marginLeft: 'clamp(1rem, 3vw, 4rem)',
                  marginTop: 'clamp(-0.25rem, -0.8vw, -1rem)'
                }}
              >
                {lastLineText}
              </motion.span>
            </>
          ) : (
            // TRANSITION MODE - SINGLE TEXT
            <div className="flex flex-col">
              {isMobile && (
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="font-sans font-semibold tracking-tight whitespace-nowrap block self-start"
                  style={{ fontSize: 'clamp(2rem, 9vw, 3rem)' }}
                >
                  EBOOKING
                </motion.span>
              )}
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: isMobile ? 0.06 : 0 }}
                className={`font-serif italic font-light tracking-tight whitespace-nowrap block ${isMobile ? 'self-start' : 'self-center lg:self-start'}`}
                style={{ 
                  fontSize: isMobile ? 'clamp(2.8rem, 13vw, 4.2rem)' : 'clamp(3rem, 6vw + 1rem, 6rem)',
                }}
              >
                {lastLineText}
              </motion.span>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Empty black to cover the video/content */}
      <div className="w-full lg:w-1/2 h-full bg-black"></div>
    </motion.div>
  );
};

export default IntroAnimation;
