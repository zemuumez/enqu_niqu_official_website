"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function MentorsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const mentors = [
    {
      nameKey: "mentor.samuel_name",
      titleKey: "mentor.samuel_title",
      image: "/images/Mentors/SamuelGeremew.jpg",
      bio: "Founder envisioning a platform that recognizes women as awakened gems.",
      github: "#",
      linkedin: "#",
      email: "samuel@enkuniqu.com",
    },
    {
      nameKey: "mentor.thomas_name",
      titleKey: "mentor.thomas_title",
      image: "/images/sophor-logo.png",
      bio: "Co-founder centering authenticity and community-led recognition.",
      github: "#",
      linkedin: "#",
      email: "mulu@enkuniqu.com",
    },
    {
      nameKey: "mentor.zemichael_name",
      titleKey: "mentor.zemichael_title",
      image: "/images/Mentors/ZemichaelTefera.png",
      bio: "Co-founder curating dialogues so every story feels seen and heard.",
      github: "#",
      linkedin: "#",
      email: "weynishet@enkuniqu.com",
    },
    // If you have a fourth mentor image, update here. Otherwise, keep the placeholder or remove this entry.
    {
      nameKey: "mentor.kidaneworl_name",
      titleKey: "mentor.kidaneworl_title",
      image: "/placeholder-3obvr.png",
      bio: "Family collaborators and partners who amplify stories without seeking the spotlight.",
      github: "#",
      linkedin: "#",
      email: "community@enkuniqu.com",
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
      id="mentors"
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
            {t("mentors.title")}
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t("mentors.description")}
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el as HTMLDivElement)}
              className="institutional-card text-center group"
            >
              <div className="relative mb-6">
                <img
                  src={mentor.image || "/placeholder.svg"}
                  alt={t(mentor.nameKey)}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t(mentor.nameKey)}
              </h3>
              <p className="text-primary font-medium mb-3">
                {t(mentor.titleKey)}
              </p>
              <p className="text-text-secondary text-sm mb-4">{mentor.bio}</p>

              <div className="flex justify-center space-x-3">
                <a
                  href={`mailto:${mentor.email}`}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={mentor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={mentor.linkedin}
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
