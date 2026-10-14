"use client";

import { useReducedMotion } from "framer-motion";

function Drone({ className, label }) {
  return (
    <div className={`tech-companion tech-drone ${className}`} role="img" aria-label={label}>
      <svg viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="tech-drone__beam" d="M90 42 37 20m53 22 53-22M90 46 34 65m56-19 56 19" />
        <path className="tech-drone__arm" d="M82 39 39 20m59 19 43-19M82 49 36 64m62-15 46 15" />
        <path className="tech-drone__rotor" d="M18 18h40m84 0h20M14 67h40m88 0h20" />
        <path className="tech-drone__rotor-blade" d="M37 11v14m104-14v14M34 60v14m112-14v14" />
        <path className="tech-drone__body" d="M71 36h38l12 11-12 12H71L59 47l12-11Z" />
        <path className="tech-drone__body-detail" d="M79 40h22l7 7-7 7H79l-7-7 7-7Z" />
        <path className="tech-drone__sensor" d="M87 59h7l-3.5 12L87 59Z" />
        <circle className="tech-drone__eye" cx="90.5" cy="47" r="3" />
        <path className="tech-drone__light" d="M65 46h-5m55 0h5" />
      </svg>
      <span className="tech-drone__trail" />
    </div>
  );
}

function Robot({ className, label, activity }) {
  return (
    <div className={`tech-companion tech-robot ${className}`} role="img" aria-label={label}>
      <svg viewBox="0 0 120 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="tech-robot__antenna" d="M60 18V9" />
        <circle className="tech-robot__antenna-light" cx="60" cy="7" r="4" />
        <path className="tech-robot__ear" d="M28 41h-7v18h8m63-18h7v18h-8" />
        <rect className="tech-robot__head" x="30" y="25" width="60" height="53" rx="16" />
        <rect className="tech-robot__visor" x="38" y="36" width="44" height="27" rx="10" />
        <circle className="tech-robot__eye" cx="50" cy="49" r="4" />
        <circle className="tech-robot__eye" cx="70" cy="49" r="4" />
        <path className="tech-robot__smile" d="M52 57q8 7 16 0" />
        <path className="tech-robot__neck" d="M54 78v7m12-7v7" />
        <path className="tech-robot__body" d="M37 86q0-5 5-5h36q5 0 5 5v34H37V86Z" />
        <path className="tech-robot__panel" d="M47 91h26v18H47z" />
        <circle className="tech-robot__status" cx="53" cy="100" r="2" />
        <circle className="tech-robot__status" cx="60" cy="100" r="2" />
        <circle className="tech-robot__status" cx="67" cy="100" r="2" />
        <path className={`tech-robot__arm tech-robot__arm--left ${activity === "wave" ? "tech-robot__arm--wave" : ""}`} d="M37 88 25 99l-4-16" />
        <path className={`tech-robot__arm tech-robot__arm--right ${activity === "build" ? "tech-robot__arm--build" : ""}`} d="m83 88 12 11 4-15" />
        <path className="tech-robot__hand" d="m18 82 4-3 5 3m68 0 4-3 5 3" />
        <path className="tech-robot__leg" d="M48 120v15m24-15v15" />
        <path className="tech-robot__foot" d="M42 137h13m14 0h13" />
        {activity === "build" && <path className="tech-robot__tool" d="m103 75 6-6m-8 9 9 9m-12-8 7-7" />}
      </svg>
      <span className="tech-robot__glow" />
    </div>
  );
}

export default function TechCompanions({ intro = false }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`tech-companions${intro ? " tech-companions--intro" : ""}${reducedMotion ? " tech-companions--still" : ""}`} aria-hidden="true">
      {!intro && <Drone className="tech-drone--one" label="A small neon drone in flight" />}
      {!intro && <Drone className="tech-drone--two" label="A second drone patrolling the wonderland" />}
      {!intro && <Drone className="tech-drone--three" label="A tiny scouting drone" />}
      <Robot className="tech-robot--wave" label="A friendly robot waving hello" activity="wave" />
      <Robot className="tech-robot--build" label="A robot tinkering with a tool" activity="build" />
      {intro && <Robot className="tech-robot--intro-left" label="A second robot watching the left side" activity="wave" />}
      {intro && <Robot className="tech-robot--intro-right" label="A second robot watching the right side" activity="build" />}
      {intro && <Robot className="tech-robot--intro-left-top" label="A robot patrolling the upper left side" activity="build" />}
      {intro && <Robot className="tech-robot--intro-left-bottom" label="A robot patrolling the lower left side" activity="wave" />}
      {intro && <Robot className="tech-robot--intro-right-top" label="A robot patrolling the upper right side" activity="wave" />}
      {intro && <Robot className="tech-robot--intro-right-bottom" label="A robot patrolling the lower right side" activity="build" />}
    </div>
  );
}
