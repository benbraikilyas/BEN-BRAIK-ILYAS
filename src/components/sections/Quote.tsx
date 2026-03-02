"use client";

import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Quote({ isFrame = false }: { isFrame?: boolean }) {
    return (
        <section className={`${isFrame ? 'w-screen h-full flex flex-col justify-center' : 'py-32 md:py-48'} px-6 md:px-12 bg-background relative overflow-hidden flex-shrink-0`}>
            <div className="max-w-[1400px] mx-auto text-center w-full">
                <ScrollReveal>
                    <h2 className="text-display italic text-text-muted leading-[0.9] mb-8 md:mb-12">
                        "I LOVE BUILDING THINGS THAT MATTER ONE LINE AT A TIME."
                    </h2>
                    <p className="font-display text-2xl md:text-4xl tracking-widest text-accent">- {SITE_CONFIG.fullName}</p>
                </ScrollReveal>
            </div>

            {/* Decorative background name */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] opacity-[0.02] pointer-events-none select-none -z-10 whitespace-nowrap">
                {SITE_CONFIG.name}
            </div>
        </section>
    );
}
