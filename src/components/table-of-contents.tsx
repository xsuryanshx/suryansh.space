"use client"

import { useState, useEffect } from "react"
import { List } from "lucide-react"

type Heading = {
  level: number
  text: string
  slug: string
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="fixed right-0 top-32 z-50 flex items-start group">
      {/* Trigger area / Visible hint */}
      <div className="p-3 bg-neutral-50 dark:bg-[#111] rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-800 cursor-pointer shadow-sm transition-all">
        <List className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
      </div>

      {/* Panel */}
      <div className="w-0 overflow-hidden group-hover:w-72 transition-all duration-300 ease-in-out bg-neutral-50 dark:bg-[#111] border-y border-l border-neutral-200 dark:border-neutral-800 rounded-bl-lg shadow-lg max-h-[70vh] overflow-y-auto">
        <div className="p-5 min-w-[18rem]">
          <h4 className="text-xs font-bold mb-4 text-neutral-900 dark:text-white uppercase tracking-widest">
            On this page
          </h4>
          <ul className="space-y-2.5 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.slug}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                <a
                  href={`#${heading.slug}`}
                  className={`block transition-colors duration-200 hover:text-accent truncate ${
                    activeId === heading.slug
                      ? "text-accent font-medium"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.slug)?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

