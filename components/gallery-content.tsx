"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface SessionImages {
  session: number;
  images: string[];
}

interface GalleryContentProps {
  sessionsData: SessionImages[];
}

export default function GalleryContent({ sessionsData }: GalleryContentProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSession, setActiveSession] = useState<number>(
    sessionsData.length > 0 ? sessionsData[0].session : 1
  );
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const sessionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Use the dynamically loaded sessions data
  const sessions = sessionsData;

  // Use IntersectionObserver to show images as they enter viewport
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageKey = entry.target.getAttribute("data-image-key");
            if (imageKey) {
              setVisibleImages((prev) => {
                if (!prev.has(imageKey)) {
                  return new Set([...prev, imageKey]);
                }
                return prev;
              });
            }
          }
        });
      },
      {
        threshold: 0.05, // Trigger when 5% of image is visible
        rootMargin: "150px", // Start loading 150px before image enters viewport
      }
    );

    // Observe images using querySelector to find all image containers
    const observeImages = () => {
      if (containerRef.current) {
        const imageContainers =
          containerRef.current.querySelectorAll("[data-image-key]");
        imageContainers.forEach((container) => {
          imageObserver.observe(container);
        });
      }
    };

    // Observe immediately and also after a short delay to catch any late-rendered images
    observeImages();
    const timeoutId = setTimeout(observeImages, 200);

    return () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        const imageContainers =
          containerRef.current.querySelectorAll("[data-image-key]");
        imageContainers.forEach((container) => {
          imageObserver.unobserve(container);
        });
      }
    };
  }, [sessions]);

  // Track scroll position to determine active session
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollTop + windowHeight * 0.5;

      // Find which session is currently in view
      let newActiveSession = sessions[0]?.session || 1;
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
  }, [sessions]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-amber-100/50"
    >
      <div className="container mx-auto px-4 lg:px-12 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-[0.35em] text-accent py-5 font-semibold">
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
                      ref={(el) => {
                        imageRefs.current[image] = el;
                      }}
                      data-image-key={image}
                      className={`relative overflow-hidden rounded-xl shadow-lg border border-border transition-all duration-1000 ${
                        visibleImages.has(image)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: `${index * 50}ms`,
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
