import { getEducations } from "@/features/education/queries"
import { EducationTable } from "@/components/admin/education/education-table"

export default async function AdminEducationPage() {
  const items = await getEducations()

  return (
    <div>
      <h1 className="text-2xl font-bold">Education</h1>
      <p className="text-muted-foreground mt-1">Manage your educational background.</p>

      <div className="mt-6">
        <EducationTable items={items} />
      </div>
    </div>
  )
}
