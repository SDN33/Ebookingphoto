import React from 'react';
import { DiagonalFeed } from '../components/DiagonalFeed';
import { PortfolioItem } from '../types';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Work: React.FC = () => {
  const config = useSiteConfig();
  return (
    <div className="relative w-full h-full bg-white">
      <DiagonalFeed items={config.work.projects as PortfolioItem[]} />
    </div>
  );
};

export default Work;