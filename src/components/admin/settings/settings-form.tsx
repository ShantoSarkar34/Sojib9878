"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/image-upload"
import { updateSettings } from "@/features/settings/actions"
import { settingsFormSchema, type SettingsFormValues } from "@/features/settings/schema"
import type { Settings } from "@/generated/prisma/client"

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const router = useRouter()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteTitle: settings?.siteTitle ?? "",
      siteDescription: settings?.siteDescription ?? "",
      seoImage: settings?.seoImage ?? "",
      maintenanceMode: settings?.maintenanceMode ?? false,
      homeProjectsLimit: settings?.homeProjectsLimit ?? 3,
    },
  })

  const seoImage = useWatch({ control: form.control, name: "seoImage" })
  const maintenanceMode = useWatch({ control: form.control, name: "maintenanceMode" })

  async function onSubmit(values: SettingsFormValues) {
    try {
      await updateSettings(values)
      toast.success("Settings updated")
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
          <Field data-invalid={!!form.formState.errors.siteTitle}>
            <FieldLabel htmlFor="siteTitle">Site Title</FieldLabel>
            <Input id="siteTitle" {...form.register("siteTitle")} />
            <FieldError errors={[form.formState.errors.siteTitle]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.siteDescription}>
            <FieldLabel htmlFor="siteDescription">Site Description</FieldLabel>
            <Textarea
              id="siteDescription"
              rows={3}
              {...form.register("siteDescription")}
            />
            <FieldError errors={[form.formState.errors.siteDescription]} />
          </Field>

          <Field>
            <FieldLabel>Default SEO / Social Share Image</FieldLabel>
            <ImageUpload
              value={seoImage || null}
              onChange={(url) => form.setValue("seoImage", url ?? "")}
              folder="settings"
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.homeProjectsLimit}>
            <FieldLabel htmlFor="homeProjectsLimit">
              Projects shown on homepage
            </FieldLabel>
            <Input
              id="homeProjectsLimit"
              type="number"
              min={1}
              max={60}
              {...form.register("homeProjectsLimit", { valueAsNumber: true })}
            />
            <FieldDescription>
              How many projects appear on the homepage (e.g. 3, 6, 9). A “See all” button
              links to the full projects page when there are more.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.homeProjectsLimit]} />
          </Field>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="maintenanceMode">Maintenance Mode</FieldLabel>
            <Switch
              id="maintenanceMode"
              checked={maintenanceMode}
              onCheckedChange={(checked) => form.setValue("maintenanceMode", checked)}
            />
            <FieldDescription>
              Temporarily show a maintenance message to visitors.
            </FieldDescription>
          </Field>

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-fit">
            {form.formState.isSubmitting && <Spinner />}
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
