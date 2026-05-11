import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, type Project } from '../data/projectsData';

function WarpPipe({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center group cursor-pointer"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Label above pipe */}
      <motion.div
        className="bg-retro-panel pixel-border shadow-pixel-sm px-3 py-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-retro-gold text-[7px] pixel-text-outline whitespace-nowrap">{project.title}</span>
      </motion.div>
      {/* Pipe lip */}
      <div className="w-24 sm:w-28 h-8 pipe-lip pixel-border-thick shadow-pixel relative z-10 group-hover:brightness-110 transition-all" />
      {/* Pipe body */}
      <div
        className="w-20 sm:w-24 pipe-body pixel-border-thick border-t-0 group-hover:brightness-110 transition-all"
        style={{ height: `${project.pipeHeight}px` }}
      />
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
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
          {/* Game screen mockup */}
          <div className="bg-retro-sky/20 pixel-border p-4 mb-6 min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <span className="text-white/40 text-[8px] pixel-text-outline">GAMEPLAY PREVIEW</span>
            </div>
          </div>

          <p className="text-white/80 text-[8px] leading-[2] pixel-text-outline mb-6">{project.description}</p>

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
    <section id="projects" className="min-h-screen flex flex-col justify-end px-4 py-24 relative scroll-mt-24">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-retro-dirt pixel-border shadow-pixel px-6 py-3">
          <span className="text-retro-gold text-lg">🏗️</span>
          <h2 className="text-white text-xs sm:text-sm pixel-text-outline">WARP PIPE SELECT</h2>
        </div>
      </motion.div>

      {/* Pipes row */}
      <div className="max-w-5xl w-full mx-auto">
        <div className="flex items-end justify-center gap-6 sm:gap-10 mb-0">
          {projectsData.map((project) => (
            <WarpPipe key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Ground */}
      <div className="ground-strip h-6 pixel-border border-l-0 border-r-0 border-b-0" />
      <div className="ground-dirt h-10 pixel-border border-l-0 border-r-0 border-b-0 border-t-0" />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
