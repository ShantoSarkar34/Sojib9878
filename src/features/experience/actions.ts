"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import {
  experienceFormSchema,
  type ExperienceFormValues,
} from "@/features/experience/schema"

function toPrismaData(values: ExperienceFormValues) {
  const data = experienceFormSchema.parse(values)
  return {
    ...data,
    startDate: new Date(data.startDate),
    endDate: data.current || !data.endDate ? null : new Date(data.endDate),
  }
}

export async function createExperience(values: ExperienceFormValues) {
  await requireSession()
  const experience = await prisma.experience.create({ data: toPrismaData(values) })
  revalidatePath("/")
  revalidatePath("/admin/experience")
  return experience
}

export async function updateExperience(id: string, values: ExperienceFormValues) {
  await requireSession()
  const experience = await prisma.experience.update({
    where: { id },
    data: toPrismaData(values),
  })
  revalidatePath("/")
  revalidatePath("/admin/experience")
  return experience
}

export async function deleteExperience(id: string) {
  await requireSession()
  await prisma.experience.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/experience")
}
