import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

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

export function Header() {
  return (
    <header className="mb-16 space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold animate-fade-in text-neutral-900 dark:text-white">
          <span className="inline-block hover:text-accent transition-colors cursor-default">
            <ScrambleText text="suryansh singh rawat" />
          </span>
        </h1>

        <div className="flex gap-4 flex-wrap animate-fade-in">
          <Link
            href="https://github.com/xsuryanshx"
            target="_blank"
            className="text-neutral-500 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/suryansh-singh-rawat/"
            target="_blank"
            className="text-neutral-500 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="https://x.com/snareyansh"
            target="_blank"
            className="text-neutral-500 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <XIcon className="w-4 h-4 mt-0.5" />
          </Link>
          <Link
            href="mailto:suryansh@uw.edu"
            className="text-neutral-500 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-neutral-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          seattle, wa
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          ai engineer/data scientist
        </div>
      </div>

      <p className="leading-relaxed animate-fade-in-up">
        I'm an ai engineer based in Seattle, currently pursuing my Master's in Data Science at the University of Washington. 
        I'm a researcher and a high-agency builder by heart, I thrive on solving hard problems and I get things done. I love to build products focused around AI and ML. 
        Few topics which interest me are: AI Agents for Automation, LLM Inferencing and Optimizations, NLP, Deep Learning, Search and Retrieval.
        When I’m not coding, you’ll probably find me beatboxing, practicing calisthenics, trekking, or vibing to drum & bass.
      </p>
    </header>
  )
}
