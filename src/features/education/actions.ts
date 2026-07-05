"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import {
  educationFormSchema,
  type EducationFormValues,
} from "@/features/education/schema"

function toPrismaData(values: EducationFormValues) {
  const data = educationFormSchema.parse(values)
  return {
    ...data,
    description: data.description || null,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : null,
  }
}

export async function createEducation(values: EducationFormValues) {
  await requireSession()
  const education = await prisma.education.create({ data: toPrismaData(values) })
  revalidatePath("/")
  revalidatePath("/admin/education")
  return education
}

export async function updateEducation(id: string, values: EducationFormValues) {
  await requireSession()
  const education = await prisma.education.update({
    where: { id },
    data: toPrismaData(values),
  })
  revalidatePath("/")
  revalidatePath("/admin/education")
  return education
}

export async function deleteEducation(id: string) {
  await requireSession()
  await prisma.education.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/education")
}
