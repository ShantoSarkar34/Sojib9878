import { prisma } from "@/lib/prisma"

export function getSettings() {
  return prisma.settings.findFirst()
}
