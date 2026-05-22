import { motion } from 'motion/react';

export function Scene1_Opening({ onEnter }: { onEnter: () => void; key?: string }) {
  return (
    <motion.div
      id="scene-opening"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-brand-blue px-4 text-center"
    >
      <div className="max-w-3xl space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-amber-100/60 text-base sm:text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light"
        >
          20 Years Ago, A Wonderful Journey Began...
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-7xl md:text-8xl text-white font-normal tracking-tight leading-tight sm:leading-none px-4 sm:px-0"
        >
          Happy 20th Birthday, <br className="sm:hidden" /> <span className="text-amber-500 italic">Ziteng</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5 }}
          className="pt-8 sm:pt-12"
        >
          <motion.button
            id="enter-celebration-btn"
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 sm:px-12 py-3 sm:py-4 text-amber-500 border border-amber-500/30 rounded-full overflow-hidden transition-all duration-700 hover:border-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]"
          >
            <span className="relative z-10 tracking-[0.1em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm font-medium transition-colors duration-500 group-hover:text-white">
              Enter Your Celebration
            </span>
            <div className="absolute inset-0 bg-amber-500 translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-amber-500/0 via-amber-500/50 to-amber-500/0"
        />
      </div>
    </motion.div>
  );
}
