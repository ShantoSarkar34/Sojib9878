import { z } from "zod"

export const skillFormSchema = z.object({
  name: z.string().trim().min(1).max(60),
  iconUrl: z.string(),
  category: z.enum(["FRONTEND", "BACKEND", "TOOLS", "OTHER"]),
  proficiency: z.number().min(0).max(100),
  order: z.number().int().min(0),
})

export type SkillFormValues = z.infer<typeof skillFormSchema>
