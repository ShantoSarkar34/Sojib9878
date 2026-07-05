import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactNotification(input: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const to = process.env.CONTACT_NOTIFICATION_EMAIL
  if (!resend || !to) return

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: input.email,
    subject: `New contact message: ${input.subject}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  })
}
