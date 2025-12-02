import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="w-full h-full bg-black text-white flex flex-col md:flex-row relative overflow-y-auto md:overflow-hidden">
      
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 fixed" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      {/* Left Side: Typography */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-20 relative z-10 border-b md:border-b-0 md:border-r border-white/10 pt-24 md:pt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 block">
            Prendre contact
          </span>
          <h1 className="flex flex-col leading-none">
            <span className="font-sans font-bold text-4xl md:text-8xl tracking-tighter">DÉMARRER UNE</span>
            <span className="font-serif italic font-light text-4xl md:text-8xl tracking-tight ml-2 md:ml-16 text-gray-300 break-all md:break-normal">CONVERSATION</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 md:mt-12 max-w-md font-sans text-sm leading-relaxed text-gray-400"
        >
          Disponible pour des commandes commerciales, reportages et collaborations dans le monde entier.
        </motion.p>
      </div>

      {/* Right Side: Details */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-24 relative z-10 bg-black pb-32 md:pb-24">
        
        <div className="flex flex-col gap-12">
          
          {/* Email Block */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-2">
               <Mail className="w-4 h-4 text-gray-500" />
               <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">Email</h3>
            </div>
            <a href="mailto:charles-andre@ebookingphoto.com" className="flex items-center gap-4 text-xl md:text-3xl font-serif italic hover:text-gray-300 transition-colors break-all">
              charles-andre@ebookingphoto.com
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-5 h-5 shrink-0 text-gray-400" />
            </a>
          </motion.div>

          {/* Phone Block */}
          <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.6 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-2">
               <Phone className="w-4 h-4 text-gray-500" />
               <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">Téléphone</h3>
            </div>
            <a href="tel:+33667926647" className="flex items-center gap-4 text-xl md:text-3xl font-serif italic hover:text-gray-300 transition-colors">
              +33 6 67 92 66 47
            </a>
          </motion.div>

          {/* Address Block */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
               <MapPin className="w-4 h-4 text-gray-500" />
               <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">Studio</h3>
            </div>
            <p className="font-serif italic text-xl md:text-2xl text-gray-200 leading-relaxed">
              3, Rue du Petit Croissant<br/>
              91410 Dourdan, France
            </p>
          </motion.div>

          {/* Socials Divider */}
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px w-full bg-white/10 origin-left" 
          />

          {/* Socials */}
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.6, duration: 0.6 }}
             className="flex gap-12"
          >
            <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans text-sm tracking-wide uppercase border-b border-transparent group-hover:border-white pb-0.5 transition-all">Facebook</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans text-sm tracking-wide uppercase border-b border-transparent group-hover:border-white pb-0.5 transition-all">Instagram</span>
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
