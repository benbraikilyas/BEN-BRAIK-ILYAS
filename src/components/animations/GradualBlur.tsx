"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualBlurProps {
    /** Edge to attach the blur overlay. Default: "bottom" */
    position?: "top" | "bottom" | "left" | "right";
    /** Strength multiplier for the blur. Default: 1 */
    strength?: number;
    /** Number of stacked blur layers. Default: 5 */
    divCount?: number;
    /** Use exponential progression for stronger end blur. Default: false */
    exponential?: boolean;
    /** Base opacity of the component. Default: 1 */
    opacity?: number;
    /** Animation type. "scroll" reveals on scroll, true for fade-in, false for static. Default: "scroll" */
    animated?: boolean | "scroll";
    /** Animation duration for fade-in. Default: 0.3 */
    duration?: number;
    /** CSS easing function or Framer Motion ease string. Default: "easeOut" */
    easing?: any;
    /** Position relative to "page" (fixed) or "parent" (absolute). Default: "page" */
    target?: "parent" | "page";
    /** Additional CSS classes. */
    className?: string;
    /** Z-index of the container. Default: 1000 */
    zIndex?: number;
    /** Height of the blur overlay (for top/bottom positions). Default: "8rem" */
    height?: string;
    /** Width of the blur overlay (for left/right positions). Default: "100%" */
    width?: string;
}

/**
 * GradualBlur component creates a layered backdrop-blur effect.
 * Stacking multiple layers with increasing blur values creates a smooth gradient blur.
 */
const GradualBlur = ({
    position = "bottom",
    strength = 1.5,
    divCount = 6,
    exponential = false,
    opacity = 1,
    animated = "scroll",
    duration = 0.3,
    easing = "easeOut",
    target = "page",
    className,
    zIndex = 1000,
    height = "6rem",
    width = "100%",
}: GradualBlurProps) => {
    const { scrollYProgress } = useScroll();

    // Reveal effect: opacity changes from 0 to full as user scrolls down slightly
    // This makes the blur appear only when scrolling begins, as requested.
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.02], [0, opacity]);
    const animationOpacity = animated === "scroll" ? scrollOpacity : opacity;

    // Pre-calculate layers to avoid unnecessary re-renders
    const layers = useMemo(() => {
        return Array.from({ length: divCount }).map((_, i) => {
            const step = (i + 1) / divCount;
            // Blur value increases with layers
            const blurValue = exponential
                ? Math.pow(step, 2) * 16 * strength
                : step * 16 * strength;

            const style: React.CSSProperties = {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backdropFilter: `blur(${blurValue.toFixed(2)}px)`,
                WebkitBackdropFilter: `blur(${blurValue.toFixed(2)}px)`,
                pointerEvents: "none",
                zIndex: i,
            };

            // Each layer handles a nested percentage of the container's size
            const percent = (1 - i / divCount) * 100;

            if (position === "bottom" || position === "top") {
                style.height = `${percent}%`;
                if (position === "bottom") style.top = "auto";
                else style.bottom = "auto";
            } else {
                style.width = `${percent}%`;
                if (position === "left") style.right = "auto";
                else style.left = "auto";
            }

            return (
                <div
                    key={i}
                    style={style}
                    className="pointer-events-none transition-all duration-300"
                />
            );
        });
    }, [divCount, strength, exponential, position]);

    const containerStyle: React.CSSProperties = {
        position: target === "page" ? "fixed" : "absolute",
        zIndex,
        width,
        height: (position === "top" || position === "bottom") ? height : "100%",
        [position]: 0,
        pointerEvents: "none",
    };

    return (
        <motion.div
            className={cn("pointer-events-none overflow-hidden", className)}
            style={{
                ...containerStyle,
                opacity: animated === "scroll" ? animationOpacity : (animated === true ? 0 : opacity),
            }}
            initial={animated === true ? { opacity: 0 } : false}
            animate={animated === true ? { opacity } : false}
            transition={{ duration, ease: easing }}
        >
            {layers}
        </motion.div>
    );
};

export default GradualBlur;
