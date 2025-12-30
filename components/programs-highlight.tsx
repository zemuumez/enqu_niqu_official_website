"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Clock, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function ProgramsHighlight() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const featuredPrograms = [
    {
      title: "Annual & Thematic Award Events",
      duration: "7 gatherings hosted",
      age: "Next: January 6",
      price: "Recognition that restores dignity",
      description:
        "Award-based empowerment events honoring women who demonstrate exceptional strength, courage, leadership, and impact.",
      features: [
        "Survivors who turned hardship into purpose",
        "Community changemakers",
        "Quiet social contributors",
        "Role models whose resilience inspires",
      ],
      popular: true,
    },
    {
      title: "Panel Discussions & Storytelling",
      duration: "Every gathering",
      age: "Open to girls & women",
      price: "Honest, unpolished stories",
      description:
        "Candid panel sessions where award recipients share their journeys, challenges, lessons, and wisdom to uplift others.",
      features: [
        "Real journeys—not scripted speeches",
        "Lessons on resilience and identity",
        "Space for dialogue and reflection",
        "Role models who are relatable",
      ],
      popular: false,
    },
    {
      title: "Community Impact",
      duration: "For girls who doubt their worth",
      age: "For women who feel unseen",
      price: "Changing how women see themselves",
      description:
        "A platform created to dismantle the belief that quiet stories are not important enough, replacing doubt with recognition.",
      features: [
        "Visibility that sparks confidence",
        "Representation for girls and women",
        "Community belief over hype",
        "Resilience celebrated as success",
      ],
      popular: false,
    },
    {
      title: "Podcast Initiative (Upcoming)",
      duration: "Launching soon",
      age: "Stories on air",
      price: "Archive of awakened gems",
      description:
        "The ENQU SET NIQU SET Podcast will extend impact between events, featuring past recipients, nominees, and powerful untold stories.",
      features: [
        "Conversations on resilience and growth",
        "Spotlight on nominees and honorees",
        "Bridge between award gatherings",
        "Living archive of women's stories",
      ],
      popular: false,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="section bg-gradient-to-b from-orange-50/50 via-white to-amber-100/50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className={`text-sm font-medium text-accent uppercase tracking-wider mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            What ENQU SET NIQU SET Does
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Awakening the Gems Within Women
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Recognition is not a luxury—it is a catalyst. These initiatives honor resilience, amplify unheard voices, and
            build community belief.
          </p>
        </div>

        {/* Featured Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {featuredPrograms.map((program, index) => (
            <div
              key={index}
              className={`program-card group relative p-8 lg:p-12 bg-surface border border-border rounded-2xl hover-lift magnetic transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${
                program.popular ? "ring-1 ring-accent" : ""
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {program.popular && (
                <div className="absolute -top-4 left-8">
                  <div className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</div>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-light">{program.title}</h3>
                  <p className="text-text-secondary font-light">{program.description}</p>
                </div>

                {/* Meta */}
                <div className="flex items-center space-x-6 text-sm text-text-muted">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{program.age}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-light">{program.price}</div>
                  <div className="text-text-muted text-sm">Why it matters</div>
                </div>

                {/* Features Preview */}
                <div className="space-y-2">
                  {program.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                  <div className="text-text-muted text-sm">+ {program.features.length - 2} more features</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl md:text-3xl font-light">Be Part of the Awakening</h3>
            <p className="text-text-secondary">
              Nominate a resilient woman, host a conversation, or partner to amplify the next wave of awakened gems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs" className="btn-modern magnetic inline-flex items-center">
                <span>See All Initiatives</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
