import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useImageMetrics } from '../hooks/useImageMetrics';

// Charge automatiquement toutes les images du dossier reportage dédié
const imageModules = import.meta.glob('/public/portfolio-reportage/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true, as: 'url' });

const reportageOrder = [
  "Vos événements d'entreprise, gala, séminaire..",
  "Soirée",
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
  "Photo spectacle danse",
  "À la lumière des projecteurs",
];

// Réglages de cadrage/taille par position affichée (après ajout de "Soirée" en #2)
const layoutOverrides: Record<
  number,
  { containerClass?: string; imageClass?: string; aspectRatio?: number }
> = {
  // 02 : même hauteur que la #03, sans rognage
  2: {
    containerClass: 'h-[44vh] md:h-[60vh]',
    imageClass: 'object-contain bg-gray-100',
    aspectRatio: 1.18,
  },
  // 2 -> 3 : rogner à gauche (sujet à droite), casser le format avec la #4
  3: { containerClass: 'h-[44vh] md:h-[60vh]', imageClass: 'object-cover object-[86%_50%]' },
  // 3 -> 4 : format différent de la #3
  4: { containerClass: 'h-[36vh] md:h-[52vh]' },
  // 4 -> 5 & 5 -> 6 : casser les formats identiques
  5: { containerClass: 'h-[50vh] md:h-[70vh]' },
  6: { containerClass: 'h-[40vh] md:h-[56vh]' },
  // 8 -> 9 : sans rognage, plus petit
  9: { containerClass: 'h-[30vh] md:h-[44vh]', imageClass: 'object-contain' },
  // 9 -> 10 : rogner à gauche pour casser le format
  10: { containerClass: 'h-[42vh] md:h-[60vh]', imageClass: 'object-cover object-[84%_50%]' },
  // 13 -> 14 (Duel) : même format que #16, mais plus grand
  14: { containerClass: 'h-[48vh] md:h-[68vh]' },
  // #16 après permutation (PHOTO SPECTACLE DANSE) : même base, un peu plus petit que #14
  16: { containerClass: 'h-[42vh] md:h-[58vh]' },
};

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const captionOverrides: Record<number, string> = {
  2: "Imprimez, partagez, c'est instantanné !",
  14: 'Duel à distance, combat sous silence',
  16: 'Écrire avec le corps',
};

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
      <div className="shrink-0 w-full md:w-[50vw] h-auto md:h-full flex flex-col justify-center px-8 py-8 md:p-24 bg-white z-10 pt-24 md:pt-0 pb-12">
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
        const position = index + 1;
        const imageMetrics = getMetrics(`reportage-${item.id}`, 4 / 3);
        const isVertical = imageMetrics.orientation === 'vertical';
        const override = layoutOverrides[position];
        const sizeClass = override?.containerClass ?? (isVertical ? 'h-[56vh] md:h-[78vh]' : 'h-[42vh] md:h-[62vh]');
        const fitClass = override?.imageClass ?? 'object-cover';
        const aspectRatio = override?.aspectRatio ?? imageMetrics.ratio;
        const caption = captionOverrides[position] ?? item.caption;

        return (
        <div
          key={item.id}
          className="shrink-0 w-full md:w-auto flex flex-col justify-center items-center px-8 md:px-10 py-8 md:py-0 relative group"
        >
          <div
            className={`relative w-full md:w-auto transition-all duration-700 ${sizeClass}`}
            style={{ aspectRatio }}
          >
            <motion.img
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              src={item.url}
              alt={caption}
              onLoad={onImageLoad(`reportage-${item.id}`)}
              className={`w-full h-full ${fitClass} contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-in-out`}
            />
          </div>

          {/* Caption */}
          <div className="mt-4 flex items-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100">
            <span className="font-sans text-xs font-bold tracking-widest">0{index + 1}</span>
            <span className="w-8 h-px bg-black/20" />
            <p className="font-serif italic text-lg">{caption}</p>
          </div>
        </div>
      )})}

      {/* End Spacer */}
      <div className="shrink-0 h-20 md:h-full md:w-[20vw] bg-gray-50 flex items-center justify-center">
        <span className="font-sans text-xs tracking-widest text-gray-300 uppercase md:[writing-mode:vertical-rl] md:rotate-0">
          {config.reportage.endLabel}
        </span>
      </div>
    </div>
  );
};

export default Reportage;
