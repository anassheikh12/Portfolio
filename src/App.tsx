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
    <div className="relative z-10">
      <CharacterSelect />
      <SkillsInventory />
      <WarpPipeProjects />
      <ContactForm />

      {/* Footer ground */}
      <footer className="relative mt-40">
        {/* Grand Crossover Roster */}
        <div className="absolute bottom-full left-0 w-full pointer-events-none z-10 overflow-visible flex justify-center">
          <img 
            src="/footer-crowd.png" 
            alt="Retro Crowd" 
            className="w-[90%] max-w-[1400px] h-auto pixelated mix-blend-multiply"
          />
        </div>
        <div className="ground-strip h-10 relative z-20" />
        <div className="ground-dirt h-24 flex items-center justify-center relative z-20">
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
    <div className={`relative min-h-screen scanlines cursor-none ${viewMode === 'arcade' ? 'bg-retro-sky' : 'bg-retro-dark'}`}>
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
