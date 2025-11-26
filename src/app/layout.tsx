import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navbar } from "../components/navbar"
import { ThemeProvider } from "./providers"

export const metadata: Metadata = {
  metadataBase: new URL("https://suryansh.space"),
  title: {
    default: "Suryansh Singh Rawat",
    template: "%s | Suryansh Singh Rawat",
  },
  description: "AI Engineer and Data Scientist. Building enterprise-grade RAG pipelines and scalable AI systems.",
  openGraph: {
    title: "Suryansh Singh Rawat",
    description: "AI Engineer and Data Scientist. Building enterprise-grade RAG pipelines and scalable AI systems.",
    url: "https://suryansh.space",
    siteName: "Suryansh Singh Rawat",
    locale: "en_US",
    type: "website",
    images: ["https://suryansh.space/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Suryansh Singh Rawat",
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} antialiased min-h-screen font-mono`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
