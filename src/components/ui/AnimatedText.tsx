"use client";

import { motion } from "framer-motion";
import { letterVariants, staggerContainer } from "@/lib/animations";

interface AnimatedTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    letterDelay?: number;
}

export default function AnimatedText({
    text,
    className = "",
    as: Tag = "h1",
}: AnimatedTextProps) {
    const letters = text.split("");

    return (
        <Tag className={className} style={{ perspective: "1000px" }}>
            <motion.span
                className="inline-flex overflow-hidden"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {letters.map((char, i) => (
                    <motion.span
                        key={`${char}-${i}`}
                        className="inline-block"
                        variants={letterVariants}
                        custom={i}
                        style={{
                            display: "inline-block",
                            whiteSpace: char === " " ? "pre" : "normal",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
}

// Word-by-word animation variant
export function AnimatedWords({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) {
    const words = text.split(" ");

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="mr-[0.3em] inline-block overflow-hidden"
                    variants={letterVariants}
                    custom={i}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
