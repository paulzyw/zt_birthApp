import { motion } from 'motion/react';

export function Scene6_Finale() {
  return (
    <motion.div
      id="scene-finale"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-brand-blue overflow-hidden"
    >
      {/* Background depth light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-4xl bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Cascading particles array */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "-10%",
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "110%",
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="space-y-4"
        >
           <p className="text-amber-500 font-bold uppercase tracking-[0.6em] text-[10px] ml-[0.6em]">
            Final Chapter Focus
          </p>
           <p className="text-xs text-white/40 leading-relaxed font-light mx-auto max-w-sm tracking-wide">
             Every line of code, every heartbeat, and every sunrise has led to this threshold.
           </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-8xl md:text-9xl text-white font-light tracking-tighter leading-tight sm:leading-none"
        >
          The Best Is<br />
          <span className="text-amber-500">Yet To Come</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
          className="pt-8 sm:pt-16"
        >
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05, color: "#f59e0b" }}
            whileTap={{ scale: 0.95 }}
            className="text-white/20 transition-colors uppercase tracking-[0.4em] text-[8px] sm:text-[9px] font-bold py-3 sm:py-4 px-6 sm:px-8 border border-white/5 rounded-full hover:border-amber-500/20"
          >
            Replay Experience
          </motion.button>
        </motion.div>
      </div>

      {/* Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 2 }}
        className="absolute bottom-16 sm:bottom-12 text-white/10 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[7px] sm:text-[8px] font-bold"
      >
        Ziteng • Millennium II • Established 2006
      </motion.div>
    </motion.div>
  );
}
