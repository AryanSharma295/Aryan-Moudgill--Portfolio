import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rafRef = useRef(0);
  const lastEventRef = useRef(null);

  const canUseCustomCursor = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasFinePointer = window.matchMedia?.('(pointer: fine) and (hover: hover)')?.matches ?? false;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    return hasFinePointer && !reduceMotion;
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!canUseCustomCursor) return;

    document.body.classList.add('cursor-none');
    const moveCursor = (e) => {
      // rAF coalescing prevents flooding motion updates
      lastEventRef.current = e;
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const evt = lastEventRef.current;
        if (!evt) return;
        cursorX.set(evt.clientX);
        cursorY.set(evt.clientY);
        if (!isVisible) setIsVisible(true);
        rafRef.current = 0;
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastEventRef.current = null;
    };
  }, [canUseCustomCursor, cursorX, cursorY, isVisible]);

  if (!canUseCustomCursor) return null;

  if (!isVisible) return null;

  return (
    <>
      {/* Small precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Trailing Aura */}
      <motion.div
        className="fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          backgroundColor: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
