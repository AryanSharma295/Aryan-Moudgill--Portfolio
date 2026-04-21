import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    id: "intro",
    isIntro: true
  },
  {
    id: "architecture",
    title: "Digital Architecture",
    subtitle: "Website Building & UI/UX.",
    description: "I don't do \"templates.\" I build high-end, cinematic digital spaces—like the glassmorphism look you're seeing right now. Whether it's a custom build or a high-converting Shopify store, I make sure it's fast, responsive, and looks elite.",
    isVideo: true,
    accent: "rgba(255, 255, 255, 0.4)"
  },
  {
    id: "content",
    title: "Strategic Content",
    subtitle: "Psychology-Backed Writing.",
    description: "Writing isn't just about filling space; it's about retention. I craft narratives that tap into human psychology to make people stop scrolling and start caring. From scripts to landing pages, I write for the algorithm and the human behind the screen.",
    icon: "/icon-typewriter.png",
    accent: "rgba(168, 85, 247, 0.4)" // Neon Purple
  },
  {
    id: "marketing",
    title: "Marketing Management",
    subtitle: "Growth & Conversion.",
    description: "I look at the whole board. I handle the strategy that connects your product to the right audience. It's about building a funnel that actually works—tracking the data, refining the hook, and ensuring the traffic you get actually converts into results.",
    icon: "/icon-reels.png",
    accent: "rgba(251, 191, 36, 0.4)" // Neon Amber
  },
  {
    id: "ai",
    title: "AI & Technical Logic",
    subtitle: "Machine Learning & Python.",
    description: "This is where the BCA brain comes in. I'm currently focused on the intersection of AI and practical tech—like computer vision and custom Python models. I don't just use tools; I understand the logic that builds them.",
    icon: "/icon-ai-brain.png",
    accent: "rgba(56, 189, 248, 0.4)" // Neon Blue
  },
  {
    id: "visual",
    title: "Visual Direction",
    subtitle: "Thumbnail Design & Visual Identity.",
    description: "First impressions are everything. I design high-impact visuals and thumbnails that dominate the feed. I focus on visual hierarchy and \"click-psychology\" to make sure your brand gets the attention it deserves.",
    icon: "/icon-camera.png",
    accent: "rgba(236, 72, 153, 0.4)" // Neon Pink
  }
];

const renderVisual = (skill) => {
  switch (skill.id) {
    case 'architecture':
      return (
        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center liquid-glass shadow-2xl group">
          <div className="absolute inset-0 opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 70%)` }} />
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex flex-col gap-4 transform-gpu transition-all duration-1000 group-hover:scale-110" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                style={{ transform: `translateZ(${i * 30}px)`, animation: `pulse-layer 3s ease-in-out infinite alternate`, animationDelay: `${i * 0.5}s` }}
              />
            ))}
            <style>{`
              @keyframes pulse-layer {
                0% { opacity: 0.5; border-color: rgba(255,255,255,0.1); }
                100% { opacity: 1; border-color: rgba(255,255,255,0.4); }
              }
            `}</style>
          </div>
        </div>
      );
    case 'content':
      return (
        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center liquid-glass shadow-2xl group">
          <div className="absolute inset-0 opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 70%)` }} />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 p-8 md:p-12" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-purple-400/30"
                style={{
                  width: `${Math.random() * 50 + 30}%`,
                  marginLeft: `${Math.random() * 20}%`,
                  animation: `typing-glow 2s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            <style>{`
              @keyframes typing-glow {
                0% { opacity: 0.2; box-shadow: 0 0 0 transparent; }
                100% { opacity: 0.8; box-shadow: 0 0 15px rgba(168,85,247,0.5); }
              }
            `}</style>
          </div>
        </div>
      );
    case 'marketing':
      return (
        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative flex items-end justify-center px-8 pb-12 pt-20 liquid-glass shadow-2xl group">
          <div className="absolute inset-0 opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 70%)` }} />
          <div className="w-full h-full flex items-end justify-between gap-2 md:gap-4 relative z-10">
            {[1, 2, 3, 5, 8].map((val, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-transparent to-amber-400/20 relative overflow-hidden border-t border-amber-300/50 group-hover:to-amber-400/40 transition-colors duration-500"
                style={{
                  height: `${val * 10 + 10}%`,
                  animation: `bar-grow 3s ease-out infinite alternate`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
              </div>
            ))}
            <style>{`
              @keyframes bar-grow {
                0% { transform: scaleY(0.8); transform-origin: bottom; opacity: 0.5; }
                100% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
              }
            `}</style>
          </div>
        </div>
      );
    case 'ai':
      return (
        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center liquid-glass shadow-2xl group">
          <div className="absolute inset-0 opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 70%)` }} />
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]" viewBox="0 0 100 100">
              <circle cx="50" cy="10" r="3" fill="#38bdf8" />
              <circle cx="90" cy="50" r="3" fill="#38bdf8" />
              <circle cx="50" cy="90" r="3" fill="#38bdf8" />
              <circle cx="10" cy="50" r="3" fill="#38bdf8" />
              <circle cx="30" cy="30" r="2" fill="#38bdf8" opacity="0.6" />
              <circle cx="70" cy="30" r="2" fill="#38bdf8" opacity="0.6" />
              <circle cx="70" cy="70" r="2" fill="#38bdf8" opacity="0.6" />
              <circle cx="30" cy="70" r="2" fill="#38bdf8" opacity="0.6" />
              <circle cx="50" cy="50" r="6" fill="#38bdf8" className="animate-pulse" />
              <path d="M50 10 L50 50 M90 50 L50 50 M50 90 L50 50 M10 50 L50 50 M30 30 L50 50 M70 30 L50 50 M70 70 L50 50 M30 70 L50 50" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
              <path d="M10 50 L30 30 L50 10 L70 30 L90 50 L70 70 L50 90 L30 70 Z" stroke="#38bdf8" strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
          </div>
        </div>
      );
    case 'visual':
      return (
        <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center liquid-glass shadow-2xl group">
          <div className="absolute inset-0 opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 70%)` }} />
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full border border-pink-500/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_15s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite] transition-all duration-1000">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-24 h-24 md:w-36 md:h-36 border border-pink-400/30 rounded-full mix-blend-screen"
                  style={{ transform: `rotate(${i * 60}deg) translateX(20px)` }}
                />
              ))}
            </div>
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-pink-500/50 backdrop-blur-md border border-pink-300/50 shadow-[0_0_30px_rgba(236,72,153,0.8)] z-10 animate-pulse" />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function Expertise() {
  return (
    <div className="bg-black w-full relative">
      {skillsData.map((skill, index) => {
        // Intro Slide
        if (skill.isIntro) {
          return (
            <div
              key={skill.id}
              className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-black overflow-hidden relative"
              style={{ zIndex: index }}
            >
              {/* Background Video */}
              <div className="absolute inset-0 z-0 opacity-60">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover mix-blend-screen"
                >
                  <source src="/red_flow.mp4" type="video/mp4" />
                </video>
                {/* Overlays for better text readability and blending */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20"
              >
                <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/60 font-body mb-8 tracking-widest uppercase inline-block">
                  My Expertise
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading italic text-white tracking-tight leading-[0.9] mb-8">
                  What am I good at?
                </h1>
                <div className="flex flex-col items-center gap-2 mt-12 opacity-50">
                  <span className="font-mono text-xs uppercase tracking-widest text-white">Scroll to explore</span>
                  <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
                </div>
              </motion.div>
            </div>
          );
        }

        // Skill Slides
        return (
          <div
            key={skill.id}
            className="sticky top-0 h-screen w-full bg-black overflow-hidden flex items-center justify-center border-t border-white/10"
            style={{ zIndex: index }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute inset-0 opacity-40 blur-[120px] pointer-events-none z-0"
              style={{ background: `radial-gradient(circle at center, ${skill.accent} 0%, transparent 60%)` }}
            />

            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 gap-12 lg:gap-24 relative z-10 pt-16">

              {/* Left Text Content */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="liquid-glass rounded-3xl p-8 md:p-12 w-full"
                  style={{
                    border: `1px solid ${skill.accent.replace('0.4', '0.15')}`,
                    boxShadow: `0 30px 60px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
                  }}
                >
                  <div className="font-mono text-amber-300/80 text-xs tracking-[0.2em] uppercase mb-4">
                    0{index} // {skill.title}
                  </div>
                  <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-[1.1]">
                    {skill.subtitle}
                  </h2>
                  <p className="font-body font-light text-white/70 text-base md:text-lg leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              </div>

              {/* Right Media (Bespoke Visuals) */}
              <div className="w-full md:w-1/2 flex items-center justify-center h-64 md:h-auto" style={{ perspective: '1000px' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-full max-w-md"
                >
                  {renderVisual(skill)}
                </motion.div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
