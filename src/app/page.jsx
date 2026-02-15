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
      <nav className="fixed top-0 w-full z-50 px-8 py-8 flex justify-end items-center">
        <div className="flex gap-8 items-center bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
          <motion.a
            whileHover={{ y: -1 }}
            href="https://github.com/Gokulnath8887"
            target="_blank"
            rel="noopener noreferrer"
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
              <motion.a
                href="mailto:gokul9g0t@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 text-sm"
              >
                Get in touch <ChevronRight size={16} />
              </motion.a>
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
                TOOLS WORKED WITH
              </h2>
              <div className="grid grid-cols-4 gap-6">
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
                      y: -12,
                      scale: 1.1,
                      rotate: [0, -3, 3, 0],
                      transition: {
                        duration: 0.3,
                        rotate: {
                          repeat: Infinity,
                          duration: 0.5
                        }
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.08] rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 p-6 group hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 opacity-30 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    />
                    <span className="text-[9px] font-black text-gray-500 group-hover:text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                      {skill.name}
                    </span>
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

            <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative ${project.isMasterpiece
                    ? "md:col-span-3 aspect-[16/6]"
                    : "aspect-[3/2]"
                    } bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-10 bottom-10 flex flex-col justify-end">
                    <h3 className="text-2xl font-black mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-white font-bold text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed drop-shadow-lg">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-end">
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
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2"
                      >
                        Visit <ExternalLink size={12} />
                      </motion.a>
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
                href="https://github.com/Gokulnath8887"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest"
              >
                GITHUB
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.linkedin.com/in/gokul-nath-3825a22a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-widest"
              >
                LINKEDIN
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:gokul9g0t@gmail.com"
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
              className="bg-[#0a0a0a] w-full max-w-4xl rounded-[2rem] p-8 relative border border-white/10 max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black tracking-tighter text-white">
                    RESUME
                  </h2>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="bg-white rounded-xl overflow-hidden">
                  <img
                    src={resumeImage}
                    alt="P. Gokulnath Resume"
                    className="w-full h-auto"
                  />
                </div>

                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resumeImage;
                    link.download = "Gokulnath_Resume.png";
                    link.click();
                    toast.success("Download started");
                  }}
                  className="w-full py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest"
                >
                  Download Resume
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
