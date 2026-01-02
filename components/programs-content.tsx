"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, Users, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ProgramsContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const allPrograms = [
    {
      title: "Bi-annual & Thematic Award Events",
      duration: "7 events hosted",
      age: "Next gathering: January 6",
      price: "Recognition that restores dignity",
      description:
        "Award-based empowerment gatherings identifying, nominating, and honoring women whose strength and impact often go unseen.",
      features: [
        "Multiple award categories celebrating diverse forms of resilience",
        "Careful nomination review rooted in authenticity",
        "Visibility for survivors, changemakers, and quiet contributors",
        "Community belief over hype—recognition as a catalyst",
      ],
      popular: true,
      level: "Recognition",
      schedule: "Twice yearly gatherings",
    },

    {
      title: "Podcast Initiative (Upcoming)",
      duration: "Launching soon",
      age: "Stories on air",
      price: "A living archive of awakened gems",
      description:
        "The ENQU SET NIQU SET Podcast will feature past recipients, nominees, and powerful untold stories—extending impact beyond physical gatherings.",
      features: [
        "Conversations on resilience, identity, and growth",
        "Spotlights on honorees and nominees",
        "Bridge between award events",
        "Archive preserving women's stories",
      ],
      popular: false,
      level: "Story archive",
      schedule: "Releases between gatherings",
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
      id="programs"
      ref={sectionRef}
      className="section-padding bg-background pt-10"
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16 py-3">
          {/* <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6 fade-in-up">
            Our Initiatives
          </div> */}

          <h1 className="text-4xl md:text-5xl text-accent font-bold mb-11 fade-in-up">
            <span className="gradient-text">Recognition as a Catalyst</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed fade-in-up">
            ENQU SET NIQU SET honors resilience through awards, storytelling,
            and community spaces where women inspire one another with
            visibility, dialogue, and shared experience.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {allPrograms.map((program, index) => (
            <div
              key={index}
              className={`institutional-card relative ${
                program.popular ? "ring-2 ring-accent" : ""
              } fade-in-up`}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-6 border-2 px-4 py-4">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {program.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {program.description}
                  </p>

                  <div className="flex justify-center items-center space-x-6 mb-6 text-sm text-text-secondary">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{program.age}</span>
                    </div>
                  </div>

                  <div className="text-4xl font-bold gradient-text mb-2">
                    {program.price}
                  </div>
                  <div className="text-text-secondary text-sm mb-4">
                    Why it matters
                  </div>

                  <div className="text-sm text-text-muted mb-4">
                    <div>
                      <strong>Focus:</strong> {program.level}
                    </div>
                    <div>
                      <strong>Rhythm:</strong> {program.schedule}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {/* <div className="space-y-3">
                  <button className="w-full btn-primary flex items-center justify-center space-x-2 py-4 bg-slate-100">
                    <span>Nominate or Partner</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 mt-0 py-11">
          <div className="institutional-card text-center fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-text-primary">
              Recognition First
            </h3>
            <p className="text-text-secondary">
              Awards are designed to restore dignity, not to sell hype. We move
              at the speed of trust with every nomination.
            </p>
          </div>
          <div className="institutional-card text-center fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-text-primary">
              Authentic Storytelling
            </h3>
            <p className="text-text-secondary">
              Panels and conversations are intentionally honest and human—not
              polished motivational speeches.
            </p>
          </div>
          <div className="institutional-card text-center fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-text-primary">
              Community-Centered
            </h3>
            <p className="text-text-secondary">
              Built by a family-led team with partners who align with genuine
              women empowerment and long-term impact.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center fade-in-up border-t-2 pt-7 mb-10">
          <div className="institutional-card max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Ready to Uplift a Story?
            </h3>
            <p className="text-text-secondary mb-6">
              Nominate someone resilient, host a dialogue, or explore
              sponsorship to keep recognition flowing to the women who deserve
              it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="btn-primary px-2.5 py-2.5 border-2 border-slate-400">
                Nominate a Woman
              </button> */}
              <button className="btn-secondary px-2.5 py-2.5 bg-slate-100">
                Partner With ENQU SET NIQU SET
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
