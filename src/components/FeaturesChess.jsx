import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturesChess() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-24">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Pro features. Zero complexity.
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl md:text-4xl font-heading italic text-white">
              Designed to convert. Built to perform.
            </h3>
            <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
              Every pixel is intentional. Our AI studies what works across thousands of top sites, then builds yours to outperform them all.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 font-medium text-sm mt-4">
              Learn more
            </button>
          </div>
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="liquid-glass rounded-2xl overflow-hidden p-2"
            >
              <img
                src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif"
                alt="Finlytic Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl md:text-4xl font-heading italic text-white">
              It gets smarter. Automatically.
            </h3>
            <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
              Your site evolves on its own. AI monitors every click, scroll, and conversion, then optimizes in real time. No manual updates. Ever.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 font-medium text-sm mt-4">
              See how it works
            </button>
          </div>
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="liquid-glass rounded-2xl overflow-hidden p-2"
            >
              <img
                src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif"
                alt="Wealth Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
