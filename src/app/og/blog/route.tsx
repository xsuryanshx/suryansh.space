import { ImageResponse } from "next/og"

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? "suryansh's blog"
  const description = searchParams.get("description")

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Changed to flex-start for better text alignment
          justifyContent: "center",
          backgroundColor: "#111",
          fontFamily: "Geist Mono",
          padding: "60px", // Increased padding
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <span
              style={{
                color: "#ff6b35",
                fontSize: 64,
                lineHeight: 1,
                marginTop: -10, // Visual optical alignment
              }}
            >
              *
            </span>
            <h1
              style={{
                fontSize: 64,
                color: "#fff",
                margin: 0,
                lineHeight: 1.1,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxWidth: "100%",
              }}
            >
              {title}
            </h1>
          </div>

          {description && (
            <p
              style={{
                fontSize: 32,
                color: "#a3a3a3",
                margin: "10px 0 0 0",
                lineHeight: 1.5,
                paddingLeft: "40px", // Align with title text (offsetting asterisk)
                maxWidth: "90%",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Geist Mono",
          data: await loadGoogleFont("Geist Mono", title + (description || "")),
          style: "normal",
        },
      ],
    }
  )
}
