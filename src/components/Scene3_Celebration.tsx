import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMicBlowDetection } from '../hooks/useMicBlowDetection';
import { BirthdayCake } from './Scene3_Canvas/BirthdayCake';
import { ParticleSystem } from './Scene3_Canvas/ParticleSystem';
import { useAudioEngine } from '../hooks/useAudioEngine';

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
  onComplete: () => void;
}

export function Scene3_Celebration({ onComplete }: { onComplete: () => void; key?: string }) {
  const { isBlown, intensity, isSupported, startDetection, stopDetection, setIsBlown } = useMicBlowDetection();
  const { playBirthday, stopBirthday } = useAudioEngine();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    playBirthday();
    startDetection();
    const timer = setTimeout(() => setShowPrompt(true), 4500);
    return () => {
      stopBirthday();
      stopDetection();
      clearTimeout(timer);
    };
  }, [playBirthday, stopBirthday]);

  useEffect(() => {
    if (isBlown) {
      triggerConfetti();
      setTimeout(onComplete, 7000);
    }
  }, [isBlown, onComplete]);

  const triggerConfetti = () => {
    const colors = ["#f59e0b", "#d97706", "#38bdf8", "#ffffff", "#fef3c6"];
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100 + "vw",
      width: Math.random() * 8 + 4 + "px",
      height: Math.random() * 8 + 4 + "px",
      delay: Math.random() * 0.5 + "s",
      duration: Math.random() * 2 + 2 + "s"
    }));
    setParticles(newParticles);
  };

  const handleManualBlow = () => {
    if (!isBlown && showPrompt) {
      setIsBlown(true);
    }
  };

  return (
    <motion.div
      id="scene-celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 px-4 sm:px-8 lg:px-12 gap-8 items-center overflow-y-auto py-24 lg:py-0"
    >
      {/* Big Display Number Overlay */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[20rem] lg:text-[30rem] font-bold text-white/[0.02] select-none z-0 tracking-tighter pointer-events-none">
        20
      </div>

      {/* Left Column: Perspective & Wisdom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full lg:col-span-3 flex flex-col space-y-8 sm:space-y-12 z-10 lg:order-1"
      >


        <div className="hidden sm:block p-4 sm:p-6 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md text-left">
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60">Architect Identity</span>
          </div>
          <p className="text-[11px] sm:text-xs text-white/50 leading-loose">Transitioning from adolescent exploration to adult architectural intent. Current chapter: The Golden Wish.</p>
        </div>
      </motion.div>

      {/* Center: The Architectural 3D Cake Focal Point */}
      <div className="w-full lg:col-span-6 flex flex-col items-center justify-center relative z-10 lg:order-2 py-8 lg:py-0">
        <div className="relative z-10 w-full flex flex-col items-center group">
          <div className="scale-75 sm:scale-90 lg:scale-100 transition-transform duration-700 group-hover:scale-105">
            <BirthdayCake blown={isBlown} />
          </div>

          <div className="mt-8 lg:mt-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-extralight tracking-[0.2em] uppercase mb-3 sm:mb-4"
            >
              {isBlown ? "Wish Captured" : "The Wish"}
            </motion.h2>
            <p className="text-[9px] sm:text-xs text-white/40 tracking-[0.1em] mb-6 sm:mb-8 uppercase">
              {isBlown ? "Transformation Initiated" : (isSupported ? "Blow gently into your microphone" : "Make a wish and touch the spark")}
            </p>
            
            {!isBlown && (
              <motion.div 
                onClick={handleManualBlow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border border-amber-500/40 rounded-full inline-flex items-center gap-3 bg-amber-500/5 group hover:bg-amber-500/20 cursor-pointer transition-all whitespace-nowrap"
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-500 font-semibold">
                  {isSupported ? "Sensor Active" : "Touch to Blow"}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Epoch Data */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="w-full lg:col-span-3 flex flex-col gap-4 sm:gap-6 z-10 lg:order-3 mb-12 lg:mb-0"
      >
        <div className="p-6 sm:p-8 border border-white/10 rounded-3xl flex flex-col justify-between bg-white/[0.01] backdrop-blur-sm text-left">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3 sm:mb-4 font-mono">Maturity Epoch</p>
          <div className="flex justify-between items-end">
            <div className="text-3xl sm:text-4xl font-light tabular-nums">20<span className="text-sm opacity-40 ml-1">YRS</span></div>
            <div className="text-right">
              <p className="text-[8px] sm:text-[10px] uppercase opacity-40 mb-1 font-mono tracking-tighter">Total Accumulation</p>
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-500">7,305 Days</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden text-left">
           <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[40px] -mr-16 -mt-16 rounded-full" />
           <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3 sm:mb-4">Memory State</p>
           <div className="h-px bg-white/10 w-full mb-4 sm:mb-6" />
           <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-light">
             Two decades of data points successfully integrated. The neural foundations are primed for professional-grade execution.
           </p>
        </div>
      </motion.div>

      <ParticleSystem particles={particles} />
      
      {/* Background audio visualizer logic simple indicator */}
      {intensity > 0 && !isBlown && (
        <motion.div 
          style={{ scaleX: intensity / 128 }}
          className="absolute bottom-0 left-0 h-1 bg-amber-500/50 w-full origin-left"
        />
      )}
    </motion.div>
  );
}
