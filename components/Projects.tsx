"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Neon Genesis",
      description: "WebGL interactive experience exploring futuristic typography.",
      tags: ["Three.js", "React", "GSAP"],
    },
    {
      title: "Fintech Dashboard",
      description: "Data-heavy trading platform with real-time sockets.",
      tags: ["Next.js", "Tailwind", "WebSockets"],
    },
    {
      title: "Aura Commerce",
      description: "Headless Shopify storefront for high-fashion boutique.",
      tags: ["Hydrogen", "Framer Motion", "GraphQL"],
    },
    {
      title: "Virtual Gallery",
      description: "3D exhibition space for digital artists.",
      tags: ["R3F", "Zustand", "Vercel"],
    },
  ];

  return (
    <section className="relative z-20 min-h-screen bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-16 tracking-tighter">
          Selected <span className="text-zinc-500">Works.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/30 hover:bg-white/10 transition-colors duration-500 cursor-pointer flex flex-col justify-between min-h-[300px]"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <h3 className="text-3xl font-semibold text-white mb-4 flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-4 py-2 rounded-full border border-white/10 text-zinc-300 text-sm font-medium bg-black/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
