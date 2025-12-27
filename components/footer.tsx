"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.programs", href: "#programs" },
    { key: "nav.mentors", href: "#mentors" },
  ];

  const programs = [
    { name: "Award Gatherings", href: "#programs" },
    { name: "Storytelling Panels", href: "#programs" },
    { name: "Community Impact", href: "#programs" },
    { name: "Podcast (Upcoming)", href: "#programs" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6 border-t-2 py-8">
        <div className="grid lg:grid-cols-4 gap-8 text-slate-800">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div
                className="relative w-10 h-10"
                style={{ width: 40, height: 40 }}
              >
                <Image
                  src="/images/enqu_niqu_logo.png"
                  alt="ENQU SET NIQU SET"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">ዕንቁ ሴት ንቁ ሴት</span>
                <span className="text-[11px] uppercase tracking-[0.16em]">
                  ENQU SET NIQU SET
                </span>
                <span className="text-xs">Awakening the Gems Within Women</span>
              </div>
            </Link>
            <p className="mb-6 leading-relaxed">
              Award-driven empowerment platform recognizing, amplifying, and
              celebrating resilient women whose stories deserve the spotlight.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-base font-semibold mb-5">Initiatives</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    className="hover:text-white transition-colors"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-5">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="">{t("contact.address")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="">{t("contact.phone")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="">{t("contact.email")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center mt-8 border-t border-black">
          <p className="text-sm text-black">
            © 2024 ENQU SET NIQU SET. All rights reserved.
            <span className="sr-only">Powered by Zemichael Tefera</span>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-white text-sm transition-colors text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-white text-sm transition-colors text-black"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-white text-sm transition-colors text-black"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
