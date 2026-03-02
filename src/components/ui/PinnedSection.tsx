"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
    children: React.ReactNode;
    /** How much extra scroll depth to "dwell" on this section. e.g. "100%" is one viewport height. */
    dwell?: string;
    /** Selector for the element to pin. Default is the child container. */
    pinSelector?: string;
}

export default function PinnedSection({ children, dwell = "100%", pinSelector }: PinnedSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${dwell}`,
            pin: pinSelector || true,
            snap: {
                snapTo: 1,
                duration: { min: 0.2, max: 0.8 },
                delay: 0.1,
                ease: "power2.inOut"
            },
            anticipatePin: 1,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative">
            {children}
        </div>
    );
}
