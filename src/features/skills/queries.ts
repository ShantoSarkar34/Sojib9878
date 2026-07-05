import { prisma } from "@/lib/prisma"

export function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } })
}

export async function getSkillsByCategory() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } })

  const categories = ["FRONTEND", "BACKEND", "TOOLS", "OTHER"] as const
  return categories
    .map((category) => ({
      category,
      skills: skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.skills.length > 0)
}
