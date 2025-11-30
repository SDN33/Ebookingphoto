
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col md:flex-row relative overflow-y-auto md:overflow-hidden">
      
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 fixed" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      {/* Left Side: Typography */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-20 relative z-10 border-b md:border-b-0 md:border-r border-white/10 pt-24 md:pt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 block">
            Prendre contact
          </span>
          <h1 className="flex flex-col leading-none">
            <span className="font-sans font-bold text-5xl md:text-8xl tracking-tighter">DÉMARRER UNE</span>
            <span className="font-serif italic font-light text-5xl md:text-8xl tracking-tight ml-4 md:ml-16 text-gray-300">CONVERSATION</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 md:mt-12 max-w-md font-sans text-sm leading-relaxed text-gray-400"
        >
          Disponible pour des commandes commerciales, éditoriales et collaborations de marque dans le monde entier. 
          Actuellement basé à Milan, avec des déplacements fréquents à Paris et New York.
        </motion.p>
      </div>

      {/* Right Side: Details */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-24 relative z-10 bg-black">
        
        <div className="flex flex-col gap-10 md:gap-16">
          {/* Email */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group"
          >
            <h3 className="font-serif italic text-2xl text-gray-500 mb-2">Demandes Générales</h3>
            <a href="mailto:hello@alessandro.com" className="flex items-center gap-4 text-xl md:text-4xl font-sans font-semibold hover:text-gray-300 transition-colors break-all">
              hello@alessandro.com
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6 shrink-0" />
            </a>
          </motion.div>

          {/* Representation */}
          <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="font-serif italic text-2xl text-gray-500 mb-4">Représentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="block font-sans text-xs tracking-widest text-gray-600 uppercase mb-1">Milan</span>
                <p className="font-sans text-lg">Visual Artists Agency</p>
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors border-b border-gray-800 pb-0.5">milano@visualartists.com</a>
              </div>
              <div>
                <span className="block font-sans text-xs tracking-widest text-gray-600 uppercase mb-1">New York</span>
                <p className="font-sans text-lg">Art Dept. NYC</p>
                <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors border-b border-gray-800 pb-0.5">nyc@artdept.com</a>
              </div>
            </div>
          </motion.div>

          {/* Info Grid */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 pt-8 border-t border-white/10"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <span className="block font-sans text-xs tracking-widest text-gray-500 uppercase mb-1">Studio</span>
                <p className="font-serif italic text-xl">Via Roma 42,<br/>20121 Milano, IT</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <span className="block font-sans text-xs tracking-widest text-gray-500 uppercase mb-1">Téléphone</span>
                <p className="font-serif italic text-xl">+39 02 555 1234</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
