"use client";

import { motion, useReducedMotion } from "framer-motion";
import OracleEyes from "@/components/OracleEyes";
import { triggerPotionSmash } from "@/components/PotionSmash";

const links = [
  { label: "Home", href: "#home" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Rules", href: "#rules" },
  { label: "FAQs", href: "#faq" },
];

export default function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.footer
      className="site-footer bg-transparent"
      initial={reducedMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.2, 0.75, 0.25, 1] }}
    >
      <OracleEyes />
      <div className="site-footer__inner">
        <p className="eyebrow">The last door is yours to open</p>
        <motion.a
          className="site-footer__register"
          href="https://unstop.com/hackathons/axis-hacksprint-20-axis-institute-of-technology-management-1760916"
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerPotionSmash}
          animate={reducedMotion ? undefined : {
            scale: [1, 1.025, 1],
            boxShadow: [
              "0 0 22px rgba(255, 0, 60, 0.64), 0 0 50px rgba(176, 38, 255, 0.46)",
              "0 0 34px rgba(255, 0, 60, 0.95), 0 0 78px rgba(176, 38, 255, 0.8)",
              "0 0 22px rgba(255, 0, 60, 0.64), 0 0 50px rgba(176, 38, 255, 0.46)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reducedMotion ? undefined : { scale: 1.07, y: -4 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        >
          REGISTER NOW <span aria-hidden="true">↗</span>
        </motion.a>

        <nav className="site-footer__nav" aria-label="Quick links">
          {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>

        <img
          src="/axis-logo.png"
          alt="Axis Institute of Technology and Management"
          className="h-16 w-16 mx-auto mb-4 rounded-full object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
        <p className="site-footer__tagline">Iterate • Accelerate • Elevate <span>-</span> Axis Institute of Technology &amp; Management</p>
        <p className="site-footer__copyright">© 2026 Axis HackSprint 2.0. All Spells Reserved.</p>
      </div>
    </motion.footer>
  );
}
