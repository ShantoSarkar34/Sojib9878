"use client"

import Image from "next/image"
import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { SkillForm } from "@/components/admin/skills/skill-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { deleteSkill } from "@/features/skills/actions"
import type { Skill } from "@/generated/prisma/client"

export function SkillsTable({ skills }: { skills: Skill[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <SkillForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Skill
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={skills}
        searchKeys={(skill) => skill.name}
        emptyMessage="No skills yet. Add your first one."
        columns={[
          {
            header: "Skill",
            render: (skill) => (
              <div className="flex items-center gap-3">
                {skill.iconUrl && (
                  <div className="relative size-8 shrink-0">
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="font-medium">{skill.name}</span>
              </div>
            ),
          },
          {
            header: "Category",
            render: (skill) => <Badge variant="secondary">{skill.category}</Badge>,
          },
          { header: "Proficiency", render: (skill) => `${skill.proficiency}%` },
          { header: "Order", render: (skill) => skill.order },
        ]}
        actions={(skill) => (
          <>
            <SkillForm
              skill={skill}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will permanently delete "${skill.name}".`}
              onDelete={() => deleteSkill(skill.id)}
            />
          </>
        )}
      />
    </div>
  )
}
