"use client";

import { TECH_STACK } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

export default function TechStack() {
    return (
        <section className="relative min-h-screen flex items-center justify-center py-32 px-6 md:px-12 bg-background overflow-hidden">
            {/* Dynamic Tech-Background Detail */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-20">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6">
                {/* Tech Grid in Glass Container */}
                <div className="relative p-12 md:p-24 rounded-[60px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl shadow-2xl overflow-hidden">
                    {/* Header Container (Now Inside) */}
                    <ScrollReveal className="mb-20 flex flex-col items-center text-center relative z-10">
                        <p className="text-xs md:text-sm font-mono text-accent uppercase tracking-[0.5em] mb-6 font-bold opacity-80">
                            DEVELOPMENT STACK
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-foreground tracking-tighter max-w-4xl mx-auto leading-none uppercase text-center">
                            The Technologies <br />
                            <span className="text-accent">Driving My Solutions</span>
                        </h2>
                    </ScrollReveal>

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 md:gap-x-20 md:gap-y-16 relative z-10">
                        {TECH_STACK.map((tech, idx) => (
                            <motion.div
                                key={tech.name}
                                className="group relative"
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: idx * 0.04,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="relative font-display text-xl md:text-3xl lg:text-4xl font-bold tracking-tighter uppercase transition-all duration-500 group-hover:text-accent group-hover:drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.6)] cursor-default text-foreground/70">
                                    {tech.name}
                                </span>
                                {/* Subtle indicator */}
                                <motion.div
                                    className="absolute -bottom-3 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Decorative Background Text Inside Box */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-display font-black text-white/[0.015] select-none pointer-events-none uppercase leading-none z-0">
                        TECH
                    </div>
                </div>
            </div>

        </section>
    );
}

