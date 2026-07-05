import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, ExternalLink, Server } from "lucide-react"

import { getProfile, getSocialLinks } from "@/features/profile/queries"
import { getProjectBySlug, getProjectSlugs } from "@/features/projects/queries"
import { getSettings } from "@/features/settings/queries"

import { Maintenance } from "@/components/site/maintenance"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { AuroraBackground } from "@/components/shared/aurora-background"
import { Container } from "@/components/shared/container"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { GithubIcon } from "@/components/shared/social-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  const projects = await getProjectSlugs()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.summary,
    openGraph: { images: [project.coverImageUrl] },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [project, profile, socialLinks, settings] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
    getSocialLinks(),
    getSettings(),
  ])

  if (settings?.maintenanceMode) {
    return <Maintenance />
  }

  if (!project || !profile) notFound()

  return (
    <>
      <AuroraBackground />
      <Navbar name={profile.name} />
      <main id="main-content" className="pt-28 pb-16">
        <Container className="max-w-4xl">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/projects" />}
            className="glass mb-8 rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Button>

          <div className="glow-border relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={project.coverImageUrl}
              alt={project.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 60rem, 100vw"
            />
            <div className="from-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge variant="secondary" className="glass">
                {project.category}
              </Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {project.name}
              </h1>
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <Button
                  nativeButton={false}
                  className="bg-gradient-brand rounded-full text-white shadow-lg shadow-primary/25"
                  render={
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  <ExternalLink className="size-4" />
                  Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  nativeButton={false}
                  className="glass rounded-full"
                  render={
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <GithubIcon className="size-4" />
                  Client Repo
                </Button>
              )}
              {project.serverUrl && (
                <Button
                  variant="outline"
                  nativeButton={false}
                  className="glass rounded-full"
                  render={
                    <a
                      href={project.serverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <Server className="size-4" />
                  Server Repo
                </Button>
              )}
            </div>
          </div>

          {project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="glass">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <SpotlightCard className="mt-8">
            <div className="space-y-6 p-8">
              <section>
                <h2 className="text-gradient-brand text-lg font-semibold">Overview</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </section>

              {project.features.length > 0 && (
                <section className="border-glass-border border-t pt-6">
                  <h2 className="text-gradient-brand text-lg font-semibold">Key features</h2>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenges && (
                <section className="border-glass-border border-t pt-6">
                  <h2 className="text-gradient-brand text-lg font-semibold">Challenges</h2>
                  <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
                    {project.challenges}
                  </p>
                </section>
              )}

              {project.improvements && (
                <section className="border-glass-border border-t pt-6">
                  <h2 className="text-gradient-brand text-lg font-semibold">
                    Future improvements
                  </h2>
                  <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line">
                    {project.improvements}
                  </p>
                </section>
              )}
            </div>
          </SpotlightCard>
        </Container>
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  )
}
