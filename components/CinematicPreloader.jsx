"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CinematicPreloader() {
  const pathname = usePathname();
  const [isEntered, setIsEntered] = useState(false);
  const [stage, setStage] = useState("ready");
  const [playbackError, setPlaybackError] = useState("");
  const curtainVideoRef = useRef(null);
  const wizardVideoRef = useRef(null);
  const reducedMotion = useReducedMotion();

  function handleEnterClick() {
    if (stage !== "ready") return;
    setPlaybackError("");
    setStage("curtain");
    const video = curtainVideoRef.current;
    if (!video) {
      setPlaybackError("The curtain video is unavailable. Please try again.");
      setStage("ready");
      return;
    }

    video.play().catch(() => {
      setPlaybackError("The curtain video could not be played. Please try again.");
      setStage("ready");
    });
  }

  function handleCurtainEnded() {
    setPlaybackError("");
    setStage("wizard");
    const video = wizardVideoRef.current;
    if (!video) {
      setPlaybackError("The wizard spell video is unavailable. Please try again.");
      return;
    }

    video.play().catch(() => {
      setPlaybackError("The wizard spell video could not be played. Please try again.");
    });
  }

  function handleWizardEnded() {
    window.sessionStorage.setItem("axis-hacksprint-entered", "true");
    document.documentElement.classList.add("axis-hacksprint-entered");
    setIsEntered(true);
  }

  function handleRetry() {
    setPlaybackError("");
    if (stage === "ready") {
      handleEnterClick();
      return;
    }

    const video = stage === "curtain" ? curtainVideoRef.current : wizardVideoRef.current;
    if (!video) {
      setPlaybackError("The video is unavailable. Please try again.");
      return;
    }

    video.play().catch(() => {
      setPlaybackError("The video could not be played. Please try again.");
    });
  }

  function handleVideoError(videoName) {
    setPlaybackError(`The ${videoName} video could not be loaded. Please try again.`);
  }

  useEffect(() => {
    function skipIntro() {
      document.documentElement.classList.add("axis-hacksprint-entered");
      setIsEntered(true);
    }

    window.addEventListener("axis-hacksprint-entered", skipIntro);
    if (window.sessionStorage.getItem("axis-hacksprint-entered") === "true") {
      const frame = window.requestAnimationFrame(skipIntro);
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("axis-hacksprint-entered", skipIntro);
      };
    }

    return () => window.removeEventListener("axis-hacksprint-entered", skipIntro);
  }, [pathname]);

  return (
    <motion.div
      className={`cinematic-preloader fixed inset-0 z-[10000] flex items-center justify-center bg-black ${isEntered ? "pointer-events-none" : "pointer-events-auto"}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isEntered ? 0 : 1 }}
      transition={{ duration: 1 }}
      aria-hidden={isEntered}
    >
      {!isEntered && (
        <>
          <video
            ref={curtainVideoRef}
            className={`absolute inset-0 h-full w-full object-cover ${stage === "wizard" ? "hidden" : ""}`}
            src="/curtain.mp4"
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={handleCurtainEnded}
            onError={() => handleVideoError("curtain")}
          />
          <video
            ref={wizardVideoRef}
            className={`absolute inset-0 h-full w-full object-cover ${stage === "wizard" ? "" : "hidden"}`}
            src="/wizard-spell.mp4"
            playsInline
            preload="none"
            aria-hidden="true"
            onEnded={handleWizardEnded}
            onError={() => handleVideoError("wizard spell")}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20"
            aria-hidden="true"
          />
          {stage === "ready" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end overflow-hidden px-4 pb-16 md:pb-24">
              <motion.button
                type="button"
                className="relative z-10 max-w-[calc(100vw-2rem)] cursor-pointer rounded-full border border-pink-500/80 bg-black/60 px-6 py-4 text-center text-lg font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10 sm:text-xl md:text-2xl"
                onClick={handleEnterClick}
                animate={{
                  scale: reducedMotion ? 1 : [1, 1.05, 1],
                  boxShadow: reducedMotion
                    ? "0px 0px 10px #ff0055"
                    : ["0px 0px 10px #ff0055", "0px 0px 30px #ff0055", "0px 0px 10px #ff0055"],
                }}
                transition={reducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
              >
                OPEN THE CURTAIN
              </motion.button>
            </div>
          )}
          {stage !== "ready" && !playbackError && (
            <p className="sr-only" aria-live="polite">
              {stage === "curtain" ? "Opening the curtain." : "The wizard spell is playing."}
            </p>
          )}
          {playbackError && (
            <div className="absolute inset-x-4 bottom-10 z-20 mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-white/20 bg-black/80 p-5 text-center text-white backdrop-blur-md">
              <p role="alert">{playbackError}</p>
              <button
                type="button"
                className="cursor-pointer rounded-full border border-pink-500/80 px-6 py-3 font-bold uppercase tracking-wider hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onClick={handleRetry}
              >
                Try again
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}