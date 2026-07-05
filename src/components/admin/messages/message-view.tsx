"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateMessageStatus, type MessageStatus } from "@/features/messages/actions"
import type { Message } from "@/generated/prisma/client"

const statuses: MessageStatus[] = ["NEW", "READ", "REPLIED"]

export function MessageView({
  message,
  trigger,
}: {
  message: Message
  trigger: React.ReactNode
}) {
  const router = useRouter()

  async function handleStatusChange(status: MessageStatus | null) {
    if (!status) return
    try {
      await updateMessageStatus(message.id, status)
      toast.success("Status updated")
      router.refresh()
    } catch {
      toast.error("Failed to update status")
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && message.status === "NEW") {
          handleStatusChange("READ")
        }
      }}
    >
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.subject}</DialogTitle>
          <DialogDescription>
            From {message.name} ({message.email}) ·{" "}
            {message.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed whitespace-pre-line">{message.message}</p>

        <DialogFooter className="items-center sm:justify-between">
          <Select value={message.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button nativeButton={false} render={<a href={`mailto:${message.email}`} />}>
            Reply via Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
