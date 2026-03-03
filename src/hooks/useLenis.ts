"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.2,
        });

        lenisRef.current = lenis;
        (window as any).lenis = lenis;

        // Synchronize Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Connect GSAP ticker to Lenis
        const gsapUpdate = (time: number) => {
            lenis.raf(time * 1000); // convert to ms
        };

        gsap.ticker.add(gsapUpdate);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(gsapUpdate);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}
