import { motion } from 'motion/react';

interface Particle {
  id: number;
  color: string;
  left: string;
  width: string;
  height: string;
  delay: string;
  duration: string;
}

interface Props {
  particles: Particle[];
}

export function ParticleSystem({ particles }: Props) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: parseFloat(p.duration),
            delay: parseFloat(p.delay),
            ease: "linear"
          }}
          className="absolute rounded-full"
          style={{
            backgroundColor: p.color,
            left: p.left,
            width: p.width,
            height: p.height,
            boxShadow: `0 0 10px ${p.color}`
          }}
        />
      ))}
    </div>
  );
}
