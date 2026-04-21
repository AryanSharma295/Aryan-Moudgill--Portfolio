import React from 'react';
import VideoBackground from './VideoBackground';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CtaFooter() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-end pt-32 pb-8">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          isHls={true}
          className="opacity-60"
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none z-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] mb-6"
        >
          Start Your next Successful Project with me.
        </motion.h2>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 font-body font-light text-sm md:text-base max-w-lg mb-10"
        >
          Call me, Let me know what your project is about, Let's make it happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center w-full"
        >
          <Link 
            to="/work-with-me"
            className="bg-white text-black rounded-full px-8 py-4 font-medium text-base transition-transform hover:scale-105 w-full sm:w-auto text-center"
          >
            Contact me, Let's do it...
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs font-body">
          <div>© 2026 Aryan Moudgill. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/legal/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
            <Link to="/legal/terms"   className="hover:text-white/80 transition-colors">Terms</Link>
            <Link to="/work-with-me"  className="hover:text-white/80 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
