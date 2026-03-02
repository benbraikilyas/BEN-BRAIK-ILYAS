import React from 'react';
import { motion } from 'framer-motion';
import FuzzyText from "@/components/animations/FuzzyText";
import Spaceship from "@/components/ui/Spaceship";

export default function ErrorPage({
    isFrame = false,
    showSpaceship = false
}: {
    isFrame?: boolean,
    showSpaceship?: boolean
}) {
    return (
        <section className={`${isFrame ? 'w-screen h-full flex flex-col justify-center items-center overflow-visible' : 'min-h-screen py-32 flex flex-col justify-center items-center overflow-hidden'} bg-background relative`}>
            <div className="flex flex-col items-center relative z-10">
                {showSpaceship && (
                    <div className="flex flex-col items-center mb-0 -mt-32">
                        {/* Spaceship with Landing Animation */}
                        <motion.div
                            initial={{ y: -300, opacity: 0, scale: 0.8 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{
                                duration: 1.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <Spaceship className="w-40 h-20 md:w-56 md:h-28" />
                        </motion.div>

                        {/* Cinematic Light Beam */}
                        <div className="relative -mt-8 flex justify-center">
                            {/* Inner Core (Brighter, Horizontal Gradient) */}
                            <motion.div
                                className="absolute top-0 w-[140px] md:w-[220px] h-[35vh] md:h-[45vh] origin-top"
                                initial={{ scaleY: 0, opacity: 0 }}
                                whileInView={{ scaleY: 1, opacity: 1 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
                                style={{
                                    background: "radial-gradient(ellipse at top, var(--accent) 0%, transparent 80%)",
                                    clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
                                    maskImage: "linear-gradient(to bottom, black 10%, transparent 95%), linear-gradient(to right, transparent 0%, black 50%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 95%), linear-gradient(to right, transparent 0%, black 50%, transparent 100%)",
                                    maskComposite: "intersect",
                                    WebkitMaskComposite: "source-in",
                                    filter: "blur(15px)"
                                }}
                            />

                            {/* Outer Glow (Atmospheric, Wide Horizontal Falloff) */}
                            <motion.div
                                className="w-[300px] md:w-[500px] h-[40vh] md:h-[50vh] origin-top"
                                initial={{ scaleY: 0, opacity: 0 }}
                                whileInView={{ scaleY: 1, opacity: 1 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 1.7 }}
                                style={{
                                    background: "radial-gradient(ellipse at top, var(--accent) 0%, transparent 70%)",
                                    clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
                                    maskImage: "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to right, transparent 10%, black 50%, transparent 90%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to right, transparent 10%, black 50%, transparent 90%)",
                                    maskComposite: "intersect",
                                    WebkitMaskComposite: "source-in",
                                    opacity: 0.4,
                                    filter: "blur(40px)"
                                }}
                            />

                            {/* Volumetric Flickering Effect */}
                            <motion.div
                                className="absolute top-0 w-full h-full bg-accent/5 blur-[80px]"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                )}
                <FuzzyText
                    baseIntensity={0.6}
                    hoverIntensity={1.0}
                    fuzzRange={40}
                    fontSize="clamp(6rem, 20vw, 15rem)"
                    fontWeight={900}
                    color="#FFFFFF"
                    letterSpacing={-8}
                >
                    404
                </FuzzyText>
                <FuzzyText
                    baseIntensity={0.4}
                    hoverIntensity={0.7}
                    fuzzRange={20}
                    fontSize="clamp(1.5rem, 5vw, 3rem)"
                    fontWeight={400}
                    color="#FFFFFF"
                    letterSpacing={-1}
                    className="-mt-12 md:-mt-20"
                >
                    not found
                </FuzzyText>
            </div>
        </section>
    );
}
