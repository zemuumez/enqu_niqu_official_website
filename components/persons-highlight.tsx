"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function PersonsHighlight() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const featuredPersons = [
    {
      nameKey: "person.weynshet_name",
      titleKey: "person.weynshet_title",
      image: "/images/Persons/Weynshet_Geremew.png",
      bio: "Co-founder centering women in every decision and shaping a platform rooted in authenticity.",
      specialties: ["Program Stewardship", "Authenticity", "Family Leadership"],
    },
    {
      nameKey: "person.samuel_name",
      titleKey: "person.samuel_title",
      image: "/images/Persons/SamuelGeremew.jpg",
      bio: "Founded ENQU SET NIQU SET with a vision to recognize women whose resilience has long been overlooked.",
      specialties: ["Award Design", "Community Building", "Storytelling"],
    },
    {
      nameKey: "person.hana_name",
      titleKey: "person.hana_title",
      image: "/images/Persons/Hana_Geremew.png",
      bio: "Co-founder who helps curate voices, dialogues, and community touchpoints for girls and women.",
      specialties: ["Community Care", "Dialogue Design", "Representation"],
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
      id="persons"
      ref={sectionRef}
      className="section bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50"
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
            Founders & Voices
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Authentic, Family-Led Leadership
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Guided by a family-centered founding team and powered by women whose
            lived experiences shape every award, dialogue, and story.
          </p>
        </div>

        {/* Featured persons Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredPersons.map((person, index) => (
            <div
              key={index}
              className={`text-center group hover-lift transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              <div
                className="relative mb-6"
                style={{ width: 128, height: 128, margin: "0 auto" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={t(person.nameKey)}
                    fill
                    className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-medium mb-2 text-text-primary">
                {t(person.nameKey)}
              </h3>
              <p className="text-accent font-medium mb-3">
                {t(person.titleKey)}
              </p>
              <p className="text-text-secondary text-sm mb-4">{person.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {person.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
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
            <div className="text-text-secondary text-sm">
              Empowerment gatherings
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">5+</div>
            <div className="text-text-secondary text-sm">
              Founders and close collaborators
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">100+</div>
            <div className="text-text-secondary text-sm">
              Stories ready to be amplified
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-light mb-2">1</div>
            <div className="text-text-secondary text-sm">
              Podcast on the horizon
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
              Meet the People Behind ENQU SET NIQU SET
            </h3>
            <p className="text-text-secondary">
              Learn about the founders and the women whose stories shape every
              gathering, panel, and initiative we host.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/persons"
                className="btn-modern magnetic inline-flex items-center"
              >
                <span>Meet Our People</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
