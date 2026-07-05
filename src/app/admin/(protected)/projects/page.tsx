import { getProjects } from "@/features/projects/queries"
import { ProjectsTable } from "@/components/admin/projects/projects-table"

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="text-muted-foreground mt-1">
        Manage the projects shown on your portfolio.
      </p>

      <div className="mt-6">
        <ProjectsTable projects={projects} />
      </div>
    </div>
  )
}
