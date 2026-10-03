"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

const symbols = [
  { text: "{ }", className: "preloader__token--one" },
  { text: "< />", className: "preloader__token--two" },
  { text: "=>", className: "preloader__token--three" },
  { text: "♠", className: "preloader__token--four" },
  { text: "0101", className: "preloader__token--five" },
  { text: "♦", className: "preloader__token--six" },
  { text: "function()", className: "preloader__token--seven" },
  { text: "♣", className: "preloader__token--eight" },
  { text: "λ", className: "preloader__token--nine" },
  { text: "♥", className: "preloader__token--ten" },
];

export default function Preloader() {
  const preloaderRef = useRef(null);
  const holeRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const preloader = preloaderRef.current;
    const hole = holeRef.current;
    if (!preloader || !hole) return undefined;

    if (reducedMotion) {
      preloader.style.display = "none";
      return undefined;
    }

    const reveal = { radius: 0 };
    const updateReveal = () => {
      preloader.style.setProperty("--portal-radius", `${reveal.radius}px`);
    };
    const context = gsap.context(() => {
      const pieces = gsap.utils.toArray("[data-rabbit-piece]", preloader);
      const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 0.78;
      gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          preloader.style.display = "none";
        },
      })
        .fromTo(pieces,
          { y: 0, opacity: 0.95, scale: 1, rotate: 0 },
          {
            y: () => -window.innerHeight * 1.2,
            opacity: 0,
            scale: 0.22,
            rotate: () => gsap.utils.random(-80, 80),
            duration: 3.5,
            stagger: { each: 0.08, from: "random" },
            ease: "power2.in",
          },
        )
        .to(hole, { scale: 3.2, duration: 0.7, ease: "power3.in" }, "<")
        .to(reveal, {
          radius: maxRadius,
          duration: 1.15,
          ease: "power4.in",
          onUpdate: updateReveal,
        }, ">-0.05");
    }, preloader);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div className="preloader fixed inset-0 z-[9999]" ref={preloaderRef} aria-hidden="true">
      <div className="preloader__vignette" />
      <div className="preloader__hole" ref={holeRef}>
        <span className="preloader__hole-core" />
        <span className="preloader__hole-ring" />
      </div>
      <div className="preloader__tokens">
        {symbols.map((symbol) => (
          <span className={`preloader__token ${symbol.className}`} data-rabbit-piece key={symbol.className}>
            {symbol.text}
          </span>
        ))}
      </div>
      <p className="preloader__caption">Falling through the looking glass</p>
    </div>
  );
}
