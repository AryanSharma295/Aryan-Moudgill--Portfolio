import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const content = {
  terms: {
    title: 'Terms of Service',
    subtitle: 'Last updated: April 2026',
    sections: [
      {
        heading: 'Agreement to Terms',
        body: `By accessing or using this website and any services offered by Aryan Moudgill, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the service.`,
      },
      {
        heading: 'Services',
        body: `Aryan Moudgill provides freelance web design, development, AI integration, content writing, and marketing strategy services. All project scopes, deliverables, timelines, and pricing are agreed upon in writing before work begins. Aryan Moudgill reserves the right to decline any project at sole discretion.`,
      },
      {
        heading: 'Intellectual Property',
        body: `Upon full payment, the client receives ownership of all custom deliverables created for their project. Aryan Moudgill retains the right to display completed work in portfolios, case studies, and promotional materials unless a written non-disclosure agreement is in place.`,
      },
      {
        heading: 'Payment',
        body: `All projects require a deposit before work begins. Final deliverables are released upon receipt of remaining payment. Late payments may incur a delay in project completion. All fees are non-refundable unless otherwise agreed in writing.`,
      },
      {
        heading: 'Limitation of Liability',
        body: `Aryan Moudgill shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, any services. Total liability shall not exceed the amount paid for the specific service in question.`,
      },
      {
        heading: 'Changes to Terms',
        body: `These terms may be updated at any time. Continued use of the website after changes constitutes acceptance of the new terms. It is your responsibility to review these terms periodically.`,
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Last updated: April 2026',
    sections: [
      {
        heading: 'Information Collected',
        body: `When you contact me through this website, I may collect your name, email address, and any information you voluntarily provide. This site does not use invasive tracking or sell any personal data to third parties.`,
      },
      {
        heading: 'How Information is Used',
        body: `Information you provide is used solely to respond to your enquiry, manage project communication, and improve the quality of services offered. You will not be added to any mailing list without explicit consent.`,
      },
      {
        heading: 'Cookies',
        body: `This website may use minimal cookies for performance and analytics purposes. No personally identifiable information is stored in cookies. You may disable cookies in your browser settings at any time without affecting your ability to use the site.`,
      },
      {
        heading: 'Third-Party Services',
        body: `This site may embed third-party services (e.g. YouTube, Google Fonts). These services operate under their own privacy policies, and I am not responsible for their data practices.`,
      },
      {
        heading: 'Data Security',
        body: `Reasonable technical measures are in place to protect any information you share. However, no method of internet transmission is 100% secure, and I cannot guarantee absolute security.`,
      },
      {
        heading: 'Contact',
        body: `If you have any questions about this Privacy Policy, please reach out via the Contact page. I am happy to clarify anything.`,
      },
    ],
  },
};

export default function Legal() {
  const { type } = useParams(); // 'terms' or 'privacy'
  const page = content[type] || content.terms;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="text-white/40 text-sm font-body hover:text-white/70 transition-colors flex items-center gap-2"
          >
            ← Back to home
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading italic text-5xl md:text-6xl text-white leading-[0.9] mb-3"
        >
          {page.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/30 text-sm font-body mb-14"
        >
          {page.subtitle}
        </motion.p>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-14" />

        {/* Sections */}
        <div className="space-y-10">
          {page.sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <h2 className="font-heading italic text-xl text-white mb-3">{s.heading}</h2>
              <p className="font-body font-light text-white/55 text-base leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-white/10 text-white/25 text-xs font-body">
          Questions? <Link to="/work-with-me" className="underline underline-offset-2 hover:text-white/50 transition-colors">Get in touch.</Link>
        </div>
      </div>
    </div>
  );
}
