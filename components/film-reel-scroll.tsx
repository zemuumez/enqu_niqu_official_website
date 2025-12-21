"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

interface FilmFrame {
  id: string;
  name?: string;
  image: string;
  session?: string;
}

// Default placeholder frames (used only when no images are provided)
const defaultPreviousFrames: FilmFrame[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=300&width=300",
    name: "Selamawit Bekele",
    session: "Founding Gathering",
  },
  {
    id: "2",
    image: "/placeholder.svg?height=300&width=300",
    name: "Hanan Mohammed",
    session: "Founding Gathering",
  },
  {
    id: "3",
    image: "/placeholder.svg?height=300&width=300",
    name: "Lensa Adugna",
    session: "Founding Gathering",
  },
];

const defaultUpcomingFrames: FilmFrame[] = [
  {
    id: "8",
    image: "/placeholder.svg?height=300&width=300",
    name: "Yeshi Desta",
    session: "Healthcare Heroes",
  },
  {
    id: "9",
    image: "/placeholder.svg?height=300&width=300",
    name: "Alem Hailu",
    session: "Healthcare Heroes",
  },
  {
    id: "10",
    image: "/placeholder.svg?height=300&width=300",
    name: "Meseret Bekele",
    session: "Artisan Masters",
  },
];

// Simple in-file shuffle (Fisher-Yates)
function shuffle<T>(items: T[]) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

// Film Strip Component with authentic reel design
function FilmStrip({
  frames,
  color,
  label,
}: {
  frames: FilmFrame[];
  color: "black" | "red";
  label: string;
}) {
  const allFrames = [
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
    ...frames,
  ];

  const bgColor = color === "black" ? "bg-zinc-900" : "bg-red-900";
  const borderColor = color === "black" ? "border-zinc-700" : "border-red-700";

  return (
    <div className="flex items-center gap-0 select-none pointer-events-none">
      {allFrames.map((frame, index) => (
        <div key={`${frame.id}-${index}`} className="flex-shrink-0">
          {/* Film Frame Container */}
          <div className={`relative ${bgColor} border-y-4 ${borderColor}`}>
            {/* Top Sprocket Holes */}
            <div className="absolute top-0 left-0 right-0 flex justify-around py-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="w-3 h-3 bg-background border border-zinc-600 rounded-sm"
                />
              ))}
            </div>

            {/* Photo Frame */}
            <div className="px-4 py-8">
              <div className="relative w-48 h-64 bg-zinc-800 border-2 border-zinc-700 overflow-hidden">
                <Image
                  src={frame.image || "/placeholder.svg"}
                  alt={frame.name ?? "film image"}
                  fill
                  className="object-cover"
                />
                {/* Frame Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <p className="text-white text-sm font-semibold">
                    {frame.name}
                  </p>
                  <p className="text-white/70 text-xs">{frame.session}</p>
                </div>
              </div>
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around py-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="w-3 h-3 bg-background border border-zinc-600 rounded-sm"
                />
              ))}
            </div>

            {/* Film Label on side */}
            <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
              <span className="text-[8px] text-zinc-500 font-mono tracking-wider whitespace-nowrap">
                {label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FilmReelScroll({
  previousImages,
  upcomingImages,
}: {
  previousImages?: string[];
  upcomingImages?: string[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Create randomized frames only when input arrays change (or on mount)
  const randomizedPreviousFrames: FilmFrame[] = useMemo(() => {
    if (previousImages && previousImages.length > 0) {
      const shuffled = shuffle(previousImages);
      return shuffled.map((src, i) => ({ id: String(i), image: src }));
    }
    return defaultPreviousFrames;
  }, [previousImages]);

  const randomizedUpcomingFrames: FilmFrame[] = useMemo(() => {
    if (upcomingImages && upcomingImages.length > 0) {
      const shuffled = shuffle(upcomingImages);
      return shuffled.map((src, i) => ({ id: String(i + 100), image: src }));
    }
    return defaultUpcomingFrames;
  }, [upcomingImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress when section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(
          0,
          Math.min(
            1,
            (windowHeight - rect.top) / (windowHeight + sectionHeight)
          )
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftReelTransform = -(scrollProgress * 1000) % 100;
  const rightReelTransform = (scrollProgress * 1000) % 100;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted overflow-hidden py-20"
    >
      <div className="w-full max-w-[2000px] mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Journey Through Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scroll to explore past honorees and upcoming sessions
          </p>
        </div>

        {/* Film Reel Container */}
        <div className="space-y-12">
          {/* Top Film Reel - Previous Sessions (Scrolling Left) */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex items-center will-change-transform"
                style={{ transform: `translateX(${leftReelTransform}%)` }}
              >
                <FilmStrip
                  frames={randomizedPreviousFrames}
                  color="black"
                  label="PREVIOUS SESSIONS"
                />
              </div>
            </div>
          </div>

          {/* Bottom Film Reel - Upcoming Sessions (Scrolling Right) */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex items-center will-change-transform"
                style={{ transform: `translateX(${rightReelTransform}%)` }}
              >
                <FilmStrip
                  frames={randomizedUpcomingFrames}
                  color="red"
                  label="UPCOMING SESSIONS"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Scroll Progress:</span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
