import { motion } from 'framer-motion';
import { useArcade } from '../context/ArcadeContext';

export default function ChoiceTerminal() {
  const { viewMode, setViewMode } = useArcade();

  return (
    <section className="h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
        className="relative max-w-lg w-full"
      >
        {/* Question block decorations */}
        <motion.div
          className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {['?', '!', '?'].map((char, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-retro-gold pixel-border flex items-center justify-center shadow-pixel question-block"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span className="text-retro-dirt text-sm font-pixel">{char}</span>
            </div>
          ))}
        </motion.div>

        {/* Main terminal panel */}
        <div className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-6 sm:p-8">
          {/* Terminal header */}
          <div className="bg-retro-dirt pixel-border p-3 mb-6 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-retro-red pixel-border" />
              <div className="w-3 h-3 bg-retro-gold pixel-border" />
              <div className="w-3 h-3 bg-retro-grass pixel-border" />
            </div>
            <span className="text-white text-[8px] pixel-text-outline ml-2">SELECT MODE</span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h1
              className="text-retro-gold text-sm sm:text-lg pixel-text-outline mb-3"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CHOOSE YOUR PATH
            </motion.h1>
            <p className="text-white/60 text-[8px] leading-relaxed">
              SELECT AN INTERFACE MODE TO BEGIN
            </p>
          </div>

          {/* Mode buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Arcade Mode */}
            <motion.button
              onClick={() => setViewMode('arcade')}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-5 pixel-border-thick text-left transition-all ${
                viewMode === 'arcade'
                  ? 'bg-retro-grass shadow-pixel-green ring-2 ring-retro-gold'
                  : 'bg-retro-grass/30 shadow-pixel hover:bg-retro-grass/50'
              }`}
            >
              {viewMode === 'arcade' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-retro-gold pixel-border flex items-center justify-center"
                >
                  <span className="text-[10px]">▶</span>
                </motion.div>
              )}
              <div className="text-3xl mb-3">🕹️</div>
              <h2 className="text-white text-[10px] pixel-text-outline mb-2">
                ARCADE MODE
              </h2>
              <p className="text-white/60 text-[7px] leading-relaxed">
                Full retro experience with animations, pixel art, and interactive elements
              </p>
            </motion.button>

            {/* Dashboard Mode */}
            <motion.button
              onClick={() => setViewMode('dashboard')}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-5 pixel-border-thick text-left transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-retro-dark shadow-pixel ring-2 ring-retro-gold'
                  : 'bg-retro-dark/50 shadow-pixel hover:bg-retro-dark/70'
              }`}
            >
              {viewMode === 'dashboard' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-retro-gold pixel-border flex items-center justify-center"
                >
                  <span className="text-[10px]">▶</span>
                </motion.div>
              )}
              <div className="text-3xl mb-3">💼</div>
              <h2 className="text-white text-[10px] pixel-text-outline mb-2">
                DASHBOARD MODE
              </h2>
              <p className="text-white/60 text-[7px] leading-relaxed">
                Clean minimal resume view for recruiters and hiring managers
              </p>
            </motion.button>
          </div>

          {/* Blinking prompt */}
          <motion.div
            className="mt-6 text-center"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <span className="text-retro-grass text-[8px] pixel-text-outline">
              ▶ PRESS START ◀
            </span>
          </motion.div>
        </div>

        {/* Ground under terminal */}
        <div className="ground-strip h-4 pixel-border border-t-0" />
        <div className="ground-dirt h-6 pixel-border border-t-0" />
      </motion.div>
    </section>
  );
}
