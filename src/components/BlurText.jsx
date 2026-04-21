import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BlurText({ text, className, delay = 0.2, direction = 'bottom' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView]);

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.6,
      },
    },
    hidden: {
      opacity: 0,
      y: direction === 'bottom' ? 50 : -50,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', overflow: 'visible' }}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', paddingRight: '0.25em' }}
          key={index}
        >
          {word === '<br/>' ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
