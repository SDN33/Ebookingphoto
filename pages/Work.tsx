import React from 'react';
import { DiagonalFeed } from '../components/DiagonalFeed';
import { PortfolioItem } from '../types';

// Données générées manuellement basées sur la structure du dossier public/gallery
const PROJECTS: PortfolioItem[] = [
  {
    id: 1,
    title: 'AUTOMOBILE',
    category: 'Sport & Prestige',
    imageUrl: '/gallery/auto/photo1.jpg',
    projectImages: [
      '/gallery/auto/photo1.jpg',
      '/gallery/auto/photo2.jpg',
      '/gallery/auto/photo3.jpg',
      '/gallery/auto/photo4.jpg',
      '/gallery/auto/photo5.jpg'
    ]
  },
  {
    id: 2,
    title: 'COURSE',
    category: 'Compétition',
    imageUrl: '/gallery/course/photo1.jpg',
    projectImages: [
      '/gallery/course/photo1.jpg',
      '/gallery/course/photo2.jpg',
      '/gallery/course/photo3.jpg',
      '/gallery/course/photo4.jpg',
      '/gallery/course/photo5.jpg'
    ]
  },
  {
    id: 3,
    title: 'CULTURE',
    category: 'Art & Événement',
    imageUrl: '/gallery/culture/photo1.jpg',
    projectImages: [
      '/gallery/culture/photo1.jpg',
      '/gallery/culture/photo2.jpg',
      '/gallery/culture/photo3.jpg',
      '/gallery/culture/photo4.jpg',
      '/gallery/culture/photo5.jpg',
      '/gallery/culture/photo6.jpg'
    ]
  },
  {
    id: 4,
    title: 'MARIAGE',
    category: 'Cérémonie',
    imageUrl: '/gallery/mariage/photo1.jpg',
    projectImages: [
      '/gallery/mariage/photo1.jpg',
      '/gallery/mariage/photo12.jpg',
      '/gallery/mariage/photo2.jpg',
      '/gallery/mariage/photo3.jpg'
    ]
  },
  {
    id: 5,
    title: 'SÉMINAIRE',
    category: 'Corporate',
    imageUrl: '/gallery/seminaire/photo1.JPG',
    projectImages: [
      '/gallery/seminaire/photo1.JPG',
      '/gallery/seminaire/photo2.jpg',
      '/gallery/seminaire/photo3.JPG'
    ]
  },
  {
    id: 6,
    title: 'VOILE',
    category: 'Nautisme',
    imageUrl: '/gallery/voile/photo10.jpg',
    projectImages: [
      '/gallery/voile/photo10.jpg',
      '/gallery/voile/photo11.jpg',
      '/gallery/voile/photo2.jpg',
      '/gallery/voile/photo3.jpg',
      '/gallery/voile/photo4.jpg',
      '/gallery/voile/photo5.jpg',
      '/gallery/voile/photo6.jpg',
      '/gallery/voile/photo7.jpg',
      '/gallery/voile/photo8.jpg',
      '/gallery/voile/photo9.jpg'
    ]
  }
];

const Work: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-white">
      <DiagonalFeed items={PROJECTS} />
    </div>
  );
};

export default Work;