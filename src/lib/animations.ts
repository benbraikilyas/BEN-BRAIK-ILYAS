import type { Variants, Transition } from "framer-motion";

// ========================================
// EASING CURVES
// ========================================

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINEMATIC: [number, number, number, number] = [0.76, 0, 0.24, 1];

// ========================================
// TRANSITION PRESETS
// ========================================

export const transitionSlow: Transition = {
    duration: 0.8,
    ease: EASE_EXPO,
};

export const transitionMedium: Transition = {
    duration: 0.5,
    ease: EASE_EXPO,
};

export const transitionFast: Transition = {
    duration: 0.3,
    ease: EASE_EXPO,
};

// ========================================
// ANIMATION VARIANTS
// ========================================

export const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: "blur(8px)",
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: EASE_EXPO,
            delay,
        },
    }),
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: { duration: 0.6, delay },
    }),
};

export const slideUp: Variants = {
    hidden: {
        y: "110%",
        rotateX: -12,
    },
    visible: (delay = 0) => ({
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: EASE_EXPO,
            delay,
        },
    }),
};

export const scaleIn: Variants = {
    hidden: {
        scale: 0.85,
        opacity: 0,
    },
    visible: (delay = 0) => ({
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: EASE_EXPO,
            delay,
        },
    }),
};

export const slideInLeft: Variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: EASE_EXPO },
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerSlow: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

// ========================================
// LETTER ANIMATION (for split text)
// ========================================

export const letterVariants: Variants = {
    hidden: {
        opacity: 0,
        y: "100%",
        rotateX: -90,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.7,
            ease: EASE_EXPO,
            delay: i * 0.04 + 0.3,
        },
    }),
};

// ========================================
// HOVER VARIANTS
// ========================================

export const hoverScale = {
    scale: 1.03,
    transition: { duration: 0.4, ease: EASE_EXPO },
};

export const tapScale = {
    scale: 0.97,
};
