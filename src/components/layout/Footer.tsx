"use client";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import FuzzyText from "@/components/animations/FuzzyText";
import SocialLink from "@/components/ui/SocialLink";

export default function Footer({ isFrame = false }: { isFrame?: boolean }) {
    return (
        <footer className={`${isFrame ? 'w-screen h-full flex flex-col justify-center' : 'py-20 md:py-32'} px-6 md:px-12 bg-background border-t border-border flex-shrink-0`}>
            <div className="max-w-[1400px] mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    {/* Brand & Quote */}
                    <div className="flex flex-col items-start">
                        <FuzzyText
                            baseIntensity={0.2}
                            hoverIntensity={0.4}
                            fuzzRange={10}
                            fontSize="clamp(2rem, 5vw, 5rem)"
                            fontWeight={400}
                            fontFamily="Bebas Neue"
                            color="#c8ff00"
                            letterSpacing={-1}
                            className="mb-4"
                        >
                            ALWAYS BRINGING THE SOLUTIONS.
                        </FuzzyText>
                        <p className="text-text-muted font-mono text-sm tracking-widest mt-2">
                            © {SITE_CONFIG.fullName.toUpperCase()}. ALL RIGHTS RESERVED.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-wrap gap-8 md:gap-12">
                        {SOCIAL_LINKS.map((link) => (
                            <SocialLink
                                key={link.label}
                                label={link.label}
                                href={link.href}
                                className="link-underline font-display text-2xl tracking-widest text-foreground hover:text-accent"
                            />
                        ))}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className={`${isFrame ? 'mt-12 md:mt-24' : 'mt-40'} pt-8 border-t border-border/50`}>
                    <p className="text-xs text-text-dimmed max-w-3xl font-body leading-relaxed">
                        This portfolio is a personal project created by {SITE_CONFIG.name}. All concepts, designs, brands, and visuals
                        are for creative and inspirational purposes only. Some images were generated using AI tools.
                        This is not an official or commercial project.
                    </p>
                </div>
            </div>
        </footer>
    );
}
