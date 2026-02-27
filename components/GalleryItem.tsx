import React from 'react';
import { Photo } from '../types';
import { useImageMetrics } from '../hooks/useImageMetrics';

interface GalleryItemProps {
  photo: Photo;
  index: number;
  onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ photo, index, onClick }) => {
  const { onImageLoad, getMetrics } = useImageMetrics();
  const fallbackRatio = photo.aspectRatio === 'portrait' ? 3 / 4 : 4 / 3;
  const metrics = getMetrics(photo.id, fallbackRatio);
  const isPortrait = metrics.orientation === 'vertical';
  const isTotemCard =
    photo.title.trim().toLowerCase() === 'totem' ||
    photo.category.toLowerCase().includes('animation');
  const isPoesieVisuelle = photo.title.trim().toLowerCase() === 'poésie visuelle';
  const mobileFitClass = isPoesieVisuelle
    ? 'object-cover object-[44%_50%] md:object-cover md:object-center'
    : isTotemCard
      ? 'object-cover object-center md:object-cover'
      : 'object-cover';
  const canClick = typeof onClick === 'function';

  return (
    <div 
      className={`shrink-0 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 w-full md:w-auto min-h-[50vh] md:h-screen relative group`}
    >
      <div
        onClick={onClick}
        className={`relative overflow-hidden bg-gray-100 shadow-lg mx-auto md:mx-0 ${isPoesieVisuelle ? 'w-[86vw] md:w-auto' : isTotemCard ? 'w-full md:w-auto' : ''} ${canClick ? 'cursor-pointer' : 'cursor-default'} ${
          isPortrait ? 'h-[60vh] md:h-[70vh]' : 'h-[40vh] md:h-[50vh]'
        }`}
        style={{ aspectRatio: metrics.ratio }}
      >
        <img 
          src={photo.url} 
          alt={photo.title}
          onLoad={onImageLoad(photo.id)}
          className={`w-full h-full ${mobileFitClass} grayscale transition-all duration-700 ease-in-out contrast-110 ${
            isTotemCard ? 'md:grayscale-0' : 'md:grayscale md:group-hover:grayscale-0'
          }`}
          loading="lazy"
        />

        {/* Hover Info - Desktop */}
        <div
          className={`absolute inset-0 transition-colors duration-500 z-10 pointer-events-none ${
            isTotemCard ? 'bg-black/0 group-hover:bg-black/0' : 'bg-black/0 group-hover:bg-black/20'
          }`}
        />
        <div className="hidden md:block absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 text-white mix-blend-difference">
           <p className="font-sans text-xs tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.category}</p>
           <h3 className="font-serif italic text-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{photo.title}</h3>
        </div>
      </div>
      
      {/* Mobile Info Below Image */}
      <div className="mt-4 md:hidden flex justify-between items-baseline border-b border-gray-200 pb-2">
         <h3 className="font-serif italic text-2xl">{photo.title}</h3>
         <p className="font-sans text-xs text-gray-500 tracking-widest uppercase">{photo.category}</p>
      </div>

      <span className="hidden md:block absolute -bottom-10 left-12 text-[10rem] font-sans font-bold text-gray-100/50 -z-10 select-none">
        0{index + 1}
      </span>
    </div>
  );
};

export default GalleryItem;
