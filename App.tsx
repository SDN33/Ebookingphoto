
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Reportage from './pages/Reportage';
import AnimationTotem from './pages/AnimationTotem';
import SoireeClubEntreprise from './pages/SoireeClubEntreprise';
import CustomCursor from './components/CustomCursor';
import IntroAnimation from './components/IntroAnimation';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState('TOTEM');
  const [introMode, setIntroMode] = useState<'intro' | 'transition'>('intro');
  
  const handleNavigate = (path: string) => {
    // Determine if we need a transition animation
    let transitionTitle = '';
    
    if (path === '/reportage') transitionTitle = 'REPORTAGE PHOTO';
    else if (path === '/animation-totem') transitionTitle = 'ANIMATION TOTEM';
    else if (path === '/soiree-club-entreprise') transitionTitle = 'SOIRÉE CLUB & ENTREPRISE';

    if (transitionTitle) {
      setIntroText(transitionTitle);
      setIntroMode('transition');
      // Ensure we unmount and remount if it was somehow already true (unlikely in this flow but safer)
      setShowIntro(false);
      setTimeout(() => {
        setShowIntro(true);
        // Delay content change to allow slide-in to cover screen
        setTimeout(() => {
          setCurrentPath(path);
        }, 800);
      }, 10);
    } else {
      setCurrentPath(path);
    }
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={handleNavigate} />;
      case '/work':
        return <Work />;
      case '/contact':
        return <Contact />;
      case '/reportage':
        return <Reportage />;
      case '/animation-totem':
        return <AnimationTotem />;
      case '/soiree-club-entreprise':
        return <SoireeClubEntreprise />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <main className="relative bg-white text-black h-screen w-screen overflow-hidden">
      {showIntro && (
        <IntroAnimation 
          onComplete={() => setShowIntro(false)} 
          lastLineText={introText}
          mode={introMode}
        />
      )}
      <CustomCursor />
      <Navigation 
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />
      
      {/* Page Content */}
      <div className="h-full w-full">
        {renderPage()}
      </div>
    </main>
  );
};

export default App;
