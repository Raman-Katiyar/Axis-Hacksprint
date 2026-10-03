"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phases = [
  {
    number: "01",
    name: "Online Idea Submission",
    title: "The Invitation",
    icon: "📖",
    date: "17 Oct 2026 · 11:59 PM IST",
    description: "Send your spellbound solution as a six-slide PDF. Keep the idea sharp, the story clear, and the magic entirely your own.",
    detail: "Requirement: 6-slide PDF",
    side: "left",
  },
  {
    number: "02",
    name: "The Oracle's Verdict",
    title: "The Choosing",
    icon: "🔮",
    date: "20 Oct 2026",
    description: "The oracle studies every submission and names the teams ready to enter the next realm.",
    detail: "Top 60 teams shortlisted",
    side: "right",
  },
  {
    number: "03",
    name: "The Grand Ritual",
    title: "Twelve Hours Beyond",
    icon: "🏰",
    date: "3 Nov 2026 · 07:00 AM",
    description: "Meet us on campus for a twelve-hour finale. Bring your team, your courage, and a laptop charged for adventure.",
    detail: "AITM Campus, Axis Colleges, Kanpur",
    side: "left",
  },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const shadowPathRef = useRef(null);
  const orbRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ isMobile: "(max-width: 720px)" }, (context) => {
      const { isMobile } = context.conditions;
      const desktopPath = "M 500 0 C 500 180 390 170 500 390 S 610 570 500 790 S 390 980 500 1200";
      const mobilePath = "M 270 0 C 270 180 235 170 270 390 S 305 570 270 790 S 235 980 270 1200";
      const activePath = isMobile ? mobilePath : desktopPath;
      pathRef.current?.setAttribute("d", activePath);
      shadowPathRef.current?.setAttribute("d", activePath);

      gsap.set(orbRef.current, { clearProps: "transform" });
      gsap.to(orbRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          end: "bottom 72%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => media.revert();
  }, [reducedMotion]);

  return (
    <section className="timeline scroll-mt-20 bg-transparent" id="timeline" ref={sectionRef} aria-labelledby="timeline-title">
      <div className="timeline__ambience" aria-hidden="true" />
      <svg className="timeline__path" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="orb-glow" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path className="timeline__path-shadow" ref={shadowPathRef} d="M 500 0 C 500 180 390 170 500 390 S 610 570 500 790 S 390 980 500 1200" />
        <path className="timeline__path-line" ref={pathRef} d="M 500 0 C 500 180 390 170 500 390 S 610 570 500 790 S 390 980 500 1200" />
        <g className="timeline__orb" ref={orbRef} filter="url(#orb-glow)">
          <circle className="timeline__orb-aura" cx="0" cy="0" r="28" />
          <circle className="timeline__orb-core" cx="0" cy="0" r="9" />
        </g>
      </svg>

      <div className="timeline__inner">
        <motion.header
          className="timeline__header"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.65 }}
        >
          <p className="eyebrow">Follow the signs. Trust no clock.</p>
          <h2 id="timeline-title">The Rabbit Hole<br /><span>Journey</span></h2>
          <p className="timeline__lede">Three turns in the tale. Each one takes your team somewhere stranger.</p>
        </motion.header>

        <ol className="timeline__list">
          {phases.map((phase, index) => {
            const fromX = phase.side === "left" ? -90 : 90;
            return (
              <li className={`timeline__item timeline__item--${phase.side}`} key={phase.number}>
                <span className="timeline__node" aria-hidden="true">
                  <span>{phase.number}</span>
                </span>
                <motion.article
                  className="timeline-card !backdrop-blur-2xl"
                  initial={reducedMotion ? false : { opacity: 0, x: fromX, scale: 0.86, rotateY: phase.side === "left" ? -12 : 12 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", bounce: 0.5, duration: reducedMotion ? 0 : 0.95, delay: reducedMotion ? 0 : index * 0.08 }}
                >
                  <div className="timeline-card__topline">
                    <span>PHASE {phase.number}</span>
                    <span className="timeline-card__icon" aria-hidden="true">{phase.icon}</span>
                  </div>
                  <p className="timeline-card__title">{phase.title}</p>
                  <h3>{phase.name}</h3>
                  <p className="timeline-card__date">{phase.date}</p>
                  <p className="timeline-card__description">{phase.description}</p>
                  <div className="timeline-card__detail">{phase.detail}</div>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
