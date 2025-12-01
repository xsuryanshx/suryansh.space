"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Globe, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  achievements: string[]
  technologies: string[]
  href: string
  image?: string
}

export function ProjectCard({
  title,
  description,
  role,
  period,
  achievements,
  technologies,
  href,
  image: manualImage,
}: ProjectCardProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!manualImage)
  const [hasError, setHasError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (manualImage) {
      setIsLoading(false)
      return
    }

    async function fetchPreview() {
      try {
        const encodedUrl = encodeURIComponent(href)
        const res = await fetch(`/api/link-preview?url=${encodedUrl}`)
        if (!res.ok) throw new Error("Failed to fetch preview")
        const data = await res.json()
        if (data.image) {
          setPreviewImage(data.image)
        } else {
          setHasError(true)
        }
      } catch (error) {
        console.error(`Error loading preview for ${title}:`, error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreview()
  }, [href, manualImage, title])

  const displayImage = manualImage || previewImage

  return (
    <div className="group border border-neutral-200 dark:border-gray-800 p-6 transition-colors hover:border-accent/50 dark:hover:border-accent/50 overflow-hidden">
      <Link href={href} target="_blank" className="block">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-accent transition-colors">
            {title}
          </h2>
          <ArrowUpRight className="w-5 h-5 text-neutral-400 dark:text-gray-400 group-hover:text-accent transition-colors" />
        </div>
      </Link>

      <p className="text-sm text-neutral-600 dark:text-gray-400 mb-4">
        {role} {period && `(${period})`}
      </p>

      <div className="clearfix relative">
        {/* Image Preview Section - Floated Right on Desktop */}
        <div className="mb-6 md:mb-2 md:float-right md:ml-6 md:w-72 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 relative aspect-video md:-mt-8">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : displayImage ? (
            <Link href={href} target="_blank" className="block h-full">
              <Image
                src={displayImage}
                alt={`${title} preview`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </Link>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-2 p-4 text-center">
              <Globe className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs">Preview unavailable</span>
            </div>
          )}
        </div>

        <p className="text-neutral-700 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Collapsible Details */}
      <div className="mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden space-y-6">
            <div>
              <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">
                achievements
              </h3>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-gray-400 text-sm">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">
                technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-neutral-600 dark:text-gray-300 bg-neutral-100 dark:bg-gray-800/50 rounded"
                  >
                    {tech.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
