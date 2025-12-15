"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function BootcampContent() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.querySelectorAll(".fade-in-up").forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("is-visible")
              }, index * 100)
            })
            setHasAnimated(true)
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
  }, [hasAnimated])

  return (
    <section id="bootcamp" ref={sectionRef} className="section-padding bg-surface pt-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-600 mb-6 fade-in-up">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            {t("nav.bootcamp")}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">{t("bootcamp.title")}</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed fade-in-up">
            {t("bootcamp.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in-up">
            <p className="text-lg text-text-secondary leading-relaxed">{t("bootcamp.description_1")}</p>
            <p className="text-lg text-text-secondary leading-relaxed">{t("bootcamp.description_2")}</p>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>{t("bootcamp.duration")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>{t("bootcamp.format")}</span>
              </li>
            </ul>
            <button className="btn-primary mt-6">{t("hero.cta")}</button>
          </div>

          <div className="relative fade-in-up">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="ENQU SET NIQU SET gathering"
              className="rounded-2xl shadow-lg border border-gray-200"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
              🚀
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text fade-in-up">{t("bootcamp.curriculum")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "bootcamp.feature_1",
              "bootcamp.feature_2",
              "bootcamp.feature_3",
              "bootcamp.feature_4",
              "bootcamp.feature_5",
            ].map((key, index) => (
              <div key={index} className="bg-surface p-6 rounded-xl border border-gray-200 shadow-sm fade-in-up">
                <h3 className="text-xl font-semibold text-text-primary mb-2">{t(key)}</h3>
                <p className="text-text-secondary">A closer look at this pillar of the ENQU SET NIQU SET experience.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
