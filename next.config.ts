import type { NextConfig } from "next"

const HOME_SECTIONS = [
  "about",
  "skills",
  "experience",
  "education",
  "certificates",
  "contact",
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async rewrites() {
    // Section paths (/skills, /about, …) are served by the homepage; a client
    // controller scrolls to the matching section. /projects has its own page.
    return HOME_SECTIONS.map((section) => ({ source: `/${section}`, destination: "/" }))
  },
}

export default nextConfig
