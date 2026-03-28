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
  Sun,
  Moon,
  Calendar,
  Code,
  User,
  Clock
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { ProfileCarousel } from "@/components/ui/profile-card-carousel";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const TECH_LOGOS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg", alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original-wordmark.svg", alt: "Vue.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg", alt: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg", alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg", alt: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg", alt: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", alt: "SCSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg", alt: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg", alt: "Express" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original-wordmark.svg", alt: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original-wordmark.svg", alt: "Three.js" },
];



const PROFILE_SLIDES = [
  {
    name: "Gokulnath",
    title: "Software Developer",
    description: "Building minimal, high-performance web applications and software. Specialized in modern tools and crafting unique user experiences.",
    imageUrl: profileImageFile,
    githubUrl: "https://github.com/Gokulnath8887",
    mailUrl: "mailto:gokul9g0t@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gokulnath-g-n/",
  },
  {
    name: "Gokulnath",
    title: "B.Tech IT Engineer",
    description: "Strong foundation in Information Technology with hands-on experience in full-stack development. Passionate about solving complex problems through clean architecture.",
    imageUrl: profileImageFile,
    githubUrl: "https://github.com/Gokulnath8887",
    mailUrl: "mailto:gokul9g0t@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gokulnath-g-n/",
  },
  {
    name: "Gokulnath",
    title: "Freelance Specialist",
    description: "1+ year of professional experience delivering end-to-end solutions. Dedicated to building high-quality, scalable digital products for clients globally.",
    imageUrl: profileImageFile,
    githubUrl: "https://github.com/Gokulnath8887",
    mailUrl: "mailto:gokul9g0t@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gokulnath-g-n/",
  }
];

const TIMELINE_DATA = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 10,
  },
];

export default function PortfolioPage() {
  const [profileImage, setProfileImage] = useState(profileImageFile);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Sticky Top Bar transforms
  const topBarY = useTransform(scrollY, [400, 600], ["-100%", "0%"]);
  const topBarOpacity = useTransform(scrollY, [400, 600], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground selection:bg-foreground/20 overflow-x-hidden font-sans transition-colors duration-300"
    >
      <Toaster position="top-center" richColors />

      {/* Sticky Top Tech Stack Bar */}
      <motion.div
        style={{ y: topBarY, opacity: topBarOpacity }}
        className="fixed top-0 left-0 w-full z-40 pointer-events-none transform-gpu will-change-transform"
      >
        <LogoCloud logos={TECH_LOGOS} className="pointer-events-auto" />
      </motion.div>

      <motion.nav
        style={{ opacity }}
        className="fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center pointer-events-none transform-gpu will-change-[opacity]"
      >
        <div className="flex gap-4 items-center bg-card/40 backdrop-blur-md md:backdrop-blur-2xl px-4 py-3 rounded-full border border-border pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#00FF88] dark:text-[#00FF88]/80 hover:text-[#00CC6D] dark:hover:text-[#00FF88] transition-all bg-[#00FF88]/5 dark:bg-[#00FF88]/10 border border-[#00FF88]/30 dark:border-[#00FF88]/20"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
        </div>

        <div className="flex gap-4 md:gap-8 items-center bg-card/40 backdrop-blur-md md:backdrop-blur-2xl px-4 md:px-6 py-3 rounded-full border border-border pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsResumeOpen(true)}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all"
          >
            <FileText size={14} />
            Resume
          </motion.button>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Centered Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20 overflow-hidden">
          
          {/* Timeline background mounted behind the carousel synced with scroll animations */}
          <motion.div 
            style={{ y: y1, opacity, scale }}
            className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
          >
            <RadialOrbitalTimeline timelineData={TIMELINE_DATA} />
          </motion.div>

          <motion.div
            style={{ y: y1, opacity, scale }}
            className="w-full transform-gpu will-change-transform z-10 pointer-events-none"
          >
            <div className="pointer-events-auto">
              <ProfileCarousel slides={PROFILE_SLIDES} />
            </div>
          </motion.div>
        </section>



        {/* Projects — List Showcase */}
        <section className="py-20 md:py-40 px-6 md:px-8">
          <ProjectShowcase />
        </section>

        {/* Digital Marketing Section (Active Service) */}
        <section className="py-24 px-6 md:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF88]/20 dark:bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_10px_#00FF88]" />
                <span className="text-[9px] font-black text-[#00FF88] uppercase tracking-[0.2em]">Active Service</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                DIGITAL MARKETING
              </h2>

              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium">
                Driving brand growth and organic traffic through data-driven SEO, targeted ad campaigns, and explosive social strategies crafted for massive conversion rates.
              </p>
            </motion.div>
          </div>
        </section>

        {/* AI Automation Section (Under Construction) */}
        <section className="py-24 px-6 md:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF88]/10 dark:bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#00FF88]/50 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Under Construction</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                AI AUTOMATION IN N8N
              </h2>

              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium">
                Architecting intelligent, multi-agent workflows and modular automated
                systems with n8n to revolutionize digital processes through advanced AI orchestration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-20 md:py-32 px-6 md:px-8 border-t border-border bg-card/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0">
            <div className="text-center md:text-left space-y-4">
              <div className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
                GOKULNATH<span className="text-muted-foreground">.</span>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground/60 font-extrabold tracking-[0.3em] uppercase">
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
                  whileHover={{ y: -4, color: 'hsl(var(--foreground))' }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-all text-xs font-black tracking-[0.2em]"
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/95 backdrop-blur-3xl"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card w-full max-w-5xl rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 relative border border-border max-h-[90vh] flex flex-col gap-8 md:gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-2">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground">
                    CURRICULUM VITAE
                  </h2>
                  <p className="text-muted-foreground font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">P. Gokulnath / Resume</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsResumeOpen(false)}
                  className="w-10 h-10 md:w-14 md:h-14 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground border border-border transition-all"
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
                className="w-full py-5 md:py-6 bg-[#00FF88] text-[#0B0B0B] font-black rounded-3xl md:rounded-[2rem] hover:bg-[#00CC6D] transition-colors text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-[#00FF88]/20"
              >
                <FileText size={16} />
                Download PDF Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div >
  );
}
