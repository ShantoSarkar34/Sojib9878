"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { createExperience, updateExperience } from "@/features/experience/actions"
import {
  experienceFormSchema,
  type ExperienceFormValues,
} from "@/features/experience/schema"
import type { Experience } from "@/generated/prisma/client"

function toDateInput(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : ""
}

export function ExperienceForm({
  experience,
  trigger,
}: {
  experience?: Experience
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!experience

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      role: experience?.role ?? "",
      company: experience?.company ?? "",
      location: experience?.location ?? "",
      startDate: toDateInput(experience?.startDate ?? null),
      endDate: toDateInput(experience?.endDate ?? null),
      current: experience?.current ?? false,
      description: experience?.description ?? "",
      order: experience?.order ?? 0,
    },
  })

  const current = useWatch({ control: form.control, name: "current" })

  async function onSubmit(values: ExperienceFormValues) {
    try {
      if (isEditing) {
        await updateExperience(experience.id, values)
        toast.success("Experience updated")
      } else {
        await createExperience(values)
        toast.success("Experience created")
      }
      setOpen(false)
      form.reset(values)
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={trigger as React.ReactElement} />
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Experience" : "New Experience"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update this experience entry."
              : "Add a new work experience entry."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 pb-6"
          noValidate
        >
          <Field data-invalid={!!form.formState.errors.role}>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input id="role" {...form.register("role")} />
            <FieldError errors={[form.formState.errors.role]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.company}>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" {...form.register("company")} />
            <FieldError errors={[form.formState.errors.company]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input id="location" {...form.register("location")} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!form.formState.errors.startDate}>
              <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
              <Input id="startDate" type="date" {...form.register("startDate")} />
              <FieldError errors={[form.formState.errors.startDate]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="endDate">End Date</FieldLabel>
              <Input
                id="endDate"
                type="date"
                disabled={current}
                {...form.register("endDate")}
              />
            </Field>
          </div>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="current">Currently working here</FieldLabel>
            <Switch
              id="current"
              checked={current}
              onCheckedChange={(checked) => form.setValue("current", checked)}
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" rows={4} {...form.register("description")} />
            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.order}>
            <FieldLabel htmlFor="order">Display Order</FieldLabel>
            <Input
              id="order"
              type="number"
              min={0}
              {...form.register("order", { valueAsNumber: true })}
            />
            <FieldError errors={[form.formState.errors.order]} />
          </Field>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            {isEditing ? "Save Changes" : "Create Experience"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
