"use client"

import { useEffect, useRef } from "react"

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let followerX = 0
    let followerY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.3
      cursorY += (mouseY - cursorY) * 0.3

      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`

      requestAnimationFrame(animateCursor)
    }

    const handleMouseEnter = () => {
      cursor.style.transform += " scale(1.5)"
      follower.style.transform += " scale(1.5)"
    }

    const handleMouseLeave = () => {
      cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "")
      follower.style.transform = follower.style.transform.replace(" scale(1.5)", "")
    }

    document.addEventListener("mousemove", moveCursor)
    animateCursor()

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .magnetic")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  )
}
