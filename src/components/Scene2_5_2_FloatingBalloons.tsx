import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = ["#FF1493", "#00F0FF", "#FFFF00", "#FF5E00", "#B026FF", "#FFFFFF"];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

interface BalloonData {
  id: number;
  color: string;
  marginTop: number;
  marginLeft: number;
  duration: number;
  shadowColor: string;
}

interface BalloonProps {
  color: string;
  marginTop: number;
  marginLeft: number;
  duration: number;
  shadowColor: string;
  key?: string | number;
}

const Balloon = ({ color, marginTop, marginLeft, duration, shadowColor }: BalloonProps) => {
  return (
    <div 
      className="balloon animate-float" 
      style={{
        backgroundColor: color,
        color: color,
        boxShadow: `inset -7px -3px 10px ${shadowColor}`,
        margin: `${marginTop}px 0 0 ${marginLeft}px`,
        ['--duration' as any]: `${duration}s`
      }}
    />
  );
};

export function Scene2_5_2_FloatingBalloons({ onComplete }: { onComplete: () => void; key?: string }) {
  const [balloons, setBalloons] = useState<BalloonData[]>([]);

  const generateBalloons = useCallback(() => {
    const count = window.innerWidth < 768 ? 20 : 30;
    const newBalloons = Array.from({ length: count }, (_, i) => {
      const colorHex = COLORS[getRandomInt(COLORS.length)];
      const { r, g, b } = hexToRgb(colorHex);
      return {
        id: i,
        color: `rgba(${r}, ${g}, ${b}, 0.7)`,
        shadowColor: `rgba(${r - 10}, ${g - 10}, ${b - 10}, 0.7)`,
        marginTop: getRandomInt(100),
        marginLeft: getRandomInt(30),
        duration: getRandomInt(4) + 6
      };
    });
    setBalloons(newBalloons);
  }, []);

  useEffect(() => {
    generateBalloons();
    const timer = setTimeout(onComplete, 8000);
    return () => clearTimeout(timer);
  }, [generateBalloons, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-brand-blue overflow-hidden"
    >
      <style>{`
        .balloon {
          width: 75px;
          height: 90px;
          position: relative;
          border-radius: 75% 75% 70% 70%;
        }
        @media(min-width:48rem){
          .balloon { width: 105px; height: 125px; }
        }
        .balloon:before {
          content: "";
          top: 100%;
          right: 0;
          left: 0;
          background-color: #fdfd96;
          width: 1px;
          height: 50px;
          margin-inline: auto;
          padding: 0.5px;
          display: block;
          position: absolute;
        }
        @media(min-width:48rem){
          .balloon:before { height: 75px; padding: 1px; }
        }
        .balloon:after {
          content: "▲";
          right: 0;
          bottom: -1px;
          left: 0;
          text-align: center;
          color: inherit;
          margin-inline: auto;
          font-size: 8px;
          display: block;
          position: absolute;
        }
        @keyframes float-balloon {
          0% { opacity: 1; transform: translateY(100vh); }
          100% { opacity: 0; transform: translateY(-300vh); }
        }
        .animate-float {
          animation: float-balloon var(--duration, 5s) ease-in infinite;
        }
      `}</style>

      <div id="balloon-container" className="flex h-screen w-full flex-wrap p-4 overflow-hidden">
        {balloons.map(balloon => (
          <Balloon 
            key={balloon.id}
            color={balloon.color}
            marginTop={balloon.marginTop}
            marginLeft={balloon.marginLeft}
            duration={balloon.duration}
            shadowColor={balloon.shadowColor}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-white/40 text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.25em] md:tracking-[0.4em] uppercase select-none text-center"
        >
          Rising Ambitions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-white/20 text-xs md:text-sm mt-4 tracking-[0.1em] uppercase select-none"
        >
          Two decades of reaching higher
        </motion.p>
      </div>
    </motion.div>
  );
}
