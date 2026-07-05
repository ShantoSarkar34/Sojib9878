import { prisma } from "@/lib/prisma"

export function getProfile() {
  return prisma.profile.findFirst()
}

export function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } })
}
