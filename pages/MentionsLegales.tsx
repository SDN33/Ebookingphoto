import React from 'react';
import { motion } from 'framer-motion';

const MentionsLegales: React.FC = () => {
  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto">
      <div className="min-h-full px-8 py-24 md:px-16 md:py-28 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">
            Informations Légales
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-6xl tracking-tighter leading-none mb-2">
            Mentions
          </h1>
          <h2 className="font-serif italic text-4xl md:text-6xl font-light text-gray-300 mb-12 leading-none">
            légales
          </h2>

          <div className="space-y-8 md:space-y-10">
            <section className="border-l border-white/20 pl-5 md:pl-7">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Editeur</p>
              <p className="font-serif italic text-2xl md:text-3xl">EBOOKINGPHOTO</p>
              <p className="mt-3 font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                3, Rue du Petit Croissant – 91410 Dourdan
              </p>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                Mail : charles-andre@ebookingphoto.com
              </p>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                Tel : 01 60 08 81 08 98
              </p>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                Mob France Métropolitaine : 06 67 92 66 47
              </p>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                Siret : 480 657 030 000 56 – Code APE : 7420 Z
              </p>
            </section>

            <section className="border-l border-white/20 pl-5 md:pl-7">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Publication</p>
              <p className="font-sans text-base md:text-lg text-gray-200">
                Charles-André Ekambi Kingue
              </p>
            </section>

            <section className="border-l border-white/20 pl-5 md:pl-7">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Hébergeur</p>
              <p className="font-sans text-base md:text-lg text-gray-200">Vercel Inc.</p>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed">
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentionsLegales;
