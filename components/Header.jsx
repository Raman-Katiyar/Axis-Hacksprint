"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Home", href: "#home" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Rules", href: "#rules" },
  { label: "FAQ", href: "#faq" },
  { label: "Organisers", href: "/organisers" },
];

const linkClassName = "relative group text-gray-300 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,105,180,1)]";
const activeLinkClassName = "text-white drop-shadow-[0_0_12px_rgba(255,105,180,0.85)]";
const indicatorClassName = "absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-pink-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#ec4899]";

function scrollToSection(section) {
  const target = document.getElementById(section);
  if (!target) return false;

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 160);
  window.scrollTo({ top, behavior: "instant" });
  return true;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSectionHref, setCurrentSectionHref] = useState("#home");
  const pathname = usePathname();
  const router = useRouter();
  const activeHref = pathname === "/organisers" ? "/organisers" : pathname === "/" ? currentSectionHref : "";
  const getHref = (href) => href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  useEffect(() => {
    if (pathname !== "/") return undefined;

    function updateActiveSection() {
      const marker = window.innerHeight * 0.35;
      let currentHref = "#home";

      links.forEach((link) => {
        if (!link.href.startsWith("#")) return;
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= marker) {
          currentHref = link.href;
        }
      });

      setCurrentSectionHref((previousHref) => previousHref === currentHref ? previousHref : currentHref);
    }

    let frameId = 0;
    function handleScroll() {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        updateActiveSection();
        frameId = 0;
      });
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return undefined;
    const section = window.sessionStorage.getItem("axis-hacksprint-section");
    if (!section) return undefined;

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (scrollToSection(section) || attempts >= 20) {
        window.clearInterval(interval);
        window.sessionStorage.removeItem("axis-hacksprint-section");
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [pathname]);

  function handleNavigation(event, href) {
    setIsOpen(false);
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const section = href.slice(1);
    setCurrentSectionHref(href);

    if (pathname !== "/") {
      window.sessionStorage.setItem("axis-hacksprint-entered", "true");
      window.sessionStorage.setItem("axis-hacksprint-section", section);
      document.documentElement.classList.add("axis-hacksprint-entered");
      window.dispatchEvent(new Event("axis-hacksprint-entered"));
      router.push(`/${href}`, { scroll: false });
      return;
    }

    router.push(href, { scroll: false });
    scrollToSection(section);
  }

  const headerPosition = "top-6";

  return (
    <>
      <Link
        className={`fixed left-6 ${headerPosition} z-[9000] flex items-center`}
        href="/#home"
        aria-label="Axis College home"
        onClick={() => {
          if (pathname === "/") return;
          window.sessionStorage.setItem("axis-hacksprint-entered", "true");
          window.sessionStorage.setItem("axis-hacksprint-section", "home");
          document.documentElement.classList.add("axis-hacksprint-entered");
          window.dispatchEvent(new Event("axis-hacksprint-entered"));
        }}
      >
        <img
          src="/original%20logo.png"
          alt="Axis Institute of Technology & Management logo"
          className="h-12 w-auto max-w-[190px] shrink-0 object-contain md:h-14"
        />
      </Link>

      <nav
        className={`fixed left-1/2 ${headerPosition} z-[9000] hidden -translate-x-1/2 items-center gap-2 rounded-full border border-purple-500/40 bg-[#050505]/50 px-4 py-3 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-2xl lg:flex lg:gap-3 lg:px-5 xl:gap-8 xl:px-10 xl:py-4`}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <Link
            className={`${linkClassName} ${activeHref === link.href ? activeLinkClassName : ""}`}
            href={getHref(link.href)}
            key={link.href}
            aria-current={activeHref === link.href ? (link.href.startsWith("#") ? "location" : "page") : undefined}
            onClick={(event) => handleNavigation(event, link.href)}
          >
            {link.label}
            <span className={`${indicatorClassName} ${activeHref === link.href ? "opacity-100 shadow-[0_0_10px_#ec4899]" : ""}`} aria-hidden="true" />
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={`fixed right-6 ${headerPosition} z-[9000] grid h-11 w-11 place-items-center text-white transition-colors hover:text-pink-400 lg:hidden`}
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
            className="fixed left-6 right-6 top-20 z-[8999] ml-auto max-w-sm rounded-2xl border border-purple-500/30 bg-black/90 px-6 py-3 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-xl lg:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <nav className="flex flex-col lg:hidden" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link
                  className={`${linkClassName} ${activeHref === link.href ? activeLinkClassName : ""} ${link.href === "/organisers" ? "my-2 w-fit" : "border-b border-white/10 py-4 last:border-b-0"}`}
                  href={getHref(link.href)}
                  key={link.href}
                  aria-current={activeHref === link.href ? (link.href.startsWith("#") ? "location" : "page") : undefined}
                  onClick={(event) => handleNavigation(event, link.href)}
                >
                  {link.label}
                  <span className={`${indicatorClassName} ${activeHref === link.href ? "opacity-100 shadow-[0_0_10px_#ec4899]" : ""}`} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}