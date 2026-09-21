import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { JsonLd, SITE, siteGraph } from "@/lib/seo"

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-display", display: "swap" })
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" })


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PI Tutors | GCSE & A-Level Maths and Science Tutoring",
    template: "%s | PI Tutors",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "education",
  formatDetection: { telephone: true, address: false, email: true },
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    url: SITE.url,
    title: "PI Tutors | GCSE & A-Level Maths and Science Tutoring",
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "PI Tutors: mathematics and science tutoring" }],
  },
  twitter: { card: "summary_large_image", title: "PI Tutors", description: SITE.description, images: [SITE.ogImage] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
}

export const viewport: Viewport = {
  themeColor: "#050708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="dark">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SmoothScroll />
          <a href="#main" className="lg sr-only left-4 top-4 z-[60] h-11 items-center rounded-full px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] focus:not-sr-only focus:fixed focus:inline-flex">Skip to content</a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <JsonLd data={siteGraph} />
      </body>
    </html>
  )
}
