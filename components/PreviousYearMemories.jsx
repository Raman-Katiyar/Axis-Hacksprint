import Link from "next/link";

export default function PreviousYearMemories() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
      id="memories"
      aria-labelledby="memories-title"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-[min(80vw,48rem)] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Echoes from the last gathering</p>
        <h2
          className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl"
          id="memories-title"
          style={{ textShadow: "0 0 12px rgba(255,255,255,.55), 0 0 30px rgba(176,38,255,.8), 0 0 52px rgba(255,0,60,.45)" }}
        >
          Glimpses of Past Wonderland
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
          Revisit the chaos, the creativity, and the unforgettable energy from our previous wonderland.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/memories"
            className="register-button"
          >
            See all memories <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
