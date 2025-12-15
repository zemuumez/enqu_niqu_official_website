"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "/", isAnchor: false },
    { key: "nav.about", href: "/#about", isAnchor: true },
    { key: "nav.mentors", href: "/mentors", isAnchor: false },
    { key: "nav.programs", href: "/programs", isAnchor: false },
    { key: "nav.contact", href: "/contact", isAnchor: false },
  ];

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isAnchor: boolean
  ) => {
    if (isAnchor && pathname === "/") {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 magnetic">
            <div className="relative w-10 h-10" style={{ width: 40, height: 40 }}>
              <Image
                src="/images/sophor-logo.png"
                alt="ENQU SET NIQU SET"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-medium">ዕንቁ ሴት ንቁ ሴት</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                ENQU SET NIQU SET
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href, item.isAnchor)}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 magnetic"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-modern magnetic">
              Nominate a Woman
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden magnetic"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <nav className="container mx-auto px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) =>
                    handleAnchorClick(e, item.href, item.isAnchor)
                  }
                  className="block text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-modern w-full mt-8"
                onClick={() => setIsMenuOpen(false)}
              >
                Nominate a Woman
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
