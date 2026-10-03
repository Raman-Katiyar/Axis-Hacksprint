"use client";

import { motion, useReducedMotion } from "framer-motion";

const rules = [
  {
    number: "I",
    title: "Make it during the hours",
    text: "All development work must happen during the hackathon. Pre-built software solutions and templates are strictly prohibited.",
    seal: "THE WORK IS YOURS",
  },
  {
    number: "II",
    title: "Leave a public trail",
    text: "Push your project to a public GitHub repository. Regular commit activity will be monitored throughout the offline hackathon.",
    seal: "EVERY SPELL, RECORDED",
  },
  {
    number: "III",
    title: "Honor the final word",
    text: "The decisions of the organizing committee and panel of judges are final and binding.",
    seal: "THE ORACLE HAS SPOKEN",
  },
];

export default function Rules() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="rules scroll-mt-20 bg-transparent" id="rules" aria-labelledby="rules-title">
      <div className="rules__inner">
        <motion.header
          className="rules__header"
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reducedMotion ? 0 : 0.65 }}
        >
          <p className="eyebrow">Break none. Bend none.</p>
          <h2 className="landing-spot" id="rules-title">The Sacred Laws<br /><span>of the Coven</span></h2>
          <p>Before the doors open, know the laws that keep this magic fair.</p>
        </motion.header>

        <div className="rules__grid">
          {rules.map((rule, index) => (
            <motion.article
              className="rules-tablet-wrap"
              key={rule.number}
              initial={reducedMotion ? false : { opacity: 0, y: -110, rotateX: 22, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", bounce: 0.52, duration: reducedMotion ? 0 : 1.05, delay: reducedMotion ? 0 : index * 0.16 }}
            >
              <div className="rules-tablet landing-spot !backdrop-blur-2xl">
                <div className="rules-tablet__header">
                  <span className="rules-tablet__number">LAW {rule.number}</span>
                  <span className="rules-tablet__sigil" aria-hidden="true">✦</span>
                </div>
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
                <div className="rules-tablet__seal">
                  <span aria-hidden="true">✳</span>
                  {rule.seal}
                  <span aria-hidden="true">✳</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
