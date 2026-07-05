import { z } from "zod"

export const certificateFormSchema = z.object({
  name: z.string().trim().min(2).max(150),
  issuer: z.string().trim().min(2).max(150),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.union([z.url(), z.literal("")]),
  imageUrl: z.string(),
  order: z.number().int().min(0),
})

export type CertificateFormValues = z.infer<typeof certificateFormSchema>
