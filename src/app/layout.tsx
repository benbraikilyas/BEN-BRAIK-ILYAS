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
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
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
        className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} antialiased selection:bg-accent selection:text-background`}
      >
        <Providers>
          <div className="grain-overlay" />
          <Cursor />
          {children}
          {/* Add gradual blur at the bottom of the page */}
          <GradualBlur position="bottom" height="6rem" strength={2} />
        </Providers>
      </body>
    </html>
  );
}

