"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function PersonsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const persons = [
    {
      nameKey: "person.weynshet_name",
      titleKey: "person.weynshet_title",
      image: "/images/Persons/Weynshet_Geremew.png",
      bio: "Co-founder curating dialogues so every story feels seen and heard.",
      email: "weynshet@enkuniqu.com",
    },
    {
      nameKey: "person.samuel_name",
      titleKey: "person.samuel_title",
      image: "/images/Persons/SamuelGeremew.jpg",
      bio: "Founder envisioning a platform that recognizes women as awakened gems.",
      email: "samuel@enkuniqu.com",
    },
    {
      nameKey: "person.mulu_name",
      titleKey: "person.mulu_title",
      image: "/images/Persons/Mulu_tsehay_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "mulu_tsehay@enkuniqu.com",
    },
    {
      nameKey: "person.hana_name",
      titleKey: "person.hana_title",
      image: "/images/Persons/Hana_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "hana@enkuniqu.com",
    },
    {
      nameKey: "person.asmelash_name",
      titleKey: "person.asmelash_title",
      image: "/images/Persons/Asmelash_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "asmelash@enkuniqu.com",
    },
    {
      nameKey: "person.zebider_name",
      titleKey: "person.zebider_title",
      image: "/images/Persons/Sister_Zebider.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "zebider@enkuniqu.com",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            cardRefs.current.forEach((cardElement, index) => {
              if (cardElement) {
                cardElement.classList.add("animate-in");
                setTimeout(() => {
                  cardElement.classList.add("is-visible");
                }, index * 150);
              }
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
      id="persons"
      ref={sectionRef}
      className="section-padding bg-surface"
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Founders & Voices
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            {t("persons.title")}
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t("persons.description")}
          </p>
        </div>

        {/* persons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {persons.map((person, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
              className="institutional-card text-center group"
            >
              <div className="relative mb-6">
                <img
                  src={person.image || "/placeholder.svg"}
                  alt={t(person.nameKey)}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t(person.nameKey)}
              </h3>
              <p className="text-primary font-medium mb-3">
                {t(person.titleKey)}
              </p>
              <p className="text-text-secondary text-sm mb-4">{person.bio}</p>

              <div className="flex justify-center space-x-3">
                <a
                  href={`mailto:${person.email}`}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
