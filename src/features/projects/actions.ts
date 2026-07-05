"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import { projectFormSchema, type ProjectFormValues } from "@/features/projects/schema"

export async function createProject(values: ProjectFormValues) {
  await requireSession()
  const data = projectFormSchema.parse(values)

  const project = await prisma.project.create({
    data: {
      ...data,
      features: data.features.map((f) => f.trim()).filter(Boolean),
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      serverUrl: data.serverUrl || null,
      challenges: data.challenges || null,
      improvements: data.improvements || null,
    },
  })

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return project
}

export async function updateProject(id: string, values: ProjectFormValues) {
  await requireSession()
  const data = projectFormSchema.parse(values)

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      features: data.features.map((f) => f.trim()).filter(Boolean),
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      serverUrl: data.serverUrl || null,
      challenges: data.challenges || null,
      improvements: data.improvements || null,
    },
  })

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath(`/projects/${project.slug}`)
  revalidatePath("/admin/projects")
  return project
}

export async function deleteProject(id: string) {
  await requireSession()
  await prisma.project.delete({ where: { id } })

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
}
