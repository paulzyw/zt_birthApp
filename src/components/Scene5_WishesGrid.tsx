import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const WISHES = [
  "Stay curious.",
  "Build things that matter.",
  "Learn continuously.",
  "Be brave enough to fail.",
  "Family will always be your foundation.",
  "Your next chapter begins.",
  "20 years of memories, a lifetime ahead.",
  "We are proud of the man you are becoming."
];

export function Scene5_WishesGrid({ onComplete }: { onComplete: () => void; key?: string }) {
  return (
    <motion.div
      id="scene-wishes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-y-auto pt-24 sm:pt-40 pb-32 px-4 sm:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-20 text-center"
        >
          <p className="text-amber-500 font-semibold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px] mb-3 sm:mb-4">Guiding Principles</p>
          <h2 className="text-3xl sm:text-7xl text-white font-thin tracking-tighter sm:leading-none">Wisdom for Maturity</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {WISHES.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -12, 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(245, 158, 11, 0.6)",
                boxShadow: "0 20px 30px -10px rgba(245, 158, 11, 0.2), 0 0 15px 1px rgba(255, 255, 255, 0.05)"
              }}
              whileTap={{ 
                scale: 0.96,
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                borderColor: "rgba(245, 158, 11, 0.8)"
              }}
              className={`p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/20 bg-[#03045e]/40 flex flex-col justify-between transition-all backdrop-blur-md group ${
                i === 4 || i === 7 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="text-amber-500 font-mono text-[9px] sm:text-[10px] mb-3 sm:mb-4 opacity-40">0{i + 1}</div>
                <p className="text-lg sm:text-2xl text-white/90 font-light leading-relaxed">
                  {wish}
                </p>
              </div>
              <div className="mt-6 sm:mt-8 flex justify-end">
                <div className="w-8 h-px bg-amber-500/30 group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 sm:mt-24 flex justify-center"
        >
          <motion.button
            id="proceed-finale-btn"
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 sm:gap-6 text-white/40 hover:text-white transition-all group"
          >
            <span className="uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] font-bold">The Final Chapter</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ChevronRight size={18} sm:size={20} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
