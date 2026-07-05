import { z } from "zod"

export const projectFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only"
    ),
  summary: z.string().trim().min(10).max(200),
  description: z.string().trim().min(20).max(4000),
  coverImageUrl: z.string().min(1, "Cover image is required"),
  techStack: z.array(z.string().trim().min(1)),
  features: z.array(z.string()),
  liveUrl: z.union([z.url(), z.literal("")]),
  githubUrl: z.union([z.url(), z.literal("")]),
  serverUrl: z.union([z.url(), z.literal("")]),
  category: z.string().trim().min(2).max(60),
  challenges: z.union([z.string().trim().max(2000), z.literal("")]),
  improvements: z.union([z.string().trim().max(2000), z.literal("")]),
  featured: z.boolean(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
