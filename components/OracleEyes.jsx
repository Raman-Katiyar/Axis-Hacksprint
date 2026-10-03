"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const eyePairs = [
  { id: "oracle-left", side: "left", position: { top: "17%", left: "8%" } },
  { id: "oracle-right", side: "right", position: { top: "36%", right: "8%" } },
];

export default function OracleEyes() {
  const pupilsRef = useRef([]);
  const pairsRef = useRef([]);
  const [escapedEyes, setEscapedEyes] = useState(() => new Set());

  useEffect(() => {
    const pupils = pupilsRef.current;

    function trackCursor(event) {
      pupils.forEach((pupil) => {
        if (!pupil?.isConnected) return;
        const eye = pupil.parentElement;
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        gsap.to(pupil, {
          rotation: angle * 180 / Math.PI,
          x: Math.cos(angle) * 3,
          y: Math.sin(angle) * 2,
          duration: 0.1,
          overwrite: "auto",
        });
      });
    }

    window.addEventListener("mousemove", trackCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", trackCursor);
      gsap.killTweensOf(pupils);
    };
  }, []);

  function sendEyesFlying(id, index) {
    const pair = pairsRef.current[index];
    if (!pair) return;

    gsap.to(pair, {
      x: (index % 2 === 0 ? 1 : -1) * (window.innerWidth * 0.8),
      y: -window.innerHeight * 0.7,
      rotation: index % 2 === 0 ? 360 : -360,
      scale: 0.15,
      opacity: 0,
      duration: 0.9,
      ease: "power3.in",
      onComplete: () => {
        setEscapedEyes((current) => new Set(current).add(id));
      },
    });
  }

  useEffect(() => () => gsap.killTweensOf(pairsRef.current), []);

  return (
    <div className="oracle-eyes" aria-label="Hidden oracle eyes">
      {eyePairs.map((pair, pairIndex) => !escapedEyes.has(pair.id) && (
        <button
          className={`oracle-eyes__pair oracle-eyes__pair--${pair.side}`}
          key={pair.id}
          ref={(element) => { pairsRef.current[pairIndex] = element; }}
          style={pair.position}
          type="button"
          aria-label="Startle the oracle's eyes"
          onClick={() => sendEyesFlying(pair.id, pairIndex)}
        >
          {[0, 1].map((eyeIndex) => (
            <span className="oracle-eye" key={eyeIndex}>
              <span
                className="oracle-eye__pupil"
                ref={(element) => { pupilsRef.current[pairIndex * 2 + eyeIndex] = element; }}
              />
            </span>
          ))}
        </button>
      ))}
    </div>
  );
}
