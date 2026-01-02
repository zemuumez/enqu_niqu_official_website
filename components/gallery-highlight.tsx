"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import Link from "next/link";

export default function GalleryHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const featuredImages = [
    {
      src: "/images/Session1/2025-12-14 02.54.48.jpg",
      alt: "Women honored on stage",
      title: "Award Gathering",
    },
    {
      src: "/images/Session2/2025-12-14 02.57.00.jpg",
      alt: "Panel conversation",
      title: "Storytelling Panel",
    },
    {
      src: "/images/Session3/2025-12-14 03.02.07.jpg",
      alt: "Community celebrating honorees",
      title: "Community Celebration",
    },
    {
      src: "/images/Session4/2026-01-01 11.26.12.jpg",
      alt: "Woman sharing her journey",
      title: "Awakened Voices",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section bg-gradient-to-b from-white via-amber-50/50 to-rose-50/40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`text-sm font-medium text-accent uppercase tracking-wider mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Glimpses of ENQU SET NIQU SET
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Recognition in Motion
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Award evenings, panels, and intimate conversations where resilience
            is honored and unheard stories find the spotlight.
          </p>
        </div>

        {/* Featured Images Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl shadow-lg border border-border hover-lift transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-lg">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm mt-1">
                    <Camera className="w-4 h-4 mr-2" />
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">7</div>
            <div className="text-text-secondary text-sm">Events captured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">30+</div>
            <div className="text-text-secondary text-sm">
              Honorees celebrated
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">25+</div>
            <div className="text-text-secondary text-sm">Dialogue sessions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">Podcast</div>
            <div className="text-text-secondary text-sm">
              Stories soon on air
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl md:text-3xl font-light">
              Explore Our Story Archive
            </h3>
            <p className="text-text-secondary">
              Discover moments from award nights, storytelling circles, and the
              community that believes recognition is a catalyst.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="btn-modern magnetic inline-flex items-center"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
