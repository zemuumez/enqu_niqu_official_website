"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Award, BookOpen, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function personsContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const allPersons = [
    {
      nameKey: "person.weynshet_name",
      titleKey: "person.weynshet_title",
      image: "/images/Persons/Weynshet_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: [
        "Program Stewardship",
        "Authenticity",
        "Community Care",
        "Event Design",
      ],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "mulu_tsehay_tsehay@enkuniqu.com",
    },
    {
      nameKey: "person.samuel_name",
      titleKey: "person.samuel_title",
      image: "/images/Persons/SamuelGeremew.jpg",
      bio: "Founder who envisioned an empowerment platform that recognizes women as awakened gems, built on trust and authenticity.",
      specialties: [
        "Vision & Strategy",
        "Recognition Design",
        "Community Trust",
        "Storytelling",
      ],
      experience: "7 events hosted",
      education: "Founder, ENQU SET NIQU SET",
      achievements: [
        "Launched ENQU SET NIQU SET with family",
        "Curated January 6 gathering",
        "Keeps recognition at the center",
      ],

      email: "samuel@enkuniqu.com",
    },
    {
      nameKey: "person.hana_name",
      titleKey: "person.hana_title",
      image: "/images/Persons/Hana_Setargachew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: [
        "Program Stewardship",
        "Authenticity",
        "Community Care",
        "Event Design",
      ],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "hanasetargachewy@enkuniqu.com",
    },
    {
      nameKey: "person.mulu_name",
      titleKey: "person.mulu_title",
      image: "/images/Persons/Mulu_Tsehay_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: [
        "Program Stewardship",
        "Authenticity",
        "Community Care",
        "Event Design",
      ],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "mulu_tsehay@enkuniqu.com",
    },
    {
      nameKey: "person.asmelash_name",
      titleKey: "person.asmelash_title",
      image: "/images/Persons/Asmelash_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: [
        "Program Stewardship",
        "Authenticity",
        "Community Care",
        "Event Design",
      ],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "asmelashgeremew@enkuniqu.com",
    },
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
      id="persons"
      ref={sectionRef}
      className="section-padding bg-background pt-24"
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6 fade-in-up">
            <Users className="w-4 h-4 mr-2" />
            Founders & Voices
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">{t("persons.title")}</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed fade-in-up">
            Meet the family-led team behind ENQU SET NIQU SET and the
            collaborators who help awaken gems through awards, storytelling, and
            community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center fade-in-up">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              7
            </div>
            <div className="text-text-secondary">Empowerment gatherings</div>
          </div>
          <div className="text-center fade-in-up">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              4
            </div>
            <div className="text-text-secondary">Founders & collaborators</div>
          </div>
          <div className="text-center fade-in-up">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              30+
            </div>
            <div className="text-text-secondary">Honorees & storytellers</div>
          </div>
          <div className="text-center fade-in-up">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              1
            </div>
            <div className="text-text-secondary">Podcast launching</div>
          </div>
        </div>

        {/* persons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allPersons.map((person, index) => (
            <div key={index} className="institutional-card group fade-in-up">
              <div className="text-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={person.image || "/placeholder.svg"}
                    alt={person.nameKey ? t(person.nameKey) : person.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="text-xl font-bold mb-1 text-text-primary">
                  {person.nameKey ? t(person.nameKey) : person.name}
                </h3>
                <p className="text-accent font-medium mb-2">
                  {person.titleKey ? t(person.titleKey) : person.title}
                </p>
                <p className="text-text-muted text-sm mb-4">
                  {person.education} • {person.experience}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-text-secondary text-sm leading-relaxed">
                  {person.bio}
                </p>

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold text-text-primary text-sm mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {person.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-text-primary text-sm mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {person.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-text-secondary text-xs flex items-start"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="flex justify-center space-x-3 pt-4 border-t border-border">
                  <a
                    href={`mailto:${person.email}`}
                    className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                  </a>
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Github className="w-3 h-3" />
                  </a>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teaching Philosophy */}
        <div className="institutional-card mb-16 fade-in-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-text-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Our Recognition Philosophy
            </h3>
            <p className="text-text-secondary max-w-3xl mx-auto">
              ENQU SET NIQU SET is authentic, not performative; deeply human,
              not corporate. Recognition restores dignity, storytelling heals,
              and resilience deserves the same stage as success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">
                Women-Centered
              </h4>
              <p className="text-text-secondary text-sm">
                Leadership and co-founders are drawn from within the family and
                community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">
                Stories Over Hype
              </h4>
              <p className="text-text-secondary text-sm">
                Honest, relatable narratives replace polished speeches and
                trends.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">
                Impact, Not Titles
              </h4>
              <p className="text-text-secondary text-sm">
                Awards recognize resilience, community impact, and
                transformation in every form.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center fade-in-up">
          <div className="institutional-card max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Ready to Awaken More Gems?
            </h3>
            <p className="text-text-secondary mb-6">
              Nominate a resilient woman, host a panel, or collaborate to
              amplify the next wave of ENQU SET NIQU SET honorees. Recognition
              grows when community leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Nominate a Woman</button>
              <button className="btn-secondary">Collaborate With Us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
