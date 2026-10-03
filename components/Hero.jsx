"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { triggerPotionSmash } from "@/components/PotionSmash";

const DEADLINE = Date.UTC(2026, 9, 17, 18, 29, 0);

function getTimeLeft() {
  const remaining = Math.max(0, DEADLINE - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return { days, hours, minutes, seconds };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const initialUpdate = window.setTimeout(() => setTimeLeft(getTimeLeft()), 0);
    const intervalId = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(intervalId);
    };
  }, []);

  const units = [
    { key: "days", label: "Days", rune: "✦" },
    { key: "hours", label: "Hours", rune: "◈" },
    { key: "minutes", label: "Minutes", rune: "✧" },
    { key: "seconds", label: "Seconds", rune: "✹" },
  ];

  const fallback = { days: "--", hours: "--", minutes: "--", seconds: "--" };

  return (
    <div className="countdown" aria-label="Time remaining until registration deadline">
      <div className="countdown__portal" aria-hidden="true" />
      <div className="countdown__group">
        <p className="countdown__heading">
          <span className="countdown__heading-mark" aria-hidden="true">✦</span>
          The Wanderland portal opens in
          <span className="countdown__heading-mark" aria-hidden="true">✦</span>
        </p>
        <div className="countdown__items">
          {units.map(({ key, label, rune }) => {
            const value = timeLeft ? timeLeft[key] : fallback[key];
            const number = typeof value === "number" ? String(value).padStart(2, "0") : value;

            return (
              <div className={`countdown__unit countdown__unit--${key}`} key={key}>
                <div className="countdown__unit-inner">
                  <span className="countdown__rune" aria-hidden="true">{rune}</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${key}-${number}`}
                      className="countdown__number"
                      initial={{ y: 12, opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                      animate={
                        key === "seconds"
                          ? { y: 0, opacity: 1, scale: [1, 1.06, 1], filter: "blur(0px)" }
                          : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
                      }
                      exit={{ y: -12, opacity: 0, scale: 0.96, filter: "blur(2px)" }}
                      transition={{
                        duration: key === "seconds" ? 0.42 : 0.3,
                        ease: [0.2, 0.75, 0.25, 1],
                      }}
                      aria-hidden="true"
                    >
                      {number}
                    </motion.span>
                  </AnimatePresence>
                  <span className="countdown__label">{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
  };

  const lineVariants = {
    hidden: { y: 32, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.2, 0.75, 0.25, 1] },
    },
  };

  const introMotion = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="hero scroll-mt-20 bg-transparent" id="home" aria-labelledby="hero-title">
      <div className="hero__content">
        <div className="hero__main">
          <div className="hero__copy">
            <motion.p
              className="eyebrow"
              {...introMotion}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              YOU ARE CORDIALLY INVITED TO GET LOST
            </motion.p>
            <motion.h1
              className="hero__title landing-spot"
              id="hero-title"
              variants={titleVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
            >
              <motion.span variants={lineVariants}>Axis</motion.span>
              <motion.span className="hero__title-accent" variants={lineVariants}>HackSprint</motion.span>
              <motion.span variants={lineVariants}>2.0</motion.span>
            </motion.h1>
            <motion.p
              className="hero__tagline"
              {...introMotion}
              transition={{ duration: 0.85, delay: 0.75 }}
            >
              Iterate <span>·</span> Accelerate <span>·</span> Elevate
            </motion.p>
            <motion.p
              className="hero__intro"
              {...introMotion}
              transition={{ duration: 0.85, delay: 0.95 }}
            >
              Follow the impossible idea. Build what does not exist yet. One night, one team, a wonderland of what comes next.
            </motion.p>
            <motion.div
              className="hero__actions"
              {...introMotion}
              transition={{ duration: 0.85, delay: 1.1 }}
            >
              <motion.a className="register-button" href="https://unstop.com/hackathons/axis-hacksprint-20-axis-institute-of-technology-management-1760916" target="_blank" rel="noopener noreferrer" onClick={triggerPotionSmash} whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.98 }}>
                Register Now <span aria-hidden="true">↗</span>
              </motion.a>
              <a className="secondary-button" href="#registration">Explore the event</a>
            </motion.div>
          </div>
          <motion.div
            className="hero__prize relative flex flex-col items-center justify-center"
            animate={shouldReduceMotion ? undefined : { y: [-15, 15, -15] }}
            transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Total prize pool: 25,000 rupees"
          >
            <img
              src="/prize-asset-transparent.png"
              alt="Treasure chest bursting with magical coins and gems"
              className="w-full max-w-[500px] object-contain opacity-90 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
            />
            <div className="absolute bottom-4 flex flex-col items-center rounded-2xl border border-purple-500/50 bg-black/40 px-8 py-3 text-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <span className="mb-1 text-xs uppercase tracking-[0.3em] text-pink-400">Total Prize Pool</span>
              <span className="text-3xl font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] md:text-4xl">₹25,000</span>
            </div>
          </motion.div>
        </div>

        <div className="hero__footer">
          <Countdown />
          <p className="hero__footer-note">A little madness is the price of admission.</p>
        </div>
      </div>
    </section>
  );
}
