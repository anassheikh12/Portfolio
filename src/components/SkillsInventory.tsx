import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, type Skill } from '../data/projectsData';

function SkillSlot({ skill, isActive, onClick, onHover }: { skill: Skill; isActive: boolean; onClick: () => void; onHover: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-3 sm:p-4 pixel-border-thick text-center transition-all ${
        isActive
          ? 'bg-retro-grass shadow-pixel-green ring-2 ring-retro-gold'
          : 'bg-retro-grass/10 shadow-pixel hover:bg-retro-grass/20'
      }`}
    >
      <div className="text-2xl sm:text-3xl mb-2">{skill.icon}</div>
      <div className="text-white text-[7px] sm:text-[8px] pixel-text-outline leading-tight whitespace-pre-line">{skill.name}</div>
      {/* Level dots */}
      <div className="flex justify-center gap-0.5 mt-2">
        {Array.from({ length: skill.maxLevel }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 ${i < skill.level ? 'bg-retro-gold' : 'bg-black/40'}`} />
        ))}
      </div>
      {isActive && (
        <motion.div
          layoutId="skillSelect"
          className="absolute inset-0 border-4 border-retro-gold pointer-events-none"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function StatsPanel({ skill }: { skill: Skill }) {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-5 sm:p-6 h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-retro-grass/20 pixel-border-green flex items-center justify-center shadow-pixel-sm">
          <span className="text-2xl">{skill.icon}</span>
        </div>
        <div>
          <h3 className="text-retro-gold text-[10px] sm:text-xs pixel-text-outline whitespace-pre-line">{skill.name}</h3>
          <span className="text-white/40 text-[7px]">{skill.category}</span>
        </div>
      </div>
      {/* Level bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[7px] text-white/60 mb-1">
          <span>SKILL LEVEL</span>
          <span>{skill.level}/{skill.maxLevel}</span>
        </div>
        <div className="h-4 bg-black/40 pixel-border relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-retro-grass"
          />
          {Array.from({ length: skill.maxLevel }).map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px bg-black/30" style={{ left: `${(i / skill.maxLevel) * 100}%` }} />
          ))}
        </div>
      </div>
      {/* Description */}
      <p className="text-white/80 text-[8px] leading-[2] pixel-text-outline mb-4">{skill.description}</p>
      {/* Related projects */}
      <div>
        <span className="text-white/40 text-[7px] block mb-2">EQUIPPED IN:</span>
        <div className="flex flex-wrap gap-2">
          {skill.projects.map((p) => (
            <span key={p} className="bg-retro-sky/20 pixel-border px-2 py-1 text-[7px] text-retro-sky">{p}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsInventory() {
  const [activeSkill, setActiveSkill] = useState<Skill>(skillsData[0]);

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-24 scroll-mt-24">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-retro-grass pixel-border shadow-pixel-green px-6 py-3">
            <span className="text-white text-lg">⚔️</span>
            <h2 className="text-white text-xs sm:text-sm pixel-text-outline">SKILLS INVENTORY</h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7">
            <div className="bg-retro-panel/60 pixel-border-thick shadow-pixel-lg p-4 retro-window">
              <div className="bg-retro-grass/20 pixel-border-green px-3 py-2 mb-4 flex items-center justify-between">
                <span className="text-retro-grass text-[8px] pixel-text-outline">EQUIPMENT</span>
                <span className="text-retro-gold text-[7px]">{skillsData.length} SLOTS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skillsData.map((skill) => (
                  <SkillSlot 
                    key={skill.id} 
                    skill={skill} 
                    isActive={activeSkill.id === skill.id} 
                    onClick={() => setActiveSkill(skill)}
                    onHover={() => setActiveSkill(skill)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <StatsPanel skill={activeSkill} />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
