import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useImageMetrics } from '../hooks/useImageMetrics';

// Charge automatiquement toutes les images du dossier reportage dédié
const imageModules = import.meta.glob('/public/portfolio-reportage/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true, as: 'url' });

const reportageOrder = [
  "Vos événements d'entreprise, gala, séminaire..",
  "L'instant du lancement., l'image du succès",
  "Quand le mouvement se fait grâce",
  "Le sport entre ciel et terre",
  "Reportage au coeur du défi",
  "En roue libre",
  "Figer l'adrénaline",
  "Mécanique. Quand la piste s'efface",
  "Le Sport dans chaque foulée",
  "Au delà de la foulée",
  "L'éclat d'une plume",
  "Parures au sommet du chaos",
  "Duel à distance, géni sous silence",
  "Dans l'ombre d'un doute",
  "À la lumière des projecteurs",
  "PHOTO SPECTACLE DANSE",
];

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const Reportage: React.FC = () => {
  const config = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const { onImageLoad, getMetrics } = useImageMetrics();

  // Génère les images depuis le dossier puis applique l'ordre métier demandé
  const images = useMemo(() => {
    const orderIndex = new Map(
      reportageOrder.map((label, index) => [normalizeText(label), index]),
    );

    const ordered = Object.keys(imageModules)
      .map((path) => {
      const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      const normalizedFilename = normalizeText(filename);
      const rank = orderIndex.get(normalizedFilename);
      if (rank === undefined) return null;

      return { path, rank };
      })
      .filter((item): item is { path: string; rank: number } => item !== null)
      .sort((a, b) => a.rank - b.rank);

    return ordered.map((item, index) => ({
      id: index + 1,
      url: item.path.replace('/public', ''),
      caption: reportageOrder[item.rank],
    }));
  }, []);

  // Manual horizontal scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      if (window.innerWidth > 768) {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY + evt.deltaX;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col md:flex-row h-full w-full overflow-y-auto overflow-x-hidden md:overflow-y-hidden md:overflow-x-auto no-scrollbar bg-gray-50"
    >
      {/* Intro Section */}
      <div className="shrink-0 w-full md:w-[50vw] h-auto md:h-full flex flex-col justify-center p-6 md:p-24 bg-white z-10 pt-24 md:pt-0 pb-12">
        <span className="font-sans text-xs tracking-[0.3em] uppercase mb-6 text-gray-400">
          {config.reportage.intro.category}
        </span>
        <h1 className="text-5xl md:text-6xl 2xl:text-8xl font-sans font-bold tracking-tighter leading-none mb-2">
          {config.reportage.intro.title.line1}
        </h1>
        <h1 className="text-5xl md:text-6xl 2xl:text-8xl font-serif italic font-light leading-none text-gray-400 mb-4 md:mb-6">
          {config.reportage.intro.title.line2}
        </h1>
        <p className="mt-4 font-sans text-sm md:text-base leading-relaxed max-w-md text-gray-600 border-l-2 border-black pl-6">
         {config.reportage.intro.description}
        </p>
      </div>

      {/* Gallery Flow */}
      {images.map((item, index) => {
        const imageMetrics = getMetrics(`reportage-${item.id}`, 4 / 3);
        const isVertical = imageMetrics.orientation === 'vertical';

        return (
        <div
          key={item.id}
          className="shrink-0 w-full md:w-auto flex flex-col justify-center items-center px-4 md:px-10 py-8 md:py-0 relative group"
        >
          <div
            className={`relative transition-all duration-700 ${
              isVertical ? 'h-[56vh] md:h-[78vh]' : 'h-[42vh] md:h-[62vh]'
            }`}
            style={{ aspectRatio: imageMetrics.ratio }}
          >
            <motion.img
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              src={item.url}
              alt={item.caption}
              onLoad={onImageLoad(`reportage-${item.id}`)}
              className="w-full h-full object-cover contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Caption */}
          <div className="mt-4 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100">
            <span className="font-sans text-xs font-bold tracking-widest">0{index + 1}</span>
            <span className="w-8 h-px bg-black/20" />
            <p className="font-serif italic text-lg">{item.caption}</p>
          </div>
        </div>
      )})}

      {/* End Spacer */}
      <div className="shrink-0 h-20 md:h-full md:w-[20vw] bg-gray-50 flex items-center justify-center">
        <span className="md:vertical-rl font-sans text-xs tracking-widest text-gray-300 uppercase md:rotate-180 md:writing-mode-vertical">
          {config.reportage.endLabel}
        </span>
      </div>
    </div>
  );
};

export default Reportage;
