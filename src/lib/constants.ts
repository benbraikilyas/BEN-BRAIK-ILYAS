// ========================================
// SITE CONFIGURATION
// ========================================

export interface SiteConfig {
    name: string;
    fullName: string;
    title: string;
    tagline: string;
    email: string;
    year: number;
    url: string;
    youtubeId: string;
}

export const SITE_CONFIG: SiteConfig = {
    name: "ILYAS",
    fullName: "BENBRAIK ILYAS",

    title: "Full-Stack Developer",
    tagline: "Engineering Progress",
    email: "benbraikilyas9@gmail.com",
    year: 2026,
    url: "http://BENBRAIKilyas",
    youtubeId: "Z-VfaG9ZN_U",
} as const;


// ========================================
// NAVIGATION
// ========================================

export const NAV_LINKS = [
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
] as const;

// ========================================
// SOCIAL LINKS
// ========================================

export const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://www.instagram.com/iilyass_benbraik/", external: true },
    { label: "Gmail", href: "benbraikilyas9@gmail.com", external: true },
    { label: "GitHub", href: "https://github.com/BENBRAIKILYAS", external: true },
    { label: "linkdin", href: "https://www.linkedin.com/in/benbraikilyas/", external: true },
] as const;

// ========================================
// TECH STACK
// ========================================

export const TECH_STACK = [
    { name: "JavaScript", category: "language" },
    { name: "TypeScript", category: "language" },
    { name: "HTML", category: "language" },
    { name: "CSS", category: "language" },
    { name: "Python", category: "language" },
    { name: "SQL", category: "language" },
    { name: "MongoDB", category: "Database" },
    { name: "React", category: "framework" },
    { name: "Next.js", category: "framework" },
    { name: "Vue", category: "framework" },
    { name: "Tailwind", category: "framework" },
    { name: "Framer Motion", category: "framework" },
    { name: "Node JS", category: "framework" },
    { name: "Java", category: "language" },
    { name: "Angular", category: "framework" },

    { name: "Git", category: "tool" },
    { name: "VSCode", category: "tool" },
    { name: "Figma", category: "tool" },
] as const;

// ========================================
// MARQUEE TEXT
// ========================================

export const MARQUEE_TEXTS = {
    line1: "BUILDING DIGITAL EXCELLENCE",
    line2: "CODING FOR SUCCESS",
    line3: "SCALABLE SOLUTIONS",
} as const;

// ========================================
// STATEMENT TEXT
// ========================================

export const STATEMENT_WORDS = [
    { text: "CRAFTING", highlight: false },
    { text: "DIGITAL", highlight: false },
    { text: "EXPERIENCES,", highlight: false },
    { text: "BUILDING", highlight: true },
    { text: "SOLUTIONS", highlight: true },
    { text: "THAT", highlight: false },
    { text: "MATTER.", highlight: false },
    { text: "TRANSFORMING", highlight: false },
    { text: "IDEAS", highlight: true },
    { text: "INTO", highlight: false },
    { text: "CODE", highlight: true },
    { text: "WITH", highlight: false },
    { text: "PASSION", highlight: false },
    { text: "AND", highlight: false },
    { text: "PRECISION.", highlight: false },
] as const;
