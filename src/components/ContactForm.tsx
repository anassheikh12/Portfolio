import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'sending' | 'success';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setFormState('idle');
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-24 scroll-mt-24">
      <div className="max-w-2xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-retro-dirt pixel-border shadow-pixel px-6 py-3">
            <span className="text-retro-gold text-lg">📬</span>
            <h2 className="text-white text-xs sm:text-sm pixel-text-outline">HIGH SCORE BOARD</h2>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-6xl mb-6"
              >
                🏆
              </motion.div>
              <motion.h3
                className="text-retro-gold text-sm pixel-text-outline mb-4"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                STAGE CLEAR!
              </motion.h3>
              <p className="text-white/70 text-[8px] leading-relaxed mb-2">MESSAGE TRANSMITTED SUCCESSFULLY</p>
              <p className="text-retro-grass text-[8px] pixel-text-outline mb-6">NEW HIGH SCORE REGISTERED!</p>

              <div className="bg-retro-dirt pixel-border p-4 mb-6 text-left">
                <div className="flex justify-between text-[8px] text-white/60 mb-2 border-b-2 border-black/20 pb-2">
                  <span>RANK</span><span>NAME</span><span>SCORE</span>
                </div>
                <div className="flex justify-between text-[8px] text-retro-gold pixel-text-outline">
                  <span>1ST</span><span>{name.toUpperCase()}</span><span>999,999</span>
                </div>
              </div>

              <motion.button
                onClick={resetForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-retro-grass pixel-border shadow-pixel-green px-6 py-3 text-white text-[9px] pixel-text-outline"
              >
                ▶ PLAY AGAIN
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-retro-panel pixel-border-thick shadow-pixel-lg p-6"
            >
              {/* Scoreboard header */}
              <div className="bg-retro-dirt pixel-border p-3 mb-6 flex items-center justify-between">
                <span className="text-white text-[8px] pixel-text-outline">ENTER YOUR INITIALS</span>
                <span className="text-retro-gold text-[7px]">TOP SCORE</span>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-white/60 text-[7px] block mb-2 pixel-text-outline">PLAYER NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ENTER NAME..."
                    required
                    className="w-full bg-black/40 pixel-border p-3 text-retro-gold text-[9px] font-pixel placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-retro-gold"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-white/60 text-[7px] block mb-2 pixel-text-outline">COMM CHANNEL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL@DOMAIN.COM"
                    required
                    className="w-full bg-black/40 pixel-border p-3 text-retro-gold text-[9px] font-pixel placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-retro-gold"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-white/60 text-[7px] block mb-2 pixel-text-outline">TRANSMISSION</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="TYPE YOUR MESSAGE..."
                    required
                    rows={4}
                    className="w-full bg-black/40 pixel-border p-3 text-retro-gold text-[9px] font-pixel placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-retro-gold resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={formState === 'sending'}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full pixel-border-thick shadow-pixel py-4 text-white text-[10px] pixel-text-outline transition-colors ${
                    formState === 'sending'
                      ? 'bg-retro-gold/50 cursor-wait'
                      : 'bg-retro-grass hover:bg-retro-grass/90'
                  }`}
                >
                  {formState === 'sending' ? (
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                      TRANSMITTING...
                    </motion.span>
                  ) : (
                    '🚀 SUBMIT SCORE'
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
