"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { requireSession } from "@/features/auth/session"
import {
  profileFormSchema,
  socialLinkFormSchema,
  type ProfileFormValues,
  type SocialLinkFormValues,
} from "@/features/profile/schema"

const PROFILE_ID = "singleton-profile"

export async function updateProfile(values: ProfileFormValues) {
  await requireSession()
  const data = profileFormSchema.parse(values)

  const profile = await prisma.profile.upsert({
    where: { id: PROFILE_ID },
    create: {
      id: PROFILE_ID,
      ...data,
      tagline: data.tagline || null,
      photoUrl: data.photoUrl || null,
      resumeUrl: data.resumeUrl || null,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      location: data.location || null,
    },
    update: {
      ...data,
      tagline: data.tagline || null,
      photoUrl: data.photoUrl || null,
      resumeUrl: data.resumeUrl || null,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      location: data.location || null,
    },
  })

  revalidatePath("/")
  revalidatePath("/admin/profile")
  return profile
}

export async function createSocialLink(values: SocialLinkFormValues) {
  await requireSession()
  const data = socialLinkFormSchema.parse(values)
  const link = await prisma.socialLink.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/social-links")
  return link
}

export async function updateSocialLink(id: string, values: SocialLinkFormValues) {
  await requireSession()
  const data = socialLinkFormSchema.parse(values)
  const link = await prisma.socialLink.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/social-links")
  return link
}

export async function deleteSocialLink(id: string) {
  await requireSession()
  await prisma.socialLink.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/social-links")
}
