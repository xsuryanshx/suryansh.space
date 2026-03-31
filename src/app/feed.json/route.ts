import { getPosts } from "@/lib/blog"

const SITE_URL = "https://suryansh.space"
const SITE_TITLE = "Suryansh Singh Rawat"
const SITE_DESCRIPTION =
  "AI Engineer and Data Scientist. Building enterprise-grade RAG pipelines and scalable AI systems."

export async function GET() {
  const posts = getPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_TITLE,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    items: posts.map((post) => {
      const permalink = `${SITE_URL}/blog/${post.slug}`
      return {
        id: permalink,
        url: permalink,
        title: post.metadata.title,
        summary: post.metadata.description,
        date_published: new Date(post.metadata.date).toISOString(),
      }
    }),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  })
}
