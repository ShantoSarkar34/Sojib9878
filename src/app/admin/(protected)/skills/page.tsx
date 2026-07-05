import { getSkills } from "@/features/skills/queries"
import { SkillsTable } from "@/components/admin/skills/skills-table"

export default async function AdminSkillsPage() {
  const skills = await getSkills()

  return (
    <div>
      <h1 className="text-2xl font-bold">Skills</h1>
      <p className="text-muted-foreground mt-1">
        Manage the skills shown on your portfolio.
      </p>

      <div className="mt-6">
        <SkillsTable skills={skills} />
      </div>
    </div>
  )
}
