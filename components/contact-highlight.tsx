"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function ContactHighlight() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section id="contact" ref={sectionRef} className="section bg-surface">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`text-sm font-medium text-accent uppercase tracking-wider mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Partner With Purpose
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Nominate, Collaborate, or Host
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Share a resilient woman&apos;s story, host an ENQU SET NIQU SET conversation, or explore partnerships that amplify
            awakened gems in your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quick Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-light">Quick Contact</h3>
              <p className="text-text-secondary">
                Curious about nominations, sponsorships, or storytelling collaborations? We&apos;re here to listen and
                respond with care.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Call Us</h4>
                  <p className="text-text-secondary">{t("contact.phone")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Email Us</h4>
                  <p className="text-text-secondary">{t("contact.email")}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Visit Us</h4>
                  <p className="text-text-secondary">{t("contact.address")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-modern magnetic inline-flex items-center">
                <span>Share a Story</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
            </div>
          </div>

          {/* Quick Contact Form */}
          <div
            className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-background p-8 rounded-2xl border border-border shadow-lg">
              <h3 className="text-xl font-medium mb-6 text-text-primary">Quick Inquiry</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
                <select className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                  <option value="">Select Inquiry Type</option>
                  <option value="nomination">Nominate a resilient woman</option>
                  <option value="partnership">Partnership or sponsorship</option>
                  <option value="host">Host a panel or storytelling session</option>
                  <option value="press">Press & media</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="Share a story, idea, or partnership opportunity..."
                  className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                ></textarea>
                <button type="submit" className="btn-modern w-full magnetic">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
