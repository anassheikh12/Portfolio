import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '../data/projectsData';
import { useArcade } from '../context/ArcadeContext';

export default function HudNavbar() {
  const { activeSection, setActiveSection, viewMode, setViewMode } = useArcade();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Force 'about' if at the very top
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
          // If we are at the very top, 'about' is forced by handleScroll anyway
          if (entry.isIntersecting && window.scrollY > 50) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0, 
        rootMargin: '-100px 0px -80% 0px' 
      }
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'shadow-pixel-lg' : ''
      }`}
    >
      {/* Main HUD bar */}
      <div className="bg-retro-dirt pixel-border-thick border-t-0 border-l-0 border-r-0">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo / Title */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-retro-gold pixel-border flex items-center justify-center shadow-pixel-sm">
              <span className="text-black text-xs">★</span>
            </div>
            <span className="text-white text-[10px] sm:text-xs pixel-text-outline tracking-wider hidden sm:block">
              ANAS.DEV
            </span>
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`relative px-2 sm:px-3 py-2 text-[8px] sm:text-[10px] tracking-wide transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-retro-gold'
                    : 'text-white/80 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <span className="pixel-text-outline flex items-center gap-1">
                  <span className="hidden md:inline">{item.icon}</span>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-[6px] left-1/2 -translate-x-1/2"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="text-retro-grass text-[10px] pixel-text-outline">▼</div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Mode Toggle */}
          <motion.button
            onClick={() => setViewMode(viewMode === 'arcade' ? 'dashboard' : 'arcade')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-2 pixel-border font-pixel shadow-pixel transition-all group ${
              viewMode === 'arcade'
                ? 'bg-retro-panel text-white border-white'
                : 'bg-retro-grass text-retro-dark border-retro-dark'
            }`}
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">
              {viewMode === 'arcade' ? '🕹️' : '💼'}
            </span>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[6px] opacity-60 uppercase mb-1">Switch to:</span>
              <span className="text-[10px] uppercase tracking-tighter">
                {viewMode === 'arcade' ? 'Professional' : 'Arcade Mode'}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Coin/Score bar */}
      <div className="bg-black/40 border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-1 flex justify-between text-[7px] sm:text-[8px] text-white/70">
          <span className="pixel-text-outline">🪙 WORLD 1-1</span>
          <span className="pixel-text-outline">⏱ TIME: ∞</span>
          <span className="pixel-text-outline">❤️ HP: 100</span>
        </div>
      </div>
    </motion.nav>
  );
}
