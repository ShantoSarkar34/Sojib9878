"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { createSocialLink, updateSocialLink } from "@/features/profile/actions"
import {
  socialLinkFormSchema,
  type SocialLinkFormValues,
} from "@/features/profile/schema"
import type { SocialLink } from "@/generated/prisma/client"

const platforms = ["GITHUB", "LINKEDIN", "TWITTER", "FACEBOOK", "OTHER"] as const

export function SocialLinkForm({
  link,
  trigger,
}: {
  link?: SocialLink
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!link

  const form = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: {
      platform: link?.platform ?? "GITHUB",
      url: link?.url ?? "",
      order: link?.order ?? 0,
    },
  })

  const platform = useWatch({ control: form.control, name: "platform" })

  async function onSubmit(values: SocialLinkFormValues) {
    try {
      if (isEditing) {
        await updateSocialLink(link.id, values)
        toast.success("Social link updated")
      } else {
        await createSocialLink(values)
        toast.success("Social link created")
      }
      setOpen(false)
      form.reset(values)
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Social Link" : "New Social Link"}</DialogTitle>
          <DialogDescription>
            Link to one of your social or professional profiles.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          <Field>
            <FieldLabel>Platform</FieldLabel>
            <Select
              value={platform}
              onValueChange={(value) =>
                form.setValue("platform", value as typeof platform)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field data-invalid={!!form.formState.errors.url}>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input id="url" {...form.register("url")} />
            <FieldError errors={[form.formState.errors.url]} />
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

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner />}
              {isEditing ? "Save Changes" : "Create Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
