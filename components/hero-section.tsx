"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function HeroSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div
            className={`text-sm uppercase tracking-[0.35em] text-accent font-semibold transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            ዕንቁ ሴት ንቁ ሴት
          </div>
          {/* Title */}
          <h1
            className={`text-6xl md:text-7xl lg:text-9xl font-light leading-none transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="overflow-hidden">
              <span
                className={`block transition-transform duration-1000 py-0 pb-3.5 ${
                  isLoaded ? "translate-y-0" : "translate-y-full"
                }`}
              >
                Awakening the
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className={`block transition-transform duration-1000 delay-100 ${
                  isLoaded ? "translate-y-0" : "translate-y-full"
                }`}
              >
                Gems Within
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className={`block transition-transform duration-1000 delay-200 ${
                  isLoaded ? "translate-y-0" : "translate-y-full"
                }`}
              >
                Women
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-light transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link href="#contact" className="btn-modern magnetic group">
              <span>{t("hero.cta")}</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#about" className="btn-secondary">
              {t("hero.learn_more")}
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto transition-all duration-1000 delay-900 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">7</div>
              <div className="text-sm text-text-muted">
                Empowerment events hosted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">Jan 6</div>
              <div className="text-sm text-text-muted">
                Next award gathering
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">
                Podcast
              </div>
              <div className="text-sm text-text-muted">Launching soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-16 bg-text-muted relative">
          <div className="w-1 h-1 bg-accent rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
