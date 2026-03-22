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
                <div className='w-[470px] h-[470px] rounded-[3rem] overflow-hidden bg-[#d4e8e8] dark:bg-[#003838] flex-shrink-0 border border-[#4aabab]/30 dark:border-[#f4e1c1]/10 relative'>
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
                <div className='bg-[#eaf4f4]/90 dark:bg-[#003838]/90 backdrop-blur-3xl border border-[#4aabab]/40 dark:border-[#f4e1c1]/15 rounded-[3rem] shadow-2xl dark:shadow-[0_0_80px_rgba(0,0,0,0.9)] p-12 ml-[-120px] z-10 max-w-xl flex-1'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className='mb-8'>
                                <h2 className='text-3xl font-black text-[#003838] dark:text-[#F4E1C1] mb-2 tracking-tight'>
                                    {currentSlide.name}
                                </h2>

                                <p className='text-sm font-bold tracking-widest uppercase text-[#006666] dark:text-[#f4e1c180]'>
                                    {currentSlide.title}
                                </p>
                            </div>

                            <p className='text-[#004040] dark:text-[#f4e1c1cc] text-lg leading-relaxed mb-10 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-[#008080]/5 dark:bg-[#f4e1c1]/8 border border-[#006666]/20 dark:border-[#f4e1c1]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#008080] dark:hover:bg-[#F4E1C1] hover:border-[#008080] dark:hover:border-[#F4E1C1] hover:scale-110 group cursor-pointer'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-[#003838] dark:text-[#F4E1C1] group-hover:text-white dark:group-hover:text-[#008080] transition-colors' />
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
                <div className='w-full aspect-square bg-[#d4e8e8] dark:bg-[#003838] rounded-[2.5rem] overflow-hidden mb-8 border border-[#4aabab]/30 dark:border-[#f4e1c1]/10'>
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
                <div className='px-4 bg-[#003838]/95 dark:bg-[#003838]/95 backdrop-blur-2xl border border-[#f4e1c1]/15 rounded-[2.5rem] p-8 -mt-20 relative z-10'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide.name + currentSlide.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <h2 className='text-2xl font-black text-[#F4E1C1] mb-2 tracking-tight'>
                                {currentSlide.name}
                            </h2>

                            <p className='text-[10px] font-bold tracking-widest uppercase text-[#f4e1c170] mb-6'>
                                {currentSlide.title}
                            </p>

                            <p className='text-[#f4e1c1cc] text-sm leading-relaxed mb-8 font-medium'>
                                {currentSlide.description}
                            </p>

                            <div className='flex justify-center space-x-4'>
                                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='w-12 h-12 bg-[#f4e1c1]/8 border border-[#f4e1c1]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#F4E1C1] hover:border-[#F4E1C1] cursor-pointer group'
                                        aria-label={label}
                                    >
                                        <IconComponent className='w-5 h-5 text-[#F4E1C1] group-hover:text-[#008080] transition-colors' />
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
                    className='w-12 h-12 rounded-full bg-[#f4e1c1]/8 border border-[#f4e1c1]/20 flex items-center justify-center hover:bg-[#f4e1c1]/20 transition-colors cursor-pointer text-[#F4E1C1] dark:text-[#F4E1C1]'
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
                                    ? "bg-[#F4E1C1] scale-125"
                                    : "bg-[#f4e1c1]/25 hover:bg-[#f4e1c1]/50"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    aria-label='Next'
                    className='w-12 h-12 rounded-full bg-[#f4e1c1]/8 border border-[#f4e1c1]/20 flex items-center justify-center hover:bg-[#f4e1c1]/20 transition-colors cursor-pointer text-[#F4E1C1] dark:text-[#F4E1C1]'
                >
                    <ChevronRight className='w-6 h-6' />
                </button>
            </div>
        </div>
    );
}
