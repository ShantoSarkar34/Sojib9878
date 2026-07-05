export const siteConfig = {
  name: "Merajul Islam Sojib",
  title: "Merajul Islam Sojib — Front-End Developer",
  description:
    "Portfolio of Merajul Islam Sojib, a front-end developer building fast, accessible, and polished web applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const

/**
 * `section` is the homepage element id a link scrolls to (served via a rewrite
 * so the URL reads cleanly, e.g. /skills). `Projects` is a standalone page.
 */
export const navLinks = [
  { href: "/about", label: "About", section: "about" },
  { href: "/skills", label: "Skills", section: "skills" },
  { href: "/experience", label: "Experience", section: "experience" },
  { href: "/projects", label: "Projects", section: null },
  { href: "/education", label: "Education", section: "education" },
  { href: "/certificates", label: "Certificates", section: "certificates" },
  { href: "/contact", label: "Contact", section: "contact" },
] as const

