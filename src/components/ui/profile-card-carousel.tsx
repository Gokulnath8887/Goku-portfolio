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
import ShinyText from './ShinyText';
import { CpuArchitecture } from "./cpu-architecture";
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
                <div className='w-[470px] h-[470px] rounded-[3rem] overflow-hidden bg-[#D39BC2]/50 dark:bg-[#D39BC2]/10 flex-shrink-0 border border-[#D39BC2]/20 dark:border-[#D39BC2]/10 relative'>
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
                                className='w-full h-full object-cover rounded-[3rem]'
                                draggable={false}
                                decoding="async"
                                loading="lazy"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card */}
                <div className='bg-[#D39BC2]/20 dark:bg-[#D39BC2]/10 backdrop-blur-2xl md:backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_8px_32px_rgba(211,155,194,0.1)] p-12 ml-[-120px] z-10 max-w-xl flex-1 relative overflow-hidden transform-gpu'>
                    <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40 pointer-events-none flex items-center justify-center">
                        <CpuArchitecture text="GPU" className="absolute inset-0 w-full h-full object-cover text-[#D39BC2]" />
                    </div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            className="relative z-10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className='mb-8'>
                                <h2 className='text-3xl font-black text-[#D39BC2] mb-2 tracking-tight'>
                                    <ShinyText text={currentSlide.name} speed={2} color="#8a3d72" shineColor="#ffffff" spread={55} className="font-black" />
                                </h2>

                                <p className='text-sm font-bold tracking-widest uppercase text-[#D39BC2]/70'>
                                    {currentSlide.title}
                                </p>
                            </div>

                            <p className='text-foreground/80 text-lg leading-relaxed mb-10 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-[#D39BC2]/10 border border-[#D39BC2]/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#D39BC2] hover:scale-110 group cursor-pointer shadow-[0_4px_12px_rgba(211,155,194,0.1)]'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-[#D39BC2] group-hover:text-white transition-colors' />
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
                <div className='w-full aspect-square bg-[#D39BC2]/10 rounded-[2.5rem] overflow-hidden mb-8 border border-[#D39BC2]/10'>
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
                                className='w-full h-full object-cover rounded-[2.5rem]'
                                draggable={false}
                                decoding="async"
                                loading="lazy"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className='px-4 bg-[#D39BC2]/20 border border-white/10 rounded-[2.5rem] p-8 -mt-20 relative z-10 shadow-lg overflow-hidden'>
                    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none flex items-center justify-center">
                        <CpuArchitecture 
                            text="GPU" 
                            animateLines={false} 
                            animateMarkers={false} 
                            animateText={false} 
                            className="absolute inset-0 w-full h-full object-cover text-[#D39BC2]" 
                        />
                    </div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            className="relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <h2 className='text-2xl font-black text-[#D39BC2] mb-2 tracking-tight'>
                                <ShinyText text={currentSlide.name} speed={2} color="#8a3d72" shineColor="#ffffff" spread={55} className="font-black" />
                            </h2>

                            <p className='text-[10px] font-bold tracking-widest uppercase text-[#D39BC2]/50 mb-6'>
                                {currentSlide.title}
                            </p>

                            <p className='text-foreground/80 text-sm leading-relaxed mb-8 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex justify-center space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-[#D39BC2]/10 border border-[#D39BC2]/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#D39BC2] hover:border-[#D39BC2] cursor-pointer group shadow-sm'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-[#D39BC2] group-hover:text-white transition-colors' />
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
                    className='w-12 h-12 rounded-full bg-[#D39BC2]/5 border border-[#D39BC2]/20 flex items-center justify-center hover:bg-[#D39BC2]/20 transition-colors cursor-pointer text-[#D39BC2]'
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
                                    ? "bg-[#D39BC2] scale-125 shadow-[0_4px_12px_rgba(211,155,194,0.3)]"
                                    : "bg-[#D39BC2]/25 hover:bg-[#D39BC2]/50"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    aria-label='Next'
                    className='w-12 h-12 rounded-full bg-[#D39BC2]/5 border border-[#D39BC2]/20 flex items-center justify-center hover:bg-[#D39BC2]/20 transition-colors cursor-pointer text-[#D39BC2]'
                >
                    <ChevronRight className='w-6 h-6' />
                </button>
            </div>
        </div>
    );
}
