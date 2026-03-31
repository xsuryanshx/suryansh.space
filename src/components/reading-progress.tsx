"use client"

import { useState, useEffect } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector("article")
      if (!article) return

      const rect = article.getBoundingClientRect()
      const articleHeight = article.offsetHeight
      const viewportHeight = window.innerHeight

      // How many pixels of the article have scrolled past the top of the viewport
      const scrolled = -rect.top
      // The scrollable distance is the article height minus the viewport height
      const scrollable = articleHeight - viewportHeight

      if (scrollable <= 0) {
        // Article fits entirely in viewport — treat as fully read
        setProgress(100)
        return
      }

      const pct = Math.min(Math.max((scrolled / scrollable) * 100, 0), 100)
      setProgress(pct)
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    // Run once on mount in case the page is already scrolled
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div
      role="none"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-accent motion-safe:transition-[width] motion-safe:duration-100 motion-safe:ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
