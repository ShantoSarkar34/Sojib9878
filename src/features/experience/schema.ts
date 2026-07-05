import { z } from "zod"

export const experienceFormSchema = z.object({
  role: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(100),
  location: z.string().trim().max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string().trim().min(10).max(2000),
  order: z.number().int().min(0),
})

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>
