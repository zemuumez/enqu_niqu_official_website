"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add("is-visible")
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
    <section id="contact" ref={sectionRef} className="section-padding animate-in bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Contact Us
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">{t("contact.title")}</h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t("contact.description")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="institutional-card">
              <h3 className="text-xl font-bold mb-6 text-text-primary">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Address</h4>
                    <p className="text-text-secondary">{t("contact.address")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Phone</h4>
                    <p className="text-text-secondary">{t("contact.phone")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Email</h4>
                    <p className="text-text-secondary">{t("contact.email")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Gathering Rhythm</h4>
                    <p className="text-text-secondary">Award events held twice a year</p>
                    <p className="text-text-secondary">Next gathering: January 6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="institutional-card">
              <h3 className="text-2xl font-bold mb-6 text-text-primary">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="+251 911 123 456"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="nomination">Nomination</option>
                    <option value="partnership">Partnership or sponsorship</option>
                    <option value="host">Host a conversation</option>
                    <option value="press">Press & media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Share a story, collaboration idea, or support you have in mind..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  {t("contact.send_message")}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="institutional-card overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 text-text-primary text-center">Join Our Gathering</h3>
            <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6000000000004!2d38.76361111111111!3d9.02361111111111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f1a2b3c4d5%3A0x8e7f8e7f8e7f8e7f!2s2PRJ%2BWF4%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ENQU SET NIQU SET Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
