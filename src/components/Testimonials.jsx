import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "He has a rare mix of technical logic and creative vision. He rebuilt our digital presence with a cinematic feel that actually converts visitors into customers",
    name: "Akhil Vatsyan",
    role: "CPO, Negi & Co."
  },
  {
    quote: "Finding someone who understands both the code and the marketing psychology is a game changer. His writing is sharp, realistic, and hits exactly the right tone for our brand without sounding like every other generic site out there.",
    name: "H.S Negi",
    role: "CEO, Ryoon.in"
  },
  {
    quote: "The level of professionalism is top-tier. From the visual design to the overall strategy, he just gets it.",
    name: "Anuj Verma",
    role: "Channel Owner, Yuh Aight"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          What They Say
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Don't take my word for it.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="liquid-glass rounded-2xl p-8 flex flex-col justify-between h-full"
          >
            <p className="text-white/80 font-body font-light text-sm italic leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div>
              <div className="text-white font-body font-medium text-sm">
                {t.name}
              </div>
              <div className="text-white/50 font-body font-light text-xs">
                {t.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
