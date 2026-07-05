import { prisma } from "@/lib/prisma"

export function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } })
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

export function getProjectSlugs() {
  return prisma.project.findMany({ select: { slug: true } })
}
