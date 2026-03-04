import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Twitter,
    Youtube,
    Linkedin,
    ChevronLeft,
    ChevronRight,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProfileSlide {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    githubUrl?: string;
    linkedinUrl?: string;
    mailUrl?: string;
}

export interface ProfileCarouselProps {
    slides: ProfileSlide[];
    className?: string;
}

export function ProfileCarousel({ slides, className }: ProfileCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!slides || slides.length === 0) return null;

    const handleNext = () =>
        setCurrentIndex((index) => (index + 1) % slides.length);
    const handlePrevious = () =>
        setCurrentIndex(
            (index) => (index - 1 + slides.length) % slides.length
        );

    const currentSlide = slides[currentIndex];

    const socialIcons = [
        { icon: Github, url: currentSlide.githubUrl, label: "GitHub" },
        { icon: Linkedin, url: currentSlide.linkedinUrl, label: "LinkedIn" },
        { icon: Mail, url: currentSlide.mailUrl, label: "Mail" }
    ].filter((item) => item.url);

    return (
        <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
            {/* Desktop layout */}
            <div className='hidden md:flex relative items-center justify-center pt-8'>
                {/* Avatar */}
                <div className='w-[470px] h-[470px] rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-[#111] flex-shrink-0 border border-black/5 dark:border-white/5 relative'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className='w-full h-full'
                        >
                            <img
                                src={currentSlide.imageUrl}
                                alt={currentSlide.name}
                                className='w-full h-full object-cover'
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card */}
                <div className='bg-white/80 dark:bg-white/[0.02] backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[3rem] shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] p-12 ml-[-120px] z-10 max-w-xl flex-1'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className='mb-8'>
                                <h2 className='text-3xl font-black text-black dark:text-white mb-2 tracking-tight'>
                                    {currentSlide.name}
                                </h2>

                                <p className='text-sm font-bold tracking-widest uppercase text-gray-500'>
                                    {currentSlide.title}
                                </p>
                            </div>

                            <p className='text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white hover:scale-110 group cursor-pointer'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors' />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile layout */}
            <div className='md:hidden max-w-sm mx-auto text-center'>
                {/* Avatar */}
                <div className='w-full aspect-square bg-gray-100 dark:bg-[#111] rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 dark:border-white/5'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className='w-full h-full'
                        >
                            <img
                                src={currentSlide.imageUrl}
                                alt={currentSlide.name}
                                className='w-full h-full object-cover'
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card content */}
                <div className='px-4 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 -mt-20 relative z-10'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <h2 className='text-2xl font-black text-white mb-2 tracking-tight'>
                                {currentSlide.name}
                            </h2>

                            <p className='text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-6'>
                                {currentSlide.title}
                            </p>

                            <p className='text-gray-300 text-sm leading-relaxed mb-8 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex justify-center space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:border-white cursor-pointer group'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-white group-hover:text-black transition-colors' />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom navigation */}
            <div className='flex justify-center items-center gap-6 mt-12'>
                <button
                    onClick={handlePrevious}
                    aria-label='Previous'
                    className='w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white'
                >
                    <ChevronLeft className='w-6 h-6' />
                </button>

                <div className='flex gap-3'>
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                                idx === currentIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    aria-label='Next'
                    className='w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white'
                >
                    <ChevronRight className='w-6 h-6' />
                </button>
            </div>
        </div>
    );
}
