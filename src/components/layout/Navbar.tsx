"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { EASE_EXPO } from "@/lib/animations";
import GooeyNav from "@/components/GooeyNav";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Navbar() {
    const { scrollY } = useScroll();
    const progress = useScrollProgress();
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Keep visible if mouse is at the top
            if (e.clientY < 80) {
                setIsVisible(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                return;
            }

            // Hide when moving
            setIsVisible(false);

            // Show again after inactivity
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{
                duration: 0.8,
                ease: EASE_EXPO,
                delay: isVisible ? 0 : 0 // initial delay is handled elsewhere or we can use custom initial
            }}
        >
            {/* 
                Removed the background 'frame' (backdrop-blur and border) 
                as requested to leave everything cleanly in the navbar 
            */}

            <nav className="relative flex items-center justify-between h-16 md:h-20 max-w-[1400px] mx-auto">
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-4 group"
                    data-cursor="pointer"
                >
                    <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-105">
                        <img
                            src="/icon.png"
                            alt={SITE_CONFIG.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="font-display text-xl md:text-2xl tracking-widest text-foreground group-hover:text-accent transition-colors duration-300">
                        MIND
                    </span>
                </a>

                <div className="flex items-center gap-6">
                    <GooeyNav items={NAV_LINKS} />

                    <div className="hidden md:flex items-center gap-4 ml-2 pl-4 border-l border-border">
                        <MusicPlayer className="relative z-10" minimal />

                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs text-text-muted font-mono tracking-wider">
                                Available
                            </span>
                        </div>
                    </div>
                </div>

                {/* Integrated Scroll Progress Bar at the bottom of the nav content */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
                    style={{ scaleX: progress }}
                />
            </nav>
        </motion.header>
    );
}
