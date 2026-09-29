import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Zap } from 'lucide-react';

interface HeroGymNameProps {
  onReplay?: () => void;
}

export const HeroGymName: React.FC<HeroGymNameProps> = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isSparking, setIsSparking] = useState(false);

  const ironLetters = ['I', 'R', 'O', 'N'];
  const forgeLetters = ['F', 'O', 'R', 'G', 'E'];

  const triggerReplay = () => {
    setAnimationKey((prev) => prev + 1);
    setIsSparking(true);
    setTimeout(() => setIsSparking(false), 1500);
  };

  useEffect(() => {
    setIsSparking(true);
    const timer = setTimeout(() => setIsSparking(false), 2000);
    return () => clearTimeout(timer);
  }, [animationKey]);

  return (
    <div className="relative my-4 select-none">
      {/* Dynamic Key wrapper for triggering entry animation */}
      <AnimatePresence mode="wait">
        <div key={animationKey} className="relative inline-block text-left">
          
          {/* Background Forge Lightning & Glow Aura on Entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.9, 0.4], scale: [0.7, 1.3, 1] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute -inset-4 bg-gradient-to-r from-[#CCFF00]/15 via-white/10 to-[#CCFF00]/20 blur-2xl rounded-3xl pointer-events-none -z-10"
          />

          {/* Shockwave expanding ring */}
          <motion.div
            initial={{ opacity: 0.8, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
            className="absolute inset-0 border border-[#CCFF00]/40 rounded-2xl pointer-events-none -z-10"
          />

          {/* Main Gym Name Container with 3D Perspective */}
          <div 
            style={{ perspective: 1000 }}
            className="flex items-center tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display leading-none"
          >
            {/* "IRON" - Metallic Steel Drop In */}
            <div className="flex">
              {ironLetters.map((char, index) => (
                <motion.span
                  key={`iron-${index}`}
                  initial={{
                    opacity: 0,
                    y: -60,
                    rotateX: 85,
                    scale: 0.6,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + index * 0.08,
                    type: 'spring',
                    stiffness: 220,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: '#CCFF00',
                    transition: { duration: 0.15 },
                  }}
                  className="inline-block text-white transition-colors duration-200 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* "FORGE" - High-Voltage Neon Electric Impact */}
            <div className="flex ml-1 sm:ml-2">
              {forgeLetters.map((char, index) => (
                <motion.span
                  key={`forge-${index}`}
                  initial={{
                    opacity: 0,
                    y: 70,
                    rotateX: -85,
                    scale: 0.5,
                    filter: 'blur(10px) brightness(2)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: 'blur(0px) brightness(1)',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.45 + index * 0.09,
                    type: 'spring',
                    stiffness: 240,
                    damping: 14,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateZ: 4,
                    transition: { duration: 0.15 },
                  }}
                  className="inline-block text-[#CCFF00] transition-transform duration-200 drop-shadow-[0_0_25px_rgba(204,255,0,0.65)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle "FITNESS" with Cinematic Letter Expansion & Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 15, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
            transition={{
              duration: 0.9,
              delay: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-between text-xs sm:text-sm md:text-base font-bold text-gray-300 uppercase mt-2 pt-1 border-t border-[#CCFF00]/30"
          >
            <span className="flex items-center gap-1.5 text-[#CCFF00]">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>FITNESS SANCTUARY</span>
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-widest hidden sm:inline">
              EST. 2016 • ELITE ATHLETICS
            </span>
          </motion.div>

          {/* Molten Forge Laser Shimmer Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0.7] }}
            transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
            className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent mt-1 rounded-full shadow-[0_0_12px_#CCFF00]"
          />
        </div>
      </AnimatePresence>

      {/* Interactive Replay Animation Button & Spark Notice */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={triggerReplay}
          title="Replay Gym Name Entry Animation"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#14161D] border border-[#242834] text-xs font-semibold text-gray-300 hover:text-[#CCFF00] hover:border-[#CCFF00] hover:bg-[#1a1d26] transition-all duration-300 cursor-pointer shadow-sm group"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300 text-[#CCFF00]" />
          <span>Replay Name Entry Animation</span>
        </button>

        {isSparking && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#CCFF00]"
          >
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Forge impact triggered</span>
          </motion.span>
        )}
      </div>
    </div>
  );
};
