import { getMessages } from "@/features/messages/queries"
import { MessagesTable } from "@/components/admin/messages/messages-table"

export default async function AdminMessagesPage() {
  const items = await getMessages()

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="text-muted-foreground mt-1">
        Contact form submissions from your visitors.
      </p>

      <div className="mt-6">
        <MessagesTable items={items} />
      </div>
    </div>
  )
}
