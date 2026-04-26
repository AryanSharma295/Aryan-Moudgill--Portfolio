import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const clients = [
  {
    name: 'Negi & Co.',
    logo: '/logo-ryoon.jpg',
    category: 'Premium Clothing Brand',
    what: 'Built their digital presence from the ground up. Web design, brand identity online, and content strategy that matches their premium positioning.',
    link: 'https://www.instagram.com/negiandco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    border: 'rgba(52, 211, 153, 0.25)',
    glow: 'rgba(52, 211, 153, 0.1)',
    textColor: 'rgb(167, 243, 208)',
    number: '01',
    videoBase: 'flow-green',
  },
  {
    name: 'Ryoon.in',
    logo: '/logo-negi.jpg',
    category: 'Marketing Agency',
    what: "Handled content writing, campaign management, and helped shape the messaging strategy that connects with their clients' audiences.",
    link: 'https://www.instagram.com/ryoon.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    border: 'rgba(99, 148, 255, 0.25)',
    glow: 'rgba(99, 148, 255, 0.1)',
    textColor: 'rgb(191, 219, 254)',
    number: '02',
    videoBase: 'flow-blue',
  },
  {
    name: 'Yuh Aight',
    logo: '/logo-yuhaight.jpg',
    category: 'Self-Improvement Channel',
    what: "Developed the channel's content strategy, writing, and branding. Turning a personal voice into a growing community that actually engages.",
    link: 'https://www.youtube.com/@yuhaight',
    border: 'rgba(255, 255, 255, 0.15)',
    glow: 'rgba(255, 255, 255, 0.05)',
    textColor: 'rgb(229, 229, 229)',
    number: '03',
    videoBase: 'flow-white',
  },
];

function ClientCard({ client, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative w-full"
    >
      <div
        className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
        style={{
          border: `1px solid ${client.border}`,
          boxShadow: `0 0 80px ${client.glow}, inset 0 1px 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Flow video background */}
        <video
          autoPlay={isInView}
          loop
          muted
          playsInline
          preload="none"
          poster={`/optimized/${client.videoBase}.jpg`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {isInView ? (
            <>
              <source src={`/optimized/${client.videoBase}.webm`} type='video/webm; codecs="vp9"' />
              <source src={`/optimized/${client.videoBase}.mp4`} type="video/mp4" />
            </>
          ) : null}
        </video>

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />

        {/* Large ghost number */}
        <div
          className="absolute top-6 right-8 font-heading italic text-[8rem] leading-none select-none pointer-events-none opacity-[0.08] z-10"
          style={{ color: client.textColor }}
        >
          {client.number}
        </div>

        <div className={`relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: isEven ? -6 : 6 }}
            animate={isInView ? { scale: 1, opacity: 1, rotate: isEven ? 2 : -2 } : {}}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 150 }}
            className="flex-shrink-0"
          >
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${client.border}`,
                boxShadow: `0 0 40px ${client.glow}`,
              }}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block rounded-full px-3 py-1 text-xs font-body font-medium mb-5"
              style={{
                background: `rgba(0,0,0,0.3)`,
                border: `1px solid ${client.border}`,
                color: client.textColor,
                backdropFilter: 'blur(8px)',
              }}
            >
              {client.category}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[0.9] mb-6"
            >
              {client.name}
            </motion.h3>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="h-px mb-6 origin-left"
              style={{ background: `linear-gradient(to right, ${client.border}, transparent)` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body font-light text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {client.what}
            </motion.p>

            <motion.a
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium font-body transition-all"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${client.border}`,
                backdropFilter: 'blur(12px)',
                color: client.textColor,
                boxShadow: `0 0 20px ${client.glow}`,
              }}
            >
              Visit {client.name}
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function ClientsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, rgba(99,148,255,1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/60 font-body whitespace-nowrap">
            Trusted By
          </div>
          <motion.div
            className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1"
            style={{ scaleX: lineScale, originX: 0 }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading italic text-[clamp(2.5rem,7vw,6rem)] text-white leading-[0.85] tracking-tight mb-20"
        >
          Teams I've
          <span className="text-white/20"> worked with.</span>
        </motion.h2>

        {/* Client cards — staggered scroll */}
        <div className="flex flex-col gap-8">
          {clients.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
