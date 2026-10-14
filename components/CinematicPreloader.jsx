"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import TechCompanions from "./TechCompanions";

const SITE_REVEAL_LEAD_TIME = 0.5;

function drawBackdropFrame(video, canvas) {
  if (!canvas || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;

  const width = Math.min(video.videoWidth, 960);
  const height = Math.round(video.videoHeight * (width / video.videoWidth));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  canvas.getContext("2d")?.drawImage(video, 0, 0, width, height);
}

export default function CinematicPreloader() {
  const pathname = usePathname();
  const [isEntered, setIsEntered] = useState(false);
  const [stage, setStage] = useState("ready");
  const [playbackError, setPlaybackError] = useState("");
  const introVideoRef = useRef(null);
  const backdropCanvasRef = useRef(null);
  const introRevealStartedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  function handleEnterClick() {
    if (stage !== "ready") return;

    setPlaybackError("");
    introRevealStartedRef.current = false;
    setStage("inshot");
    const video = introVideoRef.current;
    if (!video) {
      setPlaybackError("The InShot video is unavailable. Please try again.");
      setStage("ready");
      return;
    }

    video.currentTime = 0;
    video.play().catch(() => {
      setPlaybackError("The InShot video could not be played. Please try again.");
      setStage("ready");
    });
  }

  function handleIntroEnded() {
    if (introRevealStartedRef.current) return;

    introRevealStartedRef.current = true;
    window.sessionStorage.setItem("axis-hacksprint-entered", "true");
    setIsEntered(true);
  }

  function handleIntroTimeUpdate(event) {
    const video = event.currentTarget;
    drawBackdropFrame(video, backdropCanvasRef.current);
    if (video.duration - video.currentTime <= SITE_REVEAL_LEAD_TIME) handleIntroEnded();
  }

  function handleRetry() {
    setPlaybackError("");
    if (stage === "ready") {
      handleEnterClick();
      return;
    }

    const video = introVideoRef.current;
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
    const video = introVideoRef.current;
    const canvas = backdropCanvasRef.current;
    if (!video || !canvas) return undefined;

    const updateBackdrop = () => drawBackdropFrame(video, canvas);
    if (video.readyState >= 2) {
      updateBackdrop();
    } else {
      video.addEventListener("loadeddata", updateBackdrop);
    }

    return () => video.removeEventListener("loadeddata", updateBackdrop);
  }, []);

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
      transition={{ duration: reducedMotion ? 0.35 : SITE_REVEAL_LEAD_TIME, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isEntered) {
          document.documentElement.classList.add("axis-hacksprint-entered");
          introVideoRef.current?.pause();
        }
      }}
      aria-hidden={isEntered}
    >
      {(!isEntered || stage === "inshot") && (
        <>
          <canvas
            ref={backdropCanvasRef}
            className={`absolute inset-0 z-[1] h-full w-full scale-110 object-cover blur-3xl transition-opacity duration-500 ease-in-out ${isEntered ? "opacity-0" : "opacity-60"}`}
            aria-hidden="true"
          />
          <video
            ref={introVideoRef}
            className={`absolute left-1/2 top-1/2 z-[2] h-auto w-auto max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-500 ease-in-out ${isEntered ? "pointer-events-none opacity-0" : "opacity-100"}`}
            src="/InShot_20261015_010452538.mp4"
            playsInline
            preload="auto"
            aria-hidden="true"
            onTimeUpdate={handleIntroTimeUpdate}
            onEnded={handleIntroEnded}
            onError={() => handleVideoError("InShot")}
          />
          <TechCompanions intro />
          {stage === "ready" && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20"
              aria-hidden="true"
            />
          )}
          {stage === "ready" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-4">
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
                Enter the Wonderland
              </motion.button>
            </div>
          )}
          {stage !== "ready" && !playbackError && (
            <p className="sr-only" aria-live="polite">
              The InShot video is playing.
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