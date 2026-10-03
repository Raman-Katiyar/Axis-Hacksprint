"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CinematicPreloader() {
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const reducedMotion = useReducedMotion();

  function handleEnterClick() {
    if (isZooming) return;
    setIsZooming(true);
    window.setTimeout(() => setIsPlaying(true), 1200);
  }

  function handleVideoEnded() {
    setIsEntered(true);
    setIsPlaying(false);
  }

  return (
    <motion.div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black ${isEntered ? "pointer-events-none" : "pointer-events-auto"}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isEntered ? 0 : 1 }}
      transition={{ duration: 1 }}
      aria-hidden={isEntered}
    >
      {!isPlaying && !isEntered && (
        <div className="fixed inset-0 z-[10000] flex h-full w-full flex-col items-center justify-end overflow-hidden pb-16 md:pb-24">
          <motion.div
            className="absolute inset-0 bg-[url('/spooky-pumpkin.png')] bg-cover bg-center bg-no-repeat"
            animate={isZooming ? { scale: 12, opacity: 0 } : { scale: 1, opacity: 1 }}
            style={{ transformOrigin: "center center" }}
            transition={{ duration: 1.2, ease: "easeIn" }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
            animate={{ opacity: isZooming ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
          <motion.button
            type="button"
            className="relative z-10 max-w-[calc(100vw-2rem)] cursor-pointer rounded-full border border-pink-500/80 bg-black/60 px-6 py-4 text-center text-lg font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10 sm:text-xl md:text-2xl"
            onClick={handleEnterClick}
            animate={{
              scale: isZooming || reducedMotion ? 1 : [1, 1.05, 1],
              opacity: isZooming ? 0 : 1,
              boxShadow: reducedMotion || isZooming
                ? "0px 0px 10px #ff0055"
                : ["0px 0px 10px #ff0055", "0px 0px 30px #ff0055", "0px 0px 10px #ff0055"],
            }}
            transition={isZooming
              ? { duration: 0.3 }
              : reducedMotion
                ? { duration: 0 }
                : { duration: 1.5, repeat: Infinity }}
          >
            DARE TO ENTER
          </motion.button>
        </div>
      )}

      {isPlaying && (
        <video
          className="h-full w-full object-cover"
          src="/wizard-spell.mp4"
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
        />
      )}
    </motion.div>
  );
}