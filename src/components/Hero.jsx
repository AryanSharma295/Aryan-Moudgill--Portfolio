import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BlurText from './BlurText';
import VideoBackground from './VideoBackground';

export default function Hero() {
  return (
    <section className="relative overflow-visible min-h-screen w-full flex flex-col justify-start">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <VideoBackground
          src="/hero-video.mp4"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-16 w-full max-w-5xl mx-auto min-h-screen flex-1">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Available
          </span>
          <span className="text-xs font-medium text-white/80 pr-3 font-body">
            Open for new projects.
          </span>
        </motion.div>

        {/* Heading */}
        <div className="text-6xl md:text-7xl lg:text-[6rem] font-heading italic text-foreground leading-[0.9] max-w-4xl tracking-tight mb-6">
          <BlurText
            text="Hey, I am "
            delay={0.1}
          />
          <BlurText
            text="Aryan Moudgill,"
            delay={0.4}
            className="text-amber-200/90 drop-shadow-lg"
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/70 font-body font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          ...and this will give you the reason why you should work with me.
        </motion.p>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link to="/projects" className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 font-medium text-sm transition-transform hover:scale-105 w-full sm:w-auto justify-center">
            View Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/expertise" className="liquid-glass rounded-full px-6 py-3 flex items-center gap-2 font-medium text-sm transition-transform hover:scale-105 w-full sm:w-auto justify-center">
            My Expertise
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/work-with-me" className="liquid-glass rounded-full px-6 py-3 flex items-center justify-center gap-2 font-medium text-sm transition-transform hover:scale-105 w-full sm:w-auto">
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
