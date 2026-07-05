import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  company: z.string().max(0, "Bot check failed"),
  startedAt: z.number(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
