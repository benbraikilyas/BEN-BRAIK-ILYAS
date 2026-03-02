"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { EASE_EXPO } from "@/lib/animations";

export default function Preloader({ onCompleteAction }: { onCompleteAction: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 1400;
        const start = Date.now();

        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            // Eased progress
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(Math.round(eased * 100));

            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                    setTimeout(onCompleteAction, 600);
                }, 200);
            }
        };

        requestAnimationFrame(tick);
    }, [onCompleteAction]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader"
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: EASE_EXPO },
                    }}
                >
                    <div className="flex flex-col items-center gap-8 px-6 text-center">
                        {/* Name */}
                        <motion.div
                            className="font-display text-4xl md:text-6xl tracking-widest"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE_EXPO }}
                        >
                            {SITE_CONFIG.name}
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-48 h-[2px] bg-border overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>

                        {/* Interaction Message */}
                        <motion.div
                            className="font-mono text-[10px] text-text-dimmed uppercase tracking-[0.3em] h-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {progress < 100 ? `Loading Experience ${progress}%` : "Click Anywhere to Experience"}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
