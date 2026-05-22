import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Scene } from '../types';
import { Scene1_Opening } from './Scene1_Opening';
import { Scene2_Countdown } from './Scene2_Countdown';
import { Scene2_5_1_Fireworks } from './Scene2_5_1_Fireworks';
import { Scene2_5_2_FloatingBalloons } from './Scene2_5_2_FloatingBalloons';
import { Scene3_Celebration } from './Scene3_Celebration';
import { Scene4_VoiceCard } from './Scene4_VoiceCard';
import { Scene5_WishesGrid } from './Scene5_WishesGrid';
import { Scene6_Finale } from './Scene6_Finale';
import { AudioController } from './AudioController';
import { useAudioEngine } from '../hooks/useAudioEngine';

export function SceneController() {
  const [currentScene, setCurrentScene] = useState<Scene>(Scene.OPENING);
  const { isMuted, toggleMute, playAmbient } = useAudioEngine();

  const handleStart = () => {
    playAmbient();
    setCurrentScene(Scene.COUNTDOWN);
  };

  const getSequenceLabel = () => {
    switch (currentScene) {
      case Scene.OPENING: return "Sequence 01";
      case Scene.COUNTDOWN: return "Sequence 02";
      case Scene.FIREWORKS: return "Sequence 02.5";
      case Scene.FLOATING_BALLOONS: return "Sequence 02.6";
      case Scene.CELEBRATION: return "Sequence 03";
      case Scene.VOICE_CARD: return "Sequence 04";
      case Scene.WISHES_GRID: return "Sequence 05";
      case Scene.FINALE: return "Sequence 06";
      default: return "";
    }
  };

  const getChapterName = () => {
    switch (currentScene) {
      case Scene.OPENING: return "Architectural Genesis";
      case Scene.COUNTDOWN: return "Temporal Synchrony";
      case Scene.FIREWORKS: return "Atmospheric Convergence";
      case Scene.FLOATING_BALLOONS: return "Aspiration Rise";
      case Scene.CELEBRATION: return "The Golden Wish";
      case Scene.VOICE_CARD: return "Paternal Archive";
      case Scene.WISHES_GRID: return "Values & Wisdom";
      case Scene.FINALE: return "Evolutionary Peak";
      default: return "";
    }
  };

  const renderScene = () => {
    switch (currentScene) {
      case Scene.OPENING:
        return <Scene1_Opening key="opening" onEnter={handleStart} />;
      case Scene.COUNTDOWN:
        return <Scene2_Countdown key="countdown" onComplete={() => setCurrentScene(Scene.FIREWORKS)} />;
      case Scene.FIREWORKS:
        return <Scene2_5_1_Fireworks key="fireworks" onComplete={() => setCurrentScene(Scene.FLOATING_BALLOONS)} />;
      case Scene.FLOATING_BALLOONS:
        return <Scene2_5_2_FloatingBalloons key="balloons" onComplete={() => setCurrentScene(Scene.CELEBRATION)} />;
      case Scene.CELEBRATION:
        return <Scene3_Celebration key="celebration" onComplete={() => setCurrentScene(Scene.VOICE_CARD)} />;
      case Scene.VOICE_CARD:
        return <Scene4_VoiceCard key="voice-card" onComplete={() => setCurrentScene(Scene.WISHES_GRID)} />;
      case Scene.WISHES_GRID:
        return <Scene5_WishesGrid key="wishes" onComplete={() => setCurrentScene(Scene.FINALE)} />;
      case Scene.FINALE:
        return <Scene6_Finale key="finale" />;
      default:
        return null;
    }
  };

  return (
    <div id="experience-container" className="relative w-full h-screen bg-brand-blue overflow-hidden font-sans text-white">
      {/* Cinematic Atmosphere Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500 opacity-5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500 opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-cinematic-gradient"></div>
      </div>

      {/* Top Navigation Rail */}
      <nav className="absolute top-0 left-0 w-full z-50 p-4 sm:p-8 flex justify-between items-center pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] sm:text-[10px] tracking-[0.3em] font-semibold text-amber-500 uppercase">{getSequenceLabel()}</span>
          <span className="text-sm xs:text-base sm:text-lg md:text-xl font-light tracking-tight truncate max-w-[190px] xs:max-w-[260px] sm:max-w-none">Ziteng's 20th Anniversary</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-12 pointer-events-auto">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 mb-1">Coordinates</span>
            <span className="text-xs font-mono tracking-widest uppercase">31.2304° N, 121.4737° E</span>
          </div>
          <AudioController isMuted={isMuted} onToggle={toggleMute} />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {renderScene()}
        </AnimatePresence>
      </div>

      {/* Cinematic Footer Rail */}
      <footer className="absolute bottom-0 left-0 w-full z-50 p-4 sm:p-8 flex justify-between items-end pointer-events-none">
        <div className="max-w-[120px] sm:max-w-xs">
          <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-1 sm:mb-2">Current Chapter</p>
          <p className="text-[10px] sm:text-sm font-light tracking-wide truncate">{getChapterName()}</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="hidden sm:block h-px w-32 md:w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 sm:mb-6"></div>
          <div className="flex gap-4 sm:gap-8">
            <div className="hidden xs:block text-right">
              <p className="text-[7px] sm:text-[9px] uppercase tracking-widest opacity-40">Maturity Index</p>
              <p className="text-[10px] sm:text-sm font-light">Optimal / {currentScene === Scene.FINALE ? "Complete" : "Stable"}</p>
            </div>
            <div className="text-right">
              <p className="text-[7px] sm:text-[9px] uppercase tracking-widest opacity-40">System State</p>
              <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse"></div>
                <p className="text-[10px] sm:text-sm font-light text-sky-400 uppercase tracking-tighter">Evolutionary</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
