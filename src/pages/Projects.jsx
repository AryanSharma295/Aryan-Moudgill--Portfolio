import React from 'react';
import ProjectCatalogue from '../components/ProjectCatalogue';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div className="bg-black w-full min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading italic text-white tracking-tight"
        >
          Selected Work
        </motion.h1>
        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mt-6">
          A catalogue of high-performance digital solutions
        </p>
      </div>
      <ProjectCatalogue />
    </div>
  );
}
