"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { client } from "@/lib/sanity/sanity.client";
import { foundersQuery } from "@/lib/sanity/sanity.queries";
import { urlFor } from "@/lib/sanity/sanity.image";

export default function PersonsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const defaultPersons = [
    {
      name: "Weynshet Geremew",
      nameKey: "person.weynshet_name",
      role: "Co-founder & CEO",
      titleKey: "person.weynshet_title",
      image: "/images/Persons/Weynshet_Geremew.png",
      bio: "Co-founder curating dialogues so every story feels seen and heard.",
      email: "weynshet@enkuniqu.com",
    },
    {
      name: "Samuel Geremew",
      nameKey: "person.samuel_name",
      role: "Founder",
      titleKey: "person.samuel_title",
      image: "/images/Persons/SamuelGeremew.jpg",
      bio: "Founder envisioning a platform that recognizes women as awakened gems.",
      email: "samuel@enkuniqu.com",
    },
    {
      name: "Mulutsehay Geremew",
      nameKey: "person.mulu_name",
      role: "Co-founder & Marketing Manager",
      titleKey: "person.mulu_title",
      image: "/images/Persons/Mulu_tsehay_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "mulu_tsehay@enkuniqu.com",
    },
    {
      name: "Hana Setargachew",
      nameKey: "person.hana_name",
      role: "Co-founder & Assistant Manager",
      titleKey: "person.hana_title",
      image: "/images/Persons/Hana_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "hana@enkuniqu.com",
    },
    {
      name: "Asmelash Geremew",
      nameKey: "person.asmelash_name",
      role: "Financial Manager",
      titleKey: "person.asmelash_title",
      image: "/images/Persons/Asmelash_Geremew.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "asmelash@enkuniqu.com",
    },
    {
      name: "Sister Zebider Zewdie",
      nameKey: "person.zebider_name",
      role: "Ambassador",
      titleKey: "person.zebider_title",
      image: "/images/Persons/Sister_Zebider.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      email: "zebider@enkuniqu.com",
    },
  ];

  const [personsList, setPersonsList] = useState<any[]>(defaultPersons);

  useEffect(() => {
    async function fetchFounders() {
      try {
        const data = await client.fetch(foundersQuery);
        if (data && data.length > 0) {
          setPersonsList(
            data.map((f: any) => ({
              name: f.name,
              role: f.role,
              image: f.image ? urlFor(f.image).url() : null,
              bio: f.bio,
              email: f.email || "",
              github: f.github || "",
              linkedin: f.linkedin || "",
            }))
          );
        }
      } catch (err) {
        console.error("Sanity fetch error for founders page, using fallback:", err);
      }
    }
    fetchFounders();
  }, []);

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
            {t("founders.section_label")}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            {t("founders.section_title")}
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t("founders.section_subtitle")}
          </p>
        </div>

        {/* persons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {personsList.map((person, index) => {
            const displayName = person.nameKey ? t(person.nameKey) : person.name;
            const displayTitle = person.titleKey ? t(person.titleKey) : person.role;

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
                className="institutional-card text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={person.image || "/placeholder.svg"}
                    alt={displayName}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-text-primary">
                  {displayName}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {displayTitle}
                </p>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {person.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {person.github && (
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
