import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, ExternalLink } from 'lucide-react';

const projectData = [
  {
    id: "web",
    title: "Website Building",
    subs: [
      {
        title: "Fully Customised Hosted Websites",
        description: "Bespoke digital experiences built from the ground up for maximum performance and conversion.",
        items: [
          {
            name: "aryanmoudgill.com",
            link: "https://aryanmoudgill.com",
            thumbnail: "https://s0.wp.com/mshots/v1/https://aryanmoudgill.com?w=800",
            type: "image",
            aspect: "aspect-video"
          }
        ]
      },
      {
        title: "Static Shopify Websites",
        description: "Optimized, high-converting e-commerce stores designed to scale your brand.",
        items: [
          {
            name: "negiandco.com",
            link: "https://negiandco.com",
            thumbnail: "https://s0.wp.com/mshots/v1/https://negiandco.com?w=800",
            type: "image",
            aspect: "aspect-video"
          }
        ]
      }
    ]
  },
  {
    id: "content",
    title: "Script Writing & Strategy",
    subs: [
      {
        title: "Instagram Content",
        description: "High-retention content designed for the algorithm and human psychology.",
        items: [
          {
            name: "Reel 01",
            link: "https://www.instagram.com/reel/DUunmCgiC5L/",
            thumbnail: "/reel_thumb_1.jpg",
            type: "video",
            aspect: "aspect-[9/16]"
          },
          {
            name: "Reel 02",
            link: "https://www.instagram.com/reel/DQ17S8CEqsO/",
            thumbnail: "/reel_thumb_2.jpg",
            type: "video",
            aspect: "aspect-[9/16]"
          },
          {
            name: "Reel 03",
            link: "https://www.instagram.com/reel/DWeG-rgE__7/",
            thumbnail: "/reel_thumb_3.jpg",
            type: "video",
            aspect: "aspect-[9/16]"
          },
          {
            name: "Strategic Post",
            link: "https://www.instagram.com/p/DXBy1wKj5GZ/",
            thumbnail: "/strategic_post_thumb.jpg",
            type: "image",
            aspect: "aspect-[4/5]"
          }
        ]
      },
      {
        title: "YouTube Content",
        description: "Long-form narratives that build authority and maintain viewer retention.",
        items: [
          {
            name: "Feature Video 01",
            link: "https://youtu.be/rt-MLpEWXvk",
            thumbnail: "https://img.youtube.com/vi/rt-MLpEWXvk/maxresdefault.jpg",
            type: "video",
            aspect: "aspect-video"
          },
          {
            name: "Feature Video 02",
            link: "https://youtu.be/QMLPVoSmrvo",
            thumbnail: "https://img.youtube.com/vi/QMLPVoSmrvo/maxresdefault.jpg",
            type: "video",
            aspect: "aspect-video"
          },
          {
            name: "Feature Video 03",
            link: "https://youtu.be/SHKuQQWWW6s",
            thumbnail: "https://img.youtube.com/vi/SHKuQQWWW6s/maxresdefault.jpg",
            type: "video",
            aspect: "aspect-video"
          }
        ]
      }
    ]
  },
  {
    id: "design",
    title: "Visual Identity",
    subs: [
      {
        title: "Thumbnail Designing",
        description: "Click-optimized visuals that dominate the feed and drive traffic.",
        items: [
          {
            name: "Thumbnail Concept 01",
            link: "https://youtu.be/P-PSLiC0HRI",
            thumbnail: "https://img.youtube.com/vi/P-PSLiC0HRI/maxresdefault.jpg",
            type: "image",
            aspect: "aspect-video"
          },
          {
            name: "Thumbnail Concept 02",
            link: "https://youtu.be/SHKuQQWWW6s",
            thumbnail: "https://img.youtube.com/vi/SHKuQQWWW6s/maxresdefault.jpg",
            type: "image",
            aspect: "aspect-video"
          },
          {
            name: "Thumbnail Concept 03",
            link: "https://youtu.be/u44ILM5qdWE",
            thumbnail: "https://img.youtube.com/vi/u44ILM5qdWE/maxresdefault.jpg",
            type: "image",
            aspect: "aspect-video"
          }
        ]
      }
    ]
  }
];

const ProjectCard = ({ item }) => (
  <motion.a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative block w-full"
  >
    <div className={`relative ${item.aspect || 'aspect-video'} rounded-2xl overflow-hidden liquid-glass border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-amber-300/30`}>
      <img 
        src={item.thumbnail} 
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      
      {/* Type Indicator */}
      <div className="absolute top-4 right-4 liquid-glass-strong rounded-full p-2 text-white/80 group-hover:text-amber-300 transition-colors z-20">
        {item.type === 'video' ? <Play className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
        <h4 className="text-xl font-heading italic text-white mb-2 flex items-center gap-2">
          {item.name}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        </h4>
        <div className="h-px w-0 group-hover:w-full bg-amber-300/50 transition-all duration-500" />
      </div>
    </div>
  </motion.a>
);

export default function ProjectCatalogue() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-48">
      {projectData.map((category, catIdx) => (
        <div key={category.id} className="relative space-y-20">
          {/* Ambient background glow for section */}
          <div className="absolute top-0 -left-24 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Main Category Heading */}
          <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-white/10 pb-12 relative z-10">
            <span className="font-mono text-amber-300/40 text-sm tracking-[0.4em] uppercase">
              Phase 0{catIdx + 1}
            </span>
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-heading italic text-white tracking-tighter leading-none">
              {category.title}
            </h2>
          </div>

          <div className="space-y-32 relative z-10">
            {category.subs.map((sub, subIdx) => (
              <div key={subIdx} className="space-y-12">
                {/* Sub Heading with vertical line */}
                <div className="flex gap-8 group">
                  <div className="w-px bg-gradient-to-b from-amber-300/50 to-transparent self-stretch group-hover:from-amber-300 transition-colors duration-500" />
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6">
                      {sub.title}
                    </h3>
                    <p className="text-white/40 font-body font-light text-base md:text-lg leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pt-4 items-start">
                  {sub.items.map((item, itemIdx) => (
                    <ProjectCard key={itemIdx} item={item} />
                  ))}
                  
                  {/* Many More Card */}
                  <div className="group relative block w-full pointer-events-none self-stretch">
                    <div className="relative h-full min-h-[200px] rounded-2xl overflow-hidden liquid-glass border border-white/5 flex flex-col items-center justify-center space-y-4 opacity-50 transition-all duration-500 group-hover:opacity-100">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                        <span className="text-2xl font-light text-white/40">+</span>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xl font-heading italic text-white/40">Many More</h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">Archive pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
