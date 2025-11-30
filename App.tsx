
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Reportage from './pages/Reportage';
import AnimationTotem from './pages/AnimationTotem';
import SoireeClubEntreprise from './pages/SoireeClubEntreprise';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={setCurrentPath} />;
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
        return <Home onNavigate={setCurrentPath} />;
    }
  };

  return (
    <main className="relative bg-white text-black h-screen w-screen overflow-hidden">
      <CustomCursor />
      <Navigation 
        currentPath={currentPath}
        onNavigate={setCurrentPath}
      />
      
      {/* Page Content */}
      <div className="h-full w-full">
        {renderPage()}
      </div>
    </main>
  );
};

export default App;
