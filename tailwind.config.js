/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-sky': '#5C94FC',
        'retro-dirt': '#865126',
        'retro-dirt-dark': '#6B3F1E',
        'retro-grass': '#00A800',
        'retro-grass-dark': '#005C00',
        'retro-gold': '#FFD700',
        'retro-red': '#E44040',
        'retro-dark': '#1a1a2e',
        'retro-panel': '#2d1b00',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px #000000',
        'pixel-lg': '6px 6px 0px 0px #000000',
        'pixel-sm': '2px 2px 0px 0px #000000',
        'pixel-green': '4px 4px 0px 0px #005C00',
        'pixel-brown': '4px 4px 0px 0px #6B3F1E',
        'pixel-inset': 'inset 3px 3px 0px 0px rgba(0,0,0,0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '4px 4px 0px 0px #005C00' },
          '50%': { boxShadow: '4px 4px 0px 0px #00A800, 0 0 20px rgba(0,168,0,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
