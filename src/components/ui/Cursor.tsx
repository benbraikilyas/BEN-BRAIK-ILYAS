"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Detect touch devices
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "pointer"
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isVisible ? (isHovering ? 2.5 : 1) : 0,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <div
                    className="rounded-full bg-white"
                    style={{
                        width: isHovering ? "32px" : "12px",
                        height: isHovering ? "32px" : "12px",
                        transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                />
            </motion.div>
            {/* Hide native cursor globally */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
}
