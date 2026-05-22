import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioControllerProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function AudioController({ isMuted, onToggle }: AudioControllerProps) {
  return (
    <motion.button
      id="audio-controller-btn"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="relative p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-500 shadow-2xl transition-all duration-300 hover:bg-white/10"
    >
      {isMuted ? <VolumeX size={20} className="sm:w-6 sm:h-6" /> : <Volume2 size={20} className="sm:w-6 sm:h-6" />}
    </motion.button>
  );
}
