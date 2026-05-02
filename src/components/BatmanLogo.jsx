import React from 'react';
import { motion } from 'framer-motion';

/**
 * Uses the actual /favicon.png batman logo.
 * Animates in with a spring scale + opacity entrance via Framer Motion.
 */
export default function BatmanLogo({ size = 220 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter:
          'drop-shadow(0 0 32px rgba(245, 197, 24, 0.55)) drop-shadow(0 0 12px rgba(245, 197, 24, 0.3))',
      }}
    >
      <img
        src="/favicon.png"
        alt="Batman Logo"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
        draggable={false}
      />
    </motion.div>
  );
}
