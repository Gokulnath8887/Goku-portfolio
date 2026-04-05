"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
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
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiPostgresql, SiSupabase, SiVercel, SiGit, SiFigma } from 'react-icons/si';
import LogoLoop from "@/components/ui/LogoLoop";
import { ProfileCarousel } from "@/components/ui/profile-card-carousel";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import LightRays from "@/components/ui/LightRays";
import ShinyText from "@/components/ui/ShinyText";

const TECH_LOGOS = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
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

  // Create a smoothed scroll value using useSpring to eliminate mobile scroll "jitter"
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothScrollY, [0, 500], [0, -100]);
  const y2 = useTransform(smoothScrollY, [0, 500], [0, 50]);
  const opacity = useTransform(smoothScrollY, [0, 300], [1, 0]);
  const scale = useTransform(smoothScrollY, [0, 300], [1, 0.9]);

  // Sticky Top Bar transforms
  const topBarY = useTransform(smoothScrollY, [400, 600], ["-100%", "0%"]);
  const topBarOpacity = useTransform(smoothScrollY, [400, 600], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground selection:bg-foreground/20 overflow-x-hidden font-sans transition-colors duration-300"
    >
      <Toaster position="top-center" richColors />

      {/* Desktop: Sticky Top Tech Stack Bar (hidden on mobile) */}
      <motion.div
        style={{ y: topBarY, opacity: topBarOpacity }}
        className="fixed top-0 left-0 w-full z-40 pointer-events-none transform-gpu will-change-transform bg-background/80 backdrop-blur-3xl border-b border-border hidden md:block"
      >
        <LogoLoop 
          logos={TECH_LOGOS} 
          className="pointer-events-auto py-4" 
          speed={100}
          gap={80}
          logoHeight={24}
          fadeOut
          fadeOutColor={isDarkMode ? "#0B0B0B" : "#D39BC2"}
          scaleOnHover
        />
      </motion.div>

      {/* Mobile: Vertical strip on left margin (hidden on desktop) */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 z-40 h-[60vh] w-8 md:hidden">
        <LogoLoop 
          logos={TECH_LOGOS} 
          className="text-muted-foreground/60"
          speed={80}
          direction="down"
          gap={28}
          logoHeight={16}
          fadeOut
          fadeOutColor={isDarkMode ? "#0B0B0B" : "#D39BC2"}
          width={28}
        />
      </div>

      <motion.nav
        style={{ opacity }}
        className="fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center pointer-events-none transform-gpu will-change-[opacity]"
      >
        <div className="flex gap-4 items-center bg-card/40 backdrop-blur-md md:backdrop-blur-2xl px-4 py-3 rounded-full border border-border pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-foreground hover:text-accent transition-all bg-accent/10 dark:bg-accent/20 border border-accent/30 dark:border-accent/20 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-accent/40"
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
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-6 py-10 overflow-hidden">
          
          {/* Theme-Adaptive WebGL Light Rays */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <LightRays
              raysOrigin="top-center"
              raysColor={isDarkMode ? "#A78BFA" : "#D39BC2"}
              raysSpeed={0.8}
              lightSpread={0.6}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.05}
              distortion={0.1}
            />
          </div>
          
          {/* Centered Profile Carousel */}
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
        <section className="py-6 md:py-12 px-6 md:px-8">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D39BC2]/30 dark:bg-[#D39BC2]/10 border border-[#D39BC2]/40 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#D39BC2] rounded-full animate-pulse shadow-[0_0_10px_#D39BC2]" />
                <span className="text-[9px] font-black text-foreground uppercase tracking-[0.2em]">Active Service</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                <ShinyText text="DIGITAL MARKETING" speed={2} color={isDarkMode ? '#7a4d6e' : '#6b2d5e'} shineColor="#ffffff" spread={60} className="font-black" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D39BC2]/15 dark:bg-[#D39BC2]/5 border border-[#D39BC2]/25 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#D39BC2]/50 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Under Construction</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground">
                <ShinyText text="AI AUTOMATION IN N8N" speed={2} delay={0.5} color={isDarkMode ? '#7a4d6e' : '#6b2d5e'} shineColor="#ffffff" spread={60} className="font-black" />
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
                <ShinyText text="GOKULNATH" speed={3} color={isDarkMode ? '#7a4d6e' : '#6b2d5e'} shineColor="#ffffff" spread={55} className="font-black" /><span className="text-muted-foreground">.</span>
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
                    <ShinyText text="CURRICULUM VITAE" speed={2} color={isDarkMode ? '#7a4d6e' : '#6b2d5e'} shineColor="#ffffff" spread={60} className="font-black" />
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
                className="w-full py-5 md:py-6 bg-[#D39BC2] text-white font-black rounded-3xl md:rounded-[2rem] hover:bg-[#c487b1] transition-colors text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-[#D39BC2]/20"
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
