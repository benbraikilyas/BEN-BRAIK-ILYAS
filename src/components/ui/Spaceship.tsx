"use client";

import { motion } from "framer-motion";

export default function Spaceship({ className = "" }: { className?: string }) {
    return (
        <div className={`relative w-64 h-32 ${className}`}>
            {/* Ship Body */}
            <svg
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full filter drop-shadow-[0_0_15px_rgba(200,255,0,0.3)]"
            >
                {/* Main Chassis */}
                <path
                    d="M100 0L190 80H10L100 0Z"
                    fill="url(#ship-gradient)"
                    stroke="#333"
                    strokeWidth="0.5"
                />
                <path
                    d="M100 20L160 80H40L100 20Z"
                    fill="#111"
                    stroke="#444"
                    strokeWidth="0.5"
                />

                {/* Cockpit */}
                <path
                    d="M100 10L120 40H80L100 10Z"
                    fill="#0a0a0a"
                    stroke="var(--accent)"
                    strokeWidth="0.5"
                    className="opacity-80"
                />

                {/* Wing Details */}
                <path d="M40 80L10 95H30V80H40Z" fill="#222" />
                <path d="M160 80L190 95H170V80H160Z" fill="#222" />

                {/* Glowy Points */}
                <circle cx="100" cy="5" r="1" fill="var(--accent)" className="animate-pulse" />
                <circle cx="45" cy="75" r="1" fill="var(--accent)" />
                <circle cx="155" cy="75" r="1" fill="var(--accent)" />

                {/* Engines */}
                <rect x="85" y="80" width="10" height="4" fill="#333" />
                <rect x="105" y="80" width="10" height="4" fill="#333" />

                <defs>
                    <linearGradient id="ship-gradient" x1="100" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#444" />
                        <stop offset="1" stopColor="#111" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Engine Thrusters (Framer Motion for flicker) */}
            <div className="absolute top-[92%] left-[42.5%] w-[5%] h-[25%] flex flex-col items-center pointer-events-none">
                <motion.div
                    animate={{ height: ["50%", "100%", "50%"], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    className="w-full bg-gradient-to-b from-accent/90 to-transparent blur-[3px]"
                />
            </div>
            <div className="absolute top-[92%] left-[52.5%] w-[5%] h-[25%] flex flex-col items-center pointer-events-none">
                <motion.div
                    animate={{ height: ["50%", "100%", "50%"], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                    className="w-full bg-gradient-to-b from-accent/90 to-transparent blur-[3px]"
                />
            </div>
        </div>
    );
}
