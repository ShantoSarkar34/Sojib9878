import { prisma } from "@/lib/prisma"

export function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } })
}
