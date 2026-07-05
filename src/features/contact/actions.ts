"use server"

import { headers } from "next/headers"

import { prisma } from "@/lib/prisma"
import { isRateLimited } from "@/lib/rate-limit"
import { sendContactNotification } from "@/lib/resend"
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema"

const MIN_FILL_TIME_MS = 2000

export async function submitContactForm(values: ContactFormValues) {
  const parsed = contactFormSchema.safeParse(values)
  if (!parsed.success) {
    return { success: false, error: "Please check your input and try again." }
  }

  const { name, email, subject, message, startedAt } = parsed.data

  if (Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return { success: false, error: "Please take a moment before submitting." }
  }

  const headerList = await headers()
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many messages sent. Please try again later." }
  }

  await prisma.message.create({
    data: { name, email, subject, message },
  })

  try {
    await sendContactNotification({ name, email, subject, message })
  } catch {
    // Notification email is best-effort; the message is already saved.
  }

  return { success: true }
}
