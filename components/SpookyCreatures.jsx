"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

const creatures = [
  { id: "bat-one", kind: "bat", src: "https://tenor.com/p7QdPJG7kCG.gif", fallback: "https://media.tenor.com/uez9lEwcPpgAAAAj/bats-black.gif" },
  { id: "crow-one", kind: "crow", src: "https://tenor.com/bnw67.gif", fallback: "https://media.tenor.com/a_bwSoIpYBUAAAAj/bird.gif" },
  { id: "bat-two", kind: "bat", src: "https://tenor.com/p7QdPJG7kCG.gif", fallback: "https://media.tenor.com/uez9lEwcPpgAAAAj/bats-black.gif" },
  { id: "crow-two", kind: "crow", src: "https://tenor.com/bnw67.gif", fallback: "https://media.tenor.com/a_bwSoIpYBUAAAAj/bird.gif" },
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

export default function SpookyCreatures() {
  const imagesRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const images = imagesRef.current.filter(Boolean);
    if (reducedMotion) {
      images.forEach((image, index) => {
        gsap.set(image, { x: 24 + index * 76, y: 20 + index * 18, opacity: 1 });
      });
      return undefined;
    }

    const states = new Map();

    function viewportPoint(image) {
      const width = image.offsetWidth || 64;
      const height = image.offsetHeight || 64;
      return {
        maxX: Math.max(0, window.innerWidth - width),
        maxY: Math.max(0, window.innerHeight - height),
        width,
        height,
      };
    }

    function aimAt(image, spot) {
      const bounds = viewportPoint(image);
      const rect = spot.getBoundingClientRect();
      const currentX = Number(gsap.getProperty(image, "x")) || 0;
      const targetX = Math.min(bounds.maxX, Math.max(0, rect.left + rect.width / 2 - bounds.width / 2));
      const targetY = Math.min(bounds.maxY, Math.max(0, rect.top - bounds.height * 0.78));
      return { x: targetX, y: targetY, direction: targetX < currentX ? -1 : 1 };
    }

    function clearTimer(state) {
      if (!state.timer) return;
      window.clearTimeout(state.timer);
      state.timer = null;
    }

    function refreshLandingGlow(spot) {
      if (!spot) return;
      const occupied = Array.from(states.values()).some((state) => state.spot === spot && state.mode === "perched");
      spot.classList.toggle("landing-spot--perched", occupied);
    }

    function releaseLandingSpot(image) {
      const state = states.get(image);
      if (!state?.spot) return;
      const spot = state.spot;
      state.spot = null;
      refreshLandingGlow(spot);
    }

    function flyRandomly(image) {
      const state = states.get(image);
      if (!state || !image.isConnected) return;
      clearTimer(state);
      releaseLandingSpot(image);
      state.mode = "flying";

      const bounds = viewportPoint(image);
      const currentX = Number(gsap.getProperty(image, "x")) || 0;
      const targetX = randomBetween(0, bounds.maxX);
      const targetY = randomBetween(0, bounds.maxY);
      gsap.set(image, { scaleX: targetX < currentX ? -1 : 1 });
      gsap.to(image, {
        x: targetX,
        y: targetY,
        duration: randomBetween(4.5, 7.5),
        ease: "sine.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (state.mode !== "flying") return;
          state.mode = "waiting-to-land";
          state.timer = window.setTimeout(() => landOnRandomSpot(image), randomBetween(8000, 12000));
        },
      });
    }

    function landOnRandomSpot(image) {
      const state = states.get(image);
      if (!state || !image.isConnected) return;
      state.timer = null;

      const visibleSpots = Array.from(document.querySelectorAll(".landing-spot")).filter((spot) => {
        const rect = spot.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      });

      if (visibleSpots.length === 0) {
        flyRandomly(image);
        return;
      }

      const spot = visibleSpots[Math.floor(Math.random() * visibleSpots.length)];
      const landing = aimAt(image, spot);
      state.mode = "landing";
      state.spot = spot;
      gsap.set(image, { scaleX: landing.direction });
      gsap.to(image, {
        x: landing.x,
        y: landing.y,
        duration: randomBetween(2.2, 3.5),
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          if (state.mode !== "landing") return;
          state.mode = "perched";
          state.spot?.classList.add("landing-spot--perched");
          state.timer = window.setTimeout(() => flyRandomly(image), randomBetween(4000, 6000));
        },
      });
    }

    images.forEach((image, index) => {
      const bounds = viewportPoint(image);
      const startX = Math.min(bounds.maxX, 16 + (index % 2) * Math.max(80, bounds.maxX * 0.72));
      const startY = Math.min(bounds.maxY, 22 + Math.floor(index / 2) * Math.max(70, bounds.maxY * 0.58));
      gsap.set(image, { x: startX, y: startY, scaleX: index % 2 ? -1 : 1, opacity: 1 });
      states.set(image, { mode: "flying", timer: null, spot: null });
    });

    images.forEach((image) => flyRandomly(image));

    function handleResize() {
      images.forEach((image) => {
        const state = states.get(image);
        if (!state) return;
        clearTimer(state);
        gsap.killTweensOf(image);

        if (state.mode === "perched" && state.spot?.isConnected) {
          const landing = aimAt(image, state.spot);
          gsap.set(image, { x: landing.x, y: landing.y, scaleX: landing.direction });
          state.timer = window.setTimeout(() => flyRandomly(image), randomBetween(4000, 6000));
          return;
        }

        const bounds = viewportPoint(image);
        const x = Math.min(bounds.maxX, Math.max(0, Number(gsap.getProperty(image, "x")) || 0));
        const y = Math.min(bounds.maxY, Math.max(0, Number(gsap.getProperty(image, "y")) || 0));
        gsap.set(image, { x, y });
        flyRandomly(image);
      });
    }

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      images.forEach((image) => {
        const state = states.get(image);
        if (state) {
          clearTimer(state);
          releaseLandingSpot(image);
        }
        gsap.killTweensOf(image);
      });
    };
  }, [reducedMotion]);

  return (
    <div className="spooky-creatures fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {creatures.map((creature, index) => (
        <img
          key={creature.id}
          ref={(image) => { imagesRef.current[index] = image; }}
          className={`spooky-creature spooky-creature--${creature.kind} absolute w-24 sm:w-28 md:w-32`}
          src={creature.src}
          data-tenor-url={creature.src}
          data-fallback-src={creature.fallback}
          alt=""
          draggable="false"
          decoding="async"
          onError={(event) => {
            const image = event.currentTarget;
            const fallback = image.dataset.fallbackSrc;
            if (fallback && image.src !== fallback) image.src = fallback;
          }}
        />
      ))}
    </div>
  );
}
