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

function toIso8601(dateStr: string): string {
  return new Date(dateStr).toISOString()
}

export async function GET() {
  const posts = getPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  const updated =
    posts.length > 0
      ? toIso8601(posts[0].metadata.date)
      : new Date().toISOString()

  const entries = posts
    .map((post) => {
      const permalink = `${SITE_URL}/blog/${post.slug}`
      const published = toIso8601(post.metadata.date)
      return `
  <entry>
    <title>${escapeXml(post.metadata.title)}</title>
    <summary>${escapeXml(post.metadata.description)}</summary>
    <link href="${permalink}" rel="alternate" type="text/html"/>
    <id>${permalink}</id>
    <published>${published}</published>
    <updated>${published}</updated>
  </entry>`
    })
    .join("")

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}" rel="alternate" type="text/html"/>
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>${entries}
</feed>`

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  })
}
