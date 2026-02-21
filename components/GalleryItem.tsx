
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
  const canClick = typeof onClick === 'function';

  return (
    <div 
      className={`shrink-0 flex flex-col justify-center px-6 md:px-16 py-10 md:py-0 w-full md:w-auto min-h-[50vh] md:h-screen relative group`}
    >
      <div 
        onClick={onClick}
        className={`relative overflow-hidden bg-gray-100 shadow-lg mx-auto md:mx-0 ${canClick ? 'cursor-pointer' : 'cursor-default'} ${
          isPortrait ? 'h-[60vh] md:h-[70vh]' : 'h-[40vh] md:h-[50vh]'
        }`}
        style={{ aspectRatio: metrics.ratio }}
      >
        <img 
          src={photo.url} 
          alt={photo.title}
          onLoad={onImageLoad(photo.id)}
          className={`w-full h-full object-cover grayscale-0 md:grayscale transition-all duration-700 ease-in-out contrast-110 ${
            isTotemCard
              ? 'md:group-hover:grayscale-0 md:group-hover:brightness-125 md:group-hover:saturate-110'
              : 'md:group-hover:grayscale-0'
          }`}
          loading="lazy"
        />

        {/* Hover Info - Desktop */}
        <div
          className={`absolute inset-0 transition-colors duration-500 z-10 pointer-events-none ${
            isTotemCard ? 'bg-black/0 group-hover:bg-black/0' : 'bg-black/0 group-hover:bg-black/20'
          }`}
        />
        <div
          className={`hidden md:block absolute bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 text-white mix-blend-difference ${
            isPoesieVisuelle ? 'left-1/2 -translate-x-1/2 text-center w-[85%]' : 'left-0'
          }`}
        >
           <p className="font-sans text-xs tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.category}</p>
           <h3 className="font-serif italic text-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{photo.title}</h3>
        </div>
      </div>
      
      {/* Mobile Info Below Image */}
      <div className={`mt-4 md:hidden border-b border-gray-200 pb-2 ${isPoesieVisuelle ? 'flex flex-col items-center text-center gap-1' : 'flex justify-between items-baseline'}`}>
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
