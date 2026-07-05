import { getProfile, getSocialLinks } from "@/features/profile/queries"
import { getSkillsByCategory } from "@/features/skills/queries"
import { getProjects } from "@/features/projects/queries"
import { getExperiences } from "@/features/experience/queries"
import { getEducations } from "@/features/education/queries"
import { getCertificates } from "@/features/certificates/queries"
import { getSettings } from "@/features/settings/queries"

import { Maintenance } from "@/components/site/maintenance"
import { AuroraBackground } from "@/components/shared/aurora-background"
import { SectionScroller } from "@/components/site/section-scroller"
import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { About } from "@/components/site/about"
import { Skills } from "@/components/site/skills"
import { Experience } from "@/components/site/experience"
import { Education } from "@/components/site/education"
import { Projects } from "@/components/site/projects"
import { Certificates } from "@/components/site/certificates"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default async function HomePage() {
  const [
    profile,
    socialLinks,
    skillGroups,
    projects,
    experiences,
    educations,
    certificates,
    settings,
  ] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSkillsByCategory(),
    getProjects(),
    getExperiences(),
    getEducations(),
    getCertificates(),
    getSettings(),
  ])

  if (settings?.maintenanceMode) {
    return <Maintenance />
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-center">
        <p className="text-muted-foreground">
          Portfolio content is being set up. Please check back soon.
        </p>
      </main>
    )
  }

  const allSkills = skillGroups.flatMap((group) => group.skills)
  const highlightSkills = allSkills.map((s) => s.name)
  const homeProjectsLimit = settings?.homeProjectsLimit ?? 3
  const homeProjects = projects.slice(0, homeProjectsLimit)

  return (
    <>
      <SectionScroller />
      <AuroraBackground />
      <Navbar name={profile.name} />
      <main id="main-content">
        <Hero profile={profile} socialLinks={socialLinks} highlightSkills={highlightSkills} />
        <About profile={profile} skillCount={allSkills.length} />
        <Skills groups={skillGroups} />
        <Experience items={experiences} />
        <Education items={educations} />
        <Projects items={homeProjects} totalCount={projects.length} />
        <Certificates items={certificates} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  )
}
