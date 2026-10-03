"use client";
/* eslint-disable @next/next/no-img-element */

import { motion, useReducedMotion } from "framer-motion";

export default function FloatingAssets() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed top-10 right-4 md:right-10 z-40 w-48 md:w-72 lg:w-80 pointer-events-none"
      aria-hidden="true"
      animate={reducedMotion ? undefined : { y: [0, -25, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        className="block h-auto w-full drop-shadow-[0_0_20px_rgba(255,0,60,0.6)]"
        src="/magic-assets.png"
        alt=""
        draggable="false"
      />
    </motion.div>
  );
}
