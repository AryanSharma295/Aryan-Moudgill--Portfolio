import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    desc: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    desc: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    desc: 'Layouts informed by data. Decisions backed by performance. Results you can measure.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    desc: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          Why Us
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          The difference is everything.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="liquid-glass rounded-2xl p-6 flex flex-col items-start"
            >
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-heading italic text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
