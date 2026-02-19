import React from 'react';
import { useImageMetrics } from '../hooks/useImageMetrics';

const PROJECTS = [
  {
    id: '01',
    client: 'FEDERICA PELLEGRINI ACADEMY',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop', // Modern architecture with warm light
    aspect: 'portrait'
  },
  {
    id: '02',
    client: 'VOGUE ITALIA',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop', // High fashion portrait
    aspect: 'landscape'
  },
  {
    id: '03',
    client: 'PORSCHE DESIGN',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2000&auto=format&fit=crop', // Car motion blur
    aspect: 'square'
  }
];

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { onImageLoad, getMetrics } = useImageMetrics();
  const fallbackRatio = project.aspect === 'portrait' ? 3 / 4 : project.aspect === 'square' ? 1 : 4 / 3;
  const imageMetrics = getMetrics(`work-gallery-${project.id}`, fallbackRatio);

  return (
    <div className="flex-shrink-0 w-[80vw] md:w-[45vw] h-full flex flex-col justify-center px-8 md:px-12 relative">
      <div className="flex justify-between items-baseline mb-6 border-b border-black/10 pb-4">
        <span className="font-sans text-sm font-bold tracking-widest text-black/40">
          {project.id}
        </span>
        <h3 className="font-sans text-sm md:text-base font-semibold tracking-wide uppercase">
          {project.client}
        </h3>
        <span className="hidden md:block font-serif italic text-gray-400">
          {project.category}
        </span>
      </div>

      <div
        className="relative h-[50vh] md:h-[60vh] w-auto overflow-hidden bg-gray-100 group"
        style={{ aspectRatio: imageMetrics.ratio }}
      >
        <img 
          src={project.image} 
          alt={project.client}
          onLoad={onImageLoad(`work-gallery-${project.id}`)}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
        />
      </div>
      
      {/* Decorative diagonal line behind */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/5 -z-10 -rotate-12 scale-150 pointer-events-none" />
    </div>
  );
};

const WorkGallery: React.FC = () => {
  return (
    <section 
      className="shrink-0 h-screen flex items-center bg-white relative py-20 pl-20"
    >
      <div className="absolute top-10 left-10 md:left-20 z-10">
         <h2 className="font-serif italic text-4xl md:text-6xl text-black">Selected Work</h2>
      </div>

      <div className="flex h-full items-center pl-10 md:pl-20">
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>

      {/* Spacer to let the last item breathe */}
      <div className="w-[20vw] shrink-0 h-full" />
    </section>
  );
};

export default WorkGallery;
