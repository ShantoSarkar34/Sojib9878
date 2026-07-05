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
import { ImageUpload } from "@/components/admin/image-upload"
import { TagInput } from "@/components/admin/tag-input"
import { createProject, updateProject } from "@/features/projects/actions"
import { projectFormSchema, type ProjectFormValues } from "@/features/projects/schema"
import type { Project } from "@/generated/prisma/client"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function ProjectForm({
  project,
  trigger,
}: {
  project?: Project
  trigger: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isEditing = !!project

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project?.name ?? "",
      slug: project?.slug ?? "",
      summary: project?.summary ?? "",
      description: project?.description ?? "",
      coverImageUrl: project?.coverImageUrl ?? "",
      techStack: project?.techStack ?? [],
      features: project?.features ?? [],
      liveUrl: project?.liveUrl ?? "",
      githubUrl: project?.githubUrl ?? "",
      serverUrl: project?.serverUrl ?? "",
      category: project?.category ?? "",
      challenges: project?.challenges ?? "",
      improvements: project?.improvements ?? "",
      featured: project?.featured ?? false,
    },
  })

  const coverImageUrl = useWatch({ control: form.control, name: "coverImageUrl" })
  const techStack = useWatch({ control: form.control, name: "techStack" })
  const features = useWatch({ control: form.control, name: "features" })
  const featured = useWatch({ control: form.control, name: "featured" })

  async function onSubmit(values: ProjectFormValues) {
    try {
      if (isEditing) {
        await updateProject(project.id, values)
        toast.success("Project updated")
      } else {
        await createProject(values)
        toast.success("Project created")
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
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Project" : "New Project"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the project details."
              : "Add a new project to your portfolio."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-4 pb-6"
          noValidate
        >
          <Field data-invalid={!!form.formState.errors.coverImageUrl}>
            <FieldLabel>Cover Image</FieldLabel>
            <ImageUpload
              value={coverImageUrl || null}
              onChange={(url) => form.setValue("coverImageUrl", url ?? "")}
              folder="projects"
            />
            <FieldError errors={[form.formState.errors.coverImageUrl]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...form.register("name", {
                onChange: (event) => {
                  if (!isEditing) {
                    form.setValue("slug", slugify(event.target.value))
                  }
                },
              })}
            />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.slug}>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <Input id="slug" {...form.register("slug")} />
            <FieldError errors={[form.formState.errors.slug]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.category}>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Input
              id="category"
              placeholder="e.g. Web App"
              {...form.register("category")}
            />
            <FieldError errors={[form.formState.errors.category]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.summary}>
            <FieldLabel htmlFor="summary">Summary</FieldLabel>
            <Textarea id="summary" rows={2} {...form.register("summary")} />
            <FieldError errors={[form.formState.errors.summary]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" rows={5} {...form.register("description")} />
            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Field>
            <FieldLabel>Tech Stack</FieldLabel>
            <TagInput
              value={techStack}
              onChange={(tags) => form.setValue("techStack", tags)}
              placeholder="Type and press Enter…"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="features">Key Features (one per line)</FieldLabel>
            <Textarea
              id="features"
              rows={5}
              value={features.join("\n")}
              onChange={(event) =>
                form.setValue("features", event.target.value.split("\n"))
              }
              placeholder={"e.g.\nUser authentication\nResponsive design\nSearch and filtering"}
            />
          </Field>

          <Field data-invalid={!!form.formState.errors.liveUrl}>
            <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
            <Input id="liveUrl" {...form.register("liveUrl")} />
            <FieldError errors={[form.formState.errors.liveUrl]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.githubUrl}>
            <FieldLabel htmlFor="githubUrl">Client Repo URL (GitHub)</FieldLabel>
            <Input id="githubUrl" {...form.register("githubUrl")} />
            <FieldError errors={[form.formState.errors.githubUrl]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.serverUrl}>
            <FieldLabel htmlFor="serverUrl">Server / Backend Repo URL (optional)</FieldLabel>
            <Input id="serverUrl" {...form.register("serverUrl")} />
            <FieldError errors={[form.formState.errors.serverUrl]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
            <Textarea id="challenges" rows={3} {...form.register("challenges")} />
          </Field>

          <Field>
            <FieldLabel htmlFor="improvements">Future Improvements</FieldLabel>
            <Textarea id="improvements" rows={3} {...form.register("improvements")} />
          </Field>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="featured">Featured</FieldLabel>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => form.setValue("featured", checked)}
            />
          </Field>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            {isEditing ? "Save Changes" : "Create Project"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
