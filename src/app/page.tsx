"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Works from "@/components/sections/Works";
import FooterSequence from "@/components/layout/FooterSequence";
import PinnedSection from "@/components/ui/PinnedSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Immediately lock scroll to top on mount
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <main className="min-h-screen">
      <Preloader onCompleteAction={() => setLoading(false)} />

      {!loading && (
        <>
          <Navbar />
          <PinnedSection dwell="60%">
            <Hero />
          </PinnedSection>
          <PinnedSection dwell="60%">
            <Statement />
          </PinnedSection>
          <PinnedSection dwell="60%">
            <About />
          </PinnedSection>
          <PinnedSection dwell="60%">
            <TechStack />
          </PinnedSection>
          <Works />
          <FooterSequence />
        </>
      )}
    </main>
  );
}
