"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const prizes = [
  { place: "Winner", amount: "₹12,000", accent: "red", mark: "I" },
  { place: "First Runner Up", amount: "₹8,000", accent: "purple", mark: "II" },
  { place: "Second Runner Up", amount: "₹5,000", accent: "red", mark: "III" },
];

function PrizeCard({ prize, reducedMotion }) {
  return (
    <motion.article
      className={`prize-tier landing-spot prize-tier--${prize.accent} !backdrop-blur-2xl`}
      whileHover={reducedMotion ? undefined : { scale: 1.05, y: -5 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
    >
      <span className="prize-tier__mark" aria-hidden="true">{prize.mark}</span>
      <div>
        <p className="prize-tier__place">{prize.place}</p>
        <h3>{prize.amount} <span>CASH</span></h3>
      </div>
      <span className="prize-tier__spark" aria-hidden="true">✦</span>
    </motion.article>
  );
}

export default function Prizes() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="prizes scroll-mt-20 bg-transparent" id="prizes" aria-labelledby="prizes-title">
      <div className="prizes__flare" aria-hidden="true" />
      <div className="prizes__inner">
        <header className="prizes__header">
          <p className="eyebrow">Fortune opens for the fearless</p>
          <h2 className="landing-spot" id="prizes-title">The Loot <span>Vault</span></h2>
          <p className="prizes__lede">Three winning teams. One glittering hoard. A total prize pool of <strong>₹25,000</strong>.</p>
        </header>

        <div className="prizes__layout">
          <div className="prizes__winner">
            <PrizeCard prize={prizes[0]} reducedMotion={reducedMotion} />
          </div>
          <div className="prizes__chest landing-spot" aria-label="Treasure chest prize illustration">
            <div className="prizes__chest-glow" aria-hidden="true" />
            <Image
              className="prizes__chest-image"
              src="/treasure-chest.png"
              alt="A magical treasure chest overflowing with glowing coins, potions, and gems"
              width={1536}
              height={1024}
              sizes="(max-width: 720px) 92vw, 38vw"
              unoptimized
            />
            <span className="prizes__chest-total">₹25,000 <small>PRIZE POOL</small></span>
          </div>
          <div className="prizes__runners">
            <PrizeCard prize={prizes[1]} reducedMotion={reducedMotion} />
            <PrizeCard prize={prizes[2]} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
