"use client";

import { useReducedMotion } from "framer-motion";

const partners = [
  { icon: "✧", name: "Tech Partners" },
  { icon: "◈", name: "Platform Partners" },
  { icon: "✳", name: "Community Partners" },
];

export default function Sponsors() {
  const reducedMotion = useReducedMotion();
  const loop = [...partners, ...partners];

  return (
    <section className="sponsors bg-transparent" aria-labelledby="sponsors-title">
      <div className="sponsors__heading">
        <p className="eyebrow">Magic multiplies when shared</p>
        <h2 id="sponsors-title">Alliances of the <span>Dark Realm</span></h2>
      </div>
      <div className="sponsors__track !backdrop-blur-2xl" aria-label="Our partner communities">
        <div className={`sponsors__marquee${reducedMotion ? " sponsors__marquee--still" : ""}`}>
          <div className="sponsors__group">
            {loop.map((partner, index) => (
              <div className="sponsors__partner" key={`${partner.name}-${index}`} aria-hidden={index >= partners.length}>
                <span className="sponsors__icon" aria-hidden="true">{partner.icon}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
          {!reducedMotion && <div className="sponsors__group" aria-hidden="true">
            {loop.map((partner, index) => (
              <div className="sponsors__partner" key={`loop-${partner.name}-${index}`}>
                <span className="sponsors__icon" aria-hidden="true">{partner.icon}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </section>
  );
}
