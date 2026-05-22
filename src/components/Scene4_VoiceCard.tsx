import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { useAudioEngine } from '../hooks/useAudioEngine';

export function Scene4_VoiceCard({ onComplete }: { onComplete: () => void; key?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const { playMessage, pauseMessage } = useAudioEngine({
    onMessageEnd: () => {
      setIsPlaying(false);
      setIsFinished(true);
    }
  });

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseMessage();
      setIsPlaying(false);
    } else {
      playMessage();
      setIsPlaying(true);
      // We don't set setIsFinished(true) here anymore, 
      // let the audio engine tell us when it's done.
    }
  };

  return (
    <motion.div
      id="scene-voice-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-white/[0.02] border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10">
          <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-500/60 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] font-bold mb-4 sm:mb-6"
          >
            Personal Archive
          </motion.div>

          <h2 className="text-3xl sm:text-5xl text-white font-thin tracking-tight mb-8 sm:mb-12 text-center">
            Voice Transmission:<br />
            <span className="text-amber-500 italic">Mom & Dad</span>
          </h2>

          {/* Waveform Visualization (Dynamic based on design) */}
          <div className="w-full h-12 sm:h-16 flex items-end justify-center gap-1 sm:gap-1.5 mb-8 sm:mb-12">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: "4px" }}
                animate={{
                  height: isPlaying ? [`${Math.random() * 20 + 5}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 20 + 5}%`] : "4px",
                }}
                transition={{
                  duration: 0.4 + Math.random() * 0.4,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className={`flex-1 bg-amber-500/60 rounded-full ${i > 20 ? 'hidden xs:block' : ''}`}
              />
            ))}
          </div>

          <motion.button
            id="play-voice-btn"
            onClick={handleTogglePlay}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-black flex items-center justify-center gap-3 sm:gap-4 transition-all duration-500 hover:bg-amber-500 hover:text-white"
          >
            {isPlaying ? (
              <Pause size={18} sm:size={20} className="fill-current" />
            ) : (
              <Play size={18} sm:size={20} className="fill-current" />
            )}
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
              {isPlaying ? "Pause Transmission" : "Play Transmission"}
            </span>
          </motion.button>

          <AnimatePresence>
            {isFinished && !isPlaying && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={onComplete}
                className="mt-8 flex items-center gap-2 text-white/30 hover:text-amber-500 transition-colors uppercase tracking-[0.4em] text-[10px] font-bold"
              >
                Proceed to Wisdom <ChevronRight size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
