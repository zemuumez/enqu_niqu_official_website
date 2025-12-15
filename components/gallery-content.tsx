"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function GalleryContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const images = [
    "/images/TeachingAndLearning/workshop.jpg",
    "/images/TeachingAndLearning/workshop2.jpg",
    "/images/TeachingAndLearning/workshop3.jpg",
    "/images/TeachingAndLearning/sss.jpg",
    "/images/TeachingAndLearning/insa1.jpg",
    "/images/TeachingAndLearning/insa2.jpg",
    "/images/TeachingAndLearning/insa3.jpg",
    "/images/TeachingAndLearning/insa4.jpg",
    "/images/TeachingAndLearning/geez.jpg",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target
              .querySelectorAll(".fade-in-up")
              .forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add("is-visible");
                }, index * 100);
              });
            setHasAnimated(true);
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
  }, [hasAnimated]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-surface pt-24"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-600 mb-6 fade-in-up">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            {t("nav.gallery")}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">{t("gallery.title")}</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed fade-in-up">
            {t("gallery.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 fade-in-up"
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`ENQU SET NIQU SET moment ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{`Moment ${index + 1}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
