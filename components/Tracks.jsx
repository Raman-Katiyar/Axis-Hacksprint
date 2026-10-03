"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tracks = [
  {
    id: "ai-ml",
    title: "Sorcery of AI & ML",
    field: "AI & Machine Learning",
    icon: "✧",
    description: "Teach a machine to reason, imagine, and uncover patterns hidden in plain sight.",
    accent: "rose",
  },
  {
    id: "cyber-security",
    title: "Fortress of Cyber Security",
    field: "Cyber Security",
    icon: "⌑",
    description: "Raise new defenses against digital threats and protect the realms we depend on.",
    accent: "violet",
  },
  {
    id: "blockchain",
    title: "Immutable Blockchain Artifacts",
    field: "Blockchain Technology",
    icon: "◈",
    description: "Forge transparent systems, verifiable ownership, and trust without a gatekeeper.",
    accent: "rose",
  },
  {
    id: "agritech",
    title: "Flora & AgriTech Magic",
    field: "Agriculture / AgriTech",
    icon: "❋",
    description: "Give growers clever new ways to nurture crops, conserve resources, and flourish.",
    accent: "violet",
  },
  {
    id: "healthtech",
    title: "Potions & HealthTech",
    field: "Healthcare / HealthTech",
    icon: "⚕",
    description: "Make care more human with thoughtful tools for healthier lives and communities.",
    accent: "rose",
  },
  {
    id: "gamification",
    title: "Grimoires of Gamification",
    field: "Gamification & EdTech",
    icon: "♜",
    description: "Turn learning into a quest, and transform small moments into lasting progress.",
    accent: "violet",
  },
];

const dust = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 9) % 100}%`,
  top: `${(index * 53 + 6) % 100}%`,
  delay: `${(index % 7) * -0.8}s`,
  duration: `${7 + (index % 5)}s`,
}));

function TrackCard({ track, index, reducedMotion }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, glareX: 50, glareY: 50 });

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  function handlePointerMove(event) {
    if (reducedMotion || event.pointerType === "touch" || !cardRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerRef.current = {
      x: (x - 0.5) * 14,
      y: (0.5 - y) * 12,
      glareX: x * 100,
      glareY: y * 100,
    };

    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const pointer = pointerRef.current;
      card.style.setProperty("--tilt-x", `${pointer.x}deg`);
      card.style.setProperty("--tilt-y", `${pointer.y}deg`);
      card.style.setProperty("--glare-x", `${pointer.glareX}%`);
      card.style.setProperty("--glare-y", `${pointer.glareY}%`);
      card.style.setProperty("--glare-opacity", "1");
      frameRef.current = null;
    });
  }

  function resetPointer() {
    if (!cardRef.current) return;
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
    cardRef.current.style.setProperty("--glare-opacity", "0");
  }

  return (
    <motion.div
      className="track-reveal"
      initial={reducedMotion ? false : { opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.07, ease: [0.2, 0.75, 0.25, 1] }}
    >
      <article
        ref={cardRef}
        className={`track-card landing-spot track-card--${track.accent} !backdrop-blur-2xl`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        aria-labelledby={`track-title-${track.id}`}
      >
        <div className="track-card__topline">
          <span className="track-card__index">REALM 0{index + 1}</span>
          <span className="track-card__icon" aria-hidden="true">{track.icon}</span>
        </div>
        <h3 id={`track-title-${track.id}`}>{track.title}</h3>
        <p className="track-card__field">{track.field}</p>
        <p className="track-card__description">{track.description}</p>
        <div className="track-card__footer">
          <span>Software only</span>
          <span aria-hidden="true">↗</span>
        </div>
      </article>
    </motion.div>
  );
}

export default function Tracks() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="tracks scroll-mt-20 bg-transparent" id="tracks" aria-labelledby="tracks-title">
      <div className="tracks__dust" aria-hidden="true">
        {dust.map((particle) => (
          <span
            className="tracks__particle"
            key={particle.id}
            style={{
              "--particle-x": particle.left,
              "--particle-y": particle.top,
              "--particle-delay": particle.delay,
              "--particle-duration": particle.duration,
            }}
          />
        ))}
      </div>
      <div className="tracks__inner">
        <motion.header
          className="tracks__header"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.65 }}
        >
          <p className="eyebrow">Choose your curious craft</p>
          <h2 id="tracks-title">Enchanted Realms<br /><span>of Innovation</span></h2>
          <p className="tracks__lede">Six software-only realms. One impossible idea. Pick the magic your team wants to make real.</p>
        </motion.header>
        <div className="tracks__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
