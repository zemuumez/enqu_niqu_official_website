"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const { t, settings } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const defaultStats = [
    { target: 8, suffix: "", label: "Empowerment events held" },
    { target: 5, suffix: "+", label: "Founders & collaborators" },
    { target: 1, suffix: "", label: "Podcast launching" },
    { target: 100, suffix: "+", label: "Stories ready to be heard" },
  ];

  const aboutStats =
    settings?.aboutStats && settings.aboutStats.length > 0
      ? settings.aboutStats.map((item: any) => ({
          target: Number(item.value) || 0,
          suffix: item.suffix || "",
          label: item.label || "",
        }))
      : defaultStats;

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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-gradient-to-b from-white via-amber-50/60 to-orange-50/40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-6">
              <div className="text-sm font-medium text-accent uppercase tracking-wider">
                About Us
              </div>
              <h2 className="text-4xl md:text-6xl font-light leading-tight">
                {t("about.title")}
              </h2>
              <p className="text-xl text-text-secondary font-light leading-relaxed">
                {t("about.description")}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-text-secondary">
                {t("about.mission")}
              </p>
              <p className="text-text-secondary">
                {t("about.vision")}
              </p>
            </div>

            <Link
              href="#programs"
              className="btn-modern magnetic inline-flex items-center"
            >
              <span>Explore Initiatives</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`space-y-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid grid-cols-2 gap-8">
              {aboutStats.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-5xl md:text-6xl font-light mb-2">
                    <CountUp target={stat.target} isVisible={isVisible} />
                    {stat.suffix}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Founders&apos; Philosophy</h3>
              <p className="text-text-secondary">
                {t("about.philosophy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple counter component without GSAP
function CountUp({
  target,
  isVisible,
}: {
  target: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return <span>{count}</span>;
}
