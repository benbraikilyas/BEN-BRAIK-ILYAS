"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface MusicPlayerProps {
    className?: string;
    minimal?: boolean;
}

export default function MusicPlayer({ className = "fixed bottom-8 left-8 z-50", minimal = false }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState<any>(null);

    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isMounted = true;
        let playerInstance: any = null;
        let initTimeout: NodeJS.Timeout;

        const initPlayer = () => {
            if (!isMounted || !window.YT || !window.YT.Player || !playerRef.current) return;

            // Prevent multiple iframes
            if (playerRef.current.querySelector('iframe')) return;

            console.log("Initializing YouTube Player...");

            playerInstance = new window.YT.Player(playerRef.current, {
                height: "0",
                width: "0",
                videoId: SITE_CONFIG.youtubeId,
                host: "https://www.youtube-nocookie.com",
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    loop: 1,
                    playlist: SITE_CONFIG.youtubeId,
                    origin: window.location.origin,
                    enablejsapi: 1,
                    modestbranding: 1,
                    rel: 0,
                },
                events: {
                    onReady: (event: any) => {
                        if (isMounted) {
                            console.log("YouTube Player Ready");
                            setPlayer(event.target);
                        }
                    },
                    onError: (e: any) => {
                        console.error("YouTube Player Error:", e.data);
                    }
                },
            });
        };

        const loadYT = () => {
            if (window.YT && window.YT.Player) {
                // Already loaded, but wait a bit for DOM stability
                initTimeout = setTimeout(initPlayer, 500);
            } else {
                // Not loaded yet
                if (!document.getElementById("youtube-api-script")) {
                    const tag = document.createElement("script");
                    tag.id = "youtube-api-script";
                    tag.src = "https://www.youtube.com/iframe_api";
                    const firstScriptTag = document.getElementsByTagName("script")[0];
                    if (firstScriptTag && firstScriptTag.parentNode) {
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    }
                }

                // Global callback for the script
                const oldCallback = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    if (oldCallback) oldCallback();
                    if (isMounted) {
                        initTimeout = setTimeout(initPlayer, 500);
                    }
                };
            }
        };

        loadYT();

        return () => {
            isMounted = false;
            if (initTimeout) clearTimeout(initTimeout);
            if (playerInstance && playerInstance.destroy) {
                playerInstance.destroy();
            }
        };
    }, []);

    const togglePlay = () => {
        if (!player) return;

        if (isPlaying) {
            player.pauseVideo();
            setIsPlaying(false);
        } else {
            player.playVideo();
            setIsPlaying(true);
        }
    };

    return (
        <>
            {/* 
                Use an invisible but present container rather than display:none.
                This ensures the Iframe API can safely execute postMessage calls.
            */}
            <div 
                ref={playerRef} 
                className="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none -z-50" 
                aria-hidden="true"
            />

            <div className={className}>
                <motion.button
                    onClick={togglePlay}
                    className="group relative flex items-center gap-2 md:gap-3 bg-surface border border-border px-3 md:px-4 py-2 md:py-3 rounded-full overflow-hidden hover:border-accent transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                    data-cursor="pointer"
                >
                    {/* Animated visualizer bars */}
                    <div className="flex items-end gap-[2px] h-3 w-4">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="w-[2px] bg-accent"
                                animate={{
                                    height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%",
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {!minimal && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted group-hover:text-foreground transition-colors duration-300 w-12 text-left">
                            {isPlaying ? "On" : "Off"}
                        </span>
                    )}

                    <div className="text-foreground">
                        {isPlaying ? (
                            <Volume2 className="w-4 h-4 text-accent" />
                        ) : (
                            <VolumeX className="w-3.5 h-3.5 text-text-muted" />
                        )}
                    </div>

                    {/* Hover highlight background */}
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
            </div>
        </>
    );
}
