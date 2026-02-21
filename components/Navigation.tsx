import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const parseColor = (value: string): [number, number, number, number] | null => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(',').map((p) => p.trim());
  const r = Number(parts[0]);
  const g = Number(parts[1]);
  const b = Number(parts[2]);
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return [r, g, b, a];
};

const luminance = (r: number, g: number, b: number) => {
  const normalize = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const rr = normalize(r);
  const gg = normalize(g);
  const bb = normalize(b);
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
};

const readBackgroundLuma = (el: HTMLElement): number => {
  let current: HTMLElement | null = el;
  while (current) {
    const style = window.getComputedStyle(current);
    const parsed = parseColor(style.backgroundColor);
    if (parsed && parsed[3] > 0.06) {
      return luminance(parsed[0], parsed[1], parsed[2]);
    }
    const classes = current.className;
    if (typeof classes === 'string') {
      if (classes.includes('bg-black')) return 0.03;
      if (classes.includes('bg-white')) return 0.98;
      if (classes.includes('bg-gray-50')) return 0.95;
      if (classes.includes('bg-gray-100')) return 0.9;
    }
    current = current.parentElement;
  }
  return 0.95;
};

const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const config = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [logoTone, setLogoTone] = useState<'light' | 'dark'>('dark');
  const [menuTone, setMenuTone] = useState<'light' | 'dark'>('dark');
  const navRootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const scanToneForElement = (
      el: HTMLElement | null,
      navRoot: HTMLElement | null,
    ): 'light' | 'dark' => {
      if (!el || !navRoot) return 'dark';
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return 'dark';

      const samplePoints: Array<[number, number]> = [
        [rect.left + rect.width * 0.2, rect.top + rect.height * 0.2],
        [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5],
        [rect.left + rect.width * 0.8, rect.top + rect.height * 0.8],
      ];

      let totalLuma = 0;
      let count = 0;

      for (const [x, y] of samplePoints) {
        const stack = document.elementsFromPoint(x, y);
        const target = stack.find(
          (node) => node instanceof HTMLElement && !navRoot.contains(node),
        ) as HTMLElement | undefined;
        if (!target) continue;
        totalLuma += readBackgroundLuma(target);
        count += 1;
      }

      const avg = count > 0 ? totalLuma / count : 0.95;
      return avg < 0.52 ? 'light' : 'dark';
    };

    const scan = () => {
      const navRoot = navRootRef.current;
      if (!navRoot) return;
      setLogoTone(scanToneForElement(logoRef.current, navRoot));
      setMenuTone(scanToneForElement(menuRef.current, navRoot));
    };

    const scheduleScan = () => window.requestAnimationFrame(scan);

    scheduleScan();
    window.addEventListener('scroll', scheduleScan, true);
    window.addEventListener('resize', scheduleScan);
    const intervalId = window.setInterval(scheduleScan, 250);

    return () => {
      window.removeEventListener('scroll', scheduleScan, true);
      window.removeEventListener('resize', scheduleScan);
      window.clearInterval(intervalId);
    };
  }, [currentPath, isOpen]);

  return (
    <>
      {/* Fixed Header Elements */}
      <div
        ref={navRootRef}
        className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start pointer-events-none"
      >
        {/* Top Left Logo - Click to go Home */}
        <div 
          ref={logoRef}
          onClick={() => handleNavigate('/')}
          className="pointer-events-auto hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          <img 
            src={config.navigation.logo.src} 
            alt={config.navigation.logo.alt} 
            className="h-8 w-auto md:h-10 transition-[filter] duration-200"
            style={{
              filter: logoTone === 'light'
                ? 'brightness(0) saturate(100%) invert(1)'
                : 'brightness(0) saturate(100%)',
            }}
          />
        </div>

        {/* Top Right Menu */}
        <button 
          ref={menuRef}
          onClick={() => setIsOpen(true)}
          className="text-xs md:text-sm font-sans tracking-widest font-semibold hover:opacity-50 transition-colors duration-200 pointer-events-auto"
          style={{ color: menuTone === 'light' ? '#ffffff' : '#000000' }}
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

          <div className="flex-1 flex flex-col justify-center items-center gap-4 md:gap-6 overflow-y-auto py-8 md:py-10">
            {config.navigation.menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path, item.sectionId)}
                className={`transition-opacity duration-300 cursor-pointer bg-transparent border-none text-center whitespace-nowrap ${currentPath === item.path ? 'opacity-55' : 'text-white hover:opacity-80'}`}
                style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.2rem)' }}
              >
                <span className="menu-line-primary">{item.label.replace(/\n/g, ' ')}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 font-sans tracking-widest uppercase">
            <span>{config.site.copyright}</span>
            {config.site.locations ? <span>{config.site.locations}</span> : <span />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
