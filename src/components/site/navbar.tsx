"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Container } from "@/components/shared/container"
import { navLinks } from "@/constants/site"
import { cn } from "@/lib/utils"

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => (link.section ? document.getElementById(link.section) : null))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Projects is a standalone route; every other section path (/skills, …) is
  // served by the homepage, so fall back to the URL until the scroll observer
  // reports a section.
  const isProjectsRoute = pathname === "/projects" || pathname.startsWith("/projects/")
  const routeSection = pathname === "/" ? "" : pathname.split("/")[1]
  const current = isProjectsRoute ? "" : activeSection || routeSection

  function isActive(link: (typeof navLinks)[number]) {
    if (link.section === null) return isProjectsRoute
    return current === link.section
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 w-full"
    >
      <Container
        className={cn(
          "mt-3 flex h-14 items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-6",
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2 text-lg font-bold">
          <span className="bg-gradient-brand flex size-8 items-center justify-center rounded-lg text-sm font-black text-white">
            {name.charAt(0)}
          </span>
          <span className="hidden sm:inline">{name.split(" ")[0]}</span>
        </Link>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.href}
                href={link.href}
                scroll={false}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-accent ring-primary/25 absolute inset-0 -z-10 rounded-full ring-1"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<Link href="/contact" scroll={false} />}
            className="bg-gradient-brand hidden rounded-full text-white shadow-md shadow-primary/25 transition-transform hover:scale-105 sm:inline-flex"
          >
            Hire Me
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="glass w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-10 flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    scroll={false}
                    onClick={() => setOpen(false)}
                    className="hover:bg-accent rounded-lg px-3 py-2.5 text-lg font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  nativeButton={false}
                  render={<Link href="/contact" scroll={false} />}
                  onClick={() => setOpen(false)}
                  className="bg-gradient-brand mt-4 rounded-full text-white"
                >
                  Hire Me
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  )
}
