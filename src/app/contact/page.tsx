"use client"

import { ScrambleText } from "@/components/scramble-text"
import { useState } from "react"
import Link from "next/link"
import { Mail, Github, Linkedin } from "lucide-react"

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialLinks = [
  {
    name: "email",
    href: "mailto:suryansh@uw.edu",
    icon: Mail,
    label: "suryansh@uw.edu",
  },
  {
    name: "github",
    href: "https://github.com/xsuryanshx",
    icon: Github,
    label: "github.com/xsuryanshx",
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/suryansh-singh-rawat/",
    icon: Linkedin,
    label: "linkedin.com/in/suryansh-singh-rawat",
  },
  {
    name: "𝕏",
    href: "https://x.com/snareyansh",
    icon: XIcon,
    label: "x.com/snareyansh",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate form submission (you can integrate with a service like Formspree, EmailJS, etc.)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors duration-200">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="contact" />
      </h1>

      <p className="text-neutral-600 dark:text-gray-400 mb-12 leading-relaxed">
        feel free to reach out. I’m always open to conversations about technology and potential collaborations.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors duration-200 mb-6">
            <span className="text-accent mr-2">*</span> send a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-600 dark:text-gray-400 mb-2"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800 rounded text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors shadow-sm"
                placeholder="your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-600 dark:text-gray-400 mb-2"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800 rounded text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors shadow-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-600 dark:text-gray-400 mb-2"
              >
                message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800 rounded text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none shadow-sm"
                placeholder="your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-accent text-neutral-900 dark:text-white font-semibold rounded hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "sending..." : "send message"}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-400 text-sm">
                message sent successfully! i&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-400 text-sm">
                something went wrong. please try again or reach out via email.
              </p>
            )}
          </form>
        </div>

        {/* Social Links */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="text-accent mr-2">*</span> social media
          </h2>
          <div className="space-y-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-gray-800 rounded hover:border-accent/50 transition-colors group"
                >
                  <div className="p-2 bg-neutral-100 dark:bg-gray-900 rounded group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-5 h-5 text-neutral-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-neutral-900 dark:text-white font-medium capitalize">{link.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-gray-400">{link.label}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

