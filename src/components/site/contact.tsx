"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import { Container } from "@/components/shared/container"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { submitContactForm } from "@/features/contact/actions"
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema"
import type { Profile } from "@/generated/prisma/client"

export function Contact({ profile }: { profile: Profile }) {
  const [isPending, startTransition] = useTransition()
  const [startedAt] = useState(() => Date.now())

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      startedAt,
    },
  })

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await submitContactForm({ ...values, startedAt })
      if (result.success) {
        toast.success("Message sent — I'll get back to you soon.")
        form.reset({
          name: "",
          email: "",
          subject: "",
          message: "",
          company: "",
          startedAt,
        })
      } else {
        toast.error(result.error ?? "Something went wrong. Please try again.")
      }
    })
  }

  const contactMethods = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && {
      icon: Phone,
      label: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    },
    profile.location && { icon: MapPin, label: profile.location, href: null },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string | null }[]

  return (
    <section id="contact" className="py-28">
      <Container className="grid items-stretch gap-12 lg:grid-cols-5">
        <AnimatedSection className="flex flex-col lg:col-span-2">
          <span className="glass text-primary inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            Contact
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something <span className="text-gradient-brand">together</span>
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Have a project in mind or just want to say hello? Send me a message and
            I&apos;ll reply as soon as I can.
          </p>

          <div className="mt-auto space-y-3 pt-8">
            {contactMethods.map((method) => {
              const content = (
                <>
                  <span className="bg-accent text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <method.icon className="size-4" />
                  </span>
                  <span className="truncate text-sm">{method.label}</span>
                </>
              )
              return method.href ? (
                <a
                  key={method.label}
                  href={method.href}
                  className="glass hover:border-primary/40 flex items-center gap-3 rounded-xl p-2.5 transition-colors"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={method.label}
                  className="glass flex items-center gap-3 rounded-xl p-2.5"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex lg:col-span-3">
          <SpotlightCard className="h-full w-full">
            <div className="flex h-full flex-col p-8">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 flex-col gap-5"
                noValidate
              >
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  {...form.register("company")}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field data-invalid={!!form.formState.errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" {...form.register("name")} />
                    <FieldError errors={[form.formState.errors.name]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" {...form.register("email")} />
                    <FieldError errors={[form.formState.errors.email]} />
                  </Field>
                </div>

                <Field data-invalid={!!form.formState.errors.subject}>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input id="subject" {...form.register("subject")} />
                  <FieldError errors={[form.formState.errors.subject]} />
                </Field>

                <Field data-invalid={!!form.formState.errors.message} className="flex-1">
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    className="min-h-32 flex-1 resize-none"
                    {...form.register("message")}
                  />
                  <FieldError errors={[form.formState.errors.message]} />
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="bg-gradient-brand mt-auto w-full gap-2 rounded-full text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                >
                  {isPending ? <Spinner /> : <Send className="size-4" />}
                  {isPending ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>
          </SpotlightCard>
        </AnimatedSection>
      </Container>
    </section>
  )
}
