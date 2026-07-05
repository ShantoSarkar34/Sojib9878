import { z } from "zod"

export const settingsFormSchema = z.object({
  siteTitle: z.string().trim().min(2).max(150),
  siteDescription: z.string().trim().min(10).max(300),
  seoImage: z.string(),
  maintenanceMode: z.boolean(),
  homeProjectsLimit: z.number().int().min(1).max(60),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>
