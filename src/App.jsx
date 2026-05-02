import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CtaFooter from './components/CtaFooter';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';
import { MusicProvider } from './context/MusicContext';
import { useAppReady } from './hooks/useAppReady';

// Static imports — ALL page modules load with the initial bundle.
// No lazy splits means zero post-splash chunk fetching lag.
import Home from './pages/Home';
import Projects from './pages/Projects';
import Expertise from './pages/Expertise';
import WorkWithMe from './pages/WorkWithMe';
import Legal from './pages/Legal';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inner component so useLocation works inside BrowserRouter
function AppInner() {
  const location = useLocation();
  const { isReady, progress } = useAppReady();

  return (
    <>
      {/* ── Splash Screen ── gated by AnimatePresence for smooth exit */}
      <AnimatePresence mode="wait">
        {!isReady && <SplashScreen key="splash" progress={progress} />}
      </AnimatePresence>

      {/* ── Main App (always in DOM so JS/CSS hydrates during splash) ── */}
      <div
        className="bg-black min-h-screen overflow-x-hidden text-white font-body"
        style={{
          // Keep content invisible (not removed) while splash is up to
          // avoid layout shift; opacity+pointer-events only.
          opacity: isReady ? 1 : 0,
          pointerEvents: isReady ? 'auto' : 'none',
          transition: 'opacity 0.5s ease 0.1s',
        }}
      >
        <CustomCursor />
        <ScrollToTop />
        <div className="relative z-10">
          <Navbar />
          {/* AnimatePresence on location key drives page transitions */}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/expertise" element={<PageTransition><Expertise /></PageTransition>} />
                <Route path="/work-with-me" element={<PageTransition><WorkWithMe /></PageTransition>} />
                <Route path="/legal/:type" element={<PageTransition><Legal /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          <CtaFooter />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <MusicProvider>
      <AppInner />
    </MusicProvider>
  );
}

export default App;
