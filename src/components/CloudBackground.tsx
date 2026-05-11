import { motion } from 'framer-motion';

interface CloudProps {
  width: number;
  height: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
}

const clouds: CloudProps[] = [
  { width: 180, height: 48, top: 8, duration: 35, delay: 0, opacity: 0.95 },
  { width: 120, height: 36, top: 18, duration: 28, delay: -8, opacity: 0.85 },
  { width: 220, height: 56, top: 5, duration: 45, delay: -15, opacity: 1 },
  { width: 100, height: 32, top: 25, duration: 22, delay: -3, opacity: 0.8 },
  { width: 160, height: 44, top: 12, duration: 38, delay: -20, opacity: 0.9 },
  { width: 90, height: 28, top: 30, duration: 20, delay: -12, opacity: 0.75 },
];

function PixelCloud({ width, height }: { width: number; height: number }) {
  const bw = width / 4;
  const bh = height / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      {/* Bottom row - full width */}
      <rect x={0} y={bh} width={width} height={bh} rx={2} fill="white" />
      {/* Top row - centered, narrower */}
      <rect x={bw * 0.5} y={0} width={width - bw} height={bh + 4} rx={2} fill="white" />
      {/* Extra bumps */}
      <rect x={bw * 0.8} y={-4} width={bw * 1.2} height={bh} rx={2} fill="white" />
      <rect x={width - bw * 2} y={-2} width={bw * 1.1} height={bh - 2} rx={2} fill="white" />
    </svg>
  );
}

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            opacity: cloud.opacity,
            filter: cloud.opacity < 0.85 ? 'blur(0.5px)' : 'none',
          }}
          initial={{ x: '-20%' }}
          animate={{ x: '110vw' }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <PixelCloud width={cloud.width} height={cloud.height} />
        </motion.div>
      ))}
    </div>
  );
}
