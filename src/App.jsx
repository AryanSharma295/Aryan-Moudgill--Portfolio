import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CtaFooter from './components/CtaFooter';
import CustomCursor from './components/CustomCursor';
import { MusicProvider } from './context/MusicContext';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Expertise = lazy(() => import('./pages/Expertise'));
const WorkWithMe = lazy(() => import('./pages/WorkWithMe'));
const Legal = lazy(() => import('./pages/Legal'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <MusicProvider>
      <div className="bg-black min-h-screen overflow-x-hidden text-white font-body">
        <CustomCursor />
        <ScrollToTop />
        <div className="relative z-10">
          <Navbar />
          <Suspense fallback={<div className="px-6 py-24 text-white/50 font-body">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/work-with-me" element={<WorkWithMe />} />
              <Route path="/legal/:type" element={<Legal />} />
            </Routes>
          </Suspense>
          <CtaFooter />
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;
