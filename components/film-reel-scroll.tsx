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
  stripRef,
}: {
  frames: FilmFrame[];
  color: "black" | "red";
  label: string;
  stripRef?: React.RefObject<HTMLDivElement>;
}) {
  // Duplicate frames multiple times for seamless looping
  // We need at least 2 copies to create a seamless loop
  const allFrames = [
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
    <div
      ref={stripRef}
      className="flex items-center gap-0 select-none pointer-events-none w-max"
    >
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
  const leftStripRef = useRef<HTMLDivElement>(null);
  const rightStripRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [leftStripWidth, setLeftStripWidth] = useState(0);
  const [rightStripWidth, setRightStripWidth] = useState(0);

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

  // Calculate the width of one complete set of frames for seamless looping
  useEffect(() => {
    const calculateStripWidth = () => {
      if (leftStripRef.current && randomizedPreviousFrames.length > 0) {
        // Measure the actual width of one complete set of frames
        const children = leftStripRef.current.children;
        if (children.length >= randomizedPreviousFrames.length) {
          let totalWidth = 0;
          for (let i = 0; i < randomizedPreviousFrames.length; i++) {
            const child = children[i] as HTMLElement;
            if (child) {
              totalWidth += child.offsetWidth;
            }
          }
          setLeftStripWidth(totalWidth);
        }
      }
      if (rightStripRef.current && randomizedUpcomingFrames.length > 0) {
        const children = rightStripRef.current.children;
        if (children.length >= randomizedUpcomingFrames.length) {
          let totalWidth = 0;
          for (let i = 0; i < randomizedUpcomingFrames.length; i++) {
            const child = children[i] as HTMLElement;
            if (child) {
              totalWidth += child.offsetWidth;
            }
          }
          setRightStripWidth(totalWidth);
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      calculateStripWidth();
    }, 100);

    window.addEventListener("resize", calculateStripWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateStripWidth);
    };
  }, [randomizedPreviousFrames.length, randomizedUpcomingFrames.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on section's position in viewport
      // When section top is at viewport bottom: progress = 0
      // When section bottom is at viewport top: progress = 1
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Only calculate progress when section is in or near viewport
      if (sectionBottom < 0 || sectionTop > windowHeight) {
        // Section is completely out of viewport
        if (sectionBottom < 0) {
          setScrollProgress(0);
        } else {
          setScrollProgress(1);
        }
        return;
      }

      // Section is in viewport - calculate progress
      // Total distance the section travels through viewport
      const totalDistance = windowHeight + rect.height;
      // How far the section has traveled (from when top enters to when bottom exits)
      const traveledDistance = windowHeight - sectionTop;

      // Progress from 0 to 1
      const progress = Math.max(
        0,
        Math.min(1, traveledDistance / totalDistance)
      );

      setScrollProgress(progress);
    };

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calculate seamless loop transforms using pixel-based calculations
  // Calculate scroll distance in pixels (scales with scroll progress)
  // Use a larger multiplier to make scrolling more noticeable
  const maxScrollDistance = 3000; // Maximum scroll distance in pixels
  const scrollDistance = scrollProgress * maxScrollDistance;

  // Estimate frame width if not yet calculated (w-48 = 192px + padding = ~224px)
  const estimatedFrameWidth = 224;
  const estimatedLeftSetWidth =
    randomizedPreviousFrames.length * estimatedFrameWidth;
  const estimatedRightSetWidth =
    randomizedUpcomingFrames.length * estimatedFrameWidth;

  // Use actual width if available, otherwise use estimated width
  const leftSetWidth =
    leftStripWidth > 0 ? leftStripWidth : estimatedLeftSetWidth;
  const rightSetWidth =
    rightStripWidth > 0 ? rightStripWidth : estimatedRightSetWidth;

  // Use modulo to create seamless loop - when we reach one set width, loop back
  // This ensures the tail connects seamlessly to the head
  const leftReelTransform =
    leftSetWidth > 0 ? -(scrollDistance % leftSetWidth) : 0;
  // For right reel, ensure we start with frames visible (no empty space at start)
  // When scrollProgress is 0, we want to show frames, so transform should be 0
  // But we need to ensure the strip fills the container from the start
  const rightReelTransform =
    rightSetWidth > 0 ? scrollDistance % rightSetWidth : 0;

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
          <div className="relative w-full">
            <div className="overflow-hidden w-full">
              <div
                className="flex items-center will-change-transform"
                style={{ transform: `translateX(${leftReelTransform}px)` }}
              >
                <FilmStrip
                  frames={randomizedPreviousFrames}
                  color="black"
                  label="PREVIOUS SESSIONS"
                  stripRef={leftStripRef}
                />
              </div>
            </div>
          </div>

          {/* Bottom Film Reel - Upcoming Sessions (Scrolling Right) */}
          <div className="relative w-full">
            <div className="overflow-hidden w-full">
              <div
                className="flex items-center will-change-transform"
                style={{ transform: `translateX(${rightReelTransform}px)` }}
              >
                <FilmStrip
                  frames={randomizedUpcomingFrames}
                  color="red"
                  label="UPCOMING SESSIONS"
                  stripRef={rightStripRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
