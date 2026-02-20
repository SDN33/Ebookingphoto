import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

const iconMap: { [key: string]: React.ElementType } = {
  Mail,
  Phone,
  Instagram,
  Facebook
};

const Contact: React.FC = () => {
  const config = useSiteConfig();
  return (
    <div className="w-full h-full bg-black text-white flex flex-col md:flex-row relative overflow-y-auto md:overflow-hidden">
      
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 fixed" 
           style={{ backgroundImage: `url("${config.contact.backgroundTexture}")` }} />

      {/* Left Side: Typography */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-20 relative z-10 border-b md:border-b-0 md:border-r border-white/10 pt-24 md:pt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 block">
            {config.contact.intro.category}
          </span>
          <h1 className="flex flex-col leading-none">
            <span className="font-sans font-bold text-4xl md:text-6xl 2xl:text-8xl tracking-tighter">{config.contact.intro.title.line1}</span>
            <span className="font-serif italic font-light text-4xl md:text-6xl 2xl:text-8xl tracking-tight ml-2 md:ml-16 text-gray-300 break-all md:break-normal">{config.contact.intro.title.line2}</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 md:mt-12 max-w-md font-sans text-sm leading-relaxed text-gray-400"
        >
          {config.contact.intro.description}
        </motion.p>
      </div>

      {/* Right Side: Details */}
      <div className="w-full md:w-1/2 shrink-0 min-h-[50vh] md:h-full flex flex-col justify-center p-10 md:p-24 relative z-10 bg-black pb-32 md:pb-24">
        
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Email Block */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-2">
                 <Mail className="w-4 h-4 text-gray-500" />
                 <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">{config.contact.details.email.label}</h3>
              </div>
              <a href={config.contact.details.email.href} className="flex items-center gap-4 text-xl md:text-3xl font-serif italic hover:text-gray-300 transition-colors break-all">
                {config.contact.details.email.value}
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
                 <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">{config.contact.details.phone.label}</h3>
              </div>
              <a href={config.contact.details.phone.href} className="flex items-center gap-4 text-xl md:text-3xl font-serif italic hover:text-gray-300 transition-colors">
                {config.contact.details.phone.value}
              </a>
              {/* Appeler Button - Mobile Only */}
              <a 
                href={config.contact.details.phone.href} 
                className="md:hidden mt-4 inline-block px-6 py-3 bg-white text-black font-sans text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
              >
                {config.contact.details.phone.callButton}
              </a>
            </motion.div>
          </div>

          {/* Simple Formspree Form */}
          <motion.form
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            action="https://formspree.io/f/xeellpkv"
            method="POST"
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <h3 className="font-sans text-xs tracking-widest text-gray-500 uppercase">Formulaire de contact</h3>
            </div>

            <input
              type="text"
              name="name"
              required
              placeholder="Nom"
              className="w-full bg-transparent border border-white/30 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full bg-transparent border border-white/30 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Votre message"
              className="w-full bg-transparent border border-white/30 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-6 py-3 border border-white text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              Envoyer
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Socials Divider */}
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px w-full bg-white/10 origin-left" 
          />

          {/* Socials */}
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.7, duration: 0.6 }}
             className="flex gap-12"
          >
            {config.contact.details.socials.map((social, idx) => {
              const SocialIcon = iconMap[social.icon] || Facebook;
              return (
                <a key={idx} href={social.href} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <SocialIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-sm tracking-wide uppercase border-b border-transparent group-hover:border-white pb-0.5 transition-all">{social.name}</span>
                </a>
              );
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
