import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { id: '01', title: 'REPORTAGE PHOTO', desc: 'Documentaire & Storytelling', path: '/reportage' },
  { id: '02', title: 'ANIMATION TOTEM', desc: 'Expérience Photo Interactive', path: '/animation-totem' },
  { id: '03', title: 'SOIRÉE CLUB & ENTREPRISE', desc: 'Événements Sportifs & Entreprise', path: '/soiree-club-entreprise' },
];

interface ServicesProps {
  onNavigate: (path: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section className="w-full md:w-[70vw] min-h-screen md:h-screen shrink-0 flex flex-col justify-center p-6 md:p-0 bg-gray-50 snap-start">
      <div className="flex flex-col h-full justify-between py-10 md:py-20">
        
        <div className="border-b border-black pb-4 mb-8">
           <h2 className="text-sm font-sans tracking-widest uppercase">NOS EXPERTISES</h2>
        </div>

        <div className="flex flex-col gap-0">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => service.path && onNavigate(service.path)}
              className={`group border-b border-gray-300 py-8 md:py-12 flex flex-col md:flex-row md:items-baseline justify-between hover:bg-white hover:px-8 transition-all duration-500 cursor-pointer ${service.path ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                <span className="font-serif italic text-xl md:text-2xl text-gray-400 group-hover:text-black transition-colors">{service.id}</span>
                <h3 className="font-sans font-bold text-3xl md:text-5xl lg:text-5xl tracking-tight uppercase leading-none">{service.title}</h3>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-sans text-xs md:text-sm tracking-wide text-gray-600">{service.desc}</span>
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <p className="font-serif italic text-lg md:text-xl text-gray-500">Disponible pour des commandes dans le monde entier.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;