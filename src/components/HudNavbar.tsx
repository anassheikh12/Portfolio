import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../data/projectsData';
import { useArcade } from '../context/ArcadeContext';

export default function HudNavbar() {
  const { activeSection, setActiveSection, viewMode, setViewMode } = useArcade();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 50) {
        setActiveSection('about');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY > 50) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: '-100px 0px -80% 0px' }
    );

    const timer = setTimeout(() => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [viewMode, setActiveSection]);

  const handleClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled ? 'shadow-pixel-lg' : ''
        }`}
      >
        {/* Main HUD bar */}
        <div className="bg-retro-dirt pixel-border-thick border-t-0 border-l-0 border-r-0">
          <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
            {/* Logo / Title - Clickable to Landing */}
            <motion.div
              onClick={() => setViewMode(null)}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-retro-gold pixel-border flex items-center justify-center shadow-pixel-sm group-hover:bg-white transition-colors">
                <span className="text-black text-xs">★</span>
              </div>
              <span className="text-white text-[10px] sm:text-xs pixel-text-outline tracking-wider font-pixel">
                ANAS.DEV
              </span>
            </motion.div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`relative px-3 py-2 text-[10px] tracking-wide transition-colors duration-200 ${
                    activeSection === item.id ? 'text-retro-gold' : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <span className="pixel-text-outline flex items-center gap-1 font-pixel">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div layoutId="activeIndicator" className="absolute -bottom-[6px] left-1/2 -translate-x-1/2">
                      <div className="text-retro-grass text-[10px] pixel-text-outline">▼</div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mode Toggle Switch - Integrated & Responsive */}
              <motion.button
                onClick={() => setViewMode(viewMode === 'arcade' ? 'dashboard' : 'arcade')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 pixel-border font-pixel shadow-pixel transition-all group ${
                  viewMode === 'arcade'
                    ? 'bg-retro-panel text-white border-white'
                    : 'bg-retro-grass text-retro-dark border-retro-dark'
                }`}
              >
                <span className="text-lg sm:text-xl">
                  {viewMode === 'arcade' ? '🕹️' : '💼'}
                </span>
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="text-[6px] opacity-60 uppercase mb-1">Switch to:</span>
                  <span className="text-[10px] uppercase tracking-tighter">
                    {viewMode === 'arcade' ? 'Professional' : 'Arcade Mode'}
                  </span>
                </div>
              </motion.button>

              {/* Hamburger Button - Mobile Only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 bg-retro-dirt pixel-border flex flex-col items-center justify-center gap-1 active:scale-90 transition-transform"
              >
                <div className={`w-6 h-1 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-6 h-1 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-1 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Coin/Score bar */}
        <div className="bg-black/60 backdrop-blur-sm border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between text-[7px] sm:text-[8px] text-white/70">
            <span className="pixel-text-outline font-pixel">🪙 WORLD 1-1</span>
            <span className="pixel-text-outline font-pixel">⏱ TIME: ∞</span>
            <span className="pixel-text-outline font-pixel">❤️ HP: 100</span>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[50] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-8 w-full px-10">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => handleClick(item.id)}
                  className={`w-full max-w-sm py-6 pixel-border-thick text-center text-xl font-pixel transition-all pixel-text-outline ${
                    activeSection === item.id 
                      ? 'bg-retro-gold text-black shadow-pixel-lg' 
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="pixel-text-outline">{item.label}</span>
                </motion.button>
              ))}
              
              {/* Secondary Branding in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-[10px] text-white/30 font-pixel tracking-widest"
              >
                — SELECT STAGE —
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
