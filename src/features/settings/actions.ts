"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import { settingsFormSchema, type SettingsFormValues } from "@/features/settings/schema"

const SETTINGS_ID = "singleton-settings"

export async function updateSettings(values: SettingsFormValues) {
  await requireSession()
  const data = settingsFormSchema.parse(values)

  const settings = await prisma.settings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...data, seoImage: data.seoImage || null },
    update: { ...data, seoImage: data.seoImage || null },
  })

  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/settings")
  return settings
}
