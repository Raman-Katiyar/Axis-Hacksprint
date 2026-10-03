"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const REGISTRATION_URL = "https://unstop.com/hackathons/axis-hacksprint-20-axis-institute-of-technology-management-1760916";
const SMASH_EVENT = "axis:potion-smash";

export function triggerPotionSmash(event) {
  event.preventDefault();

  let reservedWindow = null;
  try {
    reservedWindow = window.open("about:blank", "_blank");
    if (reservedWindow) {
      reservedWindow.document.title = "Opening Axis HackSprint registration";
      reservedWindow.document.body.textContent = "Summoning the registration portal...";
      reservedWindow.document.body.style.cssText = "margin:0;padding:2rem;background:#08040d;color:#fff;font:600 16px sans-serif;text-align:center";
      reservedWindow.opener = null;
    }
  } catch {
    reservedWindow = null;
  }

  const x = event.clientX || window.innerWidth / 2;
  const y = event.clientY || window.innerHeight / 2;
  const farthestCorner = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const scale = farthestCorner / 72 * 1.35;

  window.dispatchEvent(new CustomEvent(SMASH_EVENT, {
    detail: { x, y, scale, reservedWindow, id: `${Date.now()}-${Math.random()}` },
  }));
}

export default function PotionSmash() {
  const [smash, setSmash] = useState(null);
  const timerRef = useRef(null);
  const reservedWindowRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function handleSmash(event) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (reservedWindowRef.current && !reservedWindowRef.current.closed) {
        reservedWindowRef.current.close();
      }

      const nextSmash = event.detail;
      reservedWindowRef.current = nextSmash.reservedWindow;
      setSmash(nextSmash);
      timerRef.current = window.setTimeout(() => {
        let openedWindow = null;
        try {
          openedWindow = window.open(REGISTRATION_URL, "_blank");
        } catch {
          openedWindow = null;
        }

        if (openedWindow) {
          openedWindow.opener = null;
          if (reservedWindowRef.current && !reservedWindowRef.current.closed) {
            reservedWindowRef.current.close();
          }
        } else if (reservedWindowRef.current && !reservedWindowRef.current.closed) {
          reservedWindowRef.current.location.replace(REGISTRATION_URL);
        } else {
          window.location.assign(REGISTRATION_URL);
        }

        reservedWindowRef.current = null;
        timerRef.current = null;
        setSmash(null);
      }, 1200);
    }

    function resetOnReturn() {
      if (document.visibilityState === "visible") setSmash(null);
    }

    window.addEventListener(SMASH_EVENT, handleSmash);
    document.addEventListener("visibilitychange", resetOnReturn);
    return () => {
      window.removeEventListener(SMASH_EVENT, handleSmash);
      document.removeEventListener("visibilitychange", resetOnReturn);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (reservedWindowRef.current && !reservedWindowRef.current.closed) reservedWindowRef.current.close();
    };
  }, []);

  return (
    <AnimatePresence>
      {smash && (
        <motion.div
          className="potion-smash fixed inset-0 z-[10001] pointer-events-none"
          key={smash.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          aria-hidden="true"
        >
          <motion.div
            className="potion-smash__burst"
            style={{ left: smash.x - 72, top: smash.y - 72 }}
            initial={{ scale: 0.05, opacity: 0.98 }}
            animate={{ scale: smash.scale, opacity: [0.98, 0.88, 0.72] }}
            transition={{ duration: reducedMotion ? 0.2 : 1.2, ease: [0.13, 0.8, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
