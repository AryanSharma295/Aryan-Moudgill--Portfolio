import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MusicToggle from './MusicToggle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Expertise', path: '/expertise' },
  { name: 'Projects', path: '/projects' }
];

const LogoText = () => {
  const first = "Aryan";
  const last = " Moudgill";
  return (
    <motion.div
      className="flex font-heading italic tracking-tight cursor-pointer select-none"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* "Aryan" in white */}
      {first.split('').map((char, i) => (
        <motion.span
          key={`f${i}`}
          variants={{
            rest: { y: 0, color: 'rgba(255,255,255,1)' },
            hover: {
              y: [0, -4, 0],
              color: ['rgba(255,255,255,1)', 'rgba(253,224,71,0.95)', 'rgba(255,255,255,1)'],
              transition: { duration: 0.8, delay: i * 0.04, ease: 'easeInOut' }
            }
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          className="text-xl md:text-2xl"
        >
          {char}
        </motion.span>
      ))}
      {/* "Moudgill" slightly dimmed */}
      {last.split('').map((char, i) => (
        <motion.span
          key={`l${i}`}
          variants={{
            rest: { y: 0, color: 'rgba(255,255,255,0.45)' },
            hover: {
              y: [0, -4, 0],
              color: ['rgba(255,255,255,0.45)', 'rgba(253,224,71,0.6)', 'rgba(255,255,255,0.45)'],
              transition: { duration: 0.8, delay: (first.length + i) * 0.04, ease: 'easeInOut' }
            }
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          className="text-xl md:text-2xl"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 flex justify-between items-center pointer-events-none">

      {/* Logo pill */}
      <div className="pointer-events-auto">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <motion.div
            animate={{
              background: scrolled
                ? 'rgba(255,255,255,0.07)'
                : 'rgba(255,255,255,0.04)',
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 rounded-full px-4 py-2.5"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 2px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Amber dot indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80 flex-shrink-0" />
            <LogoText />
          </motion.div>
        </Link>
      </div>

      {/* Mobile Right Controls & Desktop Right Controls wrapper */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center liquid-glass rounded-full px-1.5 py-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 text-sm font-medium font-body transition-colors",
                    isActive ? "text-white" : "text-foreground/70 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Premium Music Toggle (Always Visible) */}
        <MusicToggle />

        {/* Work With Me (Desktop) */}
        <Link
          to="/work-with-me"
          className="hidden md:flex bg-white text-black rounded-full px-3.5 py-1.5 text-sm items-center gap-1 font-medium hover:bg-white/90 transition-colors"
        >
          Work With Me
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10 liquid-glass rounded-full flex items-center justify-center text-white transition-transform active:scale-95"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-16 right-4 left-4 liquid-glass-strong rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto md:hidden z-40 shadow-2xl"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium font-body rounded-xl transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-foreground/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/work-with-me"
              onClick={() => setIsOpen(false)}
              className="bg-white text-black rounded-xl px-4 py-3 text-base mt-2 flex items-center justify-center gap-2 font-medium hover:bg-white/90 transition-colors"
            >
              Work With Me
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
