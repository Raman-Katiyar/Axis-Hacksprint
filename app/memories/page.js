import Image from "next/image";
import Link from "next/link";
import SpookyCreatures from "@/components/SpookyCreatures";

const mediaItems = [
  { src: "/DSC_3378.jpg.jpeg", type: "image", alt: "Hackathon memory 01" },
  { src: "/DSC_3211.MP4", type: "video", alt: "Hackathon memory 02" },
  { src: "/WhatsApp%20Image%202026-10-01%20at%2010.26.02%20AM.jpeg", type: "image", alt: "Hackathon memory 03" },
  { src: "/DSC_3303.MP4", type: "video", alt: "Hackathon memory 04" },
  { src: "/DSC_3369.MP4", type: "video", alt: "Hackathon memory 05" },
  { src: "/WhatsApp%20Image%202026-10-01%20at%2010.26.04%20AM.jpeg", type: "image", alt: "Hackathon memory 06" },
  { src: "/DSC_3371.MP4", type: "video", alt: "Hackathon memory 07" },
  { src: "/DSC_3375.MP4", type: "video", alt: "Hackathon memory 08" },
  { src: "/DSC_3379.MP4", type: "video", alt: "Hackathon memory 09" },
  { src: "/DSC_3424.MP4", type: "video", alt: "Hackathon memory 10" },
  { src: "/DSC_3427.MP4", type: "video", alt: "Hackathon memory 11" },
  { src: "/DSC_3429.MP4", type: "video", alt: "Hackathon memory 12" },
];

export default function MemoriesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-20 bg-[url('/bg-wonderland.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-[1px]" aria-hidden="true" />
      <SpookyCreatures />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Wonderland archive</p>
            <h1
              className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 0 12px rgba(255,255,255,.55), 0 0 30px rgba(176,38,255,.8), 0 0 52px rgba(255,0,60,.45)" }}
            >
              Glimpses of Past Wonderland
            </h1>
          </div>

          <Link
            href="/"
            className="secondary-button inline-flex w-fit"
          >
            ← Back to Home
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mediaItems.map((item, index) => (
            <a
              href={item.src}
              key={`${item.src}-${index}`}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2 shadow-[0_8px_30px_rgba(0,0,0,.3)] backdrop-blur-xl transition duration-500 hover:border-fuchsia-400/50 hover:shadow-[0_0_30px_rgba(176,38,255,.32),0_0_48px_rgba(255,0,60,.16)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-purple-950/40">
                {item.type === "image" ? (
                  <Image
                    alt={item.alt}
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={item.src}
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    src={item.src}
                  />
                )}
              </div>

              <div className="flex items-center justify-between gap-3 px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                <span>Memory {String(index + 1).padStart(2, "0")}</span>
                <span>{item.type === "video" ? "Video" : "Photo"}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
