import { z } from "zod"

export const educationFormSchema = z.object({
  degree: z.string().trim().min(2).max(150),
  institution: z.string().trim().min(2).max(150),
  location: z.string().trim().max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  description: z.string().trim().max(1000),
  order: z.number().int().min(0),
})

export type EducationFormValues = z.infer<typeof educationFormSchema>
