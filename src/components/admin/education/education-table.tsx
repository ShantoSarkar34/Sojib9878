"use client"

import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { EducationForm } from "@/components/admin/education/education-form"
import { Button } from "@/components/ui/button"
import { deleteEducation } from "@/features/education/actions"
import type { Education } from "@/generated/prisma/client"

export function EducationTable({ items }: { items: Education[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <EducationForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Education
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={items}
        searchKeys={(item) => `${item.degree} ${item.institution}`}
        emptyMessage="No education entries yet."
        columns={[
          {
            header: "Degree",
            render: (item) => (
              <div>
                <p className="font-medium">{item.degree}</p>
                <p className="text-muted-foreground text-xs">{item.institution}</p>
              </div>
            ),
          },
          {
            header: "Period",
            render: (item) =>
              `${item.startDate.getFullYear()} — ${item.endDate?.getFullYear() ?? "Present"}`,
          },
          { header: "Order", render: (item) => item.order },
        ]}
        actions={(item) => (
          <>
            <EducationForm
              education={item}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will permanently delete the "${item.degree}" entry.`}
              onDelete={() => deleteEducation(item.id)}
            />
          </>
        )}
      />
    </div>
  )
}
