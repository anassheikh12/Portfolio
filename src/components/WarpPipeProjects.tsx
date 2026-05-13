import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, type Project } from '../data/projectsData';

function WarpPipe({ project, onClick, autoJump = false }: { project: Project; onClick: () => void; autoJump?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMario, setShowMario] = useState(false);

  // Auto-trigger jump on mobile when this pipe becomes the active slide
  useEffect(() => {
    if (!autoJump) return;
    // Small delay so the slide-in animation finishes first
    const delay = setTimeout(() => {
      setShowMario(true);
      // Hide mario after the full jump completes
      const hide = setTimeout(() => setShowMario(false), 1500);
      return () => clearTimeout(hide);
    }, 280);
    return () => clearTimeout(delay);
  }, [autoJump]);

  return (
    <div className="flex flex-col items-center relative flex-shrink-0">
      <motion.button
        onClick={onClick}
        onMouseEnter={() => { setIsHovered(true); setShowMario(true); }}
        onMouseLeave={() => { setIsHovered(false); setShowMario(false); }}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center group cursor-pointer relative"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.2 }}
      >
        {/* Mario Jump Animation */}
        <AnimatePresence>
          {(showMario || (isHovered && !autoJump)) && (
            <motion.img
              src="/mario-jump.png"
              alt="Mario"
              key="mario"
              initial={{ y: project.pipeHeight / 2, opacity: 0 }}
              animate={{ 
                y: [project.pipeHeight / 2, -(project.pipeHeight + 60), project.pipeHeight / 2],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                duration: 1.5, 
                times: [0, 0.4, 1], 
                ease: "easeInOut" 
              }}
              className="absolute bottom-16 w-20 h-auto z-0"
            />
          )}
        </AnimatePresence>

        {/* Pipe lip */}
        <div className="w-24 sm:w-28 h-8 pipe-lip pixel-border-thick shadow-pixel relative z-20 group-hover:brightness-110 transition-all" />
        {/* Pipe body */}
        <div
          className="w-20 sm:w-24 pipe-body pixel-border-thick border-t-0 relative z-10 group-hover:brightness-110 transition-all"
          style={{ height: `${project.pipeHeight}px` }}
        />
      </motion.button>

      {/* Static Label - Positioned within dirt area to prevent pipe lift */}
      <div className="absolute top-full mt-2 z-30 w-full flex justify-center pointer-events-none">
        <span className="text-retro-gold text-[8px] sm:text-[9px] pixel-text-outline whitespace-nowrap uppercase tracking-widest font-pixel bg-black/40 px-2 py-1">
          {project.title}
        </span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-[92px] sm:top-[108px] inset-x-0 bottom-0 z-[9999] flex items-start justify-center pt-4 px-4 pb-6 bg-black/70 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-retro-panel pixel-border-thick shadow-pixel-lg max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-retro-dirt pixel-border border-t-0 border-l-0 border-r-0 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 pixel-border flex items-center justify-center" style={{ backgroundColor: project.color }}>
              <span className="text-white text-[10px]">★</span>
            </div>
            <div>
              <h3 className="text-retro-gold text-[10px] pixel-text-outline">{project.title}</h3>
              <span className="text-white/50 text-[7px]">{project.subtitle}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 bg-retro-red pixel-border flex items-center justify-center shadow-pixel-sm"
          >
            <span className="text-white text-[10px]">✕</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-black/20 pixel-border p-1 mb-6 relative overflow-hidden aspect-video">
            {project.videoAsset ? (
              <div className="border-4 border-black w-full h-full group/video cursor-pointer relative">
                <video 
                  src={`/${project.videoAsset}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-contain"
                  onClick={(e) => {
                    const video = e.currentTarget as HTMLVideoElement;
                    if (video.requestFullscreen) {
                      video.requestFullscreen();
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-[8px] pixel-text-outline uppercase tracking-widest">⛶ CLICK FOR FULLSCREEN</span>
                </div>
              </div>
            ) : (
              <div className="min-h-[120px] h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <span className="text-white/40 text-[8px] pixel-text-outline uppercase tracking-widest">GAMEPLAY PREVIEW MISSING</span>
                </div>
              </div>
            )}
          </div>

          <p className="text-white/80 text-[10px] md:text-sm leading-relaxed font-mono whitespace-pre-line mb-8">{project.description}</p>

          <div className="mb-6">
            <span className="text-white/40 text-[7px] block mb-2">TECH LOADOUT:</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-retro-grass/20 pixel-border px-2 py-1 text-[7px] text-retro-grass pixel-text-outline">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-retro-dark pixel-border shadow-pixel py-3 text-center text-white text-[8px] pixel-text-outline hover:bg-retro-dark/80 transition-colors"
            >
              📦 VIEW CODE
            </motion.a>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-retro-grass pixel-border shadow-pixel-green py-3 text-center text-white text-[8px] pixel-text-outline hover:bg-retro-grass/80 transition-colors"
              >
                🚀 PLAY LIVE
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WarpPipeProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextProject, 3000);
    return () => clearInterval(timer);
  }, [isPaused, nextProject]);

  const handleManualNav = (dir: 'next' | 'prev') => {
    setIsPaused(true);
    if (dir === 'next') nextProject();
    else prevProject();
    // Resume autoscroll after 5s of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-end relative scroll-mt-24 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 px-4">
        <div className="inline-flex items-center gap-3 bg-retro-dirt pixel-border shadow-pixel px-6 py-3">
          <span className="text-retro-gold text-lg">🏗️</span>
          <h2 className="text-white text-xs sm:text-sm pixel-text-outline uppercase">PROJECT SELECT</h2>
        </div>
      </motion.div>

      {/* Pipes Container */}
      <div className="max-w-7xl w-full mx-auto relative z-20 px-0 lg:px-20 mb-0">
        {/* Ambient Sleeping Characters - Desktop Only */}
        <div className="hidden lg:block absolute left-2 sm:left-10 -bottom-4 z-30 pointer-events-none opacity-80">
          <img src="/goku.png" alt="Goku" className="w-20 sm:w-32 h-auto pixelated mix-blend-multiply" />
        </div>
        <div className="hidden lg:block absolute right-2 sm:right-10 -bottom-6 z-30 pointer-events-none opacity-80">
          <img src="/narotu.png" alt="Naruto" className="w-16 sm:w-28 h-auto pixelated mix-blend-multiply" />
        </div>
        
        {/* DESKTOP GRID (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-4 items-end gap-10">
          {projectsData.map((project) => (
            <WarpPipe key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        {/* MOBILE & TABLET STATE-DRIVEN SLIDER (under lg) */}
        <div className="relative lg:hidden h-[300px] flex items-end justify-center mb-0">
          {/* Slider Arrows - Positioned for thumb targets */}
          <button 
            onClick={() => handleManualNav('prev')}
            className="absolute left-8 bottom-4 z-40 bg-retro-dirt pixel-border w-12 h-12 flex items-center justify-center text-white active:scale-90 transition-transform shadow-pixel"
          >
            ◀
          </button>
          <button 
            onClick={() => handleManualNav('next')}
            className="absolute right-8 bottom-4 z-40 bg-retro-dirt pixel-border w-12 h-12 flex items-center justify-center text-white active:scale-90 transition-transform shadow-pixel"
          >
            ▶
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute bottom-0 w-full flex justify-center"
            >
              <WarpPipe 
                project={projectsData[currentIndex]} 
                onClick={() => setSelectedProject(projectsData[currentIndex])}
                autoJump={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Ground Strip - Pipes sit flush on this */}
      <div className="ground-strip h-8 pixel-border border-l-0 border-r-0 border-b-0 relative z-10" />
      <div className="ground-dirt h-24 pixel-border border-l-0 border-r-0 border-b-0 border-t-0 relative z-10" />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
