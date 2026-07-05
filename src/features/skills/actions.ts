"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import { skillFormSchema, type SkillFormValues } from "@/features/skills/schema"

export async function createSkill(values: SkillFormValues) {
  await requireSession()
  const data = skillFormSchema.parse(values)
  const skill = await prisma.skill.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/skills")
  return skill
}

export async function updateSkill(id: string, values: SkillFormValues) {
  await requireSession()
  const data = skillFormSchema.parse(values)
  const skill = await prisma.skill.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/skills")
  return skill
}

export async function deleteSkill(id: string) {
  await requireSession()
  await prisma.skill.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/skills")
}
