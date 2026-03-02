"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: boolean;
}

export default function ScrollReveal({
    children,
    className,
    delay = 0,
    stagger = false,
}: ScrollRevealProps) {
    return (
        <motion.div
            className={className}
            variants={stagger ? staggerContainer : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={delay}
        >
            {children}
        </motion.div>
    );
}

// Wrapper for stagger children
export function ScrollRevealItem({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div className={className} variants={fadeUp}>
            {children}
        </motion.div>
    );
}
