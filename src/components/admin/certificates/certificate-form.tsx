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
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/image-upload"
import { createCertificate, updateCertificate } from "@/features/certificates/actions"
import {
  certificateFormSchema,
  type CertificateFormValues,
} from "@/features/certificates/schema"
import type { Certificate } from "@/generated/prisma/client"

function toDateInput(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : ""
}

export function CertificateForm({
  certificate,
  trigger,
}: {
  certificate?: Certificate
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!certificate

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      name: certificate?.name ?? "",
      issuer: certificate?.issuer ?? "",
      issueDate: toDateInput(certificate?.issueDate ?? null),
      credentialUrl: certificate?.credentialUrl ?? "",
      imageUrl: certificate?.imageUrl ?? "",
      order: certificate?.order ?? 0,
    },
  })

  const imageUrl = useWatch({ control: form.control, name: "imageUrl" })

  async function onSubmit(values: CertificateFormValues) {
    try {
      if (isEditing) {
        await updateCertificate(certificate.id, values)
        toast.success("Certificate updated")
      } else {
        await createCertificate(values)
        toast.success("Certificate created")
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
          <SheetTitle>{isEditing ? "Edit Certificate" : "New Certificate"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Update this certificate." : "Add a new certificate."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 pb-6"
          noValidate
        >
          <Field>
            <FieldLabel>Badge / Image</FieldLabel>
            <ImageUpload
              value={imageUrl || null}
              onChange={(url) => form.setValue("imageUrl", url ?? "")}
              folder="certificates"
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Certificate Name</FieldLabel>
            <Input id="name" {...form.register("name")} />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.issuer}>
            <FieldLabel htmlFor="issuer">Issuer</FieldLabel>
            <Input id="issuer" {...form.register("issuer")} />
            <FieldError errors={[form.formState.errors.issuer]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.issueDate}>
            <FieldLabel htmlFor="issueDate">Issue Date</FieldLabel>
            <Input id="issueDate" type="date" {...form.register("issueDate")} />
            <FieldError errors={[form.formState.errors.issueDate]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.credentialUrl}>
            <FieldLabel htmlFor="credentialUrl">Credential URL</FieldLabel>
            <Input id="credentialUrl" {...form.register("credentialUrl")} />
            <FieldError errors={[form.formState.errors.credentialUrl]} />
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
            {isEditing ? "Save Changes" : "Create Certificate"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
