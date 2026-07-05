import { prisma } from "@/lib/prisma"

export function getMessages() {
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } })
}
