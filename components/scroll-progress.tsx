"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight

      progress.style.transform = `scaleX(${scrollPercent})`
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return <div ref={progressRef} className="scroll-progress scale-x-0" />
}
