"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if modifier keys are pressed (Ctrl, Cmd, Alt, Shift)
      // This allows browser shortcuts like Ctrl+C (copy) to work
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return
      }

      // Don't trigger if any input elements are focused or if event target is an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "h":
          router.push("/")
          break
        case "b":
          router.push("/blog")
          break
        case "p":
          router.push("/projects")
          break
        case "c":
          router.push("/contact")
          break
        case "r":
          window.open("/suryansh_resume.pdf", "_blank")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex items-center justify-between mb-12 text-sm">
      <div className="flex gap-2 sm:gap-4">
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="hidden sm:inline">[h] </span>home
        </Link>
        <Link
          href="/blog"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="hidden sm:inline">[b] </span>blog
        </Link>
        <Link
          href="/projects"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="hidden sm:inline">[p] </span>projects
        </Link>
        <Link
          href="/contact"
          className="hover:text-accent transition-colors duration-200"
        >
          <span className="hidden sm:inline">[c] </span>contact
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  )
}
