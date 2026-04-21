import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '../context/MusicContext';

// Animated sound bars SVG
const SoundBars = ({ playing }) => (
  <div className="flex items-end gap-[2px] h-3.5 w-4">
    {[1, 0.5, 0.8, 0.3, 0.9].map((h, i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full bg-current"
        animate={playing ? {
          height: ['30%', `${h * 100}%`, '30%'],
          opacity: [0.6, 1, 0.6],
        } : { height: '30%', opacity: 0.4 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.12,
          ease: 'easeInOut',
        }}
        style={{ minHeight: '3px' }}
      />
    ))}
  </div>
);

export default function MusicToggle() {
  const music = useMusic();
  const [showLabel, setShowLabel] = useState(true);

  // Hide label after 3 seconds on mount
  useEffect(() => {
    const t = setTimeout(() => setShowLabel(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // If no track for this page, don't render
  if (!music || !music.currentTrack) return null;

  const isOn = !music.isMuted;

  return (
    <motion.button
      onClick={music.toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2.5 rounded-full px-3.5 py-2 pointer-events-auto relative overflow-hidden group"
      style={{
        background: isOn
          ? 'rgba(251,191,36,0.12)'
          : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isOn
          ? '1px solid rgba(251,191,36,0.35)'
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: isOn
          ? '0 0 20px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 2px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Glow blob behind button when on */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 rounded-full blur-xl bg-amber-300/20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Sound bars icon */}
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: isOn ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.4)' }}
      >
        <SoundBars playing={isOn} />
      </span>

      {/* Expanding label on hover or first load */}
      <AnimatePresence>
        {(showLabel) && (
          <motion.span
            key="label"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-mono text-[10px] tracking-widest uppercase whitespace-nowrap overflow-hidden relative z-10"
            style={{ color: isOn ? 'rgba(251,191,36,0.8)' : 'rgba(255,255,255,0.35)' }}
          >
            {isOn ? 'Atmosphere On' : 'Muted'}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Label on hover */}
      <motion.span
        className="font-mono text-[10px] tracking-widest uppercase whitespace-nowrap relative z-10 hidden group-hover:inline-block"
        style={{ color: isOn ? 'rgba(251,191,36,0.8)' : 'rgba(255,255,255,0.35)' }}
      >
        {showLabel ? '' : (isOn ? 'Atmosphere On' : 'Muted')}
      </motion.span>
    </motion.button>
  );
}
