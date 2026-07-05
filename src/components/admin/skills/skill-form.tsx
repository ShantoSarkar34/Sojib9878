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
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/image-upload"
import { createSkill, updateSkill } from "@/features/skills/actions"
import { skillFormSchema, type SkillFormValues } from "@/features/skills/schema"
import type { Skill } from "@/generated/prisma/client"

const categories = ["FRONTEND", "BACKEND", "TOOLS", "OTHER"] as const

export function SkillForm({
  skill,
  trigger,
}: {
  skill?: Skill
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!skill

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: skill?.name ?? "",
      iconUrl: skill?.iconUrl ?? "",
      category: skill?.category ?? "FRONTEND",
      proficiency: skill?.proficiency ?? 80,
      order: skill?.order ?? 0,
    },
  })

  const iconUrl = useWatch({ control: form.control, name: "iconUrl" })
  const category = useWatch({ control: form.control, name: "category" })

  async function onSubmit(values: SkillFormValues) {
    try {
      if (isEditing) {
        await updateSkill(skill.id, values)
        toast.success("Skill updated")
      } else {
        await createSkill(values)
        toast.success("Skill created")
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
          <SheetTitle>{isEditing ? "Edit Skill" : "New Skill"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update this skill." : "Add a new skill to your portfolio."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 pb-6"
          noValidate
        >
          <Field>
            <FieldLabel>Icon</FieldLabel>
            <ImageUpload
              value={iconUrl || null}
              onChange={(url) => form.setValue("iconUrl", url ?? "")}
              folder="skills"
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" {...form.register("name")} />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select
              value={category}
              onValueChange={(value) =>
                form.setValue("category", value as typeof category)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field data-invalid={!!form.formState.errors.proficiency}>
            <FieldLabel htmlFor="proficiency">Proficiency (0-100)</FieldLabel>
            <Input
              id="proficiency"
              type="number"
              min={0}
              max={100}
              {...form.register("proficiency", { valueAsNumber: true })}
            />
            <FieldError errors={[form.formState.errors.proficiency]} />
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
            {isEditing ? "Save Changes" : "Create Skill"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
