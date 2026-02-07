"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Toaster, toast } from "sonner";

const SKILLS = [
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "SCSS / SASS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Flexbox",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "CSS Grid",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Framer Motion",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  },
  {
    name: "Three.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
];

const PROJECTS = [
  {
    title: "E-Commerce Suite",
    description: "Full-stack platform with real-time inventory and payments.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
  },
  {
    title: "Freelance Portal",
    description: "Bridging the gap between developers and global clients.",
    tech: ["React", "Tailwind", "Firebase"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
  },
  {
    title: "SaaS Dashboard",
    description: "Highly interactive analytics engine for startup growth.",
    tech: ["Angular", "Vite", "D3.js"],
    link: "#",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  },
];

export default function PortfolioPage() {
  const [profileImage, setProfileImage] = useState(
    "https://raw.createusercontent.com/054e67d1-98e6-4cd6-bdb7-49d7ea3f1d42/",
  );
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020202] text-white selection:bg-white/20 overflow-x-hidden font-sans"
    >
      <Toaster position="top-center" richColors />

      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 flex justify-end items-center">
        <div className="flex gap-8 items-center bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
          <motion.a
            whileHover={{ y: -1 }}
            href="https://github.com"
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </motion.a>
          <div className="w-px h-4 bg-white/10" />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsResumeOpen(true)}
            className="text-sm font-medium flex items-center gap-2 hover:text-white transition-colors text-gray-400"
          >
            <FileText size={16} />
            Resume
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Centered Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
          <motion.div
            style={{ y: y1, opacity, scale }}
            className="space-y-12 flex flex-col items-center"
          >
            {/* Centered Circle Profile */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 p-2"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>

            <div className="space-y-6 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-[0.3em]"
              >
                <Sparkles size={12} className="text-white/20" />
                B.Tech IT Engineer
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
              >
                SOFTWARE <br />
                <span className="text-gray-400">DEVELOPER.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
              >
                Building minimal, high-performance web applications and
                software. Freelance specialist with 1 year of professional
                experience.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6"
            >
              <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 text-sm">
                Get in touch <ChevronRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience & Tools Minimal Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div style={{ y: y2 }} className="space-y-8">
              <h2 className="text-3xl font-black tracking-tight text-white">
                EXPERIENCE
              </h2>
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                <div className="text-6xl font-black text-white mb-2">1+</div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                  Year Working Professionally
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black tracking-tight text-white">
                TOOLS
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {SKILLS.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="aspect-square bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-center p-4 group transition-colors hover:border-white/20"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Minimal Grid */}
        <section className="py-40 px-8">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tighter text-white">
                PROJECTS
              </h2>
              <div className="w-12 h-1 bg-white/10 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/5] bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <h3 className="text-2xl font-black mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      {project.tech.map((t, j) => (
                        <span
                          key={j}
                          className="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-20 px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-sm text-gray-600 font-medium tracking-widest">
              © 2026 / SOFTWARE ENGINEER
            </div>
            <div className="flex gap-12">
              <motion.a
                whileHover={{ y: -2 }}
                href="#"
                className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest"
              >
                GITHUB
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="#"
                className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest"
              >
                LINKEDIN
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="#"
                className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest"
              >
                EMAIL
              </motion.a>
            </div>
          </div>
        </footer>
      </main>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a0a] w-full max-w-xl rounded-[3rem] p-16 relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter text-white">
                    RESUME
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    B.Tech IT student specializing in modern frontend frameworks
                    and scalable backend services.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-gray-400 tracking-[0.3em] uppercase">
                      Core Stack
                    </h4>
                    <p className="text-white text-lg font-bold">
                      React, Angular, Next.js, Node.js
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-gray-400 tracking-[0.3em] uppercase">
                      Status
                    </h4>
                    <p className="text-white text-lg font-bold">
                      Available for freelance projects
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toast.success("Download started");
                    setIsResumeOpen(false);
                  }}
                  className="w-full py-5 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #020202;
        }
        ::-webkit-scrollbar-thumb {
          background: #111;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
        body {
          background-color: #020202;
        }
      `}</style>
    </div>
  );
}
