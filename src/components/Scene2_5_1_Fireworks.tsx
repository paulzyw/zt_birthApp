import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useAudioEngine } from '../hooks/useAudioEngine';

class Particle {
  gravity = 0.05;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.w = this.h = Math.random() * 4 + 1;
    this.x = x - this.w / 2;
    this.y = y - this.h / 2;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.color = color;
    
    const speedLimit = Math.sqrt(25 - this.vx * this.vx);
    if (Math.abs(this.vy) > speedLimit) {
      this.vy = this.vy > 0 ? speedLimit : -speedLimit;
    }
  }

  move(width: number, height: number) {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    return !(this.x <= -this.w || this.x >= width || this.y >= height || this.alpha <= 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.arc(0, 0, this.w, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export function Scene2_5_1_Fireworks({ onComplete }: { onComplete: () => void; key?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(null);
  const { playFireworks, stopFireworks } = useAudioEngine();

  useEffect(() => {
    playFireworks();
    const timer = setTimeout(onComplete, 8000);
    return () => {
      clearTimeout(timer);
      stopFireworks();
    };
  }, [onComplete, playFireworks, stopFireworks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fireworkProbability = 0.04;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const createFirework = (x?: number, y?: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const margin = Math.min(width, height) * 0.15;
      const targetX = x ?? Math.random() * (width - margin * 2) + margin;
      const targetY = y ?? Math.random() * (height - margin * 2) + margin;
      const count = Math.random() * 50 + 100;
      const colors = ["#00D2FF", "#1B4F72", "#FF007F", "#8A2BE2", "#FF2400", "#FF6700", "#FFD700", "#FFFFFF"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(targetX, targetY, color));
      }
    };

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      createFirework(clientX, clientY);
    };

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (particlesRef.current.length < 1000 && Math.random() < fireworkProbability) {
        createFirework();
      }
      
      particlesRef.current = particlesRef.current.filter(p => p.move(width, height));
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(2, 62, 138, 0.2)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      for (const p of particlesRef.current) {
        p.draw(ctx);
      }
    };

    const animate = () => {
      update();
      draw();
      requestRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-brand-blue overflow-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full bg-brand-blue block" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-white/40 text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.25em] md:tracking-[0.4em] uppercase select-none text-center"
        >
          A Celebration Begins
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-white/20 text-xs md:text-sm mt-4 tracking-[0.1em] uppercase select-none"
        >
          Tap to intensify
        </motion.p>
      </div>
    </motion.div>
  );
}
