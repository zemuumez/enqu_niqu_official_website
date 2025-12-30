"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-orange-50 via-white to-amber-50"
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-sm uppercase tracking-[0.35em] text-accent font-semibold">
            ዕንቁ ሴት ንቁ ሴት
          </div>
          {/* Title */}
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-light leading-none">
            <div className="overflow-hidden">
              <span className="block py-0 pb-3.5">Awakening the</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">Gems Within</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">Women</span>
            </div>
          </h1>

          {/* Subtitle - shortened to take fewer lines */}
          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto font-light line-clamp-2">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="#contact" className="btn-modern magnetic group">
              <span>{t("hero.cta")}</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#about" className="btn-secondary">
              {t("hero.learn_more")}
            </Link>
          </div>

          {/* Stats - only shown after scroll */}
          <div
            className={`grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto transition-all duration-500 ${
              hasScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light mb-2">7</div>
              <div className="text-sm text-text-muted">
                Empowerment events hosted
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light mb-2">Jan 6</div>
              <div className="text-sm text-text-muted">
                Next award gathering
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light mb-2">
                Podcast
              </div>
              <div className="text-sm text-text-muted">Launching soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - only shown after scroll */}
      {/* <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          hasScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-px h-16 bg-text-muted relative">
          <div className="w-1 h-1 bg-accent rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
}
