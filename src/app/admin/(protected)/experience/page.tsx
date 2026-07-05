import { getExperiences } from "@/features/experience/queries"
import { ExperienceTable } from "@/components/admin/experience/experience-table"

export default async function AdminExperiencePage() {
  const items = await getExperiences()

  return (
    <div>
      <h1 className="text-2xl font-bold">Experience</h1>
      <p className="text-muted-foreground mt-1">
        Manage your professional experience timeline.
      </p>

      <div className="mt-6">
        <ExperienceTable items={items} />
      </div>
    </div>
  )
}
