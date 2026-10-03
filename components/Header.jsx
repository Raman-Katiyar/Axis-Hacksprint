"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Rules", href: "#rules" },
  { label: "FAQ", href: "#faq" },
];

const linkClassName = "relative group text-gray-300 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,105,180,1)]";
const indicatorClassName = "absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-pink-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#ec4899]";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        className="fixed left-6 top-6 z-[9000] flex items-center"
        href="#home"
        aria-label="Axis College home"
      >
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[42%] -translate-y-1/2 whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.45em] text-white/10 blur-[0.5px] md:text-[0.72rem]">
          AXIS COLLEGE
        </span>
        <img
          src="/axis-logo.png"
          alt=""
          className="relative z-10 h-12 w-12 rounded-full object-cover drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] md:h-14 md:w-14"
        />
      </a>

      <nav
        className="fixed left-1/2 top-6 z-[9000] hidden -translate-x-1/2 items-center gap-8 rounded-full border border-purple-500/40 bg-[#050505]/50 px-10 py-4 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-2xl md:flex md:gap-1 md:px-2 lg:gap-8 lg:px-10"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a className={linkClassName} href={link.href} key={link.href}>
            {link.label}
            <span className={indicatorClassName} aria-hidden="true" />
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="fixed right-6 top-6 z-[9000] grid h-11 w-11 place-items-center text-white transition-colors hover:text-pink-400 md:hidden"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {isOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed left-6 right-6 top-20 z-[8999] ml-auto max-w-sm rounded-2xl border border-purple-500/30 bg-black/90 px-6 py-3 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl md:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {links.map((link) => (
                <a
                  className={`${linkClassName} border-b border-white/10 py-4 last:border-b-0`}
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  <span className={indicatorClassName} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}