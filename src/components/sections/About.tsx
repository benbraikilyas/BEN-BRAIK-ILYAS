"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
    return (
        <section id="about" className="min-h-screen flex items-center py-32 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 relative z-10 w-full">
                {/* Label & Heading */}
                <div className="md:col-span-12 lg:col-span-5">
                    <ScrollReveal>
                        <p className="text-sm md:text-base font-mono text-accent uppercase tracking-[0.3em] mb-8 font-bold">
                            WHO I AM
                        </p>
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-foreground leading-[0.85] tracking-tighter mb-12">
                            {SITE_CONFIG.name} <br />
                            <motion.img
                                src="/icon.png"
                                alt="Alien Symbol"
                                className="inline-block h-[0.7em] w-auto mx-4 mb-2 align-middle"
                                initial={{ opacity: 0, scale: 0.5, rotate: -30, filter: 'blur(20px)' }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            />
                            THE MIND<br />
                            BEHIND HIGH-PERFORMANCE CODE.
                        </h2>
                    </ScrollReveal>
                </div>


                {/* Content */}
                <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-end">
                    <ScrollReveal delay={0.2}>
                        <p className="text-2xl md:text-4xl font-body text-foreground leading-tight mb-12 max-w-3xl">
                            I am a results-driven <span className="text-accent underline decoration-1 underline-offset-8">Full-Stack Developer</span> dedicated to architecting high-performance digital solutions that bridge the gap between complex engineering and intuitive design.
                        </p>

                        <p className="text-lg md:text-xl font-body text-text-muted leading-relaxed mb-12 max-w-2xl">
                            With a focus on scalability and aesthetic precision, I transform ambitious ideas into seamless, user-centric experiences.
                            Based in Morocco and operating globally, I combine technical mastery with a refined design sensibility to deliver products that are as robust as they are elegant.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                            <div>
                                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Principal Location</p>
                                <p className="text-xl font-display uppercase font-bold tracking-tight">Morocco, Casablanca</p>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Professional Stance</p>
                                <p className="text-xl font-display uppercase font-bold tracking-tight">Full-Stack Engineer</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Subtle background detail */}
            <div className="absolute top-1/2 -right-20 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] select-none pointer-events-none uppercase">
                About
            </div>
        </section>
    );
}

