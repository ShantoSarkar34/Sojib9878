"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Spinner } from "@/components/ui/spinner"
import { createEducation, updateEducation } from "@/features/education/actions"
import {
  educationFormSchema,
  type EducationFormValues,
} from "@/features/education/schema"
import type { Education } from "@/generated/prisma/client"

function toDateInput(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : ""
}

export function EducationForm({
  education,
  trigger,
}: {
  education?: Education
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!education

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      degree: education?.degree ?? "",
      institution: education?.institution ?? "",
      location: education?.location ?? "",
      startDate: toDateInput(education?.startDate ?? null),
      endDate: toDateInput(education?.endDate ?? null),
      description: education?.description ?? "",
      order: education?.order ?? 0,
    },
  })

  async function onSubmit(values: EducationFormValues) {
    try {
      if (isEditing) {
        await updateEducation(education.id, values)
        toast.success("Education updated")
      } else {
        await createEducation(values)
        toast.success("Education created")
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
          <SheetTitle>{isEditing ? "Edit Education" : "New Education"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update this education entry." : "Add a new education entry."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 pb-6"
          noValidate
        >
          <Field data-invalid={!!form.formState.errors.degree}>
            <FieldLabel htmlFor="degree">Degree</FieldLabel>
            <Input id="degree" {...form.register("degree")} />
            <FieldError errors={[form.formState.errors.degree]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.institution}>
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input id="institution" {...form.register("institution")} />
            <FieldError errors={[form.formState.errors.institution]} />
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
              <Input id="endDate" type="date" {...form.register("endDate")} />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" rows={3} {...form.register("description")} />
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
            {isEditing ? "Save Changes" : "Create Education"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
