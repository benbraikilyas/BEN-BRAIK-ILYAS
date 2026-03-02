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

    useEffect(() => {
        // Load YouTube API
        const loadYT = () => {
            if (!window.YT) {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName("script")[0];
                if (firstScriptTag && firstScriptTag.parentNode) {
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
            } else if (window.YT && window.YT.Player) {
                initPlayer();
            }
        };

        const initPlayer = () => {
            new window.YT.Player("youtube-player", {
                height: "0",
                width: "0",
                videoId: SITE_CONFIG.youtubeId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    loop: 1,
                    playlist: SITE_CONFIG.youtubeId,
                },
                events: {
                    onReady: (event: any) => {
                        setPlayer(event.target);
                    },
                },
            });
        };

        window.onYouTubeIframeAPIReady = initPlayer;
        loadYT();
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
            <div id="youtube-player" style={{ display: "none" }} />

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
