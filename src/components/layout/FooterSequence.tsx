"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Quote from "@/components/sections/Quote";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ErrorPage from "@/components/sections/ErrorPage";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import FuzzyText from "@/components/animations/FuzzyText";
import SocialLink from "@/components/ui/SocialLink";

export default function FooterSequence() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // We define 6 frames. To slow them down, we use 1200vh total depth.
    // Each frame segment is ~16.6% of total scroll.
    // Dwell (Stationary): ~12% | Transition (Slide): ~4.6%
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 35,
        restDelta: 0.001
    });

    const x = useTransform(
        smoothProgress,
        [
            0, 0.068,       // Frame 1 Pause
            0.113, 0.249,   // Frame 2 Pause (Center 200vh)
            0.295, 0.431,   // Frame 3 Pause (Center 400vh)
            0.477, 0.613,   // Frame 4 Pause (Center 600vh)
            0.659, 0.795,   // Frame 5 Pause (Center 800vh)
            0.841, 1.000    // Frame 6 Pause (Center 1000vh+)
        ],
        [
            "0vw", "0vw",
            "-100vw", "-100vw",
            "-200vw", "-200vw",
            "-300vw", "-300vw",
            "-400vw", "-400vw",
            "-500vw", "-500vw"
        ]
    );

    const ShutdownFrame = ({ children, range }: { children: React.ReactNode, range: number[] }) => {
        const transitionOffset = 0.04;

        // CRT Squeeze and Blip Effect
        const opacity = useTransform(smoothProgress,
            [range[0] - transitionOffset, range[0] - transitionOffset * 0.5, range[0], range[1], range[1] + transitionOffset * 0.5, range[1] + transitionOffset],
            [0, 1, 1, 1, 1, 0]
        );

        const scaleY = useTransform(smoothProgress,
            [range[0] - transitionOffset, range[0] - transitionOffset * 0.5, range[0], range[1], range[1] + transitionOffset * 0.5, range[1] + transitionOffset],
            [0.002, 0.002, 1, 1, 0.002, 0.002]
        );

        const scaleX = useTransform(smoothProgress,
            [range[0] - transitionOffset * 1.5, range[0] - transitionOffset, range[0], range[1], range[1] + transitionOffset, range[1] + transitionOffset * 1.5],
            [0, 0.2, 1, 1, 0.2, 0]
        );

        // Blip of brightness as it shuts down/powers on
        const brightness = useTransform(smoothProgress,
            [range[0] - transitionOffset, range[0] - transitionOffset * 0.8, range[0], range[1], range[1] + transitionOffset * 0.8, range[1] + transitionOffset],
            [0, 4, 1, 1, 4, 0]
        );

        return (
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center overflow-visible">
                <motion.div
                    style={{
                        opacity,
                        scaleY,
                        scaleX,
                        filter: useTransform(brightness, (b) => `brightness(${b})`)
                    }}
                    className="w-full h-full flex flex-col justify-center items-center px-6 md:px-12 bg-background"
                >
                    {children}
                </motion.div>
            </div>
        );
    };

    return (
        <section ref={targetRef} className="relative h-[1200vh] bg-background snap-container">
            {/* PHYSICAL SNAP POINTS: Adjusted to provide more depth per stop */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-[200vh] snap-start snap-stop" />
                <div className="h-[200vh] snap-start snap-stop" />
                <div className="h-[200vh] snap-start snap-stop" />
                <div className="h-[200vh] snap-start snap-stop" />
                <div className="h-[200vh] snap-start snap-stop" />
                <div className="h-[200vh] snap-start snap-stop" />
            </div>

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex h-full w-[600vw]">
                    <ShutdownFrame range={[0, 0.068]}>
                        <Quote isFrame />
                    </ShutdownFrame>

                    <ShutdownFrame range={[0.113, 0.249]}>
                        <Contact isFrame />
                    </ShutdownFrame>

                    {/* Brand Frame */}
                    <ShutdownFrame range={[0.295, 0.431]}>
                        <FuzzyText
                            baseIntensity={0.2}
                            hoverIntensity={0.4}
                            fuzzRange={10}
                            fontSize="clamp(2rem, 8vw, 8rem)"
                            fontWeight={400}
                            fontFamily="Bebas Neue"
                            color="#c8ff00"
                            letterSpacing={-2}
                        >
                            ALWAYS BRINGING THE SOLUTIONS.
                        </FuzzyText>
                    </ShutdownFrame>

                    {/* Socials Frame */}
                    <ShutdownFrame range={[0.477, 0.613]}>
                        <div className="flex flex-col items-center gap-12 text-center">
                            <div className="flex items-center gap-3">
                                <p className="text-section-label text-accent">LET'S CONNECT AND SHARE IDEAS</p>
                                <div className="flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-accent"
                                            animate={{
                                                y: [0, -6, 0],
                                                opacity: [0.4, 1, 0.4],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                {SOCIAL_LINKS.map((link) => (
                                    <SocialLink
                                        key={link.label}
                                        label={link.label}
                                        href={link.href}
                                        className="font-display text-4xl md:text-6xl lg:text-8xl tracking-widest text-foreground hover:text-accent transition-colors duration-300"
                                    />
                                ))}
                            </div>
                        </div>
                    </ShutdownFrame>

                    {/* Disclaimer Frame */}
                    <ShutdownFrame range={[0.659, 0.795]}>
                        <div className="max-w-4xl text-center">
                            <p className="text-sm md:text-xl text-text-muted font-body leading-relaxed">
                                {SITE_CONFIG.fullName.toUpperCase()} — ALL RIGHTS RESERVED.
                            </p>
                            <div className="h-[1px] w-full bg-border my-8" />
                            <p className="text-xs md:text-sm text-text-dimmed font-body leading-relaxed uppercase tracking-widest">
                                This portfolio is a personal project. All concepts, designs, brands, and visuals
                                are for creative and inspirational purposes only. Some images were generated using AI tools.
                                This is not an official or commercial project.
                            </p>
                        </div>
                    </ShutdownFrame>

                    <ShutdownFrame range={[0.841, 1.000]}>
                        <ErrorPage isFrame showSpaceship={true} />
                    </ShutdownFrame>
                </motion.div>
            </div>
        </section>
    );
}
