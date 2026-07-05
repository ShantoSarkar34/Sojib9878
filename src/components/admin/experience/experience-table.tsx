"use client"

import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { ExperienceForm } from "@/components/admin/experience/experience-form"
import { Button } from "@/components/ui/button"
import { deleteExperience } from "@/features/experience/actions"
import type { Experience } from "@/generated/prisma/client"

export function ExperienceTable({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ExperienceForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Experience
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={items}
        searchKeys={(item) => `${item.role} ${item.company}`}
        emptyMessage="No experience entries yet."
        columns={[
          {
            header: "Role",
            render: (item) => (
              <div>
                <p className="font-medium">{item.role}</p>
                <p className="text-muted-foreground text-xs">{item.company}</p>
              </div>
            ),
          },
          {
            header: "Period",
            render: (item) =>
              `${item.startDate.toLocaleDateString("en-US", { year: "numeric", month: "short" })} — ${
                item.current
                  ? "Present"
                  : (item.endDate?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    }) ?? "")
              }`,
          },
          { header: "Order", render: (item) => item.order },
        ]}
        actions={(item) => (
          <>
            <ExperienceForm
              experience={item}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will permanently delete the "${item.role}" entry.`}
              onDelete={() => deleteExperience(item.id)}
            />
          </>
        )}
      />
    </div>
  )
}
