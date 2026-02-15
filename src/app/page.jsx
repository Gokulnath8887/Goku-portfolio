"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import resumeImage from "./resume.png"; // Import the local image file
import profileImageFile from "./profile.png"; // Import the local profile image
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
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
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
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
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
    title: "Chinnathirupathi Sky Yoga",
    description: "A serene yoga and wellness center website offering holistic guidance and spiritual practices.",
    tech: ["React", "Next.js", "Tailwind"],
    link: "https://www.chinnathirupathiskyyoga.in",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
  },
  {
    title: "Eppo Varum Bus Tracker",
    description: "Real-time transport tracking application for urban commuters.",
    tech: ["React Native", "Firebase", "Maps API"],
    link: "https://eppo-varum-bus-tracker.vercel.app",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
  },
  {
    title: "Dazzle Deals",
    description: "Integrated with database and with admin panel to manage images of the website and manage customer query orders.",
    tech: ["Next.js", "Supabase", "Stripe"],
    link: "https://dazzle-deals.vercel.app",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop",
    isMasterpiece: true,
  },
];

export default function PortfolioPage() {
  const [profileImage, setProfileImage] = useState(profileImageFile);
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
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-black tracking-tighter text-xl pointer-events-auto"
        >
          GN<span className="text-gray-500">.</span>
        </motion.div>
        <div className="flex gap-4 md:gap-8 items-center bg-black/40 backdrop-blur-2xl px-4 md:px-6 py-3 rounded-full border border-white/10 pointer-events-auto">
          <motion.a
            whileHover={{ y: -2, color: "#fff" }}
            href="https://github.com/Gokulnath8887"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-all"
          >
            <Github size={18} />
          </motion.a>
          <div className="w-px h-4 bg-white/10" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsResumeOpen(true)}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-400 hover:text-white transition-all"
          >
            <FileText size={14} />
            Resume
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Centered Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 text-center pt-20">
          <motion.div
            style={{ y: y1, opacity, scale }}
            className="space-y-8 md:space-y-12 flex flex-col items-center w-full max-w-5xl"
          >
            {/* Centered Circle Profile */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 scale-110" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 p-3 md:p-4 bg-white/5 backdrop-blur-sm"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full scale-95 group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>
            </div>

            <div className="space-y-4 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]"
              >
                <Sparkles size={12} className="text-white/40 animate-pulse" />
                B.Tech IT Engineer
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85]"
              >
                SOFTWARE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-600">DEVELOPER.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium px-4"
              >
                Building minimal, high-performance web applications and
                software. Freelance specialist with 1 year of professional
                experience.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-8"
            >
              <motion.a
                href="mailto:gokul9g0t@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 text-xs md:text-sm uppercase tracking-widest"
              >
                Get in touch <ChevronRight size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience & Tools Minimal Section */}
        <section className="py-20 md:py-40 px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
              <motion.div style={{ y: y2 }} className="space-y-6 md:space-y-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  EXPERIENCE
                </h2>
                <div className="group p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                  <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">1+</div>
                  <div className="text-gray-500 font-extrabold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                    Year working professionally
                  </div>
                </div>
              </motion.div>

              <div className="space-y-10 md:space-y-16">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                    TECH STACK
                  </h2>
                  <p className="text-gray-500 font-medium text-sm md:text-base max-w-md">
                    Specialized in building high-performance applications with modern tools.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                  {SKILLS.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.08] rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-300 p-6 md:p-8 group cursor-pointer"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 relative z-10"
                        />
                      </div>
                      <span className="text-[8px] md:text-[9px] font-black text-gray-500 group-hover:text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Minimal Grid */}
        <section className="py-20 md:py-40 px-6 md:px-8">
          <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                PROJECTS
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`group relative aspect-[4/5] md:aspect-[16/10] bg-white/[0.02] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-8 md:inset-x-12 bottom-8 md:bottom-12 flex flex-col justify-end space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10">
                      <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar">
                        {project.tech.map((t, j) => (
                          <span
                            key={j}
                            className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/[0.03] px-3 py-1.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 md:px-6 md:py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 group/btn"
                      >
                        <span className="hidden md:inline">Full Case Study</span>
                        <ExternalLink size={14} className="group-hover/btn:rotate-12 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Automation Section (Under Construction) */}
        <section className="py-24 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Under Construction</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                AI AUTOMATION IN N8N
              </h2>

              <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed font-medium">
                Architecting intelligent, multi-agent workflows and modular automated
                systems with n8n to revolutionize digital processes through advanced AI orchestration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-20 md:py-32 px-6 md:px-8 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0">
            <div className="text-center md:text-left space-y-4">
              <div className="text-xl md:text-2xl font-black tracking-tighter text-white">
                GOKULNATH<span className="text-gray-500">.</span>
              </div>
              <div className="text-[10px] md:text-xs text-gray-600 font-extrabold tracking-[0.3em] uppercase">
                © 2026 / Software Engineer & Designer
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { label: 'GITHUB', href: 'https://github.com/Gokulnath8887' },
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gokulnath-p-3825a22a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                { label: 'EMAIL', href: 'mailto:gokul9g0t@gmail.com' }
              ].map((link) => (
                <motion.a
                  key={link.label}
                  whileHover={{ y: -4, color: '#fff' }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-all text-xs font-black tracking-[0.2em]"
                >
                  {link.label}
                </motion.a>
              ))}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] w-full max-w-5xl rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 relative border border-white/10 max-h-[90vh] flex flex-col gap-8 md:gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-2">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white">
                    CURRICULUM VITAE
                  </h2>
                  <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">P. Gokulnath / Resume</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsResumeOpen(false)}
                  className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white border border-white/10 transition-all"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="bg-white rounded-2xl md:rounded-[2rem] overflow-hidden flex-1 shadow-2xl">
                <img
                  src={resumeImage}
                  alt="P. Gokulnath Resume"
                  className="w-full h-auto"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = resumeImage;
                  link.download = "Gokulnath_Resume.png";
                  link.click();
                  toast.success("Resume download started");
                }}
                className="w-full py-5 md:py-6 bg-white text-black font-black rounded-3xl md:rounded-[2rem] hover:bg-gray-100 transition-colors text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl"
              >
                <FileText size={16} />
                Download PDF Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
