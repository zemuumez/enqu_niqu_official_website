"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Initial load
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, []);

  // Page transitions
  useEffect(() => {
    if (!isLoading) {
      // Show transition loading for page changes
      setIsTransitioning(true);
      setProgress(0);

      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            setTimeout(() => setIsTransitioning(false), 300);
            return 100;
          }
          return prev + 10;
        });
      }, 30);

      return () => clearInterval(progressTimer);
    }
  }, [pathname, isLoading]);

  if (!isLoading && !isTransitioning) return null;

  return (
    <div className="loading-screen">
      <div className="text-center space-y-8">
        {/* Logo with Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Spinner Ring */}
          <div className="absolute w-32 h-32 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>

          {/* Logo */}
          <div className="relative z-10 w-24 h-24">
            <Image
              src="/images/EnquNiquLogo.png"
              alt="ENQU SET NIQU SET Logo"
              fill
              className="object-contain animate-pulse"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text opacity-100">
          {isLoading ? "ዕንቁ ሴት ንቁ ሴት" : "Loading..."}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-border rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
