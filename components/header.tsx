"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { usePathname } from "next/navigation";

const navItems = [
  { key: "nav.home", href: "/", isAnchor: false },
  { key: "nav.about", href: "/#about", isAnchor: true },
  { key: "nav.persons", href: "/founders", isAnchor: false },
  { key: "nav.programs", href: "/programs", isAnchor: false },
  { key: "nav.gallery", href: "/gallery", isAnchor: false },
  { key: "nav.contact", href: "/contact", isAnchor: false },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reset active anchor when navigating away from home
    if (pathname !== "/") {
      setActiveAnchor(null);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active anchor on home page
      if (pathname === "/") {
        const anchors = navItems
          .filter((item) => item.isAnchor)
          .map((item) => item.href.split("#")[1]);
        
        let currentActive: string | null = null;
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        anchors.forEach((anchorId) => {
          const element = document.getElementById(anchorId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;
            
            if (
              scrollPosition >= elementTop - 200 &&
              scrollPosition < elementBottom
            ) {
              currentActive = anchorId;
            }
          }
        });
        
        setActiveAnchor(currentActive);
      }
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check
      
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

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

  // Check if a nav item is active
  const isActive = (href: string, isAnchor: boolean) => {
    if (isAnchor) {
      // For anchor links, check if we're on home page and it's the active anchor
      if (pathname === "/" && href.startsWith("/#")) {
        const targetId = href.split("#")[1];
        return activeAnchor === targetId;
      }
      return false;
    }
    // For regular routes, check if pathname matches
    if (href === "/") {
      return pathname === "/" && !activeAnchor; // Home is active only if no anchor is active
    }
    return pathname.startsWith(href);
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 magnetic">
            <div className="relative w-9 h-9" style={{ width: 36, height: 36 }}>
              <Image
                src="/images/EnquNiquLogo.png"
                alt="ENQU SET NIQU SET"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-medium">ዕንቁ ሴት ንቁ ሴት</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                ENQU SET NIQU SET
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isActive(item.href, item.isAnchor);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href, item.isAnchor)}
                  className={`relative text-sm font-medium transition-all duration-300 magnetic group ${
                    active
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="relative z-10">{t(item.key)}</span>
                  {/* Underline effect */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="btn-modern magnetic">
              Contact Us
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
              {navItems.map((item) => {
                const active = isActive(item.href, item.isAnchor);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={(e) =>
                      handleAnchorClick(e, item.href, item.isAnchor)
                    }
                    className={`relative block text-lg font-medium transition-all duration-300 py-2 ${
                      active
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <span className="relative z-10">{t(item.key)}</span>
                    {/* Active indicator for mobile */}
                    {active && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
                    )}
                  </Link>
                );
              })}
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
