import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const config = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path: string, sectionId?: string) => {
    setIsOpen(false);
    
    if (path !== currentPath) {
      onNavigate(path);
      // If switching pages, wait for render then scroll
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Already on the page
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else if (path === '/') {
        // Scroll to top if clicking Home (dot) while on Home
        const top = document.getElementById('top');
        if (top) top.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Fixed Header Elements with Mix Blend Difference */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start pointer-events-none mix-blend-difference">
        {/* Top Left Logo - Click to go Home */}
        <div 
          onClick={() => handleNavigate('/')}
          className="pointer-events-auto hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          <img 
            src={config.navigation.logo.src} 
            alt={config.navigation.logo.alt} 
            className="h-8 w-auto md:h-10"
          />
        </div>

        {/* Top Right Menu */}
        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs md:text-sm font-sans tracking-widest font-semibold hover:opacity-50 transition-opacity pointer-events-auto text-white"
        >
          MENU
        </button>
      </div>

      {/* Hidden Backlink */}
      <a
        href="https://stillinov.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      >
        Propulsé par Still-inov Agency
      </a>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-black text-white z-[60] transition-transform duration-700 ease-[0.22,1,0.36,1] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full p-6 md:p-10">
          <div className="flex justify-between items-start">
            <div className="w-2 h-2 bg-white rounded-full" />
            <button 
              onClick={() => setIsOpen(false)}
              className="text-xs md:text-sm font-sans tracking-widest font-semibold hover:opacity-50 transition-opacity flex items-center gap-2"
            >
              FERMER <X size={16} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-8 md:gap-12">
            {config.navigation.menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavigate(item.path, item.sectionId)}
                className={`text-4xl md:text-7xl font-serif italic hover:font-sans hover:not-italic transition-all duration-300 cursor-pointer bg-transparent border-none ${currentPath === item.path ? 'opacity-50' : 'text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 font-sans tracking-widest uppercase">
            <span>{config.site.copyright}</span>
            <span>{config.site.locations}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
