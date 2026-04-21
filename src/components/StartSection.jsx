import React from 'react';
import VideoBackground from './VideoBackground';
import { motion } from 'framer-motion';

export default function StartSection() {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center py-32 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          isHls={true}
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none z-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6"
        >
          How It Works
        </motion.div>

        <motion.h2
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] text-white mb-6"
        >
          You dream it. I ship it.
        </motion.h2>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 font-body font-light text-sm md:text-base max-w-lg mb-10"
        >
          Share your vision. Our AI handles the rest: wireframes, design, code, launch. All in days, not quarters.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="liquid-glass-strong rounded-full px-6 py-3 font-medium text-sm transition-transform hover:scale-105"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}
