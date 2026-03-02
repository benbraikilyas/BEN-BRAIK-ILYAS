"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Spaceship from "@/components/ui/Spaceship";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "p1",
        title: "Decision Recovery",
        category: "Full-Stack Development",
        image: "/p&.PNG",
        description: "is a minimalist decision recovery platform designed to combat decision fatigue and cognitive overload. It forces a one decision per day discipline, helping users focus on the single most important action they can take to improve their tomorrow."
    },
    {
        id: "p2",
        title: "Subscription Management API",
        category: "API Development",
        image: "/P3.PNG",
        description: "A simple and efficient API to manage subscriptions, customers, services, and payments — built with Django and Django REST Framework."
    },
    {
        id: "p3",
        title: "CV Pro - Professional CV Improvement Platform",
        category: " ATS systems",
        image: "/p4.PNG",
        description: "A modern, comprehensive CV improvement platform built with React, TypeScript, and Tailwind CSS. Help users create professional CVs, optimize for ATS systems, and advance their careers."
    },
    {
        id: "p4",
        title: "Dog Care Platform",
        category: "Full-Stack Development",
        image: "/HJJ.PNG",
        description: "MyDog — an AI-assisted dog care guide with features such as a breed encyclopedia, medical info, vet locator and an AI chat assistant. The project was built with React + Vite and uses Tailwind classes in the components."
    },
];

export default function Works() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const shipRef = useRef<HTMLDivElement>(null);
    const beamRef = useRef<HTMLDivElement>(null);
    const projectsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !shipRef.current || !beamRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=400%", // Long scroll for immersive feel
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 1. LANDING PHASE
        tl.fromTo(shipRef.current,
            { y: "-100vh", opacity: 0, scale: 0.8 },
            { y: "20vh", opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        )
            // 2. BEAM ACTIVATION
            .fromTo(beamRef.current,
                { opacity: 0, scaleY: 0 },
                { opacity: 1, scaleY: 1, duration: 0.5, ease: "expo.out" },
                "-=0.2"
            );

        // 3. PROJECT REVEAL SEQUENCE
        // Move ship down slowly as projects reveal to create vertical space
        tl.to(shipRef.current, {
            y: "65vh",
            duration: PROJECTS.length * 1.5,
            ease: "none"
        }, "projects");

        PROJECTS.forEach((_, index) => {
            const projectEl = `.project-card-${index}`;

            // Current project comes in
            tl.fromTo(projectEl,
                { opacity: 0, scale: 0.8, y: 100, filter: "blur(20px)", z: -100 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                    z: 0,
                    duration: 1,
                    ease: "power3.out",
                    pointerEvents: "auto"
                },
                `projects+=${index * 1.2}`
            );

            // Previous project scales down and fades back
            if (index > 0) {
                tl.to(`.project-card-${index - 1}`, {
                    scale: 0.7,
                    opacity: 0,
                    y: -150,
                    z: -200,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power2.inOut",
                    pointerEvents: "none"
                }, `projects+=${index * 1.2}`);
            }
        });

        // 4. BLAST OFF PHASE
        tl.to(shipRef.current, {
            y: "-150vh",
            scale: 0.5,
            rotateX: 45,
            opacity: 0,
            duration: 1.2,
            ease: "power4.in"
        }, "+=0.5")
            .to(beamRef.current, {
                opacity: 0,
                scaleY: 0,
                duration: 0.3
            }, "<")
            .to(`.project-card-${PROJECTS.length - 1}`, {
                opacity: 0,
                scale: 0.5,
                y: -100,
                duration: 0.8,
                ease: "power2.in"
            }, "-=0.8");

    }, { scope: sectionRef });

    return (
        <section id="works" ref={sectionRef} className="relative min-h-screen bg-[#020202] overflow-hidden" style={{ perspective: "1000px" }}>
            {/* Stars Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(200,255,0,0.05),transparent)]" />
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-white rounded-full"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Cinematic Title (Initial) */}
            <div className="absolute top-20 left-0 w-full text-center z-10 pointer-events-none">
                <p className="text-section-label text-accent opacity-50 mb-2 font-mono tracking-[0.3em]">MISSION: PORTFOLIO</p>
                <h2 className="text-display text-4xl md:text-6xl tracking-[0.2em] font-bold opacity-80 uppercase">Selected Cargo</h2>
            </div>

            {/* The Spaceship Scene */}
            <div className="relative h-screen w-full flex flex-col items-center z-20">

                {/* Spaceship Container */}
                <div ref={shipRef} className="relative z-10 pt-[2vh] will-change-transform">
                    {/* The Light Beam (Now behind the ship) */}
                    <div
                        ref={beamRef}
                        className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[2px] md:w-[6px] h-[100vh] origin-top z-0"
                        style={{
                            background: "linear-gradient(to bottom, var(--accent), transparent)",
                            boxShadow: "0 0 40px var(--accent)"
                        }}
                    >
                        {/* Glow at source */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-80 bg-accent/10 blur-[80px] rounded-full" />
                    </div>

                    <Spaceship className="w-48 h-24 md:w-64 md:h-32 relative z-10" />
                </div>

                {/* Projects Display Area - Centered with slight top offset for Title */}
                <div ref={projectsContainerRef} className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-30 mt-[10vh]">
                    <div className="relative w-full max-w-6xl h-full flex items-center justify-center overflow-hidden">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                className={`project-card-${index} absolute w-full max-w-5xl opacity-0 pointer-events-none transform-gpu will-change-[transform,opacity,filter]`}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-center bg-black/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden group">
                                    {/* Image Container - Full Visibility */}
                                    <div className="relative aspect-[16/9] lg:aspect-auto lg:h-[460px] rounded-2xl overflow-hidden border border-white/10 group bg-black/20">
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} - ${project.category} project by Ben Braik Ilyas`}
                                            fill
                                            className="object-contain transition-transform duration-1000 group-hover:scale-105"
                                            priority={index === 0}
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                        />

                                        {/* Scanner Line Effect */}
                                        <motion.div
                                            className="absolute top-0 left-0 w-full h-[2px] bg-accent/30 z-20 shadow-[0_0_15px_var(--accent)]"
                                            animate={{ top: ["0%", "100%", "0%"] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>

                                    {/* Text Side - Clean & Powerful */}
                                    <div className="flex flex-col gap-6 pr-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-5">
                                                <span className="w-10 h-[1px] bg-accent" />
                                                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.4em]">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-4xl md:text-5xl tracking-tighter uppercase text-white leading-[1.1] mb-6">
                                                {project.title}
                                            </h3>
                                            <p className="text-text-muted font-body text-base lg:text-lg leading-relaxed opacity-80">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-accent/5 to-transparent pointer-events-none z-10" />
        </section>
    );
}
