"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Clock, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ProgramsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const programs = [
    {
      title: "Bi-annual & Thematic Award Events",
      duration: "7 gatherings hosted",
      age: "Next: January 6",
      price: "Recognition that restores dignity",
      description: "Award-based empowerment honoring women whose strength and impact often go unseen.",
      features: ["Multiple categories", "Survivors & changemakers", "Quiet contributors", "Role models of resilience"],
      popular: true,
    },
    {
      title: "Panel Discussions & Storytelling",
      duration: "Every gathering",
      age: "For girls & women",
      price: "Honest, unpolished stories",
      description: "Candid panels where honorees share journeys, challenges, and lessons to uplift others.",
      features: ["Real journeys", "Lessons on resilience", "Space for dialogue", "Relatable role models"],
      popular: false,
    },
    {
      title: "Community Impact",
      duration: "For those who feel unseen",
      age: "Girls, women, and allies",
      price: "Changing how women see themselves",
      description: "Dismantling the belief that quiet stories are not important enough by replacing doubt with recognition.",
      features: ["Visibility sparks confidence", "Representation matters", "Community belief", "Resilience celebrated"],
      popular: false,
    },
    {
      title: "Podcast Initiative (Upcoming)",
      duration: "Launching soon",
      age: "Stories on air",
      price: "Living archive of awakened gems",
      description: "Extending impact between events with conversations featuring honorees and nominees.",
      features: ["Resilience & growth", "Spotlights on honorees", "Bridge between gatherings", "Stories preserved"],
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
    <section id="programs" ref={sectionRef} className="section">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className={`text-sm font-medium text-accent uppercase tracking-wider mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Initiatives
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Recognition as a Catalyst
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Initiatives designed to awaken the gems within women through awards, storytelling, community impact, and a
            forthcoming podcast.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`program-card group relative p-8 lg:p-12 bg-background border border-border rounded-2xl hover-lift magnetic transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${
                program.popular ? "ring-1 ring-accent" : ""
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {program.popular && (
                <div className="absolute -top-4 left-8">
                  <div className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</div>
                </div>
              )}

              <div className="space-y-8">
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

                {/* Features */}
                <div className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="btn-modern w-full group-hover:scale-105 transition-transform">
                  <span>Nominate or Collaborate</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-light">Ready to Uplift a Story?</h3>
            <p className="text-text-secondary">
              Nominate a resilient woman, host a storytelling circle, or partner with ENQU SET NIQU SET to amplify awakened
              gems.
            </p>
            <button className="btn-outline magnetic">Share a Story</button>
          </div>
        </div>
      </div>
    </section>
  )
}
