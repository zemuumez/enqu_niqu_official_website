"use client"

import type React from "react"
import { useEffect } from "react"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Simple smooth scrolling without external libraries for now
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return <>{children}</>
}
