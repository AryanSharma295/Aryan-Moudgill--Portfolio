import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

export default function WorkWithMe() {
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Using FormSubmit.co to send email without backend and without opening email app
      // Note: First submission will send an activation email to aryan295sharma@gmail.com
      const res = await fetch("https://formsubmit.co/ajax/aryan295sharma@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          project: data.project,
          _subject: `New Project Inquiry from ${data.name}`
        })
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-black w-full min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl liquid-glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6 inline-block">
            Let's Talk
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            {/* Left side: Text and contact details */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight mb-6 leading-[0.9]">
                Ready to build something amazing?
              </h1>
              <p className="text-white/60 font-body font-light text-base md:text-lg leading-relaxed mb-10">
                Drop your details below and tell me a bit about what you're building. I'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-white/40 uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-white font-medium text-lg">+91 98156 22123</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-white/40 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-white font-medium text-lg">aryan295sharma@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-body text-white/60">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-body text-white/60">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-body text-white/60">Tell me about your project</label>
                  <textarea 
                    name="project"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors h-32 resize-none"
                    placeholder="What are we building?"
                  ></textarea>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                    Message sent successfully! I'll be in touch soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="liquid-glass-strong rounded-xl w-full py-4 flex items-center justify-center gap-2 font-medium text-sm transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
