"use client";

import { motion, useReducedMotion } from "framer-motion";

const organizers = [
  {
    name: "Prashant Umrao",
    email: "prashantumrao4242@gmail.com",
    phone: "+916307437399",
    sigil: "I",
  },
  {
    name: "Harsh Mishra",
    email: "harshmishra200529@gmail.com",
    phone: "+919140151925",
    sigil: "II",
  },
];

export default function Organizers() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="organizers bg-transparent" id="oracle-council" aria-labelledby="organizers-title">
      <div className="organizers__inner">
        <motion.header
          className="organizers__header"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          <p className="eyebrow">Questions from beyond?</p>
          <h2 id="organizers-title">Summon the <span>Oracle Council</span></h2>
          <p>Two keepers of the realm, ready to guide your team through the unknown.</p>
        </motion.header>

        <div className="organizers__grid">
          {organizers.map((organizer, index) => (
            <motion.article
              className="organizer-card !backdrop-blur-2xl"
              key={organizer.email}
              initial={reducedMotion ? false : { opacity: 0, y: 36, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 150, damping: 17, delay: reducedMotion ? 0 : index * 0.12 }}
              whileHover={reducedMotion ? undefined : { y: -15, scale: 1.035 }}
            >
              <div className="organizer-card__top">
                <span className="organizer-card__sigil">COUNCIL {organizer.sigil}</span>
                <span className="organizer-card__crystal" aria-hidden="true">◈</span>
              </div>
              <h3>{organizer.name}</h3>
              <div className="organizer-card__contact">
                <a href={`mailto:${organizer.email}`}>
                  <span className="organizer-card__contact-icon" aria-hidden="true">▤</span>
                  <span><small>Send a scroll</small>{organizer.email}</span>
                  <span className="organizer-card__arrow" aria-hidden="true">↗</span>
                </a>
                <a href={`tel:${organizer.phone}`}>
                  <span className="organizer-card__contact-icon" aria-hidden="true">◉</span>
                  <span><small>Crystal call</small>{organizer.phone}</span>
                  <span className="organizer-card__arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
