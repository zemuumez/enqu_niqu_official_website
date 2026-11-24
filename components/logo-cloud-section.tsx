"use client";

import { useEffect, useRef, useState } from "react";
import { client } from "@/lib/sanity/sanity.client";
import { sponsorsQuery } from "@/lib/sanity/sanity.queries";

export default function LogoCloudSection() {
  const defaultLogos = [
    "Dashen Bank",
    "Guenet Hotel",
    "Shega chewata",
    "Samilos Media and Communications",
    "Weyn Coffee",
    "Metemamen MicroFinance",
    "Abronet Digital Equib",
    "Hagere Tv",
    "Marya's decor",
  ];

  const [logos, setLogos] = useState<string[]>([...defaultLogos, ...defaultLogos]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const data = await client.fetch(sponsorsQuery);
        if (data && data.length > 0) {
          const names = data.map((s: any) => s.name).filter(Boolean);
          if (names.length > 0) {
            // Duplicate for marquee loop
            setLogos([...names, ...names]);
          }
        }
      } catch (err) {
        console.error("Sanity fetch error for sponsors, using fallback:", err);
      }
    }
    fetchSponsors();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.classList.add("animate-marquee");
  }, []);

  return (
    <section className="py-12 overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50/70 to-rose-50/70">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          } /* Half the width to loop seamlessly with duplicates */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee.paused {
          animation-play-state: paused;
        }
      `}</style>
      <div
        ref={containerRef}
        className={`flex whitespace-nowrap ${isHovered ? "paused" : ""}`}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="inline-block px-8 py-4 text-text-muted text-2xl font-semibold opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
