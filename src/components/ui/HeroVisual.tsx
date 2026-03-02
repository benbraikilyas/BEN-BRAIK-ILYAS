"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroVisualProps {
    humanImage: string;
    alienImage: string;
    className?: string;
}

export default function HeroVisual({
    humanImage,
    alienImage,
    className = "",
}: HeroVisualProps) {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth Cursor Tracking (0 = Left, 1 = Right)
    const revealProgress = useSpring(0.5, { stiffness: 400, damping: 40 });

    // Pro-level Smooth Blur for a refined, transparent look
    const focusBlur = useSpring(0, { stiffness: 200, damping: 40 });
    const brightnessBoost = useSpring(1, { stiffness: 200, damping: 40 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        revealProgress.set(Math.max(0, Math.min(1, x)));
    };

    useEffect(() => {
        if (isHovering) {
            focusBlur.set(8);
            brightnessBoost.set(1.15);
        } else {
            focusBlur.set(0);
            brightnessBoost.set(1);
            revealProgress.set(0.5); // Reset to center
        }
    }, [isHovering, focusBlur, brightnessBoost, revealProgress]);

    const filterString = useTransform(
        [focusBlur, brightnessBoost],
        ([blur, bright]) => `blur(${blur}px) brightness(${bright}) contrast(1.05)`
    );

    // Dynamic Clip Path Reveal (GPU Accelerated)
    // We clip the TOP (human) image to reveal the BOTTOM (alien) image
    const clipPath = useTransform(revealProgress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);

    return (
        <div
            ref={containerRef}
            className={`relative group ${className} flex items-center justify-center`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            data-cursor="pointer"
        >
            {/* Minimal Transparent Container - Smaller for spacing */}
            <div className="relative w-[220px] md:w-[320px] overflow-visible">

                {/* Bottom Layer: Alien Image (Base) */}
                <div className="relative w-full z-10">
                    <Image
                        src={alienImage}
                        alt="Alien Version"
                        width={600}
                        height={800}
                        className="w-full h-auto object-contain brightness-90"
                        priority
                    />
                </div>

                {/* Top Layer: Human Image (Revealing Mask) */}
                <motion.div
                    className="absolute inset-0 z-20 overflow-hidden"
                    style={{
                        clipPath: clipPath,
                        filter: isHovering ? filterString : "none"
                    }}
                >
                    <Image
                        src={humanImage}
                        alt="Human Portrait"
                        width={600}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </motion.div>
            </div>

            {/* Subtle Label */}
            <motion.div
                className="absolute -bottom-12 right-0 font-mono text-[9px] uppercase tracking-[0.5em] text-accent/30 flex items-center gap-6"
                animate={{ opacity: isHovering ? 0.6 : 0.3 }}
            >
                <span className="w-12 h-[1px] bg-accent/5" />
                <span className="bg-background/20 backdrop-blur-sm px-2 py-1">
                    SCANNING//MODE
                </span>
            </motion.div>
        </div>
    );
}
