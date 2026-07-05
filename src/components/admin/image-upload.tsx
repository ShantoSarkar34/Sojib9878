"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string | null
  onChange: (url: string | null) => void
  folder: "profile" | "projects" | "skills" | "certificates" | "settings"
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error ?? "Upload failed")
        return
      }

      onChange(data.url)
    } catch {
      toast.error("Upload failed")
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="bg-muted relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
        {isUploading ? (
          <Spinner />
        ) : value ? (
          <Image src={value} alt="Upload preview" fill className="object-cover" />
        ) : (
          <ImagePlus className="text-muted-foreground size-6" />
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {value ? "Replace" : "Upload"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onChange(null)}
            aria-label="Remove image"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
