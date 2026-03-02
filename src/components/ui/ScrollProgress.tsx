"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
            style={{ scaleX: progress }}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 0.01 ? 1 : 0 }}
            transition={{ opacity: { duration: 0.3 } }}
        />
    );
}
