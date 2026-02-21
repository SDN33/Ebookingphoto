import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

interface ServicesProps {
  onNavigate: (path: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const config = useSiteConfig();
  const services = config.home.services;

  return (
    <section className="w-full lg:w-[70vw] h-screen shrink-0 flex flex-col justify-center px-7 py-8 md:p-12 lg:px-10 lg:py-8 2xl:px-20 bg-gray-50 snap-start">
      <div className="flex flex-col h-full justify-between py-2 md:py-8">
        
        <div className="border-b border-black pb-4 mb-5 md:mb-6">
           <h2 className="text-sm font-sans tracking-widest uppercase">{services.title}</h2>
        </div>

        <div className="flex flex-col gap-1">
          {services.items.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => service.path && onNavigate(service.path)}
              className={`group border-b border-gray-300 py-6 md:py-8 flex flex-col md:flex-col lg:flex-row lg:items-baseline justify-between hover:bg-white md:hover:px-8 transition-all duration-500 cursor-pointer ${service.path ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex flex-col md:flex-col lg:flex-row lg:items-baseline gap-3 md:gap-3 lg:gap-12">
                <span className="font-serif italic text-xl md:text-2xl text-gray-400 group-hover:text-black transition-colors">{service.id}</span>
                <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-4xl tracking-tight uppercase leading-[0.95] whitespace-pre-line min-h-[2.1em]">{service.title}</h3>
              </div>
              <div className="flex items-center gap-4 mt-5 md:mt-5 lg:mt-0 opacity-100 md:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-sans text-xs md:text-sm tracking-wide text-gray-600">{service.description}</span>
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-4 md:pt-6">
          <p className="font-serif italic text-base md:text-lg text-gray-500">{services.footer}</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
