"use client"

import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { CertificateForm } from "@/components/admin/certificates/certificate-form"
import { Button } from "@/components/ui/button"
import { deleteCertificate } from "@/features/certificates/actions"
import type { Certificate } from "@/generated/prisma/client"

export function CertificatesTable({ items }: { items: Certificate[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CertificateForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Certificate
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={items}
        searchKeys={(item) => `${item.name} ${item.issuer}`}
        emptyMessage="No certificates yet."
        columns={[
          {
            header: "Certificate",
            render: (item) => (
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-xs">{item.issuer}</p>
              </div>
            ),
          },
          {
            header: "Issued",
            render: (item) =>
              item.issueDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              }),
          },
          { header: "Order", render: (item) => item.order },
        ]}
        actions={(item) => (
          <>
            <CertificateForm
              certificate={item}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will permanently delete "${item.name}".`}
              onDelete={() => deleteCertificate(item.id)}
            />
          </>
        )}
      />
    </div>
  )
}
