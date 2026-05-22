import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Scene2_Countdown({ onComplete }: { onComplete: () => void; key?: string }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      id="scene-countdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-brand-blue overflow-hidden"
    >
      {/* Background intensity glow */}
      <motion.div
        animate={{
          scale: [1, 1.2 + (3 - count) * 0.1],
          opacity: [0.1, 0.2 + (3 - count) * 0.1],
        }}
        className="absolute w-[80vw] h-[80vw] rounded-full bg-amber-500/20 blur-[120px]"
      />

      <div className="relative text-center">
        <motion.p
          key={`label-${count}`}
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.8em' }}
          className="text-amber-500/40 text-[10px] sm:text-sm uppercase mb-6 sm:mb-8 ml-[0.8em]"
        >
          Preparation Complete
        </motion.p>

        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-[12rem] text-white font-thin font-mono leading-none flex items-center justify-center tabular-nums"
        >
          00:0{count}
        </motion.div>
      </div>

      {/* Floating particles intensification */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                speed: 1 + (3 - count) * 0.5
              }
            }}
            className="absolute w-1 h-1 bg-amber-200 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
