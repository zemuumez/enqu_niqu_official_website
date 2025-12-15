"use client"

import { useEffect, useRef, useState } from "react"

export default function LogoCloudSection() {
  const logos = [
    "ዕንቁ ሴት ንቁ ሴት",
    "Award Gatherings",
    "Storytelling Circles",
    "Community Impact",
    "Podcast (Upcoming)",
    "ዕንቁ ሴት ንቁ ሴት", // Duplicate for seamless loop
    "Award Gatherings",
    "Storytelling Circles",
    "Community Impact",
    "Podcast (Upcoming)",
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add animation class
    container.classList.add("animate-marquee")

    // Pause animation on hover
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="py-12 bg-surface-light overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* Half the width to loop seamlessly with duplicates */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee.paused {
          animation-play-state: paused;
        }
      `}</style>
      <div ref={containerRef} className={`flex whitespace-nowrap ${isHovered ? "paused" : ""}`}>
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
  )
}
