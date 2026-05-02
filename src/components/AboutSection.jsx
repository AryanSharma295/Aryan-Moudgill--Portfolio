import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import VideoBackground from './VideoBackground';

const skills = [
  'Website Building', 'Content Writing', 'Marketing Management',
  'UI/UX Design', 'AI Integration', 'Conversion Optimization',
  'Brand Strategy', 'SEO', 'React & Vite'
];

function RevealText({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <span ref={ref} className={className} style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Accent({ children }) {
  return (
    <span className="font-heading italic text-amber-200/90 text-[1.1em]">
      {children}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    /*
      KEY LAYOUT PRINCIPLE:
      - Section has NO fixed height — content drives it (works on all screens)
      - Video is absolute behind content with object-fit:contain
      - bg-black makes the letterbox bars invisible → full video always visible, zero stretch
    */
    <section ref={sectionRef} className="relative bg-black py-20 md:py-32 px-4 md:px-6 overflow-hidden">

      {/* Video: absolute behind content, contain = full video, black bars blend with bg */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          poster="/optimized/about-video.jpg"
          sources={[
            { src: '/optimized/about-video.webm', type: 'video/webm; codecs="vp9"' },
            { src: '/optimized/about-video.mp4', type: 'video/mp4' },
          ]}
          className="w-full h-full opacity-50"
          objectFit="contain"
          priority
        />
      </div>

      {/* Content — relative z-10 so it sits above video, drives section height */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/60 font-body">
            Who Am I
          </div>
          <motion.div
            className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1"
            style={{ scaleX: lineScale, originX: 0 }}
          />
        </motion.div>

        {/* Heading */}
        <motion.div style={{ y: parallaxY }} className="mb-14 md:mb-20">
          <h2 className="font-heading italic text-[clamp(2.5rem,8vw,8rem)] text-white leading-[0.85] tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block' }}
            >
              The Story
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/20"
              style={{ display: 'block' }}
            >
              So Far.
            </motion.span>
          </h2>
        </motion.div>

        {/* Body — stacks vertically on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-24 items-start">

          {/* Left: identity badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-row flex-wrap lg:flex-col gap-4 lg:sticky lg:top-32"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              className="inline-block liquid-glass rounded-xl px-5 py-3"
            >
              <span className="font-heading italic text-4xl text-white">20</span>
              <span className="font-body text-white/50 text-xs block">years young</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 8 }}
              whileInView={{ scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.45 }}
              className="inline-block rounded-xl px-5 py-3"
              style={{
                background: 'rgba(15, 30, 80, 0.55)',
                border: '1px solid rgba(99, 148, 255, 0.35)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 20px rgba(99, 148, 255, 0.1), inset 0 1px 1px rgba(255,255,255,0.08)',
              }}
            >
              <span className="font-heading italic text-2xl text-blue-200/90">tech guy</span>
              <span className="font-body text-blue-300/40 text-xs block">builds cool stuff</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -6 }}
              whileInView={{ scale: 1, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.6 }}
              className="inline-block rounded-xl px-5 py-3"
              style={{
                background: 'rgba(60, 35, 10, 0.55)',
                border: '1px solid rgba(253, 186, 116, 0.35)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 0 20px rgba(253, 186, 116, 0.1), inset 0 1px 1px rgba(255,255,255,0.08)',
              }}
            >
              <span className="font-heading italic text-xl text-amber-200/90 leading-tight block">thinks marketing</span>
              <span className="font-heading italic text-xl text-amber-200/90 leading-tight block">is king</span>
              <span className="font-body text-amber-300/40 text-xs block mt-1">always the lens</span>
            </motion.div>
          </motion.div>

          {/* Right: prose */}
          <div className="space-y-6 md:space-y-8 font-body font-light text-white/70 text-base md:text-lg leading-relaxed">
            <p>
              <RevealText text="I'm 20, and I've spent most of my time figuring out why some things on the internet" delay={0} />
              {' '}
              <RevealText text="just work" className="text-white font-medium" delay={0.4} />
              {' '}
              <RevealText text="while others don't." delay={0.5} />
            </p>

            <p>
              <RevealText text="Instead of just sticking to the code, I've obsessed over the " delay={0} />
              <Accent>psychology of marketing </Accent>
              <RevealText text="and the aesthetics of good design." delay={0.3} />
            </p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.9 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-l-2 border-amber-200/40 pl-5 my-4 md:my-6"
            >
              <p className="text-white/80 font-body font-normal text-base md:text-lg italic">
                I'm currently focused on the technical side of{' '}
                <span className="text-amber-200/90 not-italic font-medium">AI and web building</span>
                , but I look at every project through a marketing lens.
              </p>
            </motion.div>

            <p>
              <RevealText text="For me, it's not just about making a site look clean. It's about making sure it" delay={0} />
              {' '}
              <RevealText text="actually says something and gets results." className="text-white font-medium" delay={0.4} />
            </p>

            <p>
              <RevealText text="I'm just here to bridge that gap between" delay={0} />
              {' '}
              <Accent>technical logic </Accent>
              <RevealText text="and a vision that actually hits." delay={0.3} />
            </p>
          </div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/10"
        >
          <p className="text-white/30 font-body text-xs uppercase tracking-widest mb-6 text-center">
            Some of the things I do
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.08 }}
                className="liquid-glass rounded-full px-4 py-2 text-sm font-body text-white/70 hover:text-white transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
