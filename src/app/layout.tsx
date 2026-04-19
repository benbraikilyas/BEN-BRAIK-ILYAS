import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.fullName} | Full-Stack Developer & Interactive UI Specialist`,
    template: `%s | ${SITE_CONFIG.fullName}`,
  },
  description: `Official portfolio of ${SITE_CONFIG.fullName}. Specialized in high-performance Full-Stack development, cinematic React animations, and advanced Next.js interactive experiences. Engineering progress through digital craft.`,
  keywords: [
    "Ben Braik Ilyas",
    "Full-Stack Developer Portfolio",
    "React Animation Expert",
    "Next.js Developer",
    "Interactive UI/UX Designer",
    "Creative Coding",
    "Software Engineer Portfolio",
    "Digital Craftsman",
    "Web Performance Specialist",
    "Cinematic UI",
  ],
  authors: [{ name: SITE_CONFIG.fullName, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_CONFIG.fullName} | Full-Stack Developer`,
    description: `Exploring the intersection of cinematic design and advanced web performance.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.fullName,
    images: [
      {
        url: "/icon.png", 
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.fullName} Portfolio Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.fullName} | Full-Stack Developer`,
    description: `Exploring the intersection of cinematic design and advanced web performance.`,
    images: ["/icon.png"],
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", // User needs to replace this
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.fullName,
  url: SITE_CONFIG.url,
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/BENBRAIKILYAS",
    "https://www.linkedin.com/in/benbraikilyas/",
    "https://www.instagram.com/iilyass_benbraik/",
  ],
  description: `Official portfolio of ${SITE_CONFIG.fullName}. Specialized in high-performance Full-Stack development, cinematic React animations, and advanced Next.js interactive experiences.`,
};



import GradualBlur from "@/components/animations/GradualBlur";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 
          This MUST run synchronously before hydration.
          It disables browser scroll restoration and resets scroll to top
          so the page always starts at the Hero section.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (history.scrollRestoration) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} antialiased selection:bg-accent selection:text-background relative`}
      >
        <Providers>
          <main className="relative min-h-screen">
            <div className="grain-overlay" />
            <Cursor />
            {children}
            <GradualBlur position="bottom" height="6rem" strength={2} />
          </main>
        </Providers>
      </body>
    </html>
  );
}

