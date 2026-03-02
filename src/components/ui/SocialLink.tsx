"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

interface SocialLinkProps {
    label: string;
    href: string;
    className?: string;
}

export default function SocialLink({ label, href, className }: SocialLinkProps) {
    const [copied, setCopied] = useState(false);
    const isGmail = label.toLowerCase() === "gmail";

    const handleClick = (e: React.MouseEvent) => {
        if (isGmail) {
            e.preventDefault();
            navigator.clipboard.writeText(SITE_CONFIG.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <a
            href={isGmail ? "#" : href}
            onClick={handleClick}
            target={isGmail ? undefined : "_blank"}
            rel={isGmail ? undefined : "noopener noreferrer"}
            className={`relative group ${className}`}
            data-cursor="pointer"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="copied"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-accent"
                    >
                        COPIED!
                    </motion.span>
                ) : (
                    <motion.span
                        key="label"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="uppercase"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-2 bg-accent/0 group-hover:bg-accent/5 blur-xl transition-all duration-500 rounded-full -z-10" />
        </a>
    );
}
