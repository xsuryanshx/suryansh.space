import Link from "next/link"

const links = [
  { title: "email", href: "mailto:suryansh@uw.edu" },
  { title: "github", href: "https://github.com/xsuryanshx" },
  { title: "linkedin", href: "https://www.linkedin.com/in/suryansh-singh-rawat/" },
  { title: "𝕏", href: "https://x.com/snareyansh" },
]

export function LinksSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-neutral-900 dark:text-white">
        <span className="text-accent mr-2">*</span> links
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-neutral-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
