import { z } from "zod"

export const socialLinkFormSchema = z.object({
  platform: z.enum(["GITHUB", "LINKEDIN", "TWITTER", "FACEBOOK", "OTHER"]),
  url: z.url("Enter a valid URL"),
  order: z.number().int().min(0),
})

export type SocialLinkFormValues = z.infer<typeof socialLinkFormSchema>

export const profileFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  title: z.string().trim().min(2).max(150),
  tagline: z.string().trim().max(300),
  bio: z.string().trim().min(10).max(4000),
  photoUrl: z.string(),
  resumeUrl: z.string(),
  email: z.email(),
  phone: z.string().trim().max(30),
  whatsapp: z.string().trim().max(30),
  location: z.string().trim().max(150),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
