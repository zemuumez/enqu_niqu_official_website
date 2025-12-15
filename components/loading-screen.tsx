"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  // Initial load
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(progressTimer)
  }, [])

  // Page transitions
  useEffect(() => {
    if (!isLoading) {
      // Show transition loading for page changes
      setIsTransitioning(true)
      setProgress(0)

      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            setTimeout(() => setIsTransitioning(false), 300)
            return 100
          }
          return prev + 10
        })
      }, 30)

      return () => clearInterval(progressTimer)
    }
  }, [pathname, isLoading])

  if (!isLoading && !isTransitioning) return null

  return (
    <div className="loading-screen">
      <div className="text-center space-y-8">
        <div className="loading-text opacity-100">
          {isLoading ? "ዕንቁ ሴት ንቁ ሴት" : "Loading..."}
        </div>
        <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
        </div>
        {isLoading && <div className="text-sm text-text-muted">{progress}%</div>}
      </div>
    </div>
  )
}
