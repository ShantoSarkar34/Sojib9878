import { prisma } from "@/lib/prisma"

export function getEducations() {
  return prisma.education.findMany({ orderBy: { order: "asc" } })
}
