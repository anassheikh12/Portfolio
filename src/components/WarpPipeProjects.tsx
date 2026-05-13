import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, type Project } from '../data/projectsData';

function WarpPipe({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center relative">
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center group cursor-pointer relative"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Mario Jump Animation - 120px Arc */}
        <AnimatePresence>
          {isHovered && (
            <motion.img
              src="/mario-jump.png"
              alt="Mario"
              initial={{ y: 40, opacity: 0 }}
              animate={{ 
                y: [40, -120, 40],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ 
                duration: 0.8, 
                times: [0, 0.4, 1], 
                ease: "easeOut" 
              }}
              className="absolute bottom-24 w-20 h-auto z-0 mix-blend-multiply"
            />
          )}
        </AnimatePresence>

        {/* Pipe lip */}
        <div className="w-24 sm:w-28 h-8 pipe-lip pixel-border-thick shadow-pixel relative z-10 group-hover:brightness-110 transition-all" />
        {/* Pipe body */}
        <div
          className="w-20 sm:w-24 pipe-body pixel-border-thick border-t-0 group-hover:brightness-110 transition-all"
          style={{ height: `${project.pipeHeight}px` }}
        />
      </motion.button>

      {/* Static Label embedded in the ground dirt area */}
      <div className="absolute top-full mt-10 z-30 w-full flex justify-center">
        <span className="text-retro-gold text-[7px] sm:text-[9px] pixel-text-outline whitespace-nowrap uppercase tracking-tighter sm:tracking-widest font-pixel">
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-retro-panel pixel-border-thick shadow-pixel-lg max-w-xl w-full max-h-[80vh] overflow-y-auto"
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
          {/* Video Gameplay Preview */}
          <div className="bg-black/20 pixel-border p-1 mb-6 relative overflow-hidden aspect-video">
            {project.videoAsset ? (
              <div className="border-4 border-black w-full h-full">
                <video 
                  src={`/${project.videoAsset}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
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

          {/* Tech stack */}
          <div className="mb-6">
            <span className="text-white/40 text-[7px] block mb-2">TECH LOADOUT:</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-retro-grass/20 pixel-border px-2 py-1 text-[7px] text-retro-grass pixel-text-outline">{t}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
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

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-end relative scroll-mt-24 overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 px-4">
        <div className="inline-flex items-center gap-3 bg-retro-dirt pixel-border shadow-pixel px-6 py-3">
          <span className="text-retro-gold text-lg">🏗️</span>
          <h2 className="text-white text-xs sm:text-sm pixel-text-outline uppercase">PROJECT SELECT</h2>
        </div>
      </motion.div>

      {/* Pipes Row - Grid Responsive */}
      <div className="max-w-7xl w-full mx-auto relative z-20 px-4 sm:px-10 lg:px-20 mb-0">
        {/* Ambient Sleeping Characters */}
        <div className="absolute left-2 sm:left-10 -bottom-4 z-30 pointer-events-none opacity-80">
          <img src="/goku.png" alt="Goku" className="w-20 sm:w-32 h-auto pixelated mix-blend-multiply" />
        </div>
        <div className="absolute right-2 sm:right-10 -bottom-6 z-30 pointer-events-none opacity-80">
          <img src="/narotu.png" alt="Naruto" className="w-16 sm:w-28 h-auto pixelated mix-blend-multiply" />
        </div>
        
        {/* Responsive Grid: 1x4 Mobile, 2x2 Tablet, 4x Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-12 sm:gap-16 lg:gap-10">
          {projectsData.map((project) => (
            <WarpPipe key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Ground Strip */}
      <div className="ground-strip h-8 pixel-border border-l-0 border-r-0 border-b-0 relative z-10" />
      <div className="ground-dirt h-24 pixel-border border-l-0 border-r-0 border-b-0 border-t-0 relative z-10" />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
