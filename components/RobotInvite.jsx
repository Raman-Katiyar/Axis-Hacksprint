"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "axis-hacksprint-robot-invite-shown";
const INVITATION =
  "Still thinking? Register for Axis HackSprint now. Build bold ideas, meet brilliant minds, and make your mark. Your next big idea starts here!";

function InviteRobot() {
  return (
    <svg className="robot-invite__robot-art" viewBox="0 0 190 270" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="invite-shell" x1="54" y1="58" x2="147" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F3FF" />
          <stop offset=".34" stopColor="#AAA9C9" />
          <stop offset="1" stopColor="#46425F" />
        </linearGradient>
        <linearGradient id="invite-panel" x1="70" y1="80" x2="136" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="#182D4A" />
          <stop offset="1" stopColor="#151126" />
        </linearGradient>
        <linearGradient id="invite-core" x1="90" y1="144" x2="120" y2="196" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7EF9FF" />
          <stop offset="1" stopColor="#B026FF" />
        </linearGradient>
        <filter id="invite-glow" x="15" y="13" width="169" height="257" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <ellipse cx="101" cy="251" rx="43" ry="8" fill="#A32BFF" opacity=".45" filter="url(#invite-glow)" />
      <path d="M99 45V29" stroke="#C9C5E6" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 26h14" stroke="#FF477E" strokeWidth="5" strokeLinecap="round" />
      <circle cx="99" cy="24" r="9" fill="#FF477E" fillOpacity=".2" />
      <path d="M57 77H43v31h15m82-31h14v31h-15" fill="#625C78" stroke="#D5D5E7" strokeWidth="4" />
      <rect x="54" y="48" width="91" height="92" rx="27" fill="url(#invite-shell)" stroke="#F0EDFF" strokeWidth="3" />
      <rect x="65" y="65" width="69" height="49" rx="15" fill="url(#invite-panel)" stroke="#65E9FF" strokeOpacity=".72" strokeWidth="2" />
      <path d="M79 88h8m24 0h8" stroke="#8BFAFF" strokeWidth="9" strokeLinecap="round" />
      <path d="M84 102q10 8 20 0" stroke="#FF9CC9" strokeWidth="3" strokeLinecap="round" />
      <path d="m84 140-7 13m37-13 7 13" stroke="#D5D5E7" strokeWidth="8" strokeLinecap="round" />
      <path d="M67 155q0-9 9-9h49q9 0 9 9v57H67v-57Z" fill="url(#invite-shell)" stroke="#E7E4F4" strokeWidth="3" />
      <path d="M82 162h37v34H82z" fill="#28223A" stroke="#AAB2D5" strokeWidth="2" />
      <path d="m100.5 167 11 17h-22l11-17Z" fill="url(#invite-core)" />
      <path d="M67 159 48 178l-7-23m95 4 19 19 7-23" stroke="#CFCEE1" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m38 151-5 5m5-5 7 3m108-1 5 5m-5-5-7 3" stroke="#F1F3FF" strokeWidth="4" strokeLinecap="round" />
      <path className="robot-invite__leg robot-invite__leg--left" d="m85 212-6 29" stroke="#AAA9C9" strokeWidth="13" strokeLinecap="round" />
      <path className="robot-invite__leg robot-invite__leg--right" d="m113 212 6 29" stroke="#AAA9C9" strokeWidth="13" strokeLinecap="round" />
      <path d="M68 247h20m24 0h20" stroke="#FF6EA7" strokeWidth="9" strokeLinecap="round" />
      <path d="M80 224h39" stroke="#66EEFF" strokeOpacity=".62" strokeWidth="2" />
      <circle cx="99" cy="183" r="4" fill="#FFF" fillOpacity=".8" />
    </svg>
  );
}

export default function RobotInvite() {
  const [phase, setPhase] = useState("idle");
  const [entranceOffset, setEntranceOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const phaseRef = useRef("idle");
  const convoyRef = useRef(null);
  const holdTimerRef = useRef(null);
  const speechRef = useRef(null);

  const changePhase = useCallback((nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    speechRef.current = null;
  }, []);

  const leaveScreen = useCallback(() => {
    if (phaseRef.current !== "holding") return;
    clearHoldTimer();
    stopSpeech();
    changePhase("exiting");
  }, [changePhase, clearHoldTimer, stopSpeech]);

  const startInvitation = useCallback(() => {
    if (phaseRef.current !== "idle" || !convoyRef.current) return;

    const viewportWidth = window.innerWidth;
    const convoyWidth = convoyRef.current.getBoundingClientRect().width;
    setEntranceOffset(viewportWidth + convoyWidth + 48);
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    changePhase("entering");
  }, [changePhase]);

  const handleEntranceComplete = useCallback(() => {
    if (phaseRef.current !== "entering") return;
    changePhase("holding");

    let speechStarted = false;
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      const utterance = new SpeechSynthesisUtterance(INVITATION);
      utterance.lang = "en-IN";
      utterance.rate = 1.08;
      const englishVoice = window.speechSynthesis
        .getVoices()
        .find((voice) => voice.lang.toLowerCase().startsWith("en-in"))
        ?? window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("en-"));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.onend = leaveScreen;
      utterance.onerror = leaveScreen;
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      speechStarted = true;
    }

    holdTimerRef.current = window.setTimeout(leaveScreen, speechStarted ? 7800 : 6800);
  }, [changePhase, leaveScreen]);

  const handleConvoyAnimationComplete = useCallback(() => {
    if (phaseRef.current === "entering") handleEntranceComplete();
    if (phaseRef.current === "exiting") changePhase("finished");
  }, [changePhase, handleEntranceComplete]);

  useEffect(() => {
    if (prefersReducedMotion || window.sessionStorage.getItem(STORAGE_KEY) === "true" || window.scrollY > 0) {
      return undefined;
    }

    let cancelled = false;
    let timerId = null;
    let visibilityObserver = null;
    const cancelForScroll = () => {
      cancelled = true;
      if (timerId !== null) window.clearTimeout(timerId);
    };
    const startIdleTimer = () => {
      if (cancelled || timerId !== null || document.visibilityState !== "visible") return;
      timerId = window.setTimeout(() => {
        timerId = null;
        if (!cancelled && document.visibilityState === "visible") startInvitation();
      }, 3000);
    };
    const observeSiteReveal = () => {
      if (!document.documentElement.classList.contains("axis-hacksprint-entered")) return false;
      if (visibilityObserver) visibilityObserver.disconnect();
      startIdleTimer();
      return true;
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") observeSiteReveal();
    };

    window.addEventListener("scroll", cancelForScroll, { passive: true, once: true });
    document.addEventListener("visibilitychange", resumeWhenVisible);
    if (!observeSiteReveal()) {
      visibilityObserver = new MutationObserver(observeSiteReveal);
      visibilityObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }
    return () => {
      cancelled = true;
      if (timerId !== null) window.clearTimeout(timerId);
      visibilityObserver?.disconnect();
      window.removeEventListener("scroll", cancelForScroll);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, [prefersReducedMotion, startInvitation]);

  useEffect(() => () => {
    clearHoldTimer();
    stopSpeech();
  }, [clearHoldTimer, stopSpeech]);

  return (
    <motion.div
      ref={convoyRef}
      className={`robot-invite robot-invite--${phase}`}
      initial={{ x: "-110vw" }}
      animate={{ x: phase === "entering" || phase === "holding" ? 0 : phase === "exiting" ? -entranceOffset : "-110vw" }}
      transition={{ duration: phase === "exiting" ? 2.8 : 2.65, ease: phase === "exiting" ? [0.55, 0, 1, 0.45] : [0.16, 1, 0.3, 1] }}
      onAnimationComplete={handleConvoyAnimationComplete}
      aria-hidden={phase === "idle" || phase === "finished"}
      role="region"
      aria-label="Axis HackSprint registration invitation"
    >
      <motion.div
        className="robot-invite__banner"
        initial={{ scaleX: 1, opacity: 1 }}
        animate={phase === "exiting" ? { scaleX: 0.04, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: phase === "exiting" ? 0.15 : 0, ease: "easeInOut" }}
      >
        <div className="robot-invite__banner-lines" aria-hidden="true" />
        <div className="robot-invite__copy">
          <p className="robot-invite__eyebrow"><span /> AXIS HACKSPRINT 2.0 <span /></p>
          <h2>Still thinking?</h2>
          <p className="robot-invite__message">
            Build bold ideas. Meet brilliant minds. Make your mark.
          </p>
          <p className="robot-invite__date">ONE NIGHT. ENDLESS POSSIBILITIES. <i /> 17 OCT 2026</p>
          <a
            className="robot-invite__cta"
            href="https://unstop.com/hackathons/axis-hacksprint-20-axis-institute-of-technology-management-1760916"
            target="_blank"
            rel="noopener noreferrer"
          >
            REGISTER NOW <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>
      <div className={`robot-invite__figure robot-invite__figure--${phase}`} aria-hidden="true">
        <span className="robot-invite__speech" aria-hidden="true"><i /><i /><i /></span>
        <InviteRobot />
      </div>
    </motion.div>
  );
}
