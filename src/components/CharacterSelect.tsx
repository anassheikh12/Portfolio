import { motion } from 'framer-motion';
import { bioData } from '../data/projectsData';

function PixelAvatar() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Hair */}
      <rect x="16" y="8" width="32" height="8" fill="#2d1b00" />
      <rect x="12" y="12" width="8" height="8" fill="#2d1b00" />
      <rect x="44" y="12" width="8" height="8" fill="#2d1b00" />
      {/* Face */}
      <rect x="16" y="16" width="32" height="20" fill="#F5C68E" />
      <rect x="12" y="20" width="4" height="12" fill="#F5C68E" />
      <rect x="48" y="20" width="4" height="12" fill="#F5C68E" />
      {/* Eyes */}
      <rect x="22" y="22" width="6" height="6" fill="#1a1a2e" />
      <rect x="36" y="22" width="6" height="6" fill="#1a1a2e" />
      <rect x="24" y="24" width="2" height="2" fill="white" />
      <rect x="38" y="24" width="2" height="2" fill="white" />
      {/* Mouth / Smile */}
      <rect x="26" y="32" width="12" height="2" fill="#c0392b" />
      <rect x="24" y="30" width="2" height="2" fill="#c0392b" />
      <rect x="38" y="30" width="2" height="2" fill="#c0392b" />
      {/* Body / Shirt */}
      <rect x="16" y="38" width="32" height="16" fill="#5C94FC" />
      <rect x="12" y="42" width="4" height="12" fill="#5C94FC" />
      <rect x="48" y="42" width="4" height="12" fill="#5C94FC" />
      {/* Collar */}
      <rect x="28" y="38" width="8" height="4" fill="#FFD700" />
      {/* Belt */}
      <rect x="16" y="52" width="32" height="4" fill="#865126" />
      <rect x="28" y="52" width="8" height="4" fill="#FFD700" />
      {/* Legs */}
      <rect x="16" y="56" width="12" height="8" fill="#1a1a2e" />
      <rect x="36" y="56" width="12" height="8" fill="#1a1a2e" />
    </svg>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3 text-[10px]">
      <span className="text-white/80 w-10 pixel-text-outline font-pixel uppercase">{label}</span>
      <div className="flex-1 h-4 bg-black/60 pixel-border relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-white/60 w-12 text-right pixel-text-outline font-pixel">{value}/{max}</span>
    </div>
  );
}

export default function CharacterSelect() {
  const stats = bioData.stats;

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-24 scroll-mt-24">
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-4 bg-retro-dirt pixel-border shadow-pixel px-8 py-4">
            <span className="text-retro-gold text-2xl">👤</span>
            <h2 className="text-white text-sm md:text-base pixel-text-outline uppercase">CHARACTER SELECT</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Character Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 relative z-20"
          >
            <div className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-6 relative">
              {/* Character select frame */}
              <div className="bg-retro-sky/30 pixel-border p-2 mb-4 relative">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 mx-auto"
                >
                  <PixelAvatar />
                </motion.div>

                {/* Player indicator */}
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-retro-gold pixel-border px-2 py-0.5"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-[7px] text-black">P1</span>
                </motion.div>
              </div>

              {/* Name plate */}
              <div className="bg-retro-dirt pixel-border p-4 mb-6 text-center">
                <h3 className="text-retro-gold text-xs md:text-sm pixel-text-outline mb-2 uppercase">{bioData.name}</h3>
                <p className="text-white/60 text-[9px] uppercase tracking-wide">{bioData.title}</p>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <StatBar label="HP" value={stats.hp} max={100} color="#E44040" />
                <StatBar label="MP" value={stats.mp} max={100} color="#5C94FC" />
                <StatBar label="LVL" value={stats.level} max={99} color="#FFD700" />
              </div>

              {/* Info tags */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-retro-grass/20 pixel-border px-3 py-1.5 text-[8px] text-retro-grass font-pixel uppercase">
                  ⚡ EXP: {stats.exp}
                </span>
                <span className="bg-retro-sky/20 pixel-border px-3 py-1.5 text-[8px] text-retro-sky font-pixel uppercase">
                  🏰 {stats.guild}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Dialogue Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8 relative z-20"
          >
            <div className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-8 relative h-full flex flex-col">
              {/* RPG dialogue header */}
              <div className="bg-retro-dirt pixel-border px-6 py-3 mb-6 inline-flex items-center gap-3 self-start">
                <span className="text-retro-gold text-xs pixel-text-outline uppercase">{bioData.name}</span>
                <span className="text-white/40 text-[9px] uppercase tracking-tighter">is speaking:</span>
              </div>

              {/* Dialogue triangle pointer */}
              <div className="absolute top-16 -left-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[16px] border-r-retro-panel border-b-[12px] border-b-transparent hidden lg:block" />

              {/* Bio text with typing feel */}
              <div className="flex-1">
                <p className="text-white/90 text-xs md:text-sm leading-relaxed font-mono whitespace-pre-line">
                  {bioData.bio}
                </p>
              </div>

              {/* Social links as inventory items */}
              <div className="mt-8 pt-6 border-t-4 border-white/5">
                <span className="text-white/40 text-[8px] block mb-4 uppercase font-pixel tracking-widest">SOCIAL INVENTORY:</span>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={bioData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 pixel-border border-white/10 hover:border-retro-grass hover:bg-retro-grass/10 transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📦</span>
                    <span className="text-[7px] text-retro-gold group-hover:text-white font-pixel uppercase">GITHUB</span>
                  </motion.a>
                  <motion.a
                    href={bioData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 pixel-border border-white/10 hover:border-retro-sky hover:bg-retro-sky/10 transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🔗</span>
                    <span className="text-[7px] text-retro-gold group-hover:text-white font-pixel uppercase">LINKEDIN</span>
                  </motion.a>
                  <motion.a
                    href={`mailto:${bioData.socials.email}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2 p-4 bg-white/5 pixel-border border-white/10 hover:border-retro-red hover:bg-retro-red/10 transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📬</span>
                    <span className="text-[7px] text-retro-gold group-hover:text-white font-pixel uppercase">EMAIL</span>
                  </motion.a>
                </div>
              </div>

              {/* Continue prompt */}
              <motion.div
                className="mt-6 text-right"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-retro-dirt text-[9px] pixel-text-outline uppercase font-pixel">▼ SCROLL TO CONTINUE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
