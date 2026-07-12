"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function ContactHighlight() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Split single name into firstName and lastName
    const nameParts = formData.name.trim().split(" ");
    const firstName = nameParts[0] || "Anonymous";
    const lastName = nameParts.slice(1).join(" ") || "Inquirer";

    const payload = {
      firstName,
      lastName,
      email: formData.email,
      phone: "",
      collaborationType: formData.inquiryType,
      subject: formData.inquiryType,
      message: formData.message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        inquiryType: "",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section bg-gradient-to-r from-amber-50/60 via-white to-orange-50/50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`text-sm font-medium text-accent uppercase tracking-wider mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Partner With Purpose
          </div>
          <h2
            className={`text-4xl md:text-6xl font-light leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Nominate, Collaborate, or Host
          </h2>
          <p
            className={`text-xl text-text-secondary font-light max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Share a resilient woman&apos;s story, host an ENQU SET NIQU SET conversation, or explore
            partnerships that amplify awakened gems in your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Quick Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-light">Quick Contact</h3>
              <p className="text-text-secondary">
                Curious about nominations, sponsorships, or storytelling collaborations? We&apos;re
                here to listen and respond with care.
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
            className={`transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-background p-8 rounded-2xl border border-border shadow-lg">
              <h3 className="text-xl font-medium mb-6 text-text-primary">Quick Inquiry</h3>

              {status === "success" && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
                  <strong>Success!</strong> Your message has been sent successfully.
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm">
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  />
                </div>
                <select
                  name="inquiryType"
                  required
                  value={formData.inquiryType}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="nomination">Nominate a resilient woman</option>
                  <option value="partnership">Partnership or sponsorship</option>
                  <option value="host">Host a panel or storytelling session</option>
                  <option value="press">Press & media</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  placeholder="Share a story, idea, or partnership opportunity..."
                  className="w-full p-3 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none disabled:opacity-50"
                ></textarea>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-modern w-full magnetic flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
