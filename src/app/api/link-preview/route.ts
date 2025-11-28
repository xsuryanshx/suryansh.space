import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "bot-google", // Use a bot UA to ensure we get the public version
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 400 })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const getMetaTag = (name: string) => {
      return (
        $(`meta[name="${name}"]`).attr("content") ||
        $(`meta[property="${name}"]`).attr("content") ||
        $(`meta[property="og:${name}"]`).attr("content") ||
        $(`meta[property="twitter:${name}"]`).attr("content")
      )
    }

    const title = getMetaTag("title") || $("title").text()
    const description = getMetaTag("description")
    const image = getMetaTag("image")

    // Handle relative image URLs
    let absoluteImage = image
    if (image && !image.startsWith("http")) {
      const urlObj = new URL(url)
      absoluteImage = new URL(image, urlObj.origin).toString()
    }

    return NextResponse.json({
      title,
      description,
      image: absoluteImage,
      url,
    })
  } catch (error) {
    console.error("Error fetching link preview:", error)
    return NextResponse.json(
      { error: "Failed to fetch link preview" },
      { status: 500 }
    )
  }
}

