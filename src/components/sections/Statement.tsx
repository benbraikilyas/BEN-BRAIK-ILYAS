"use client";

import { motion } from "framer-motion";
import { STATEMENT_WORDS } from "@/lib/constants";
import ScrollReveal, { ScrollRevealItem } from "@/components/ui/ScrollReveal";

export default function Statement() {
    return (
        <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden bg-background">
            {/* Ambient Blurred Background Elements */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] opacity-40"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-30"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            <div className="relative z-10 max-w-[1400px] mx-auto w-full text-center">
                <ScrollReveal stagger className="flex flex-wrap justify-center gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-10">
                    {STATEMENT_WORDS.map((item, idx) => (
                        <ScrollRevealItem key={idx}>
                            <span className={`text-4xl md:text-7xl lg:text-9xl font-display font-bold uppercase tracking-tighter transition-all duration-700 hover:text-accent cursor-default inline-block ${item.highlight ? 'text-accent drop-shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]' : 'text-foreground/90'}`}>
                                {item.text}
                            </span>
                        </ScrollRevealItem>
                    ))}
                </ScrollReveal>
            </div>

        </section>

    );
}

