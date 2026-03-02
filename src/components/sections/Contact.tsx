"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { EASE_EXPO } from "@/lib/animations";

export default function Contact({ isFrame = false }: { isFrame?: boolean }) {
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setIsSubmitted(true);
            // Simulate submission
            setTimeout(() => {
                setIsSubmitted(false);
                setName("");
            }, 5000);
        }
    };

    return (
        <section id="contact" className={`${isFrame ? 'w-screen h-full flex flex-col justify-center' : 'py-32 md:py-48'} px-6 md:px-12 bg-surface border-t border-border flex-shrink-0`}>
            <div className="max-w-[1400px] mx-auto w-full">
                <ScrollReveal className="mb-12 md:mb-20">
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <p className="text-section-label text-accent mb-0">LET'S CONNECT AND SHARE IDEAS</p>
                        <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-accent"
                                    animate={{
                                        y: [0, -4, 0],
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
                    <h2 className="text-display mb-8 md:mb-12">
                        {isSubmitted ? "THANKS FOR REACHING OUT!" : "Let's start with your name."}
                    </h2>
                </ScrollReveal>

                <form onSubmit={handleSubmit} className="relative max-w-4xl">
                    {!isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE_EXPO }}
                        >
                            <input
                                type="text"
                                placeholder="Type your name here..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-border focus:border-accent text-3xl md:text-5xl font-display uppercase p-4 md:p-6 outline-none transition-colors duration-300 placeholder:text-text-dimmed"
                            />
                            <div className="mt-8 md:mt-12 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!name.trim()}
                                    className="px-8 md:px-12 py-3 md:py-4 bg-accent text-background font-display text-xl md:text-2xl tracking-widest disabled:opacity-30 disabled:grayscale hover:scale-105 active:scale-95 transition-all duration-300"
                                    data-cursor="pointer"
                                >
                                    NEXT →
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 md:p-12 border border-accent/20 bg-accent/5 rounded-sm"
                        >
                            <p className="text-xl md:text-2xl font-body text-text-muted leading-relaxed">
                                Glad to meet you, <span className="text-accent font-display text-3xl md:text-4xl">{name}</span>.
                                Your message has been received. I'll get back to you within 24 hours.
                            </p>
                        </motion.div>
                    )}
                </form>
            </div>
        </section>
    );
}
