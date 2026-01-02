"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ContactContent() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

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
      id="contact"
      ref={sectionRef}
      className="section-padding bg-background pt-10"
    >
      <div className="container mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="uppercase tracking-[0.35em] text-accent py-5 font-semibold">
            {/* <MessageCircle className="w-4 h-4 mr-2" /> */}
            Contact Us
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-up">
            <span className="gradient-text">{t("contact.title")}</span>
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed fade-in-up">
            Share a resilient woman&apos;s story, explore partnerships, or host
            an ENQU SET NIQU SET conversation. We respond with care to every
            message.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16 py-11">
          {/* Contact Methods */}
          <div className="space-y-8 fade-in-up">
            <div className="institutional-card">
              <h3 className="text-xl font-bold mb-6 text-text-primary">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Address</h4>
                    <p className="text-text-secondary">
                      {t("contact.address")}
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                      Community platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Phone</h4>
                    <p className="text-text-secondary">{t("contact.phone")}</p>
                    <p className="text-text-muted text-sm mt-1">
                      We respond within 48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Email</h4>
                    <p className="text-text-secondary">{t("contact.email")}</p>
                    <p className="text-text-muted text-sm mt-1">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Gathering Rhythm
                    </h4>
                    <p className="text-text-secondary">
                      Award events held twice a year
                    </p>
                    <p className="text-text-secondary">
                      Next gathering: January 6
                    </p>
                    <p className="text-text-secondary">
                      Podcast: launching soon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="institutional-card">
              <h3 className="text-xl font-bold mb-4 text-text-primary">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Nominate a Woman</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Partner or Sponsor</span>
                </button>
                <button className="w-full btn-secondary">
                  Host a Conversation
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 fade-in-up">
            <div className="institutional-card">
              <h3 className="text-2xl font-bold mb-6 text-text-primary">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
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
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
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

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
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
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="+251 911 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    How can we collaborate?
                  </label>
                  <select
                    id="program"
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select an option</option>
                    {/* <option value="nomination">Nomination submission</option> */}
                    <option value="partnership">
                      Partnership or sponsorship
                    </option>
                    <option value="host">
                      Host a panel/storytelling session
                    </option>
                    <option value="podcast">Podcast guest/story</option>
                    <option value="consultation">General question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    {/* <option value="nomination">Nomination</option> */}
                    <option value="partnership">
                      Partnership or sponsorship
                    </option>
                    <option value="host">Host an event</option>
                    <option value="press">Press & media</option>
                    <option value="podcast">Podcast feature</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full p-4 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Share the story, collaboration idea, or support you have in mind..."
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-text-secondary"
                  >
                    I would like to receive updates about ENQU SET NIQU SET
                    awards, stories, and events.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2 shadow"
                >
                  <Send className="w-5 h-5" />
                  <span>{t("contact.send_message")}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="fade-in-up">
          <div className="institutional-card overflow-hidden py-11">
            <h3 className="text-2xl font-bold mb-6 text-text-primary text-center">
              What&apos;s Next
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-text-muted">
                  Upcoming Event
                </p>
                <p className="text-xl font-semibold text-text-primary">
                  January 6
                </p>
                <p className="text-text-secondary text-sm">
                  Award gathering & storytelling
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-text-muted">
                  Podcast
                </p>
                <p className="text-xl font-semibold text-text-primary">
                  Launching soon
                </p>
                <p className="text-text-secondary text-sm">
                  Featuring honorees and nominees
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-text-muted">
                  Community
                </p>
                <p className="text-xl font-semibold text-text-primary">
                  7 events held
                </p>
                <p className="text-text-secondary text-sm">
                  Built on trust, authenticity, and belief
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-text-secondary mb-4">
                ENQU SET NIQU SET has grown organically—powered by real stories,
                family leadership, and a community that believes recognition is
                a catalyst.
              </p>
              <button className="btn-secondary">Join the next gathering</button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 fade-in-up py-11">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Frequently Asked Questions
            </h3>
            <p className="text-text-secondary">
              Quick answers about nominations, events, and collaborating with
              ENQU SET NIQU SET
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="institutional-card border-t-2 pt-2.5">
              <h4 className="font-semibold text-text-primary mb-2">
                How do nominations work?
              </h4>
              <p className="text-text-secondary text-sm">
                Share a woman&apos;s story through our form. We review
                submissions with care and reach out for additional context
                before each gathering.
              </p>
            </div>
            <div className="institutional-card border-t-2 pt-2.5">
              <h4 className="font-semibold text-text-primary mb-2">
                Who can be honored?
              </h4>
              <p className="text-text-secondary text-sm">
                Survivors, community changemakers, quiet contributors, and role
                models who transformed adversity into purpose—titles are not
                required.
              </p>
            </div>
            <div className="institutional-card pt-2.5 border-t-2">
              <h4 className="font-semibold text-text-primary mb-2">
                How are events funded?
              </h4>
              <p className="text-text-secondary text-sm">
                We grow through trust and authentic partnerships, not hype.
                Sponsors and collaborators help keep the focus on recognition
                and impact.
              </p>
            </div>
            <div className="institutional-card pt-2.5 border-t-2">
              <h4 className="font-semibold text-text-primary mb-2">
                Can men participate?
              </h4>
              <p className="text-text-secondary text-sm">
                Absolutely. While ENQU SET NIQU SET centers women, allies are
                welcome to nominate, attend, and support the movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
