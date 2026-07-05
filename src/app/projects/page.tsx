import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getProfile, getSocialLinks } from "@/features/profile/queries"
import { getProjects } from "@/features/projects/queries"
import { getSettings } from "@/features/settings/queries"

import { Maintenance } from "@/components/site/maintenance"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { ProjectsExplorer } from "@/components/site/projects-explorer"
import { AuroraBackground } from "@/components/shared/aurora-background"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Projects",
  description: "The full collection of projects I've designed and built.",
}

export default async function ProjectsPage() {
  const [projects, profile, socialLinks, settings] = await Promise.all([
    getProjects(),
    getProfile(),
    getSocialLinks(),
    getSettings(),
  ])

  if (settings?.maintenanceMode) {
    return <Maintenance />
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-center">
        <p className="text-muted-foreground">Projects are being set up. Check back soon.</p>
      </main>
    )
  }

  return (
    <>
      <AuroraBackground />
      <Navbar name={profile.name} />
      <main id="main-content" className="pt-28 pb-20">
        <Container>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/" />}
            className="glass mb-8 rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Button>

          <SectionHeading
            eyebrow="Portfolio"
            title="All Projects"
            description="Every project I've built — filter by category or search to find your way around."
          />

          <div className="mt-12">
            <ProjectsExplorer items={projects} />
          </div>
        </Container>
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  )
}
