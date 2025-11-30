import React from 'react';
import { DiagonalFeed } from '../components/DiagonalFeed';
import { PortfolioItem } from '../types';

const PROJECTS: PortfolioItem[] = [
  {
    id: '01',
    title: 'FEDERICA PELLEGRINI ACADEMY',
    category: 'Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'VOGUE ITALIA',
    category: 'Éditorial',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'PORSCHE DESIGN',
    category: 'Automobile',
    imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '04',
    title: 'ARMANI CASA',
    category: 'Intérieur',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: '05',
    title: 'GQ MAGAZINE',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop',
  }
];

const Work: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-white">
      {/* Introduction Block */}
      

      <DiagonalFeed items={PROJECTS} />
    </div>
  );
};

export default Work;