"use client"

import { Eye } from "lucide-react"

import { AdminDataTable } from "@/components/admin/data-table"
import { ConfirmDelete } from "@/components/admin/confirm-delete"
import { MessageView } from "@/components/admin/messages/message-view"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { deleteMessage } from "@/features/messages/actions"
import type { Message } from "@/generated/prisma/client"

const statusVariant = {
  NEW: "default",
  READ: "secondary",
  REPLIED: "outline",
} as const

export function MessagesTable({ items }: { items: Message[] }) {
  return (
    <AdminDataTable
      data={items}
      searchKeys={(item) => `${item.name} ${item.email} ${item.subject}`}
      emptyMessage="No messages yet."
      columns={[
        {
          header: "From",
          render: (item) => (
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground text-xs">{item.email}</p>
            </div>
          ),
        },
        { header: "Subject", render: (item) => item.subject },
        {
          header: "Status",
          render: (item) => (
            <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
          ),
        },
        {
          header: "Received",
          render: (item) =>
            item.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
        },
      ]}
      actions={(item) => (
        <>
          <MessageView
            message={item}
            trigger={
              <Button variant="ghost" size="icon-sm" aria-label="View">
                <Eye className="size-4" />
              </Button>
            }
          />
          <ConfirmDelete
            description={`This will permanently delete the message from "${item.name}".`}
            onDelete={() => deleteMessage(item.id)}
          />
        </>
      )}
    />
  )
}
