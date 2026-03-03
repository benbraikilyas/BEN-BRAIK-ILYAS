"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import AnimatedText from "@/components/ui/AnimatedText";
import { ArrowDown } from "lucide-react";
import Marquee from "@/components/sections/Marquee";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <section className="relative h-screen min-h-[720px] max-h-[1080px] flex flex-col justify-center px-6 md:px-12 pt-16 overflow-hidden bg-black">
            <div className="max-w-[1400px] mx-auto w-full mb-12 lg:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 lg:gap-32 xl:gap-48">
                    {/* Left Column: Text */}
                    <div className="max-w-2xl lg:pl-12 will-change-transform">
                        {/* Full name display */}
                        <div className="mb-6">
                            <motion.p
                                className="text-section-label"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 2.2 }}
                            >
                                {SITE_CONFIG.fullName}
                            </motion.p>
                        </div>

                        {/* Hero Title */}
                        <div className="relative mb-8 md:mb-12">
                            <h1 className="sr-only">{SITE_CONFIG.fullName} - Full-Stack Developer Portfolio</h1>
                            <AnimatedText
                                text={SITE_CONFIG.name}
                                className="text-hero tracking-tighter"
                            />
                        </div>

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-xl md:text-2xl text-text-muted font-body leading-tight">
                                {SITE_CONFIG.title}
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Video */}
                    <motion.div
                        className="flex justify-center lg:justify-end lg:pr-12 xl:pr-32 transform-gpu will-change-transform"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                        onAnimationStart={() => {
                            if (videoRef.current) {
                                // Try to play/restart video when animation starts
                                videoRef.current.currentTime = 0;
                                videoRef.current.play().catch(err => {
                                    // Silent catch for autoplay/interruption errors
                                    console.warn("Video playback was prevented:", err);
                                });
                            }
                        }}
                    >
                        <div className="relative w-[180px] md:w-[240px]">
                            <video
                                ref={videoRef}
                                id="hero-video"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                className="w-full h-auto object-cover opacity-80"
                            >
                                <source src="/ILYAS.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                </div>

                {/* Footer: Scroll indicator */}
                <div className="mt-12 flex justify-end items-end border-t border-white/5 pt-6 pb-4">
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 4.5 }}
                    >
                        <motion.div
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group cursor-pointer will-change-transform"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            onClick={() => {
                                if ((window as any).lenis) {
                                    (window as any).lenis.scrollTo(window.innerHeight, { duration: 1.5 });
                                } else {
                                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                                }
                            }}
                        >
                            <ArrowDown className="w-4 h-4 text-foreground group-hover:text-background" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Marquee Tapes at bottom of screen */}
            <div className="absolute bottom-0 left-0 w-full z-10">
                <Marquee minimal />
            </div>

            {/* Background decoration */}
            <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full -z-10" />
        </section>
    );
}
