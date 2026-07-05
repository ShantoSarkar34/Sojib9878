import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { ThemeProvider } from "@/components/shared/theme-provider"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import { BackToTop } from "@/components/shared/back-to-top"
import { SkipToContent } from "@/components/shared/skip-to-content"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { siteConfig } from "@/constants/site"
import { getProfile, getSocialLinks } from "@/features/profile/queries"
import { getSettings } from "@/features/settings/queries"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const title = settings?.siteTitle ?? siteConfig.title
  const description = settings?.siteDescription ?? siteConfig.description

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: settings?.seoImage ? [settings.seoImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: settings?.seoImage ? [settings.seoImage] : undefined,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [profile, socialLinks] = await Promise.all([getProfile(), getSocialLinks()])

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <SkipToContent />
        {profile && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: profile.name,
                url: siteConfig.url,
                jobTitle: profile.title,
                sameAs: socialLinks.map((link) => link.url),
              }),
            }}
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={200}>
            <ScrollProgress />
            {children}
            <BackToTop />
            <Toaster richColors closeButton position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
