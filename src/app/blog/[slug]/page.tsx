import { notFound } from "next/navigation"
import { MDX } from "./mdx"
import { getPostBySlug, getHeadings } from "@/lib/blog"
import { TableOfContents } from "@/components/table-of-contents"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    return
  }

  const publishedTime = formatDate(post.metadata.date)

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://suryansh.space/blog/${post.slug}`,
      images: [
        {
          url: `https://suryansh.space/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      images: [
        `https://suryansh.space/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const headings = getHeadings(post.content)

  return (
    <section className="animate-fade-in-up relative">
      <TableOfContents headings={headings} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: `https://suryansh.space/og/blog?title=${
              post.metadata.title
            }&top=${formatDate(post.metadata.date)}`,
            url: `https://suryansh.space/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Suryansh Singh Rawat",
            },
          }),
        }}
      />

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
          <span className="text-accent mr-2">*</span>
          {post.metadata.title}
        </h1>

        {post.metadata.description && (
          <p className="text-lg italic text-neutral-600 dark:text-gray-400 mb-4 leading-relaxed">
            {post.metadata.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-gray-400">
          <span>{formatDate(post.metadata.date)}</span>
        </div>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-neutral-900 dark:prose-headings:text-white prose-a:text-accent dark:prose-a:text-white hover:prose-a:underline prose-p:text-neutral-700 dark:prose-p:text-gray-300 prose-strong:text-neutral-900 dark:prose-strong:text-white prose-li:text-neutral-700 dark:prose-li:text-gray-300">
        <MDX source={post.content} />
      </article>
    </section>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
