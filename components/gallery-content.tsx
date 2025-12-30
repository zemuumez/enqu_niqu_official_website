"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface SessionImages {
  session: number;
  images: string[];
}

export default function GalleryContent() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSession, setActiveSession] = useState(1);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const sessionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Organize images by session
  const sessions: SessionImages[] = [
    {
      session: 1,
      images: [
        "/images/Session1/2025-12-14 02.50.22.jpg",
        "/images/Session1/2025-12-14 02.51.02.jpg",
        "/images/Session1/2025-12-14 02.51.14.jpg",
        "/images/Session1/2025-12-14 02.51.33.jpg",
        "/images/Session1/2025-12-14 02.51.46.jpg",
      ],
    },
    {
      session: 2,
      images: [
        "/images/Session2/2025-12-14 02.53.17.jpg",
        "/images/Session2/2025-12-14 02.53.23.jpg",
        "/images/Session2/2025-12-14 02.53.29.jpg",
        "/images/Session2/2025-12-14 02.53.34.jpg",
        "/images/Session2/2025-12-14 02.53.40.jpg",
        "/images/Session2/2025-12-14 02.53.44.jpg",
        "/images/Session2/2025-12-14 02.54.16.jpg",
        "/images/Session2/2025-12-14 02.54.21.jpg",
        "/images/Session2/2025-12-14 02.54.43.jpg",
        "/images/Session2/2025-12-14 02.54.48.jpg",
      ],
    },
    {
      session: 3,
      images: [
        "/images/Session3/2025-12-14 02.55.19.jpg",
        "/images/Session3/2025-12-14 02.55.25.jpg",
        "/images/Session3/2025-12-14 02.55.34.jpg",
        "/images/Session3/2025-12-14 02.55.40.jpg",
        "/images/Session3/2025-12-14 02.56.31.jpg",
        "/images/Session3/2025-12-14 02.56.38.jpg",
        "/images/Session3/2025-12-14 02.56.45.jpg",
        "/images/Session3/2025-12-14 02.57.00.jpg",
        "/images/Session3/2025-12-14 02.57.08.jpg",
      ],
    },
    {
      session: 4,
      images: [
        "/images/Session4/2025-12-14 02.57.31.jpg",
        "/images/Session4/2025-12-14 02.57.37.jpg",
        "/images/Session4/2025-12-14 02.57.41.jpg",
        "/images/Session4/2025-12-14 02.57.46.jpg",
        "/images/Session4/2025-12-14 02.58.08.jpg",
        "/images/Session4/2025-12-14 02.58.30.jpg",
        "/images/Session4/2025-12-14 02.58.35.jpg",
        "/images/Session4/2025-12-14 02.58.45.jpg",
        "/images/Session4/2025-12-14 02.58.52.jpg",
        "/images/Session4/2025-12-14 02.58.57.jpg",
        "/images/Session4/2025-12-14 02.59.04.jpg",
        "/images/Session4/2025-12-14 02.59.52.jpg",
        "/images/Session4/2025-12-14 03.01.10.jpg",
        "/images/Session4/2025-12-14 03.01.22.jpg",
        "/images/Session4/2025-12-14 03.01.36.jpg",
        "/images/Session4/2025-12-14 03.01.46.jpg",
        "/images/Session4/2025-12-14 03.01.58.jpg",
        "/images/Session4/2025-12-14 03.02.07.jpg",
      ],
    },
    {
      session: 6,
      images: [
        "/images/Session6/photo_2025-12-14 02.31.51.jpeg",
        "/images/Session6/photo_2025-12-14 02.33.16.jpeg",
        "/images/Session6/photo_2025-12-14 02.33.38.jpeg",
        "/images/Session6/photo_2025-12-14 02.33.48.jpeg",
        "/images/Session6/photo_2025-12-14 02.34.16.jpeg",
      ],
    },
    {
      session: 7,
      images: [
        "/images/Session7/photo_2025-12-14 02.31.29.jpeg",
        "/images/Session7/photo_2025-12-14 02.31.36.jpeg",
        "/images/Session7/photo_2025-12-14 02.31.39.jpeg",
        "/images/Session7/photo_2025-12-14 02.31.43.jpeg",
        "/images/Session7/photo_2025-12-14 02.31.46.jpeg",
      ],
    },
  ];

  // Track scroll position and determine active session
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollTop + windowHeight * 0.5;

      // Find which session is currently in view
      let newActiveSession = 1;
      let closestDistance = Infinity;

      sessions.forEach((sessionData) => {
        const sessionElement = sessionRefs.current[sessionData.session];
        if (sessionElement) {
          const rect = sessionElement.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementCenter = elementTop + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);

          if (
            distance < closestDistance &&
            rect.top < scrollTop + windowHeight
          ) {
            closestDistance = distance;
            newActiveSession = sessionData.session;
          }
        }
      });

      setActiveSession(newActiveSession);

      // Show images progressively based on scroll within each session
      sessions.forEach((sessionData) => {
        const sessionElement = sessionRefs.current[sessionData.session];
        if (sessionElement) {
          const rect = sessionElement.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          // Calculate scroll progress within this session
          const sessionStart = elementTop;
          const sessionEnd = elementBottom;
          const sessionHeight = sessionEnd - sessionStart;
          const scrollProgressInSession = Math.max(
            0,
            Math.min(
              1,
              (scrollTop + windowHeight * 0.3 - sessionStart) / sessionHeight
            )
          );

          // Show images progressively as user scrolls through the session
          sessionData.images.forEach((image, index) => {
            const imageThreshold =
              (index + 1) / (sessionData.images.length + 1);
            if (scrollProgressInSession >= imageThreshold) {
              setVisibleImages((prev) => {
                if (!prev.has(image)) {
                  return new Set([...prev, image]);
                }
                return prev;
              });
            }
          });
        }
      });
    };

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-amber-100/50"
    >
      <div className="container mx-auto px-4 lg:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
            {t("nav.gallery")}
          </div>

          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
            <span className="gradient-text">{t("gallery.title")}</span>
          </h1>

          <p className="text-xl text-text-secondary font-light max-w-3xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-12">
          {/* Session Numbers Sidebar */}
          <div className="sticky top-24 h-fit hidden lg:block">
            <div className="space-y-8">
              {sessions.map((sessionData) => (
                <div
                  key={sessionData.session}
                  className={`transition-all duration-500 ${
                    activeSession === sessionData.session
                      ? "opacity-100 scale-110"
                      : "opacity-30 blur-sm scale-100"
                  }`}
                >
                  <div
                    className={`text-6xl font-bold ${
                      activeSession === sessionData.session
                        ? "text-accent"
                        : "text-text-muted"
                    } transition-colors duration-500`}
                  >
                    {sessionData.session}
                  </div>
                  {activeSession === sessionData.session && (
                    <div className="text-sm text-accent mt-2 font-medium">
                      Session {sessionData.session}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div className="flex-1 space-y-32">
            {sessions.map((sessionData) => (
              <div
                key={sessionData.session}
                ref={(el) => {
                  sessionRefs.current[sessionData.session] = el;
                }}
                className="session-section"
                style={{ minHeight: "100vh" }}
              >
                {/* Session Header (Mobile) */}
                <div className="lg:hidden mb-8">
                  <h2
                    className={`text-4xl font-bold transition-all duration-500 ${
                      activeSession === sessionData.session
                        ? "text-accent opacity-100"
                        : "text-text-muted opacity-30"
                    }`}
                  >
                    Session {sessionData.session}
                  </h2>
                </div>

                {/* Images Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sessionData.images.map((image, index) => (
                    <div
                      key={`${sessionData.session}-${index}`}
                      className={`relative overflow-hidden rounded-xl shadow-lg border border-border transition-all duration-1000 ${
                        visibleImages.has(image)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Session ${sessionData.session} - Image ${
                          index + 1
                        }`}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm font-medium">
                          Session {sessionData.session} • Photo {index + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
