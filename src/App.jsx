import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CtaFooter from './components/CtaFooter';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Expertise from './pages/Expertise';
import WorkWithMe from './pages/WorkWithMe';
import Legal from './pages/Legal';
import CustomCursor from './components/CustomCursor';
import { MusicProvider } from './context/MusicContext';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
            <Route path="/legal/:type" element={<Legal />} />
          </Routes>
          <CtaFooter />
        </div>
      </div>
    </MusicProvider>
  );
}

export default App;
