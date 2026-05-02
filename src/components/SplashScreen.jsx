import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BatmanLogo from './BatmanLogo';

/**
 * Full-screen black splash screen.
 * Renders the Batman 2022 logo with draw-on animation,
 * a shimmer progress bar, and status text.
 * Exits via AnimatePresence in App.jsx.
 */
export default function SplashScreen({ progress = 0 }) {
  const [statusText, setStatusText] = useState('INITIALIZING');
  const percent = Math.round(progress * 100);

  // Cycle status messages based on progress
  useEffect(() => {
    if (progress < 0.35) setStatusText('INITIALIZING');
    else if (progress < 0.65) setStatusText('LOADING ASSETS');
    else if (progress < 0.95) setStatusText('ALMOST READY');
    else setStatusText('READY');
  }, [progress]);

  return (
    <motion.div
      key="splash"
      className="splash-root"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(12px)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Ambient bat-glow radial behind logo */}
      <div className="splash-glow" />

      {/* Batman Logo */}
      <motion.div
        className="splash-logo"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
      <BatmanLogo size={240} />
      </motion.div>

      {/* Progress area */}
      <motion.div
        className="splash-progress-wrapper"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Bar track */}
        <div className="splash-bar-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className="splash-bar-fill"
            style={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="splash-bar-shimmer" />
          </motion.div>
        </div>

        {/* Status text */}
        <div className="splash-status">
          <span className="splash-status-text">{statusText}</span>
          <span className="splash-status-percent">{percent}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
