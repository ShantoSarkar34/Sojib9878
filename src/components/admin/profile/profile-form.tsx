"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/image-upload"
import { ResumeUpload } from "@/components/admin/resume-upload"
import { updateProfile } from "@/features/profile/actions"
import { profileFormSchema, type ProfileFormValues } from "@/features/profile/schema"
import type { Profile } from "@/generated/prisma/client"

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      title: profile?.title ?? "",
      tagline: profile?.tagline ?? "",
      bio: profile?.bio ?? "",
      photoUrl: profile?.photoUrl ?? "",
      resumeUrl: profile?.resumeUrl ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
      whatsapp: profile?.whatsapp ?? "",
      location: profile?.location ?? "",
    },
  })

  const photoUrl = useWatch({ control: form.control, name: "photoUrl" })
  const resumeUrl = useWatch({ control: form.control, name: "resumeUrl" })

  async function onSubmit(values: ProfileFormValues) {
    try {
      await updateProfile(values)
      toast.success("Profile updated")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          <Field>
            <FieldLabel>Photo</FieldLabel>
            <ImageUpload
              value={photoUrl || null}
              onChange={(url) => form.setValue("photoUrl", url ?? "")}
              folder="profile"
            />
          </Field>

          <Field>
            <FieldLabel>Resume (PDF)</FieldLabel>
            <ResumeUpload
              value={resumeUrl || null}
              onChange={(url) => form.setValue("resumeUrl", url ?? "")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" {...form.register("name")} />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.title}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...form.register("title")} />
              <FieldError errors={[form.formState.errors.title]} />
            </Field>
          </div>

          <Field data-invalid={!!form.formState.errors.tagline}>
            <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
            <Input id="tagline" {...form.register("tagline")} />
            <FieldError errors={[form.formState.errors.tagline]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.bio}>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea id="bio" rows={6} {...form.register("bio")} />
            <FieldError errors={[form.formState.errors.bio]} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...form.register("email")} />
              <FieldError errors={[form.formState.errors.email]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.phone}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" {...form.register("phone")} />
              <FieldError errors={[form.formState.errors.phone]} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.whatsapp}>
              <FieldLabel htmlFor="whatsapp">WhatsApp (optional)</FieldLabel>
              <Input id="whatsapp" {...form.register("whatsapp")} />
              <FieldError errors={[form.formState.errors.whatsapp]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.location}>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input id="location" {...form.register("location")} />
              <FieldError errors={[form.formState.errors.location]} />
            </Field>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-fit">
            {form.formState.isSubmitting && <Spinner />}
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
