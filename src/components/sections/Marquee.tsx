"use client";

import { MARQUEE_TEXTS } from "@/lib/constants";

interface MarqueeProps {
    minimal?: boolean;
}

export default function Marquee({ minimal = false }: MarqueeProps) {
    const RepeatText = ({ text, reverse = false, color = "", isSmall = false }: { text: string; reverse?: boolean; color?: string; isSmall?: boolean }) => {
        // We repeat the text many times to ensure continuous flow
        const content = Array(12).fill(text).join(" · ");

        return (
            <div className={`relative py-4 md:py-6 overflow-hidden whitespace-nowrap ${color}`}>
                <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
                    <span className={`${isSmall ? 'text-section-label' : 'text-4xl md:text-7xl'} font-display text-foreground mx-6`}>
                        {content}
                    </span>
                    <span className={`${isSmall ? 'text-section-label' : 'text-4xl md:text-7xl'} font-display text-foreground mx-6`}>
                        · {content}
                    </span>
                </div>
            </div>
        );
    };

    if (minimal) {
        return (
            <div className="flex flex-col gap-0 w-full overflow-hidden">
                <RepeatText text={MARQUEE_TEXTS.line1} reverse />
                <RepeatText text={MARQUEE_TEXTS.line2} reverse />
            </div>
        );
    }

    return (
        <section className="py-12 md:py-24 overflow-hidden">
            <div className="flex flex-col gap-0">
                <RepeatText text={MARQUEE_TEXTS.line1} reverse />
                <RepeatText text={MARQUEE_TEXTS.line2} reverse />
            </div>
        </section>
    );
}
