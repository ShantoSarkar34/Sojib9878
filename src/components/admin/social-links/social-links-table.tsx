"use client"

import { Pencil, Plus } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { SocialLinkForm } from "@/components/admin/social-links/social-link-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { deleteSocialLink } from "@/features/profile/actions"
import type { SocialLink } from "@/generated/prisma/client"

export function SocialLinksTable({ items }: { items: SocialLink[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <SocialLinkForm
          trigger={
            <Button>
              <Plus className="size-4" />
              New Link
            </Button>
          }
        />
      </div>

      <AdminDataTable
        data={items}
        emptyMessage="No social links yet."
        columns={[
          {
            header: "Platform",
            render: (item) => <Badge variant="secondary">{item.platform}</Badge>,
          },
          {
            header: "URL",
            render: (item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {item.url}
              </a>
            ),
          },
          { header: "Order", render: (item) => item.order },
        ]}
        actions={(item) => (
          <>
            <SocialLinkForm
              link={item}
              trigger={
                <Button variant="ghost" size="icon-sm" aria-label="Edit">
                  <Pencil className="size-4" />
                </Button>
              }
            />
            <ConfirmDelete
              description={`This will remove your ${item.platform} link.`}
              onDelete={() => deleteSocialLink(item.id)}
            />
          </>
        )}
      />
    </div>
  )
}
