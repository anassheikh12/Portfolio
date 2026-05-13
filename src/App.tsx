import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArcadeProvider, useArcade } from './context/ArcadeContext';
import CloudBackground from './components/CloudBackground';
import HudNavbar from './components/HudNavbar';
import ChoiceTerminal from './components/ChoiceTerminal';
import CharacterSelect from './components/CharacterSelect';
import SkillsInventory from './components/SkillsInventory';
import WarpPipeProjects from './components/WarpPipeProjects';
import ContactForm from './components/ContactForm';
import DashboardMode from './components/DashboardMode';
import CustomCursor from './components/CustomCursor';

function ArcadeLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content Windows */}
      <div className="relative z-10 flex-1">
        <CharacterSelect />
        <SkillsInventory />
        <WarpPipeProjects />
        <ContactForm />
      </div>

      {/* Footer Roster - Positioned at the bottom of the scroll */}
      <footer className="relative mt-20 z-10">
        {/* Grand Crossover Roster - Layered behind content if needed, but here it's at the end */}
        <div className="absolute bottom-full left-0 w-full pointer-events-none z-0 overflow-visible flex justify-center -mb-1">
          <img 
            src="/footer-crowd.png" 
            alt="Retro Crowd" 
            className="w-[95%] max-w-[1600px] h-auto object-contain pixelated mix-blend-multiply"
          />
        </div>
        
        <div className="ground-strip h-10 w-full relative z-10" />
        <div className="ground-dirt h-24 w-full flex items-center justify-center relative z-10">
          <span className="text-white/60 text-[10px] font-pixel tracking-widest uppercase">
            © 2026 ANAS SHEIKH — WORLD 1-1 COMPLETE
          </span>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const { viewMode, setActiveSection } = useArcade();

  // Scroll to top and reset active section on mode change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (viewMode) {
      setActiveSection('about');
    }
  }, [viewMode, setActiveSection]);

  // Handle landing state (no scroll allowed)
  if (viewMode === null) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-retro-sky relative scanlines cursor-none">
        <CustomCursor />
        <CloudBackground />
        <div className="relative z-10 flex items-center justify-center h-full">
          <ChoiceTerminal />
        </div>
      </div>
    );
  }

  return (
    <div 
      key={viewMode}
      className={`relative min-h-screen scanlines cursor-none transition-colors duration-500 ${viewMode === 'arcade' ? 'bg-retro-sky' : 'bg-retro-dark'}`}
    >
      <CustomCursor />
      <CloudBackground />
      
      {/* Permanent HudNavbar when mode is active */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <HudNavbar />
      </motion.div>

      <div className="pt-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode || 'landing'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'arcade' ? <ArcadeLayout /> : <DashboardMode />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ArcadeProvider>
      <AppContent />
    </ArcadeProvider>
  );
}
