import { prisma } from "@/lib/prisma"

export function getCertificates() {
  return prisma.certificate.findMany({ orderBy: { order: "asc" } })
}
