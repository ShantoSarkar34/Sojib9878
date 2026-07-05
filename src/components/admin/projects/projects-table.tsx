"use client"

import Image from "next/image"
import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { ProjectForm } from "@/components/admin/projects/project-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { deleteProject } from "@/features/projects/actions"
import type { Project } from "@/generated/prisma/client"

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ProjectForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Project
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={projects}
        searchKeys={(project) => `${project.name} ${project.category}`}
        emptyMessage="No projects yet. Create your first one."
        columns={[
          {
            header: "Project",
            render: (project) => (
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={project.coverImageUrl}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-muted-foreground text-xs">{project.slug}</p>
                </div>
              </div>
            ),
          },
          {
            header: "Category",
            render: (project) => <Badge variant="secondary">{project.category}</Badge>,
          },
          {
            header: "Featured",
            render: (project) => (project.featured ? "Yes" : "—"),
          },
        ]}
        actions={(project) => (
          <>
            <ProjectForm
              project={project}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will permanently delete "${project.name}".`}
              onDelete={() => deleteProject(project.id)}
            />
          </>
        )}
      />
    </div>
  )
}
