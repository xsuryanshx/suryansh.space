import { getPosts } from "@/lib/blog"

const SITE_URL = "https://suryansh.space"
const SITE_TITLE = "Suryansh Singh Rawat"
const SITE_DESCRIPTION =
  "AI Engineer and Data Scientist. Building enterprise-grade RAG pipelines and scalable AI systems."

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toUTCString()
}

export async function GET() {
  const posts = getPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  const items = posts
    .map((post) => {
      const permalink = `${SITE_URL}/blog/${post.slug}`
      return `
    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <description>${escapeXml(post.metadata.description)}</description>
      <link>${permalink}</link>
      <guid isPermaLink="true">${permalink}</guid>
      <pubDate>${toRfc822(post.metadata.date)}</pubDate>
    </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${posts.length > 0 ? toRfc822(posts[0].metadata.date) : new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
