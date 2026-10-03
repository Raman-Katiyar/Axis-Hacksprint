"use client";

import { motion, useReducedMotion } from "framer-motion";

const decrees = [
  { label: "Who may enter", detail: "UG, PG, and Diploma students", mark: "✦" },
  { label: "Many colleges, one table", detail: "Inter-college teams are welcome", mark: "⌘" },
  { label: "The coven size", detail: "2–4 members per team", mark: "Ⅱ" },
];

export default function Eligibility() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="eligibility bg-transparent" id="oracle-decree" aria-labelledby="eligibility-title">
      <motion.div
        className="eligibility__panel bg-black/60 !backdrop-blur-2xl"
        initial={reducedMotion ? false : { opacity: 0, y: 38, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.2, 0.75, 0.25, 1] }}
      >
        <div className="eligibility__heading">
          <p className="eyebrow">Read before you cross the threshold</p>
          <h2 id="eligibility-title">The Oracle&apos;s <span>Decree</span></h2>
          <p>Axis HackSprint 2.0 is a national-level software hackathon. The realm is open to curious minds ready to build together.</p>
        </div>
        <ul className="eligibility__list">
          {decrees.map((decree, index) => (
            <motion.li
              className="eligibility__rule"
              key={decree.label}
              initial={reducedMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
            >
              <span className="eligibility__mark" aria-hidden="true">{decree.mark}</span>
              <span>
                <strong>{decree.label}</strong>
                <small>{decree.detail}</small>
              </span>
              <span className="eligibility__arrow" aria-hidden="true">↗</span>
            </motion.li>
          ))}
        </ul>
        <div className="eligibility__seal" aria-hidden="true">AITM <span>✳</span> 2026</div>
      </motion.div>
    </section>
  );
}
