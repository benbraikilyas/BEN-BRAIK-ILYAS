"use client";

import { useLenis } from "@/hooks/useLenis";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    useLenis(); // Initialize Lenis smooth scroll hook

    return <>{children}</>;
}
