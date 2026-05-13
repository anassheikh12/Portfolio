import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bioData, skillsData, projectsData, type Project } from '../data/projectsData';

export default function DashboardMode() {
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-[#1a1a1a] p-8 md:p-12 relative z-20 border-4 border-white/5 shadow-2xl">
        {/* Header */}
        <motion.header
          id="about"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 pb-8 border-b-4 border-retro-grass scroll-mt-24"
        >
          <h1 className="text-2xl md:text-3xl text-retro-gold mb-4">{bioData.name}</h1>
          <p className="text-retro-grass text-sm mb-2">{bioData.title}</p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest">{bioData.subtitle}</p>
        </motion.header>

        {/* About Bio */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-12">
          <h2 className="text-retro-grass text-sm md:text-base mb-6 pb-2 border-b-2 border-white/10">ABOUT</h2>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed font-mono whitespace-pre-line">{bioData.bio}</p>
        </motion.section>

        {/* Skills */}
        <motion.section id="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12 scroll-mt-24">
          <h2 className="text-retro-grass text-sm md:text-base mb-6 pb-2 border-b-2 border-white/10">SKILLS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsData.map((skill) => (
              <div key={skill.id} className="bg-white/5 border-2 border-white/10 p-4 flex items-center gap-4 transition-colors hover:bg-white/10">
                <span className="text-2xl">{skill.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-[10px] whitespace-pre-line">{skill.name}</span>
                    <span className="text-white/40 text-[8px]">{skill.level}/{skill.maxLevel}</span>
                  </div>
                  <div className="h-2 bg-white/10">
                    <div className="h-full bg-retro-grass" style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section id="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12 scroll-mt-24">
          <h2 className="text-retro-grass text-sm md:text-base mb-6 pb-2 border-b-2 border-white/10">PROJECTS</h2>
          <div className="space-y-6">
            {projectsData.map((project) => (
              <div key={project.id} className="bg-white/5 border-2 border-white/10 p-6 hover:border-retro-grass/30 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4" style={{ backgroundColor: project.color }} />
                  <h3 className="text-white text-xs font-pixel">{project.title}</h3>
                  <span className="text-white/30 text-[8px] uppercase tracking-tighter">— {project.subtitle}</span>
                </div>
                <p className="text-white/50 text-[10px] md:text-xs leading-relaxed mb-6 font-mono">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="text-retro-grass/90 text-[8px] bg-retro-grass/10 px-2 py-1 uppercase">{t}</span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setSelectedVideo(project)}
                    className="flex-1 bg-white text-black py-3 text-center text-[8px] font-pixel hover:bg-retro-gold transition-colors"
                  >
                    WATCH DEMO
                  </button>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 bg-retro-grass text-retro-dark py-3 text-center text-[8px] font-pixel hover:bg-white transition-colors"
                    >
                      LIVE DEMO
                    </a>
                  )}
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-white/10 text-white py-3 text-center text-[8px] font-pixel hover:bg-white/20 transition-colors border border-white/10"
                  >
                    VIEW CODE
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
          <h2 className="text-retro-grass text-sm md:text-base mb-6 pb-2 border-b-2 border-white/10">CONTACT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-white/60 text-xs md:text-sm font-mono mb-8 leading-relaxed">
                I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="flex flex-col gap-4 text-[10px]">
                <a href={bioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-retro-grass transition-colors flex items-center gap-3">
                  <span className="text-sm">📦</span> GITHUB.COM/ANASSHK
                </a>
                <a href={bioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-retro-grass transition-colors flex items-center gap-3">
                  <span className="text-sm">🔗</span> LINKEDIN.COM/IN/ANAS-SHK
                </a>
                <a href={`mailto:${bioData.socials.email}`} className="text-white/40 hover:text-retro-grass transition-colors flex items-center gap-3">
                  <span className="text-sm">📬</span> ANAS@EXAMPLE.COM
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-white/40 text-[8px] mb-2 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="PLAYER 1"
                  className="w-full bg-white/5 border-2 border-white/10 p-3 text-white text-xs font-mono focus:border-retro-grass outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/40 text-[8px] mb-2 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  placeholder="anas@fast.edu"
                  className="w-full bg-white/5 border-2 border-white/10 p-3 text-white text-xs font-mono focus:border-retro-grass outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/40 text-[8px] mb-2 uppercase tracking-widest">Your Message</label>
                <input 
                  placeholder="Type your message here..."
                  className="w-full bg-white/5 border-2 border-white/10 p-3 text-white text-xs font-mono focus:border-retro-grass outline-none transition-colors"
                />
              </div>
              <button className="w-full bg-retro-grass text-retro-dark py-3 text-[10px] font-pixel hover:bg-white transition-colors uppercase">
                Send Message
              </button>
            </form>
          </div>
        </motion.section>

        <footer className="mt-16 pt-6 border-t-2 border-white/10 text-center">
          <p className="text-white/20 text-[8px]">© 2026 {bioData.name}. Built with React + TypeScript.</p>
        </footer>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full aspect-video bg-black relative border-4 border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center rounded-full"
              >
                <span className="text-xl">✕</span>
              </button>
              
              <video 
                src={`/${selectedVideo.videoAsset}`}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xs font-pixel">{selectedVideo.title} — Gameplay Demo</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
